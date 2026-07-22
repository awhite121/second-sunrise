"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LOOKBOOK, PRODUCTS } from "./catalog";

const rust = "#C4753B";
const rustDark = "#A85E28";
const bone = "#FAF7F2";
const parchment = "#F0EBE1";
const ink = "#1A1816";
const mid = "#6B6560";
const muted = "#A8A098";
const heading = "'Playfair Display', Georgia, serif";
const sans = "'DM Sans', sans-serif";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(22px)",
        transition: `all .8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark">
      <span>SECOND</span>
      <span>SUNRISE</span>
    </span>
  );
}

function Nav({ page, setPage, cartCount, setCartOpen, scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const go = (next) => {
    setPage(next);
    setMobileOpen(false);
  };
  return (
    <nav className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="brand-button" onClick={() => go("home")} aria-label="Second Sunrise home">
          <BrandMark />
        </button>
        <div className="nav-links">
          {[
            ["home", "Home"],
            ["shop", "Shop"],
            ["lookbook", "Lookbook"],
            ["about", "Our Story"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)} className={page === id ? "active" : ""}>
              {label}
            </button>
          ))}
          <button className="bag-button" onClick={() => setCartOpen(true)}>
            Bag
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
          <button className="shop-now" onClick={() => go("shop")}>SHOP NOW</button>
        </div>
        <div className="mobile-actions">
          <button className="mobile-bag" onClick={() => setCartOpen(true)} aria-label="Open bag">
            BAG{cartCount > 0 ? ` (${cartCount})` : ""}
          </button>
          <button className="menu-button" onClick={() => setMobileOpen((v) => !v)} aria-label="Open menu">☰</button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-menu">
          {[
            ["home", "Home"],
            ["shop", "Shop"],
            ["lookbook", "Lookbook"],
            ["about", "Our Story"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Cart({ open, onClose, cart, setCart, setPage }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const updateQty = (cartId, change) => {
    setCart((items) =>
      items
        .map((item) => item.cartId === cartId ? { ...item, qty: Math.max(0, item.qty + change) } : item)
        .filter((item) => item.qty > 0)
    );
  };
  return (
    <>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <header className="cart-header">
          <div>
            <h2>Your Bag</h2>
            <p>{cart.reduce((sum, item) => sum + item.qty, 0)} items</p>
          </div>
          <button onClick={onClose} aria-label="Close bag">×</button>
        </header>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span>☀</span>
              <h3>Your bag is empty.</h3>
              <p>Another sunrise. Another chance to add something good.</p>
              <button onClick={() => { onClose(); setPage("shop"); }}>SHOP THE COLLECTION</button>
            </div>
          ) : cart.map((item) => (
            <article className="cart-item" key={item.cartId}>
              <img src={item.imgs[0]} alt={item.name} />
              <div>
                <div className="cart-item-top">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.color} · {item.size}</p>
                  </div>
                  <strong>${item.price * item.qty}</strong>
                </div>
                <div className="qty-row">
                  <button onClick={() => updateQty(item.cartId, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.cartId, 1)}>+</button>
                  <button className="remove" onClick={() => updateQty(item.cartId, -item.qty)}>Remove</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {cart.length > 0 && (
          <footer className="cart-footer">
            <div><span>Subtotal</span><strong>${total}.00</strong></div>
            <div><span>Shipping</span><span className={total >= 100 ? "free" : ""}>{total >= 100 ? "Free" : "Calculated at checkout"}</span></div>
            {total < 100 && <p>Add ${100 - total} more for free shipping.</p>}
            <button onClick={() => { onClose(); setPage("checkout"); }}>CHECKOUT — ${total}.00</button>
          </footer>
        )}
      </aside>
    </>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  const [size, setSize] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  useEffect(() => { setSize(null); setImageIndex(0); setAdded(false); }, [product]);
  if (!product) return null;
  const needsSize = product.sizes.length > 1;
  const add = () => {
    if (needsSize && !size) return;
    onAddToCart(product, size || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="modal-shell">
      <button className="modal-backdrop" onClick={onClose} aria-label="Close product" />
      <div className="product-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-gallery">
          <img src={product.imgs[imageIndex]} alt={`${product.name} ${product.color}`} />
          {product.imgs.length > 1 && (
            <div className="modal-thumbnails">
              {product.imgs.map((src, index) => (
                <button key={src} className={index === imageIndex ? "active" : ""} onClick={() => setImageIndex(index)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="modal-info">
          {product.tag && <span className="product-tag">{product.tag}</span>}
          <h2>{product.name}</h2>
          <p className="modal-color">{product.color}</p>
          <strong className="modal-price">${product.price}.00</strong>
          <p className="modal-desc">{product.desc}</p>
          {needsSize && (
            <div className="size-picker">
              <div><span>SIZE</span><button>Size Guide</button></div>
              <div className="size-options">
                {product.sizes.map((itemSize) => (
                  <button key={itemSize} className={size === itemSize ? "active" : ""} onClick={() => setSize(itemSize)}>{itemSize}</button>
                ))}
              </div>
            </div>
          )}
          <button className={`add-button ${needsSize && !size ? "disabled" : ""}`} onClick={add}>
            {added ? "ADDED ✓" : needsSize && !size ? "SELECT A SIZE" : "ADD TO BAG"}
          </button>
          <div className="modal-perks"><span>✓ Free returns</span><span>✓ Free ship over $100</span></div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }) {
  const [hover, setHover] = useState(false);
  const image = hover && product.imgs[1] ? product.imgs[1] : product.imgs[0];
  return (
    <article className="product-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}>
      {product.tag && <span className={`card-tag ${product.tag === "Best Seller" ? "rust" : ""}`}>{product.tag}</span>}
      <div className="product-image-wrap">
        <img src={image} alt={`${product.name} ${product.color}`} />
        <div className="quick-view">VIEW PRODUCT</div>
      </div>
      <h3>{product.name}</h3>
      <p>{product.color}</p>
      <strong>${product.price}.00</strong>
    </article>
  );
}

function HomePage({ setPage, setSelected }) {
  const featured = PRODUCTS.filter((p) => ["Best Seller", "Signature"].includes(p.tag)).slice(0, 4);
  const hero = [
    PRODUCTS[13].imgs[0],
    PRODUCTS[16].imgs[0],
    PRODUCTS[1].imgs[0],
    PRODUCTS[12].imgs[0],
    PRODUCTS[2].imgs[0],
    PRODUCTS[28].imgs[0],
  ];
  const lifestyle = LOOKBOOK.filter((item) => item.category === "Lifestyle").slice(0, 6);
  return (
    <>
      <section className="hero-section">
        <div className="hero-grid">
          {hero.map((src) => <div key={src}><img src={src} alt="" /></div>)}
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <Reveal><p className="eyebrow">REBORN DAILY</p></Reveal>
          <Reveal delay={0.1}><h1>Every sunrise<br />is a second<br />chance.</h1></Reveal>
          <Reveal delay={0.2}><p>Clothes for people who have been down before and decided to come back. Stay Hungry.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="hero-buttons">
              <button onClick={() => setPage("shop")}>SHOP THE DROP</button>
              <button className="ghost" onClick={() => setPage("about")}>OUR STORY</button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="marquee"><div>{Array(4).fill(["Back to Sunrise", "Stay Hungry", "Reborn Daily", "Discipline is Freedom", "Rise Again", "The Comeback is Quiet"]).flat().map((text, i) => <span key={`${text}-${i}`}>{text}<b>•</b></span>)}</div></div>

      <section className="section collection-section">
        <Reveal>
          <div className="section-heading split">
            <div><p>THE COLLECTION</p><h2>Best Sellers</h2></div>
            <button onClick={() => setPage("shop")}>View All →</button>
          </div>
        </Reveal>
        <div className="product-grid">
          {featured.map((product, index) => <Reveal key={product.id} delay={index * .06}><ProductCard product={product} onClick={() => setSelected(product)} /></Reveal>)}
        </div>
        <Reveal><div className="center-button"><button onClick={() => setPage("shop")}>VIEW FULL COLLECTION</button></div></Reveal>
      </section>

      <section className="philosophy">
        <div className="philosophy-image"><img src={PRODUCTS[13].imgs[0]} alt="Burnt orange Reborn Crewneck" /></div>
        <div className="philosophy-copy">
          <Reveal>
            <p>THE PHILOSOPHY</p>
            <h2>For people who have been down and chose to get back up.</h2>
            <span>No big speeches. Just clothes that mean something. Built for the days when you are rebuilding quietly and that is enough.</span>
            <button onClick={() => setPage("about")}>READ OUR STORY →</button>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal><div className="section-heading"><p>THE WORLD AROUND IT</p><h2>Made for real mornings.</h2><span>Every image you sent is now organized inside the site. The strongest lifestyle shots lead the story; the full set lives in the Lookbook.</span></div></Reveal>
        <div className="lifestyle-grid">
          {lifestyle.map((item, i) => <Reveal key={item.src} delay={(i % 3) * .05}><button onClick={() => setPage("lookbook")}><img src={item.src} alt={item.title} /></button></Reveal>)}
        </div>
      </section>

      <Signup />
    </>
  );
}

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="signup-section">
      <Reveal>
        <p>JOIN THE MOVEMENT</p>
        <h2>Get early access.</h2>
        <span>New drops, restocks, and stories from the community. Be first.</span>
        {done ? <div className="signup-done"><strong>You&apos;re in.</strong><small>Welcome to Second Sunrise, {name || "friend"}.</small></div> : (
          <div className="signup-form">
            <div><input value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" /><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" /></div>
            <button onClick={() => email.includes("@") && setDone(true)}>JOIN THE SUNRISE</button>
            <small>No spam. Unsubscribe anytime.</small>
          </div>
        )}
      </Reveal>
    </section>
  );
}

function ShopPage({ setSelected }) {
  const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  return (
    <section className="section page-section">
      <Reveal><div className="page-heading"><p>THE COLLECTION</p><h1>Shop</h1><span>{PRODUCTS.length} products. Every concept now has a home.</span></div></Reveal>
      <div className="filters">{categories.map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <div className="product-grid">
        {filtered.map((product, index) => <Reveal key={`${filter}-${product.id}`} delay={(index % 4) * .04}><ProductCard product={product} onClick={() => setSelected(product)} /></Reveal>)}
      </div>
    </section>
  );
}

function LookbookPage() {
  const categories = ["All", ...Array.from(new Set(LOOKBOOK.map((item) => item.category)))];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? LOOKBOOK : LOOKBOOK.filter((item) => item.category === filter);
  return (
    <section className="section page-section lookbook-page">
      <Reveal><div className="page-heading"><p>ALL THE CONCEPTS</p><h1>Lookbook</h1><span>All {LOOKBOOK.length} unique images from the folders you uploaded, optimized for the web and organized here.</span></div></Reveal>
      <div className="filters">{categories.map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <div className="lookbook-grid">
        {filtered.map((item, i) => (
          <Reveal key={item.src} delay={(i % 5) * .025}>
            <figure><img src={item.src} alt={item.title} loading="lazy" /><figcaption><span>{item.category}</span><strong>{item.title.replaceAll("_", " ")}</strong></figcaption></figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutPage({ setPage }) {
  const storyImages = [PRODUCTS[10].imgs[1] || PRODUCTS[10].imgs[0], PRODUCTS[16].imgs[1], PRODUCTS[0].imgs[3]];
  return (
    <section className="page-section about-page">
      <div className="story-hero">
        {storyImages.map((src) => <img key={src} src={src} alt="" />)}
        <div><h1>Our Story</h1></div>
      </div>
      <div className="story-copy">
        <Reveal><p>WHO WE ARE</p><h2>Second Sunrise is built around a second chance.</h2></Reveal>
        <Reveal delay={.08}><span>We have all been down. Hit a wall, lost the plot, or just woken up one day feeling like we drifted from who we actually are. Second Sunrise is for that moment when you decide to stop drifting.</span></Reveal>
        <Reveal delay={.12}><span>It is not about being perfect. It is about showing up again. The clothes are a reminder of that. Simple. Grounded. Built to last.</span></Reveal>
        <Reveal delay={.16}><span>Every piece means the same thing: you are here, you are trying, and that is enough to start.</span></Reveal>
        <div className="values-grid">
          {[['Discipline','over impulse'],['Presence','over numbness'],['Purpose','over chaos'],['Growth','over regret']].map(([word, sub]) => <Reveal key={word}><div><strong>{word}</strong><small>{sub}</small></div></Reveal>)}
        </div>
        <Reveal><blockquote>“You do not have to have it all figured out.<br />You just have to start again.”</blockquote></Reveal>
        <Reveal><div className="center-button"><button onClick={() => setPage("shop")}>SHOP THE COLLECTION</button></div></Reveal>
      </div>
    </section>
  );
}

function CheckoutPage({ cart, setCart, setPage }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", state: "", zip: "" });
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 100 ? 0 : 8;
  const total = subtotal + shipping;
  const update = (key) => (event) => setInfo((prev) => ({ ...prev, [key]: event.target.value }));
  if (cart.length === 0 && !done) return <div className="checkout-empty"><h1>Your bag is empty.</h1><button onClick={() => setPage("shop")}>SHOP NOW</button></div>;
  if (done) return (
    <div className="order-complete"><div><span>✓</span><h1>Order demo complete.</h1><p>No payment was processed. This checkout is ready to connect to Shopify, Stripe, or another real payment provider.</p><button onClick={() => { setCart([]); setPage("home"); }}>BACK TO HOME</button></div></div>
  );
  return (
    <section className="checkout-page">
      <div className="checkout-main">
        <div className="checkout-form">
          <div className="checkout-steps">{["Contact", "Shipping", "Review"].map((label, i) => <button key={label} className={step === i + 1 ? "active" : step > i + 1 ? "done" : ""} onClick={() => i + 1 < step && setStep(i + 1)}><span>{step > i + 1 ? "✓" : i + 1}</span>{label}</button>)}</div>
          {step === 1 && <div><h2>Contact</h2><div className="field-row"><Field label="First Name" value={info.firstName} onChange={update("firstName")} /><Field label="Last Name" value={info.lastName} onChange={update("lastName")} /></div><Field label="Email" type="email" value={info.email} onChange={update("email")} /><button className="continue" disabled={!info.firstName || !info.email.includes("@")} onClick={() => setStep(2)}>CONTINUE TO SHIPPING</button></div>}
          {step === 2 && <div><h2>Shipping</h2><Field label="Street Address" value={info.address} onChange={update("address")} /><div className="field-row"><Field label="City" value={info.city} onChange={update("city")} /><Field label="State" value={info.state} onChange={update("state")} /><Field label="ZIP" value={info.zip} onChange={update("zip")} /></div><div className="shipping-option"><div><b>●</b><span>Standard shipping (5–7 days)</span></div><strong>{shipping === 0 ? "FREE" : `$${shipping}`}</strong></div><button className="continue" disabled={!info.address || !info.city} onClick={() => setStep(3)}>CONTINUE TO REVIEW</button><button className="back" onClick={() => setStep(1)}>← Back to Contact</button></div>}
          {step === 3 && <div><h2>Review</h2><div className="demo-notice"><strong>Demo checkout</strong><p>This build does not collect or process card details. Connect Shopify or Stripe before accepting real orders.</p></div><div className="review-box"><p><span>Ship to</span><strong>{info.firstName} {info.lastName}<br />{info.address}<br />{info.city}, {info.state} {info.zip}</strong></p><p><span>Email</span><strong>{info.email}</strong></p></div><button className="continue" onClick={() => setDone(true)}>PLACE DEMO ORDER — ${total}</button><button className="back" onClick={() => setStep(2)}>← Back to Shipping</button></div>}
        </div>
        <aside className="order-summary"><h3>Order Summary</h3>{cart.map((item) => <div className="summary-item" key={item.cartId}><div><img src={item.imgs[0]} alt="" /><span>{item.qty}</span></div><p><strong>{item.name}</strong><small>{item.color} · {item.size}</small></p><b>${item.price * item.qty}</b></div>)}<div className="summary-total"><p><span>Subtotal</span><strong>${subtotal}</strong></p><p><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></p><p className="total"><span>Total</span><strong>${total}</strong></p></div></aside>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={onChange} /></label>;
}

function Footer({ setPage }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div><BrandMark /><p>Vintage-inspired apparel rooted in personal rebirth and resilience.</p></div>
        <div><strong>SHOP</strong>{["All Products", "Tees", "Crewnecks", "Hats", "Bottoms"].map((x) => <button key={x} onClick={() => setPage("shop")}>{x}</button>)}</div>
        <div><strong>EXPLORE</strong><button onClick={() => setPage("lookbook")}>Lookbook</button><button onClick={() => setPage("about")}>Our Story</button></div>
        <div><strong>FOLLOW</strong><a href="https://www.instagram.com/second___sunrise" target="_blank" rel="noreferrer">Instagram</a><blockquote>“Back to Sunrise —<br />I rise again.”</blockquote></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Second Sunrise. All rights reserved.</span><span>Website by <b>Resite</b></span></div>
    </footer>
  );
}

export default function SecondSunrise() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const addToCart = (product, size) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id && item.size === size);
      if (existing) return items.map((item) => item.id === product.id && item.size === size ? { ...item, qty: item.qty + 1 } : item);
      return [...items, { ...product, size, qty: 1, cartId: `${product.id}-${size}-${Date.now()}` }];
    });
    setCartOpen(true);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  return (
    <div className="site-shell">
      <Nav page={page} setPage={setPage} cartCount={cartCount} setCartOpen={setCartOpen} scrolled={scrolled} />
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} setPage={setPage} />
      <ProductModal product={selected} onClose={() => setSelected(null)} onAddToCart={addToCart} />
      {page === "checkout" ? <CheckoutPage cart={cart} setCart={setCart} setPage={setPage} /> : page === "shop" ? <ShopPage setSelected={setSelected} /> : page === "lookbook" ? <LookbookPage /> : page === "about" ? <AboutPage setPage={setPage} /> : <HomePage setPage={setPage} setSelected={setSelected} />}
      {page !== "checkout" && <Footer setPage={setPage} />}
    </div>
  );
}
