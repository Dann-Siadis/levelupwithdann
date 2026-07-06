/**
 * WordPress → Sanity import script
 * Usage: SANITY_TOKEN=xxx node scripts/import-wordpress.mjs
 */
import { readFileSync } from 'fs'
import { createClient } from '@sanity/client'

const TOKEN = process.env.SANITY_TOKEN
if (!TOKEN) {
  console.error('❌  Set SANITY_TOKEN=<your-write-token> before running this script.')
  console.error('    Get it from: https://www.sanity.io/manage → pgrlvmib → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'pgrlvmib',
  dataset: 'production',
  apiVersion: '2025-01-01',
  token: TOKEN,
  useCdn: false,
})

const XML_PATH = process.argv[2] || '/Users/dannsiadis/Downloads/levelupwithdann.WordPress.2026-07-06.xml'
const xml = readFileSync(XML_PATH, 'utf-8')

function extract(text, tag) {
  const cdata = text.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`))
  if (cdata) return cdata[1].trim()
  const plain = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))
  return plain ? plain[1].trim() : ''
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[.*?\]/g, '')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 96)
}

// Map WordPress categories → Sanity categories
function mapCategory(wpCategories, wpTags) {
  const all = [...wpCategories, ...wpTags].map(c => c.toLowerCase())
  if (all.some(c => c.includes('tv show') || c.includes('tv-show'))) return 'tvshows'
  if (all.some(c => c.includes('kickbox') || c.includes('boxing') || c.includes('lifestyle') || c.includes('fitness'))) return 'kickboxing'
  if (all.some(c => c.includes('gear') || c.includes('periphera') || c.includes('headset') || c.includes('mouse') || c.includes('keyboard') || c.includes('monitor') || c.includes('phone'))) return 'gear'
  if (all.some(c => c.includes('gaming') || c.includes('news') || c.includes('tips') || c.includes('blog'))) return 'gaming'
  // Default: game review
  return 'games'
}

const items = xml.split('<item>').slice(1).map(b => b.split('</item>')[0])

// Filter published posts
const posts = items.filter(item => {
  const status = extract(item, 'wp:status')
  const type = extract(item, 'wp:post_type')
  return status === 'publish' && type === 'post'
})

// Filter published products
const products = items.filter(item => {
  const status = extract(item, 'wp:status')
  const type = extract(item, 'wp:post_type')
  return status === 'publish' && type === 'product'
})

console.log(`\n📦 Found ${posts.length} posts + ${products.length} products to import\n`)

let imported = 0
let failed = 0

// Import posts
for (const item of posts) {
  const title = extract(item, 'title')
    .replace(/&amp;/g, '&').replace(/&#8211;/g, '–').replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')

  if (!title) continue

  const wpSlug = extract(item, 'wp:post_name')
  const slug = wpSlug || slugify(title)
  const dateStr = extract(item, 'wp:post_date').split(' ')[0]
  const body = stripHtml(extract(item, 'content:encoded'))
  const excerpt = stripHtml(extract(item, 'excerpt:encoded')) || body.slice(0, 200)

  const wpCategories = [...item.matchAll(/<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g)].map(m => m[1])
  const wpTags = [...item.matchAll(/<category domain="post_tag"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g)].map(m => m[1])
  const category = mapCategory(wpCategories, wpTags)

  const doc = {
    _type: 'post',
    _id: `wp-post-${slug}`,
    title,
    slug: { _type: 'slug', current: slug },
    category,
    excerpt: excerpt.slice(0, 300),
    publishedAt: dateStr ? new Date(dateStr).toISOString() : new Date().toISOString(),
  }

  try {
    await client.createOrReplace(doc)
    console.log(`  ✅ [${category}] ${title}`)
    imported++
  } catch (err) {
    console.log(`  ❌ Failed: ${title} — ${err.message}`)
    failed++
  }
}

// Import products
for (const item of products) {
  const title = extract(item, 'title').replace(/&amp;/g, '&')
  if (!title) continue

  const wpSlug = extract(item, 'wp:post_name')
  const slug = wpSlug || slugify(title)
  const body = stripHtml(extract(item, 'content:encoded'))
  const price = extract(item, 'woocommerce_regular_price') || ''

  const wpCategories = [...item.matchAll(/<category domain="product_cat"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/g)].map(m => m[1])
  const category = wpCategories.some(c => c.toLowerCase().includes('kickbox') || c.toLowerCase().includes('boxing'))
    ? 'kickboxing'
    : wpCategories.some(c => c.toLowerCase().includes('phone') || c.toLowerCase().includes('mobile'))
    ? 'phone'
    : 'gaming'

  const doc = {
    _type: 'product',
    _id: `wp-product-${slug}`,
    title,
    slug: { _type: 'slug', current: slug },
    description: body.slice(0, 400),
    price: price ? `€${price}` : '',
    category,
  }

  try {
    await client.createOrReplace(doc)
    console.log(`  ✅ [product] ${title}`)
    imported++
  } catch (err) {
    console.log(`  ❌ Failed: ${title} — ${err.message}`)
    failed++
  }
}

console.log(`\n✅ Done: ${imported} imported, ${failed} failed`)
