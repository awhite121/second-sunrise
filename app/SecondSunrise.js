"use client";

import { useState, useEffect, useRef } from "react";

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.06 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `all 0.8s ease ${delay}s` }}>{children}</div>;
}

const rust = "#C4753B";
const bone = "#FAF7F2";
const parchment = "#F0EBE1";
const ink = "#2C2824";
const sage = "#8A9A7E";
const warm = "#A8948A";
const serif = "'Playfair Display', Georgia, serif";
const body = "'DM Sans', sans-serif";

const PRODUCTS = [
  // Shirts
  { name: "The Essential Tee", variant: "Clean White / Rust", price: "$38", img: "/products/tee-white-essential.png", tag: "Essential", category: "Shirts" },
  { name: "The Washed Essential Tee", variant: "Washed Black / Rust", price: "$40", img: "/products/tee-washed-black-essential.png", tag: "Essential", category: "Shirts" },
  { name: "The Horizon Tee", variant: "Washed Black / Front + Back", price: "$44", img: "/products/tee-washed-black-surf-back.png", tag: "Graphic", category: "Shirts" },
  { name: "The Daybreak Tee", variant: "Clean White / Front + Back", price: "$42", img: "/products/tee-white-surf-back.png", tag: "Graphic", category: "Shirts" },
  { name: "The Rust Essential Tee", variant: "Rust / Chest Logo", price: "$40", img: "/products/tee-rust-essential.png", tag: "New", category: "Shirts" },

  // Hats
  { name: "The Midnight Rope Hat", variant: "Black / Rust Rope", price: "$42", img: "/products/hat-black-sunrise-rope.png", tag: "Signature", category: "Hats" },
  { name: "The Daybreak Rope Hat", variant: "White / Rust Rope", price: "$42", img: "/products/hat-white-sunrise-rope.png", tag: "Signature", category: "Hats" },
  { name: "The Corduroy Sunrise Hat", variant: "Cream / Burnt Orange", price: "$44", img: "/products/hat-cream-rust-corduroy.png", tag: "New", category: "Hats" },
  { name: "The Navy Rope Hat", variant: "Midnight Navy / Rust Rope", price: "$44", img: "/products/hat-navy-rope.png", tag: "New", category: "Hats" },

  // Sweats
  { name: "The Reborn Crewneck", variant: "Washed Black / Front + Back", price: "$74", img: "/products/crew-black-reborn-back.png", tag: "Statement", category: "Sweats" },
  { name: "The Rust Reborn Crewneck", variant: "Burnt Orange / Front + Back", price: "$74", img: "/products/crew-rust-reborn-back.png", tag: "Statement", category: "Sweats" },
  { name: "The White Reborn Crewneck", variant: "White / Front + Back", price: "$72", img: "/products/crew-white-reborn-back.png", tag: "Reborn Daily", category: "Sweats" },
  { name: "The Rust Essential Crew", variant: "Burnt Orange / Small Chest", price: "$68", img: "/products/crew-rust-essential.png", tag: "Essential", category: "Sweats" },
  { name: "The Midnight Essential Crew", variant: "Black / Small Chest", price: "$68", img: "/products/crew-black-essential.png", tag: "Essential", category: "Sweats" },
  { name: "The Cream Essential Crew", variant: "Warm Cream / Small Chest", price: "$68", img: "/products/crew-cream-essential.png", tag: "Essential", category: "Sweats" },
  { name: "The Navy Essential Crew", variant: "Midnight Navy / Small Chest", price: "$68", img: "/products/crew-navy-essential.png", tag: "New", category: "Sweats" },
  { name: "The Caramel Essential Crew", variant: "Caramel / Small Chest", price: "$68", img: "/products/crew-caramel-essential.png", tag: "New", category: "Sweats" },

  // Bottoms
  { name: "The Sunrise Short", variant: "Cream / Rust Logo", price: "$52", img: "/products/shorts-cream-essential.png", tag: "New", category: "Bottoms" },
  { name: "The Sunrise Short", variant: "White / Rust Logo", price: "$52", img: "/products/shorts-white-essential.png", tag: "New", category: "Bottoms" },
];

const MANTRAS = [
  "Resilience over perfection",
  "Every sunrise is a second chance",
  "Wear the truth",
  "Back to Sunrise",
  "The comeback is quiet",
  "Discipline is freedom",
  "Rise again. Live fully.",
  "Alignment over escape",
];

export default function SecondSunrise() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ fontFamily: body, background: bone, color: ink, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(196,117,59,0.2); }
        a { text-decoration: none; color: inherit; }
        button { font-family: 'DM Sans', serif; }
        img { display: block; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,247,242,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${parchment}` : "none",
        height: "70px", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 40px", transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: "1100px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ fontFamily: serif, fontSize: "22px", fontWeight: 500, color: ink, letterSpacing: "2px" }}>SECOND SUNRISE</span>
          </button>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {[{ id: "home", label: "Home" }, { id: "shop", label: "Shop" }, { id: "story", label: "Our Story" }].map(l => (
              <button key={l.id} onClick={() => setPage(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: page === l.id ? rust : warm,
                fontSize: "16px", fontWeight: 500, fontFamily: body, letterSpacing: "1px",
                transition: "color 0.3s",
              }}>{l.label}</button>
            ))}
            <button onClick={() => setPage("shop")} style={{
              background: ink, color: bone, border: "none",
              padding: "10px 24px", fontSize: "14px", fontWeight: 500,
              fontFamily: body, letterSpacing: "1px", cursor: "pointer",
            }}>Join Waitlist</button>
          </div>
        </div>
      </nav>

      {page === "shop" ? <ShopPage /> : page === "story" ? <StoryPage setPage={setPage} /> : (
        <>
          {/* ── HERO ── */}
          <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(160deg, ${parchment} 0%, ${bone} 40%, #F5EDE0 100%)`, position: "relative", overflow: "hidden", padding: "100px 40px 80px" }}>
            <div style={{ position: "absolute", top: "15%", right: "10%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,117,59,0.06), transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(138,154,126,0.05), transparent 70%)" }} />

            <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <div>
                <Reveal>
                  <p style={{ fontFamily: body, fontSize: "18px", color: rust, letterSpacing: "1px", marginBottom: "24px" }}>A brand for the reborn.</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 style={{ fontFamily: serif, fontSize: "clamp(48px, 6vw, 76px)", fontWeight: 500, lineHeight: 1.0, color: ink, marginBottom: "28px",  }}>
                    You&apos;re never<br />too far gone<br />for a <span style={{ color: rust }}>second<br />sunrise.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.2}>
                  <p style={{ fontSize: "20px", lineHeight: 1.7, color: warm, maxWidth: "420px", marginBottom: "36px" }}>
                    Easy, vintage-inspired apparel rooted in healing and second chances. Every piece is built to wear that truth.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <div style={{ display: "flex", gap: "14px" }}>
                    <button onClick={() => setPage("shop")} style={{ background: rust, color: bone, border: "none", padding: "16px 40px", fontSize: "17px", fontWeight: 500, fontFamily: body, letterSpacing: "1px", cursor: "pointer" }}>Shop the Collection</button>
                    <button onClick={() => setPage("story")} style={{ background: "transparent", color: ink, border: `1.5px solid ${ink}`, padding: "16px 40px", fontSize: "17px", fontWeight: 500, fontFamily: body, letterSpacing: "1px", cursor: "pointer" }}>Our Story</button>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {PRODUCTS.slice(0, 4).map((p, i) => (
                    <div key={i} style={{ overflow: "hidden", aspectRatio: "1", background: parchment, borderRadius: "4px" }}>
                      <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── MARQUEE ── */}
          <div style={{ background: ink, padding: "14px 0", overflow: "hidden" }}>
            <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 35s linear infinite" }}>
              {[...MANTRAS, ...MANTRAS, ...MANTRAS, ...MANTRAS].map((m, i) => (
                <span key={i} style={{ fontSize: "14px", fontWeight: 400, fontFamily: body, letterSpacing: "2px", color: "rgba(250,247,242,0.35)", marginRight: "48px" }}>
                  {m} <span style={{ color: rust, margin: "0 16px" }}>&bull;</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── THE MISSION ── */}
          <section style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 40px", textAlign: "center" }}>
            <Reveal>
              <p style={{ fontFamily: body, fontSize: "16px", color: sage, letterSpacing: "2px", marginBottom: "20px" }}>The Mission</p>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, lineHeight: 1.25, color: ink, marginBottom: "28px" }}>
                Second Sunrise is a personal symbol of rebirth &mdash; a daily reminder that no matter how many times you fall, you are always one decision away from starting again.
              </h2>
              <p style={{ fontSize: "19px", lineHeight: 1.8, color: warm, maxWidth: "600px", margin: "0 auto" }}>
                It is not about perfection. It&apos;s about resilience. A brand for people who have made it through the hardest times of their lives and have chosen to rise again. Every. Single. Day.
              </p>
            </Reveal>
          </section>

          {/* ── VALUES ── */}
          <section style={{ background: parchment, padding: "80px 40px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                  {[
                    { word: "Resilience", icon: "\u2600", sub: "over perfection" },
                    { word: "Rebirth", icon: "\u2728", sub: "over dwelling" },
                    { word: "Community", icon: "\u2764", sub: "over isolation" },
                    { word: "Intention", icon: "\u2603", sub: "over impulse" },
                  ].map((v, i) => (
                    <div key={i} style={{
                      background: bone, padding: "36px 24px", textAlign: "center",
                      borderRadius: "4px", transition: "all 0.3s", cursor: "default",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = ink; e.currentTarget.querySelector("h3").style.color = rust; e.currentTarget.querySelector("p").style.color = "rgba(250,247,242,0.5)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = bone; e.currentTarget.querySelector("h3").style.color = ink; e.currentTarget.querySelector("p").style.color = warm; }}>
                      <h3 style={{ fontFamily: serif, fontSize: "22px", fontWeight: 500, color: ink, marginBottom: "6px", transition: "color 0.3s" }}>{v.word}</h3>
                      <p style={{ fontSize: "15px", color: warm, transition: "color 0.3s" }}>{v.sub}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── COLLECTION ── */}
          <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 40px" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
                <div>
                  <p style={{ fontFamily: body, fontSize: "16px", color: sage, letterSpacing: "2px", marginBottom: "8px" }}>The Collection</p>
                  <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, color: ink }}>Wear the truth.</h2>
                </div>
                <button onClick={() => setPage("shop")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: body, fontSize: "17px", color: rust, borderBottom: `1px solid ${rust}`, paddingBottom: "2px" }}>View all &rarr;</button>
              </div>
            </Reveal>
            <div className="product-grid">
              {PRODUCTS.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── LIFESTYLE ── */}
          <section style={{ background: ink, padding: "100px 40px" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
              <Reveal>
                <div>
                  <p style={{ fontFamily: body, fontSize: "16px", color: sage, letterSpacing: "2px", marginBottom: "16px" }}>The Lifestyle</p>
                  <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 500, color: bone, lineHeight: 1.2, marginBottom: "24px" }}>More than clothing.</h2>
                  <p style={{ fontSize: "18px", lineHeight: 1.8, color: "rgba(250,247,242,0.5)", marginBottom: "28px" }}>
                    Second Sunrise is a way of living &mdash; morning routines, mental clarity, physical health, and showing up for yourself every single day. Wake up, enjoy coffee, move your body, learn something, be outside, cook at home, rest, and reset.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {["Morning Ritual", "Move Daily", "Mental Clarity", "Journal", "Be Outside", "Cook at Home", "Create", "Rest & Reset"].map((item, i) => (
                      <span key={i} style={{ fontSize: "13px", color: "rgba(250,247,242,0.4)", background: "rgba(250,247,242,0.05)", border: "1px solid rgba(250,247,242,0.08)", padding: "8px 16px", borderRadius: "2px" }}>{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ overflow: "hidden", borderRadius: "4px" }}>
                  <img src="/products/crew-rust-reborn-back.png" alt="Second Sunrise Reborn Crewneck" style={{ width: "100%", objectFit: "cover" }} />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 40px" }}>
            <Reveal>
              <p style={{ fontFamily: body, fontSize: "16px", color: sage, letterSpacing: "2px", marginBottom: "8px", textAlign: "center" }}>Community</p>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, color: ink, textAlign: "center", marginBottom: "48px" }}>What the sunrise crew is saying.</h2>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {[
                { quote: "I bought the crewneck after the worst year of my life. Every time I put it on, it reminds me I made it through. That is what this brand is.", name: "Jordan M.", loc: "Austin, TX" },
                { quote: "The quality is insane for the price. Heavyweight, vintage fit, feels like it is already broken in. And the message behind it? Even better.", name: "Alex T.", loc: "Denver, CO" },
                { quote: "This is not just merch. It is a movement. Every morning I wake up and choose to rise again. Second Sunrise gets it.", name: "Sam W.", loc: "Nashville, TN" },
              ].map((t, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div style={{ background: parchment, padding: "32px", borderRadius: "4px" }}>
                    <p style={{ fontFamily: body, fontSize: "18px", lineHeight: 1.7, color: ink, marginBottom: "20px" }}>&ldquo;{t.quote}&rdquo;</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: ink }}>{t.name}</p>
                    <p style={{ fontSize: "14px", color: warm }}>{t.loc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── NEWSLETTER ── */}
          <section style={{ background: parchment, padding: "100px 40px", textAlign: "center" }}>
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              <Reveal>
                <p style={{ fontFamily: body, fontSize: "16px", color: sage, letterSpacing: "2px", marginBottom: "16px" }}>The Second Sunrise Dispatch</p>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 500, color: ink, marginBottom: "16px" }}>Join the movement.</h2>
                <p style={{ fontSize: "18px", color: warm, lineHeight: 1.7, marginBottom: "32px" }}>Early access to drops, mantras, lifestyle content, and the full story of why this exists.</p>
                <div style={{ display: "flex", gap: "0" }}>
                  <input type="email" placeholder="your@email.com" style={{
                    flex: 1, padding: "16px 20px", background: bone,
                    border: `1px solid ${parchment}`, borderRight: "none",
                    color: ink, fontSize: "16px", fontFamily: body, outline: "none",
                  }} onFocus={e => e.target.style.borderColor = rust} onBlur={e => e.target.style.borderColor = parchment} />
                  <button style={{ background: rust, color: bone, border: "none", padding: "16px 28px", fontSize: "16px", fontWeight: 500, fontFamily: body, letterSpacing: "1px", cursor: "pointer", whiteSpace: "nowrap" }}>Join Us</button>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: ink, padding: "60px 40px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px" }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: "18px", fontWeight: 500, letterSpacing: "2px", color: bone, marginBottom: "12px" }}>SECOND SUNRISE</p>
            <p style={{ fontSize: "15px", color: "rgba(250,247,242,0.35)", lineHeight: 1.7, maxWidth: "280px" }}>Easy, vintage-inspired apparel rooted in healing and second chances. Every sunrise is a second chance.</p>
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", color: rust, marginBottom: "16px" }}>LINKS</p>
            {["Shop", "Our Story", "Instagram", "Contact"].map(s => (
              <button key={s} onClick={() => { if (s === "Shop") setPage("shop"); if (s === "Our Story") setPage("story"); }} style={{ display: "block", background: "none", border: "none", fontSize: "15px", color: "rgba(250,247,242,0.35)", marginBottom: "8px", cursor: "pointer", fontFamily: body }}>{s}</button>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", color: rust, marginBottom: "16px" }}>MANTRA</p>
            <p style={{ fontFamily: serif, fontSize: "18px", color: "rgba(250,247,242,0.5)", lineHeight: 1.6 }}>&ldquo;Back to Sunrise &mdash; I rise again.&rdquo;</p>
          </div>
        </div>
        <div style={{ maxWidth: "1100px", margin: "28px auto 0", paddingTop: "20px", borderTop: "1px solid rgba(250,247,242,0.06)", display: "flex", justifyContent: "space-between" }}>
          <p style={{ fontSize: "12px", color: "rgba(250,247,242,0.2)" }}>&copy; 2026 Second Sunrise. All rights reserved.</p>
          <p style={{ fontSize: "12px", color: "rgba(250,247,242,0.2)" }}>Website by <span style={{ color: rust }}>Resite</span></p>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div style={{ cursor: "pointer", transition: "all 0.4s", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "none"}>
      {product.tag && <span style={{ position: "absolute", top: "12px", left: "12px", zIndex: 2, fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "#FAF7F2", background: "#2C2824", padding: "5px 14px" }}>{product.tag}</span>}
      <div style={{ width: "100%", aspectRatio: "1", overflow: "hidden", background: "#F0EBE1", borderRadius: "4px", marginBottom: "14px" }}>
        <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"} />
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 500, color: "#2C2824", marginBottom: "4px" }}>{product.name}</h3>
      <p style={{ fontSize: "14px", color: "#A8948A", marginBottom: "4px" }}>{product.variant}</p>
      <p style={{ fontSize: "16px", fontWeight: 600, color: "#C4753B" }}>{product.price}</p>
    </div>
  );
}

function ShopPage() {
  const categories = ["Shirts", "Hats", "Sweats", "Bottoms"];
  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "120px 40px 80px" }}>
      <Reveal>
        <p style={{ fontFamily: "'DM Sans', serif", fontSize: "16px", color: "#8A9A7E", letterSpacing: "2px", marginBottom: "8px", textAlign: "center" }}>The Collection</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 500, color: "#2C2824", textAlign: "center", marginBottom: "12px" }}>Every approved piece. One collection.</h2>
        <p style={{ fontSize: "18px", color: "#A8948A", textAlign: "center", maxWidth: "560px", margin: "0 auto 64px" }}>Simple, cool, lived-in shirts, hats, and sweats in the Second Sunrise palette. These are the complete current concepts.</p>
      </Reveal>
      {categories.map((category, categoryIndex) => {
        const items = PRODUCTS.filter(p => p.category === category);
        return (
          <div key={category} style={{ marginBottom: categoryIndex === categories.length - 1 ? 0 : "84px" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px", borderBottom: "1px solid #E5DED2", paddingBottom: "16px", marginBottom: "28px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 500, color: "#2C2824" }}>{category}</h3>
                <span style={{ fontSize: "14px", color: "#A8948A" }}>{items.length} styles</span>
              </div>
            </Reveal>
            <div className="product-grid">
              {items.map((p, i) => (
                <Reveal key={p.img} delay={i * 0.05}><ProductCard product={p} /></Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function StoryPage({ setPage }) {
  return (
    <section style={{ padding: "120px 40px 80px" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontFamily: "'DM Sans', serif", fontSize: "16px", color: "#8A9A7E", letterSpacing: "2px", marginBottom: "16px", textAlign: "center" }}>The Story</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 500, color: "#2C2824", textAlign: "center", lineHeight: 1.15, marginBottom: "48px" }}>Second Sunrise isn&apos;t a brand. It&apos;s a way to live.</h2>
        </Reveal>

        <Reveal><p style={{ fontSize: "19px", fontFamily: "'DM Sans', serif", lineHeight: 1.9, color: "#5E5652", marginBottom: "24px" }}>Every morning, you get two choices. Fall back into noise, or rise into presence. That&apos;s it. Everything else &mdash; the gym, the food, the work, the relationships &mdash; flows from which choice you make when you open your eyes.</p></Reveal>
        <Reveal delay={0.08}><p style={{ fontSize: "19px", fontFamily: "'DM Sans', serif", lineHeight: 1.9, color: "#5E5652", marginBottom: "24px" }}>This brand exists for people who have been through something. Who have hit a wall, burned out, lost their way, or simply woken up one day knowing they wanted more from life. Not more stuff. More clarity. More discipline. More peace.</p></Reveal>
        <Reveal delay={0.16}><p style={{ fontSize: "19px", fontFamily: "'DM Sans', serif", lineHeight: 1.9, color: "#5E5652", marginBottom: "48px" }}>Every piece we make is a quiet reminder. The sunrise on the chest. The words on the brim. The colors of early morning &mdash; sand, rust, cream, washed earth. These aren&apos;t just clothes. They&apos;re armor for people who are choosing to show up differently.</p></Reveal>

        <Reveal delay={0.2}>
          <div style={{ background: "#2C2824", padding: "48px", marginBottom: "48px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 500, color: "#FAF7F2", lineHeight: 1.4 }}>
              &ldquo;The storm made me patient.<br />The sunrise made me new.&rdquo;
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
            {[
              { title: "Alignment over escape", desc: "We don&apos;t numb. We sit with what&apos;s real and choose to move through it with clarity." },
              { title: "Repetition until peace", desc: "You learn, you move, you eat clean, you sleep, you repeat. Eventually the chaos becomes stillness." },
              { title: "Calm as a competitive edge", desc: "The quietest person in the room is usually the most powerful. We train for that kind of presence." },
              { title: "The comeback is quiet", desc: "No announcements. Just a person who shows up every day a little more aligned than yesterday." },
            ].map((v, i) => (
              <div key={i} style={{ padding: "28px", background: "#F0EBE1" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 500, color: "#2C2824", marginBottom: "8px" }}>{v.title}</h3>
                <p style={{ fontSize: "15px", fontFamily: "'DM Sans', serif", lineHeight: 1.7, color: "#A8948A" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ textAlign: "center" }}>
          <button onClick={() => setPage("shop")} style={{ background: "#2C2824", color: "#FAF7F2", border: "none", padding: "16px 44px", fontSize: "17px", fontWeight: 500, fontFamily: "'DM Sans', serif", letterSpacing: "1px", cursor: "pointer" }}>Shop the Collection</button>
        </div>
      </div>
    </section>
  );
}
