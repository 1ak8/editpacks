"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { ArrowDownToLine, ArrowRight, Check, Download, Menu, Pause, Play, Search, ShieldCheck, Sparkles, UserRound, Volume2, X } from "lucide-react"
import { FeaturedFrameCarousel } from "./featured-frame-carousel"

const features = [
  { id: "01", title: "JUJUTSU KAISEN", subtitle: "SHIBUYA INCIDENT", type: "ANIME // MASTER VAULT", year: "2024 MASTER", cuts: "184 CUTS", downloads: "142K DL", spec: "4K 60FPS · PRORES", cast: "SATORU GOJO / MAKI / TOJI FUSHIGURO", image: "/jjk-cinematic.png", palette: "#64d7e8", code: "JJK—SHB" },
  { id: "02", title: "SPIDER-MAN", subtitle: "ACROSS THE SPIDER-VERSE", type: "MARVEL // ANIMATION", year: "2023 MASTER", cuts: "212 CUTS", downloads: "116K DL", spec: "4K 60FPS · PRORES", cast: "MILES MORALES / GWEN STACY / MIGUEL O'HARA", image: "/spiderman-poster.jpg", palette: "#f05274", code: "SPV—04" },
  { id: "03", title: "ATTACK ON TITAN", subtitle: "THE FINAL SEASON", type: "ANIME // FINAL SEASON", year: "2024 MASTER", cuts: "156 CUTS", downloads: "79K DL", spec: "4K 60FPS · PRORES", cast: "EREN YEAGER / MIKASA ACKERMAN / LEVI", image: "/attack-on-titan.png", palette: "#e8a653", code: "AOT—FS" },
  { id: "04", title: "DUNE: PART TWO", subtitle: "THE DESERT AWAKENS", type: "SCI-FI // CINEMA", year: "2024 MASTER", cuts: "96 CUTS", downloads: "88K DL", spec: "IMAX 70MM · PRORES", cast: "PAUL ATREIDES / CHANI / FEYD-RAUTHA", image: "/dune-part-two.png", palette: "#f1ab50", code: "DUN—02" },
  { id: "05", title: "GRAND THEFT AUTO VI", subtitle: "4K 60FPS · PRORES", type: "GAMING // OPEN WORLD", year: "VAULT MASTER", cuts: "184 CUTS", downloads: "1.3K DL", spec: "4K 60FPS · PRORES", cast: "16 PACKS / 18M 42S", image: "/gta6-poster.jpg", palette: "#d7ad6c", code: "GTA—VI" },
  { id: "06", title: "NARUTO VS LUFFY", subtitle: "4K 60FPS · PRORES", type: "ANIME // CROSSOVER", year: "VAULT MASTER", cuts: "64 CUTS", downloads: "42 DL", spec: "4K 60FPS · PRORES", cast: "2 PACKS / 12M 10S", image: "/naruto-vs-luffy.png", palette: "#f08b51", code: "NAR—LFY" },
  { id: "07", title: "THE BODY", subtitle: "4K DCI · PRORES", type: "CINEMA // FEATURE", year: "VAULT MASTER", cuts: "88 CUTS", downloads: "13K DL", spec: "4K DCI · PRORES", cast: "17 PACKS / 15M 30S", image: "/the-body.png", palette: "#d37a8c", code: "BODY—01" },
  { id: "08", title: "NARUTO SHIPPUDEN", subtitle: "4K HDR · PRORES", type: "ANIME // SERIES", year: "VAULT MASTER", cuts: "176 CUTS", downloads: "165K DL", spec: "4K HDR · PRORES", cast: "112 PACKS / 21M 10S", image: "/naruto-shippuden.png", palette: "#e17a47", code: "NAR—SHP" },
  { id: "09", title: "DEATH NOTE / THE BATMAN", subtitle: "4K DCI · PRORES", type: "CINEMA // DOUBLE FEATURE", year: "VAULT MASTER", cuts: "88 CUTS", downloads: "40K DL", spec: "4K DCI · PRORES", cast: "31 PACKS / 11M 52S", image: "/death-note-batman.png", palette: "#b75c72", code: "DN—BAT" },
  { id: "10", title: "ARCANE: SEASON TWO", subtitle: "4K HDR", type: "SERIES // ANIMATION", year: "VAULT MASTER", cuts: "132 CUTS", downloads: "54K DL", spec: "4K HDR", cast: "132 PACKS / 20M 04S", image: "/arcane-city.png", palette: "#77c5c0", code: "ARC—02" },
]

const trending = [
  { title: "Grand Theft Auto VI", downloads: "1.3k", packs: "16 packs", format: "4K 60FPS · PRORES", duration: "18m 42s", cuts: "184 CUTS", image: "/gta6-poster.jpg", category: "Gaming", isNew: true },
  { title: "Spider-Man: Across The Spider-Verse", downloads: "116k", packs: "212 packs", format: "4K 60FPS · PRORES", duration: "24m 16s", cuts: "212 CUTS", image: "/spiderman-poster.jpg", category: "Cinema", isNew: true, titleTreatment: "spiderverse" },
  { title: "Naruto vs Luffy", downloads: "42", packs: "2 packs", format: "4K 60FPS · PRORES", duration: "12m 10s", cuts: "64 CUTS", image: "/naruto-vs-luffy.png", category: "Anime", isNew: true },
  { title: "The Body", downloads: "13k", packs: "17 packs", format: "4K DCI · PRORES", duration: "15m 30s", cuts: "88 CUTS", image: "/the-body.png", category: "Cinema" },
  { title: "Jujutsu Kaisen", downloads: "86k", packs: "130 packs", format: "4K 60FPS · PRORES", duration: "24m 16s", cuts: "212 CUTS", image: "/jjk-cinematic.png", category: "Anime", remake: true, isNew: true, remasterProgress: 78 },
  { title: "Naruto Shippuden", downloads: "165k", packs: "112 packs", format: "4K HDR · PRORES", duration: "21m 10s", cuts: "176 CUTS", image: "/naruto-shippuden.png", category: "Anime", isNew: true },
  { title: "Attack on Titan", downloads: "46k", packs: "71 packs", format: "4K 60FPS · PRORES", duration: "16m 30s", cuts: "156 CUTS", image: "/attack-on-titan.png", category: "Anime", isNew: true },
  { title: "Death Note / The Batman", downloads: "40k", packs: "31 packs", format: "4K DCI · PRORES", duration: "11m 52s", cuts: "88 CUTS", image: "/death-note-batman.png", category: "Cinema", remake: true },
  { title: "Dune: Part Two", downloads: "58k", packs: "96 packs", format: "IMAX 70MM", duration: "14m 22s", cuts: "96 CUTS", image: "/dune-part-two.png", category: "Cinema", isNew: true },
  { title: "Arcane: Season Two", downloads: "54k", packs: "132 packs", format: "4K HDR", duration: "20m 04s", cuts: "132 CUTS", image: "/arcane-city.png", category: "Series", remake: true, remasterProgress: 42, titleTreatment: "arcane" },
]

const fresh = [
  { title: "THE INCREDIBLES", studio: "PIXAR // 4K HDR", image: "/incredibles-family.png", number: "01", tags: ["New", "Animation"] },
  { title: "CHAINSAW MAN: REZE ARC", studio: "MAPPA STUDIOS", image: "/chainsaw-reze.png", number: "02", tags: ["New", "Anime"] },
  { title: "ACROSS THE SPIDER-VERSE", studio: "SONY 4K // 10-BIT", image: "/spiderman-poster.jpg", number: "03", tags: ["New", "Animation"] },
  { title: "IRON MAN", studio: "MARVEL // IMAX", image: "/iron-man.png", number: "04", tags: ["New", "Marvel"] },
  { title: "THE BATMAN", studio: "IMAX 70MM // 4K", image: "/batman-noir.png", number: "05", tags: ["New", "DC"] },
  { title: "INTERSTELLAR", studio: "PARAMOUNT // IMAX", image: "photo-1519608487953-e999c86e7455", number: "06", tags: ["Cinema", "Sci-Fi"] },
  { title: "ARCANE: SEASON TWO", studio: "RIOT // 4K HDR", image: "/arcane-city.png", number: "07", tags: ["Series", "Animation"] },
  { title: "DEATH NOTE", studio: "Madhouse // 4K", image: "/death-note-batman.png", number: "08", tags: ["Anime", "Thriller"] },
  { title: "DUNE: PART TWO", studio: "WARNER // IMAX 70MM", image: "/dune-part-two.png", number: "09", tags: ["Cinema", "Sci-Fi"] },
  { title: "JUJUTSU KAISEN", studio: "MAPPA // 4K HDR", image: "/jjk-cinematic.png", number: "10", tags: ["Anime", "Action"] },
]

const series = [
  { title: "THE MENTALIST", studio: "CBS // 35MM GRAIN", image: "photo-1500530855697-b586d89ba3ee", count: "22 PACKS" },
  { title: "RICK AND MORTY", studio: "ADULT SWIM // 4K", image: "photo-1518837695005-2083093ee35b", count: "45 PACKS" },
  { title: "EUPHORIA", studio: "HBO // KODAK VISION3", image: "photo-1519608487953-e999c86e7455", count: "38 PACKS" },
  { title: "THE BOYS", studio: "AMAZON // HDR", image: "photo-1480714378408-67cf0d13bc1b", count: "31 PACKS" },
  { title: "VAMPIRE DIARIES", studio: "CW // 35MM GRAIN", image: "photo-1470252649378-9c29740c9fa8", count: "54 PACKS" },
  { title: "BREAKING BAD", studio: "AMC // 4K MASTER", image: "photo-1500534623283-312aade485b7", count: "62 PACKS" },
  { title: "STRANGER THINGS", studio: "NETFLIX // DOLBY VISION", image: "photo-1534796636912-3b95b3ab5986", count: "48 PACKS" },
  { title: "SUCCESSION", studio: "HBO // 35MM GRAIN", image: "photo-1493246507139-91e8fad9978e", count: "36 PACKS" },
  { title: "TRUE DETECTIVE", studio: "HBO // CINEMA GRADE", image: "photo-1500530855697-b586d89ba3ee", count: "29 PACKS" },
  { title: "BETTER CALL SAUL", studio: "AMC // 4K HDR", image: "photo-1518709268805-4e9042af9f23", count: "41 PACKS" },
]

const waveform = [10, 18, 14, 25, 19, 35, 23, 15, 29, 42, 31, 19, 24, 36, 18, 12, 26, 39, 28, 16, 32, 22, 12, 29, 44, 23, 17, 33, 21, 11, 25, 37, 19, 29, 14, 22, 35, 18, 12, 27, 40, 24, 16, 31, 20, 13, 28, 36]
const FEATURE_DURATION_MS = 5500

function imageUrl(id: string, width = 660) {
  if (id.startsWith("/") || id.startsWith("http")) return id
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
}

function SectionHeading({ index, title, link = "Explore full leaderboard" }: { index: string; title: string; link?: string }) {
  return <div className="vault-section-heading"><div className="section-title-lockup"><span className="section-index">{index}</span><span className="section-rule" /><h2>{title}</h2></div><a href="#vault">{link} <ArrowRight size={14} /></a></div>
}

function CartridgeRail({ onPreview, category, onCategoryChange }: { onPreview: (title: string) => void; category: string; onCategoryChange: (category: string) => void }) {
  const filters = [{ label: "All", value: "All" }, { label: "Anime", value: "Anime" }, { label: "Movies", value: "Cinema" }, { label: "Series", value: "Series" }, { label: "K-Pop", value: "K-Pop" }, { label: "Gaming", value: "Gaming" }]
  const packs = category === "All" ? trending : trending.filter(pack => pack.category === category)

  const posterRailRef = useRef<HTMLDivElement>(null)
  const scrollRail = (direction: -1 | 1) => {
    const rail = posterRailRef.current
    const firstCard = rail?.querySelector<HTMLElement>(".poster-item")
    if (!rail || !firstCard) return
    rail.scrollBy({ left: direction * (firstCard.offsetWidth + 22) * 2, behavior: "smooth" })
  }

  return <section className="vault-section trending-section" id="trending">
    <div className="trending-header-bar">
      <div className="trending-header-title">
        <span className="trending-pill" />
        <h2>Popular Scenepacks</h2>
      </div>
      <a href="#trending" className="trending-view-all">View all <ArrowRight size={14} /></a>
    </div>
    <div className="poster-rail">
      <div className="poster-grid" ref={posterRailRef} role="list" aria-label="Popular scenepacks">{packs.map((pack, index) => <article className="poster-item" key={pack.title} role="listitem">
        <span className="poster-rank-number" aria-hidden="true">{index + 1}</span>
        <div className="poster-frame">
          <button type="button" className="poster-card" data-title-treatment={"titleTreatment" in pack ? pack.titleTreatment : undefined} onClick={() => onPreview(pack.title)} style={{ backgroundImage: `url(${imageUrl(pack.image, 760)})` }} aria-label={`Preview ${pack.title} scenepack`}>
            {pack.isNew && <span className="poster-badge">NEW</span>}
            <span className="poster-copy"><span className="poster-category">{pack.category} / SCENEPACK</span><strong>{pack.title}</strong><span className="poster-format">{pack.format}</span><span className="poster-stats"><Download size={13} /> {pack.downloads} downloads</span><span className="poster-pack-count">{pack.packs} <i>·</i> {pack.duration}</span>
              {pack.remake && <><span className="poster-remaster-label">REMASTERING</span><span className="poster-progress"><i style={{ width: `${pack.remasterProgress}%` }} /></span></>}
            </span><span className="poster-tags" aria-label="Scenepack tags">{pack.isNew && <span>New</span>}<span>{pack.category === "Gaming" ? "Games" : pack.category}</span></span>
          </button>
        </div>
        <div className={pack.titleTreatment === "arcane" ? "poster-caption poster-caption-arcane" : "poster-caption"}>
          <strong className="poster-caption-title">{pack.title}</strong>
          <span className="poster-caption-meta">
            {pack.remake && <span className="poster-caption-status">Remaking</span>}
            <span>{pack.packs.toLowerCase()}</span>
            <i>·</i>
            <span>{pack.downloads} downloads</span>
          </span>
        </div>
      </article>)}</div>
      <button type="button" className="poster-rail-control poster-rail-next" aria-label="Show more scenepacks" onClick={() => scrollRail(1)}><ArrowRight size={18} /></button>
    </div>
  </section>
}

function DropGrid({ onPreview }: { onPreview: (title: string) => void }) {
  return <section className="vault-section" id="drops"><SectionHeading index="02" title="Fresh drops this week" link="All new arrivals" />
    <div className="drop-grid" role="region" aria-label="Fresh drops posters, horizontally scrollable" tabIndex={0}>{fresh.map(item => <button className="drop-tile" key={item.title} onClick={() => onPreview(item.title)}>
      <span className="drop-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(8,10,12,.18) 0%, transparent 28%, rgba(8,10,12,.92) 100%), url(${imageUrl(item.image)})` }}><span className="drop-number">{item.number}</span><span className="drop-hover-details"><span className="drop-hover-copy"><strong>{item.title}</strong><small>{item.studio}</small></span></span><span className="drop-tags" aria-label="Scenepack tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</span></span>
      <span className="drop-caption"><span><b>{item.title}</b><small>{item.studio}</small></span><ArrowRight size={15} /></span>
    </button>)}</div>
  </section>
}

function SeriesRail() {
  return <section className="vault-section" id="series"><SectionHeading index="04" title="Series stream vault" link="Browse the archive" />
    <div className="series-rail" role="region" aria-label="Series stream posters, horizontally scrollable" tabIndex={0}>{series.map((item, i) => <a className="series-tile" href="#vault" key={item.title} style={{ backgroundImage: `linear-gradient(180deg, rgba(4,6,9,.08), rgba(4,6,9,.9)), url(${imageUrl(item.image)})` }}><span className="series-number">0{i + 1} / SERIES</span><span className="series-info"><small>{item.studio}</small><b>{item.title}</b><span>{item.count} <ArrowRight size={12} /></span></span></a>)}</div>
  </section>
}

function CategoryBrowse() {
  const categories = [
    { label: "Anime", value: "Anime", image: "photo-1578632767115-351597cf2477", descriptor: "Worlds beyond the frame" },
    { label: "Cinema", value: "Cinema", image: "photo-1509316975850-ff9c5deb0cd9", descriptor: "The big-screen cut" },
    { label: "Series", value: "Series", image: "photo-1480714378408-67cf0d13bc1b", descriptor: "Stories in every frame" },
    { label: "K-Pop", value: "K-Pop", image: "photo-1518837695005-2083093ee35b", descriptor: "Stage lights, sharp edits" },
    { label: "Gaming", value: "Gaming", image: "photo-1519608487953-e999c86e7455", descriptor: "Built for the next level" },
  ]

  return <section className="category-browse" id="categories" aria-labelledby="category-browse-title">
    <div className="category-heading"><h2 id="category-browse-title">Browse by category</h2></div>
    <div className="category-grid">{categories.map((category, index) => {
      const featured = index === 0
      return <div className={`category-card${featured ? " category-card-featured" : ""}`} key={category.value} style={{ backgroundImage: `url(${imageUrl(category.image, 760)})` }}>
        <span className="category-card-top" aria-hidden="true"><ArrowRight size={17} /></span>
        <span className="category-card-copy"><span className="category-card-descriptor">{category.descriptor}</span><strong>{category.label}</strong></span>
      </div>
    })}</div>
  </section>
}

function RequestDialog({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="request-dialog" role="dialog" aria-modal="true" aria-labelledby="request-title">
      <button className="dialog-close" onClick={onClose} aria-label="Close request form"><X size={17} /></button>
      {sent ? <div className="request-success"><span><Check size={22} /></span><p>REQUEST LOGGED // #VP-084</p><h2>We&apos;ll source the frames.</h2><button className="ingest-button" onClick={onClose}>BACK TO THE VAULT <ArrowRight size={14} /></button></div> : <><span className="dialog-kicker">COMMUNITY INGEST // 08</span><h2 id="request-title">What are we<br /><em>cutting next?</em></h2><p>Tell the vault crew what title, scene or audio stem your next edit needs.</p><label>PACK OR TITLE<input required placeholder="e.g. Arcane season 2" /></label><label>YOUR DISCORD HANDLE<input placeholder="@creator" /></label><label>WHAT DO YOU NEED?<textarea placeholder="Specific scenes, characters, audio stems..." rows={3} /></label><button className="ingest-button request-submit" onClick={() => setSent(true)}>SUBMIT TO THE VAULT <ArrowRight size={14} /></button><span className="dialog-footnote">Requests are reviewed by the community team.</span></>}
    </section>
  </div>
}

function SearchDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const results = useMemo(() => [...trending.map(item => item.title), ...fresh.map(item => item.title), ...series.map(item => item.title)].filter(title => title.toLowerCase().includes(query.toLowerCase())).slice(0, 6), [query])
  return <div className="modal-backdrop search-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="search-dialog" role="dialog" aria-modal="true" aria-label="Quick ingest search"><div className="search-field"><Search size={18} /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search titles, scenes, audio stems..." /><button onClick={onClose} aria-label="Close search"><kbd>ESC</kbd></button></div><div className="search-results"><span className="dialog-kicker">{query ? "MATCHING VAULT RECORDS" : "POPULAR IN THE VAULT"}</span>{results.map((title, i) => <button key={title} onClick={onClose}><span className="result-index">0{i + 1}</span><span>{title}</span><ArrowRight size={14} /></button>)}{results.length === 0 && <p className="no-results">NO MATCHES // TRY ANOTHER SEARCH TERM</p>}</div><div className="search-shortcuts"><span><kbd>↑</kbd><kbd>↓</kbd> TO NAVIGATE</span><span><kbd>↵</kbd> TO OPEN</span><span><kbd>ESC</kbd> TO CLOSE</span></div></section></div>
}

function FeaturedHeading({ feature }: { feature: (typeof features)[number] }) {
  const titleRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const title = titleRef.current
    const heading = title?.parentElement
    if (!title || !heading) return

    let disposed = false
    const fitTitle = () => {
      if (disposed) return
      title.style.removeProperty("font-size")
      const baseFontSize = Number.parseFloat(window.getComputedStyle(title).fontSize)
      const titleWidth = title.getBoundingClientRect().width
      const availableWidth = heading.clientWidth - 2
      if (baseFontSize > 0 && titleWidth > availableWidth && availableWidth > 0) {
        title.style.fontSize = `${(baseFontSize * availableWidth) / titleWidth}px`
      }
    }

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fitTitle)
    observer?.observe(heading)
    window.addEventListener("resize", fitTitle)
    fitTitle()
    void document.fonts.ready.then(fitTitle)

    return () => {
      disposed = true
      observer?.disconnect()
      window.removeEventListener("resize", fitTitle)
      title.style.removeProperty("font-size")
    }
  }, [feature.id, feature.title])

  return <h1 id="feature-title"><span ref={titleRef} className={`headline-title feature-title-fade title-style-${feature.id}`}>{feature.title}<span className="headline-slash"> //</span></span><span className="headline-sub feature-title-fade">{feature.subtitle}</span></h1>
}

export function EditorMarketplace() {
  const [active, setActive] = useState(2)
  const [packCategory, setPackCategory] = useState("All")
  const [requestOpen, setRequestOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const feature = features[active]

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timeout = window.setTimeout(() => {
      setActive((active + 1) % features.length)
      setPreviewOpen(false)
    }, FEATURE_DURATION_MS)
    return () => window.clearTimeout(timeout)
  }, [active])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearchOpen(true) }
      if (event.key === "Escape") { setSearchOpen(false); setRequestOpen(false); setPreviewOpen(false) }
      if (event.code === "Space" && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) { event.preventDefault(); setPreviewOpen(value => !value) }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return <main className="vault-app" id="top">
    <div className="grain-overlay" aria-hidden="true" />
    <header className="command-dock">
      <div className="dock-brand">
        <a href="#top" className="dock-logo" aria-label="EditPacks home"><span>EDITPACKS</span></a>
      </div>
      <nav id="primary-navigation" className={`dock-nav ${menuOpen ? "dock-nav-open" : ""}`} aria-label="Main navigation">
        <a className="dock-active" href="#top" aria-current="page" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#trending" onClick={() => setMenuOpen(false)}>Explore</a>
        <a href="#drops" onClick={() => setMenuOpen(false)}>Series</a>
        <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
        <a href="#trending" onClick={() => setMenuOpen(false)}>New drops</a>
      </nav>
      <div className="dock-actions" aria-label="Quick links">
        <button className="dock-icon-button" onClick={() => { setMenuOpen(false); setSearchOpen(true) }} aria-label="Search packs"><Search size={18} /></button>
        <a className="dock-icon-button dock-account-link" href="#pro" aria-label="Member access"><UserRound size={18} /></a>
        <a className="membership-link" href="#pro"><span className="pro-access-label">PRO ACCESS</span><Sparkles size={15} aria-hidden="true" /></a>
      </div>
      <button className="dock-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
    </header>

    <section className="studio-hero" aria-labelledby="feature-title">
      <div className="hero-backdrop" aria-hidden="true"><div key={feature.id} className="hero-backdrop-image" style={{ backgroundImage: `url(${feature.image})` }} /></div>
      <div className="hero-content-grid">
        <div className="hero-editorial">
          <div className="telemetry">{feature.type.split(" // ")[0]}</div>
          <FeaturedHeading feature={feature} />
          <p className="cast-list">{feature.cast.split(" / ").join(" · ")}</p>
          <div className="hero-controls"><a href="#trending" className="ingest-button"><span>Explore scenepacks</span><ArrowRight size={17} /></a><button className="preview-button" onClick={() => setPreviewOpen(true)}><Play size={15} /> Preview scenes</button></div>
        </div>
        <FeaturedFrameCarousel
          frames={features.map(item => ({ ...item, image: imageUrl(item.image, 760) }))}
          activeIndex={active}
          durationMs={FEATURE_DURATION_MS}
          isPreviewing={previewOpen}
          onSelect={index => { setActive(index); setPreviewOpen(false) }}
        />
      </div>
    </section>

    <div className="vault-content" id="vault">
      <CartridgeRail category={packCategory} onCategoryChange={setPackCategory} onPreview={title => { const matchingFeature = features.findIndex(item => title.toLowerCase().startsWith(item.title.slice(0, 7).toLowerCase())); setActive(matchingFeature >= 0 ? matchingFeature : 0); setPreviewOpen(false) }} />
      <section className="creator-drop" id="store">
        <div className="drop-art" style={{ backgroundImage: `url('/hero-anime.png')` }}>
          <div className="drop-art-overlay" />
          <span className="drop-number-badge">DROP 08</span>
        </div>
        <div className="creator-copy">
          <div className="creator-badge-row">
            <span className="creator-tag">EXCLUSIVE DROP</span>
            <span className="creator-verified"><ShieldCheck size={14} /> VERIFIED CREATOR</span>
          </div>
          <h2>TWZZUY: HARDSTYLE VELOCITY</h2>
          <p className="creator-bio">Signature transitions, velocity curves, and dialogue stems crafted for modern edits.</p>
          <div className="stem-player" id="sound">
            <button className="stem-play" onClick={() => setAudioPlaying(!audioPlaying)} aria-label={audioPlaying ? "Pause audio preview" : "Play audio preview"}>
              {audioPlaying ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
            </button>
            <span className="stem-name">AUDIO PREVIEW <small>00:18 / 00:42</small></span>
            <span className={`stem-wave ${audioPlaying ? "stem-animating" : ""}`}>
              {waveform.slice(0, 18).map((height, i) => <i key={i} style={{ height: `${Math.max(6, height * 0.7)}px`, animationDelay: `${i * 18}ms` }} />)}
            </span>
          </div>
        </div>
        <div className="creator-buy">
          <a href="#store" className="creator-buy-btn">
            <span>GET PACK — $15</span>
            <ArrowRight size={15} />
          </a>
          <span className="creator-buy-meta">84.8K Downloads · Lifetime Access</span>
        </div>
      </section>

      <DropGrid onPreview={title => { setPreviewOpen(false); const found = features.findIndex(item => title.includes(item.title.slice(0, 8))); if (found >= 0) setActive(found) }} />
      <SeriesRail />
      <CategoryBrowse />
      <section className="editor-community" id="community" aria-label="Vault catalog totals">
        <div className="editor-community-index"><p><strong>833</strong> titles <i /> <strong>5,066</strong> packs</p><a href="#trending">Every title <ArrowRight size={16} /></a></div>
      </section>
    </div>

    <footer className="vault-footer"><div className="footer-top"><a className="vault-wordmark" href="#top"><span>EDITPACKS</span></a><span className="footer-manifesto">A TOOLKIT FOR THE FRAME-OBSESSED.</span></div><div className="footer-columns"><div><span className="footer-label">THE VAULT</span><a href="#trending">Browse collections</a><a href="#drops">Fresh drops</a><a href="#store">Creator store</a><a href="#categories">Browse by category</a></div><div><span className="footer-label">STUDIO</span><a href="#community">Community / Discord</a><a href="#api">API status</a><a href="#request" onClick={event => { event.preventDefault(); setRequestOpen(true) }}>Request a scenepack</a></div><div><span className="footer-label">LEGAL / SUPPORT</span><a href="#privacy">Privacy policy</a><a href="#terms">Terms of use</a><a href="#contact">Contact the studio</a></div><div className="footer-note"><span>BUILT FOR THE CUT.</span><p>Independent tools for a more considered edit. Handle every source with care.</p></div></div><div className="footer-bottom"><span>© 2026 EDITPACKS — ALL RIGHTS RESERVED</span></div></footer>

    {requestOpen && <RequestDialog onClose={() => setRequestOpen(false)} />}
    {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
  </main>
}
