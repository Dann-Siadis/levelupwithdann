import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0d0d14] border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Image src="/lwdlogo.png" alt="LevelUpWithDann" width={64} height={48} className="object-contain" />
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase text-white/30 mb-4">Content</h3>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><Link href="/reviews" className="hover:text-white transition">Game Reviews</Link></li>
                <li><Link href="/gear" className="hover:text-white transition">Tech & Gear</Link></li>
                <li><Link href="/blogs" className="hover:text-white transition">Gaming Blogs</Link></li>
                <li><Link href="/tvshows" className="hover:text-white transition">Movie & TV Reviews</Link></li>
                <li><Link href="/kickboxing" className="hover:text-white transition">Kickboxing</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">Shop</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xs tracking-widest uppercase text-white/30 mb-4">Connect</h3>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li>
                  <a href="https://www.twitch.tv/levelupwithdann" target="_blank" rel="noopener noreferrer" className="hover:text-[#9146ff] transition">
                    Twitch
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/levelupwithdann" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@levelupwithdann" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@levelupwithdann" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    TikTok
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/levelupwithdann" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">
            © 2026 Level Up with Dann. Powered by{' '}
            <a href="https://www.siadismedia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition">
              Siadis Media
            </a>.
          </p>
          <p className="text-xs text-white/25">* Some links on this site are affiliate links</p>
        </div>
      </div>
    </footer>
  )
}
