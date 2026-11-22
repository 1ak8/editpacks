"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowRight, Check, Download, Menu, Pause, Play, Search, Sparkles, X } from "lucide-react"

const features = [
  { id: "01", title: "Jujutsu Kaisen", subtitle: "Shibuya Incident Arc", category: "Anime", clips: "184 clips", downloads: "142K downloads", quality: "4K", image: "/hero-anime.png" },
  { id: "02", title: "Spider-Man", subtitle: "Across the Spider-Verse", category: "Movies", clips: "212 clips", downloads: "116K downloads", quality: "4K", image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1800&q=88" },
  { id: "03", title: "Attack on Titan", subtitle: "The Final Season", category: "Anime", clips: "156 clips", downloads: "79K downloads", quality: "4K", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1800&q=88" },
  { id: "04", title: "Dune: Part Two", subtitle: "The Desert Awakens", category: "Movies", clips: "96 clips", downloads: "88K downloads", quality: "4K", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=88" },
]

const trending = [
  { title: "Jujutsu Kaisen", downloads: "142K", packs: "184 packs", category: "Anime", image: "photo-1578632767115-351597cf2477" },
  { title: "Spider-Man: Across the Spider-Verse", downloads: "116K", packs: "212 packs", category: "Movies", image: "photo-1607604276583-eef5d076aa5f" },
  { title: "Naruto Shippuden", downloads: "92K", packs: "176 packs", category: "Anime", image: "photo-1578632767115-351597cf2477" },
  { title: "Attack on Titan", downloads: "79K", packs: "156 packs", category: "Anime", image: "photo-1534447677768-be436bb09401" },
  { title: "Death Note", downloads: "61K", packs: "88 packs", category: "Anime", image: "photo-1500530855697-b586d89ba3ee" },
  { title: "Dune: Part Two", downloads: "58K", packs: "96 packs", category: "Movies", image: "photo-1518709268805-4e9042af9f23" },
  { title: "Arcane: Season Two", downloads: "54K", packs: "132 packs", category: "Series", image: "photo-1470252649378-9c29740c9fa7" },
  { title: "Afterglow", downloads: "46K", packs: "64 packs", category: "K-Pop", image: "photo-1518837695005-2083093ee35b" },
  { title: "Night City", downloads: "42K", packs: "146 packs", category: "Gaming", image: "photo-1519608487953-e999c86e7455" },
  { title: "Final Whistle", downloads: "38K", packs: "42 packs", category: "Sports", image: "photo-1522778119026-d647f0596c20" },
  { title: "Afterglow: Performance Cut", downloads: "34K", packs: "28 packs", category: "Music Videos", image: "photo-1506157786151-b8491531f063" },
]

const fresh = [
  { title: "The Incredibles", studio: "PIXAR", image: "photo-1533929736458-ca588d08c8be" },
  { title: "Chainsaw Man: Reze Arc", studio: "ANIME", image: "photo-1518837695005-2083093ee35b" },
  { title: "Across the Spider-Verse", studio: "SONY PICTURES", image: "photo-1534796636912-3b95b3ab5986" },
  { title: "Iron Man", studio: "MARVEL", image: "photo-1480714378408-67cf0d13bc1b" },
  { title: "The Batman", studio: "DC STUDIOS", image: "photo-1500534623283-312aade485b7" },
  { title: "Blue Lock", studio: "ANIME", image: "photo-1519608487953-e999c86e7455" },
  { title: "Midnight Stage", studio: "MUSIC VIDEO", image: "photo-1518837695005-2083093ee35b" },
  { title: "Rivalry", studio: "SPORTS", image: "photo-1522778119026-d647f0596c20" },
]

const categories = [
  { title: "Anime", count: "1,240 packs", image: "photo-1578632767115-351597cf2477" },
  { title: "Movies", count: "860 packs", image: "photo-1500534623283-312aade485b7" },
  { title: "K-Pop", count: "320 packs", image: "photo-1518837695005-2083093ee35b" },
  { title: "Series", count: "540 packs", image: "photo-1470252649378-9c29740c9fa7" },
  { title: "Sports", count: "290 packs", image: "photo-1522778119026-d647f0596c20" },
  { title: "Music Videos", count: "410 packs", image: "photo-1506157786151-b8491531f063" },
]

const imageUrl = (id: string, width = 660) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

type Pack = (typeof trending)[number]

function PackCard({ pack, onPreview, freshCard = false }: { pack: Pack | (typeof fresh)[number]; onPreview: (title: string) => void; freshCard?: boolean }) {
  const title = pack.title
  const image = pack.image
  const meta = freshCard ? (pack as (typeof fresh)[number]).studio : `${(pack as Pack).packs} · ${(pack as Pack).downloads} downloads`

  return <article className="pack-card">
    <button className="pack-art" type="button" onClick={() => onPreview(title)} aria-label={`Preview ${title} scenepack`}>
      <img src={imageUrl(image, 560)} alt={`${title} scenepack artwork`} loading="lazy" />
      <span className="pack-art-overlay"><span className="pack-preview"><Play size={15} fill="currentColor" /> Quick preview</span><span className="pack-download"><Download size={13} /> {freshCard ? "New" : (pack as Pack).downloads}</span></span>
      {!freshCard && (pack as Pack).category === "Anime" && <span className="pack-badge">Trending</span>}
    </button>
    <div className="pack-details"><h3>{title}</h3><p>{meta}</p></div>
  </article>
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{action && <a href="#new">{action} <ArrowRight size={15} /></a>}</div>
}

function RequestDialog({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)
  return <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="request-dialog glass-panel" role="dialog" aria-modal="true" aria-labelledby="request-title">
      <button className="icon-button dialog-close" onClick={onClose} aria-label="Close request"><X /></button>
      {sent ? <div className="request-success"><span className="success-icon"><Check /></span><h2 id="request-title">Request received</h2><p>We&apos;ll let you know when your pack is ready.</p><button className="button button-primary" onClick={onClose}>Back to packs</button></div> : <form onSubmit={event => { event.preventDefault(); setSent(true) }}>
        <span className="eyebrow">COMMUNITY REQUEST</span><h2 id="request-title">What should we add next?</h2><p>Tell us what you&apos;re looking for and we&apos;ll get it on the list.</p>
        <label>Title or pack<input required placeholder="e.g. Arcane season 2" /></label>
        <label>Your email<input type="email" placeholder="you@example.com" /></label>
        <button className="button button-primary" type="submit">Send request <ArrowRight /></button>
      </form>}
    </section>
  </div>
}

export function EditorMarketplace() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const [previousActive, setPreviousActive] = useState<number | null>(null)
  const [heroFadeIn, setHeroFadeIn] = useState(true)
  const changeFeature = useCallback((nextIndex: number) => {
    if (nextIndex === activeRef.current) return
    const outgoingIndex = activeRef.current
    activeRef.current = nextIndex
    setPreviousActive(outgoingIndex)
    setHeroFadeIn(false)
    setActive(nextIndex)
    window.requestAnimationFrame(() => setHeroFadeIn(true))
    window.setTimeout(() => setPreviousActive(current => current === outgoingIndex ? null : current), 900)
  }, [])
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchOpen, setSearchOpen] = useState(false)
  const [requestOpen, setRequestOpen] = useState(false)
  const [preview, setPreview] = useState<Pack | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const feature = features[active]
  const filters = ["All", "Anime", "Movies", "K-Pop", "Series", "Sports", "Music Videos"]
  const visiblePacks = useMemo(() => activeFilter === "All" ? trending.slice(0, 6) : trending.filter(pack => pack.category === activeFilter), [activeFilter])
  const searchResults = useMemo(() => [...trending, ...fresh].filter((item, index, list) => list.findIndex(candidate => candidate.title === item.title) === index), [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => changeFeature((activeRef.current + 1) % features.length), 6000)
    return () => window.clearInterval(timer)
  }, [changeFeature])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true) }
      if (event.key === "Escape") { setSearchOpen(false); setRequestOpen(false); setPreview(null) }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const sections = document.querySelectorAll<HTMLElement>(".reveal-on-scroll")
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target) } })
    }, { threshold: 0.12 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const openPack = (title: string) => {
    const match = trending.find(pack => pack.title === title)
    setPreview(match ?? { title, downloads: "New pack", packs: "Fresh drop", category: "Scenepack", image: fresh.find(item => item.title === title)?.image ?? trending[0].image })
  }

  return <main className="marketplace" id="top">
    <header className="site-header">
      <div className="nav-glass">
        <a href="#top" className="brand" aria-label="EditPacks home">editpacks<span>.</span></a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#trending" onClick={() => setMenuOpen(false)}>Library</a><a href="#categories" onClick={() => setMenuOpen(false)}>Collections</a><a href="#new" onClick={() => setMenuOpen(false)}>Audio</a><a href="#store" onClick={() => setMenuOpen(false)}>Store</a>
        </nav>
        <div className="nav-actions"><button className="icon-button search-trigger" onClick={() => setSearchOpen(true)} aria-label="Search packs"><Search /></button><a className="pro-pill" href="#store">PRO <Sparkles size={13} /></a><button className="icon-button menu-trigger" onClick={() => setMenuOpen(value => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button></div>
      </div>
    </header>

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        {previousActive !== null && <img className="hero-image hero-image-previous" src={features[previousActive].image} alt="" />}
        <img className={`hero-image hero-image-current ${heroFadeIn ? "is-visible" : ""}`} src={feature.image} alt="" fetchPriority="high" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <span className="eyebrow">{feature.category} <i /> Trending</span>
        <h1 id="hero-title">{feature.title}</h1><p className="hero-subtitle">{feature.subtitle}</p>
        <p className="hero-meta">{feature.clips} <span>·</span> {feature.downloads} <span>·</span> {feature.quality}</p>
        <div className="hero-actions"><a className="button button-primary" href="#trending">Download pack <ArrowRight /></a><button className="button button-glass" onClick={() => openPack(feature.title)}><Play fill="currentColor" /> Preview</button></div>
        <div className="hero-pagination" aria-label="Featured packs">{features.map((item, index) => <button type="button" key={item.id} onClick={() => changeFeature(index)} aria-label={`Show ${item.title}`} aria-current={index === active ? "true" : undefined}><span style={{ width: index === active ? "100%" : "0%" }} /></button>)}</div>
      </div>
      <span className="hero-caption">A better library for your next edit</span>
    </section>

    <div className="content-shell">
      <section className="content-section reveal-on-scroll" id="trending">
        <SectionHeading title="Trending this week" />
        <div className="filter-rail" aria-label="Filter packs">{filters.map(filter => <button key={filter} type="button" className={activeFilter === filter ? "filter-chip is-active" : "filter-chip"} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div>
        <div className="poster-grid">{visiblePacks.map(pack => <PackCard key={pack.title} pack={pack} onPreview={openPack} />)}</div>
      </section>

      <section className="content-section reveal-on-scroll" id="new">
        <SectionHeading title="New this week" action="See all" />
        <div className="poster-rail">{fresh.map(item => <PackCard key={item.title} pack={item} freshCard onPreview={openPack} />)}</div>
      </section>

      <section className="content-section reveal-on-scroll" id="categories">
        <SectionHeading title="Browse by category" />
        <div className="category-grid">{categories.map(category => <a className="category-card" href="#trending" key={category.title} onClick={() => setActiveFilter(category.title)} style={{ "--category-image": `url(${imageUrl(category.image, 900)})` } as React.CSSProperties}><span className="category-copy"><strong>{category.title}</strong><small>{category.count}</small></span><ArrowRight className="category-arrow" /></a>)}</div>
      </section>

      <section className="store-banner glass-panel reveal-on-scroll" id="store"><div><span className="eyebrow">FOR INDEPENDENT CREATORS</span><h2>Start your own pack store</h2><p>Share your edits, grow your audience, and earn from the work you love.</p></div><button className="button button-primary" onClick={() => setRequestOpen(true)}>Learn more <ArrowRight /></button></section>
    </div>

    <footer className="site-footer"><div className="footer-main"><a href="#top" className="brand">editpacks<span>.</span></a><p>Good edits start with great source material.</p><nav aria-label="Footer links"><a href="#trending">Browse packs</a><a href="#categories">Collections</a><a href="#store">For creators</a><a href="#store">Support</a></nav></div><div className="footer-bottom"><span>© 2026 EditPacks</span><span>Made for the edit.</span></div></footer>

    {searchOpen && <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setSearchOpen(false) }}><section className="search-dialog glass-panel" role="dialog" aria-modal="true" aria-label="Search scenepacks"><div className="search-dialog-head"><Search /><input autoFocus placeholder="Search packs, titles, collections..." onChange={event => { const query = event.target.value.toLowerCase(); document.querySelectorAll<HTMLElement>(".search-result").forEach(result => { result.hidden = !result.textContent?.toLowerCase().includes(query) }) }} /><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button></div><div className="search-result-list">{searchResults.map(item => <button className="search-result" key={item.title} onClick={() => { setSearchOpen(false); openPack(item.title) }}><span>{item.title}</span><ArrowRight /></button>)}</div></section></div>}
    {requestOpen && <RequestDialog onClose={() => setRequestOpen(false)} />}
    {preview && <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setPreview(null) }}><section className="preview-dialog glass-panel" role="dialog" aria-modal="true" aria-labelledby="preview-title"><button className="icon-button dialog-close" onClick={() => setPreview(null)} aria-label="Close preview"><X /></button><img src={imageUrl(preview.image, 1100)} alt={`${preview.title} pack artwork`} /><div className="preview-dialog-copy"><span className="eyebrow">{preview.category} <i /> SCENEPACK</span><h2 id="preview-title">{preview.title}</h2><p>{preview.packs} <span>·</span> {preview.downloads} downloads</p><a className="button button-primary" href="#trending" onClick={() => setPreview(null)}>Explore pack <ArrowRight /></a></div></section></div>}
  </main>
}
