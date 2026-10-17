/* =========================================================
   House of Kaanch storefront · vanilla JS, no build step
   Edit PRINTS and PRODUCTS below to change the catalogue.
   ========================================================= */

const PRINTS = [
  { id: "stripe",    name: "Rose Reverie",     cls: "p-stripe" },
  { id: "check",     name: "Honey Window",  cls: "p-check" },
  { id: "dots",      name: "Sage Song", cls: "p-dots" },
  { id: "hearts",    name: "Love Letter",  cls: "p-hearts" },
  { id: "squiggle",  name: "Mirror Lake",      cls: "p-squiggle" },
  { id: "bloom",     name: "Secret Garden",   cls: "p-bloom" },
  { id: "pinstripe", name: "Midnight Ink", cls: "p-pinstripe" },
  { id: "gingham",   name: "Sage Picnic",     cls: "p-gingham" },
];

// Optional image: "assets/your-product.jpg" on each product replaces the pattern art.
// Names, rupee prices and patterns below are editable demo data.
// type: set | lehenga | top | bottom  · top/bottom are print ids for the two-tone card art
const PRODUCTS = [
  { id: "gulabo-x-pudina",  name: "Rose Reverie × Sage Picnic",   desc: "kurta + farshi salwar", price: 3200, type: "set",     top: "stripe",   bottom: "gingham" },
  { id: "dil-phenk",        name: "Love Letter",         desc: "halter + farshi salwar", price: 3600, type: "set",    top: "hearts",   bottom: "bloom" },
  { id: "lehar-x-aam",      name: "Mirror Lake × Honey Window", desc: "squiggle top + farshi",  price: 3600, type: "set",    top: "squiggle", bottom: "check" },
  { id: "gulmohar-lehenga", name: "Secret Garden",          desc: "lehenga set",            price: 4900, type: "lehenga", top: "bloom",   bottom: "dots" },
  { id: "kala-jamun-top",   name: "Midnight Ink",        desc: "short kurta",            price: 1800, type: "top",    top: "pinstripe", bottom: "pinstripe" },
  { id: "hari-mirch-top",   name: "Sage Song",        desc: "tie-back top",           price: 1600, type: "top",    top: "dots",     bottom: "dots" },
  { id: "aam-papad-salwar", name: "Honey Window",         desc: "farshi salwar",          price: 1900, type: "bottom", top: "check",    bottom: "check" },
  { id: "pudina-pant",      name: "Sage Picnic",            desc: "straight pant",          price: 1700, type: "bottom", top: "gingham",  bottom: "gingham" },
];

const QUIZ = [
  { q: "Shaadi mein tum kahan milogi?", a: [
    ["Dance floor ke beech mein", "stripe"], ["Dessert counter pe, obviously", "check"],
    ["Mehendi wali aunty ke saath gossip", "hearts"], ["Photo booth, 47th take", "squiggle"] ] },
  { q: "Tumhara Sunday plan?", a: [
    ["Brunch + thrift + repeat", "bloom"], ["Plants ko paani, khud ko chai", "gingham"],
    ["Road trip, no playlist decided", "squiggle"], ["Bed. Bas bed.", "pinstripe"] ] },
  { q: "Group chat mein tum ho…", a: [
    ["Voice note queen", "hearts"], ["Memes ki supplier", "check"],
    ["Seen karke reply 3 din baad", "pinstripe"], ["Plan banane wali", "dots"] ] },
  { q: "Ek color jo tum kabhi nahi chhodogi?", a: [
    ["Frilly apron blush", "stripe"], ["Honey jar amber", "check"], ["Dreamy sage", "gingham"], ["Black cat ink", "pinstripe"] ] },
  { q: "Tumhara chaos level?", a: [
    ["Thoda sa, controlled", "dots"], ["Medium spicy", "bloom"],
    ["A little everyday magic", "squiggle"], ["Calm outside, tornado inside", "hearts"] ] },
];

const RESULT_COPY = {
  stripe: "Bold, loud, aur bilkul sorry nahi. Tum entry nahi karti, tum arrive karti ho.",
  check: "Sweet but sharp. Tum dessert bhi ho aur roast bhi.",
  dots: "Organised chaos ki CEO. Sabka plan tumhare paas hai.",
  hearts: "Dil pe haath, phone pe voice note. Main character energy.",
  squiggle: "Kabhi seedhi line mein nahi chalti, aur yahi toh maza hai.",
  bloom: "Festive by default. Har din tumhare liye ek mela hai.",
  pinstripe: "Quiet luxury, loud opinions. Kam bolti ho, sahi bolti ho.",
  gingham: "Fresh, grounded, thodi si filmy. Sage Picnic jaisi taazgi.",
};

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const rupee = (n) => "₹" + n.toLocaleString("en-IN");
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const printById = (id) => PRINTS.find((p) => p.id === id);

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- storage (safe) ---------- */
const store = {
  get(k, f) { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- products ---------- */
function renderProducts(filter = "all") {
  const grid = $("#productGrid");
  const list = PRODUCTS.filter((p) => filter === "all" || p.type === filter || (filter.startsWith("print:") && (p.top === filter.slice(6) || p.bottom === filter.slice(6))));
  grid.innerHTML = list.map((p, i) => `
    <article class="card">
      <div class="card__art">
        ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">` : `<div class="${printById(p.top).cls}"></div><div class="${printById(p.bottom).cls}"></div><span class="card__placeholder">Pattern preview</span>`}
        <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <div class="card__body">
        <h3 class="card__name">${esc(p.name)}</h3>
        <p class="card__desc">${esc(p.desc)}</p>
        <div class="card__row">
          <span class="card__price">${rupee(p.price)}</span>
          <button class="add" data-id="${p.id}">Add to bag</button>
        </div>
      </div>
    </article>`).join("") + (filter === "all" ? `
    <article class="card card--mix">
      <div class="card__art">＋</div>
      <div class="card__body">
        <h3 class="card__name">Your own pairing</h3>
        <p class="card__desc">a top + a bottom, your way</p>
        <div class="card__row"><span class="card__price">from ₹3,300</span>
        <button class="add" data-mix>Create your mix →</button></div>
      </div>
    </article>` : "");
}

function setFilter(f) {
  $$(".chip").forEach((c) => { c.classList.toggle("is-on", c.dataset.filter === f); c.setAttribute("aria-pressed", c.dataset.filter === f); });
  renderProducts(f);
}

/* ---------- prints ---------- */
function renderPrints() {
  $("#printGrid").innerHTML = PRINTS.map((p, i) => `
    <button class="print" data-print="${p.id}">
      <div class="print__swatch ${p.cls}"></div>
      <div class="print__label"><span>${p.name}</span><span>${String(i + 1).padStart(2, "0")}</span></div>
    </button>`).join("");
}

/* ---------- cart ---------- */
const savedCart = store.get("hok_cart", []);
let cart = Array.isArray(savedCart) ? savedCart.filter(c => c && typeof c.id === 'string' && typeof c.name === 'string' && typeof c.desc === 'string' && PRINTS.some(p=>p.cls===c.cls) && Number.isFinite(c.price) && c.price>=0 && Number.isInteger(c.qty) && c.qty>0 && c.qty<=99) : [];

function addToCart(item) {
  const found = cart.find((c) => c.id === item.id);
  found ? found.qty = Math.min(99, found.qty + 1) : cart.push({ ...item, qty: 1 });
  saveCart();
  toast(`${item.name} added to your bag ✧`);
}

function saveCart() {
  store.set("hok_cart", cart);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  $("#cartCount").textContent = count;
  $("#cartTotal").textContent = rupee(cart.reduce((s, c) => s + c.qty * c.price, 0));
  $("#cartList").innerHTML = cart.length ? cart.map((c) => `
    <li class="line">
      <div class="line__sw ${c.cls}"></div>
      <div>
        <div class="line__name">${esc(c.name)}</div>
        <div class="line__meta">${esc(c.desc)}</div>
        <div class="qty"><button data-dec="${esc(c.id)}" aria-label="Decrease">−</button><span>${c.qty}</span><button data-inc="${esc(c.id)}" aria-label="Increase">+</button></div>
      </div>
      <b>${rupee(c.price * c.qty)}</b>
    </li>`).join("") : `<li class="drawer__empty">Your bag is waiting for a little magic.</li>`;
}

function changeQty(id, d) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty = Math.min(99, item.qty + d);
  if (item.qty <= 0) cart = cart.filter((c) => c.id !== id);
  saveCart();
}

let previousFocus;
const openCart = () => { previousFocus=document.activeElement; document.body.classList.remove('nav-open'); $('#burger').setAttribute('aria-expanded','false'); document.body.classList.add("cart-open"); $("#drawer").inert=false; $("#drawer").setAttribute("aria-hidden", "false"); $('#cartClose').focus(); };
const closeCart = () => { document.body.classList.remove("cart-open"); $("#drawer").inert=true; $("#drawer").setAttribute("aria-hidden", "true"); previousFocus?.focus(); };

/* ---------- gift card ---------- */
function setupGift() {
  const pick = (groupSel, cb) => $(groupSel).addEventListener("click", (e) => {
    const b = e.target.closest(".pill");
    if (!b) return;
    $$(".pill", $(groupSel)).forEach((p) => p.classList.toggle("is-on", p === b));
    cb(b.textContent);
  });
  pick("#giftFor", (t) => ($("#giftNotePreview").textContent = "for: " + t));
  pick("#giftAmt", (t) => ($("#giftAmtPreview").textContent = t));
  $("#giftAdd").addEventListener("click", () => {
    const amt = parseInt($("#giftAmtPreview").textContent.replace(/\D/g, ""), 10);
    const who = $("#giftNotePreview").textContent.replace("for: ", "");
    addToCart({ id: `gift-${amt}-${who}`, name: "Gift Card", desc: `${rupee(amt)} · for ${who}`, price: amt, cls: "p-bloom" });
    openCart();
  });
}

/* ---------- quiz ---------- */
let qi = 0, tally = {};

function renderQuiz() {
  $("#qBar").style.width = `${(qi / QUIZ.length) * 100}%`;
  if (qi >= QUIZ.length) return showResult();
  const { q, a } = QUIZ[qi];
  $("#qTitle").textContent = `${qi + 1}/${QUIZ.length} · ${q}`;
  $("#qBody").innerHTML = `<div class="q__opts">${a.map(([t, p]) =>
    `<button class="q__opt" data-p="${p}">${t}</button>`).join("")}</div>`;
}

function showResult() {
  const winner = Object.entries(tally).sort((x, y) => y[1] - x[1])[0][0];
  const print = printById(winner);
  const match = PRODUCTS.find((p) => p.top === winner || p.bottom === winner);
  $("#qTitle").textContent = "Meet your Kaanch muse.";
  $("#qBody").innerHTML = `
    <div class="q__result">
      <div class="print__swatch ${print.cls}"></div>
      <div>
        <h3>Your muse: ${print.name}.</h3>
        <p>${RESULT_COPY[winner]}</p>
        ${match ? `<button class="btn btn--dark" data-id="${match.id}" id="qBuy">Shop ${match.name} · ${rupee(match.price)}</button>` : ""}
        <button class="btn btn--ghost" id="qAgain">Find another muse</button>
      </div>
    </div>`;
}

/* ---------- events ---------- */
document.addEventListener("click", (e) => {
  const t = e.target;

  const add = t.closest(".add[data-id], #qBuy");
  if (add) {
    const p = PRODUCTS.find((x) => x.id === add.dataset.id);
    addToCart({ id: p.id, name: p.name, desc: p.desc, price: p.price, cls: printById(p.top).cls });
    return;
  }
  if (t.closest("[data-mix]")) { openMix(); return; }

  const chip = t.closest(".chip");
  if (chip) { setFilter(chip.dataset.filter); return; }

  const navLink = t.closest(".nav a, .footer a");
  if (navLink) {
    document.body.classList.remove("nav-open");
    $("#burger").setAttribute("aria-expanded", "false");
    if (navLink.dataset.filter) setFilter(navLink.dataset.filter);
    else if (navLink.getAttribute("href") === "#shop") setFilter("all");
  }

  const pr = t.closest(".print");
  if (pr) {
    const p = printById(pr.dataset.print);
    setFilter("print:" + p.id); $("#shop").scrollIntoView({behavior:"smooth"}); toast("Exploring " + p.name);
  }

  const opt = t.closest(".q__opt");
  if (opt) { tally[opt.dataset.p] = (tally[opt.dataset.p] || 0) + 1; qi++; renderQuiz(); return; }
  if (t.closest("#qAgain")) { qi = 0; tally = {}; renderQuiz(); return; }

  if (t.dataset.inc) changeQty(t.dataset.inc, 1);
  if (t.dataset.dec) changeQty(t.dataset.dec, -1);
});

$("#cartOpen").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
$("#scrim").addEventListener("click", closeCart);
document.addEventListener("keydown", e => {
 if(e.key==='Escape'){ if(document.body.classList.contains('cart-open')) closeCart(); document.body.classList.remove('nav-open'); $('#burger').setAttribute('aria-expanded','false'); }
 if(e.key==='Tab' && document.body.classList.contains('cart-open')) { const f=$$('button,a,input,select', $('#drawer')).filter(n=>!n.disabled), first=f[0],last=f[f.length-1];if(e.shiftKey && (document.activeElement===first || !$('#drawer').contains(document.activeElement))){e.preventDefault();last.focus()}else if(!e.shiftKey && (document.activeElement===last || !$('#drawer').contains(document.activeElement))){e.preventDefault();first.focus()} }
});

$("#burger").addEventListener("click", () => {
  const open = document.body.classList.toggle("nav-open");
  $("#burger").setAttribute("aria-expanded", open);
});

$("#checkout").addEventListener("click", () => {
  if (!cart.length) return toast("Choose a little something first.");
  // Hook up Razorpay / Shopify Buy Button / Stripe here. See README.
  toast("Demo checkout · connect a payment gateway (see README)");
});

// Preview: no email collection until a real subscription service is connected.
$("#newsForm").addEventListener("submit", e => { e.preventDefault(); $("#newsMsg").textContent="This is a signup preview. Your email has not been saved or subscribed."; e.target.reset(); });

/* ---------- working mix builder and editable information dialogs ---------- */
const INFO = {
 "Shipping policy":"Add your actual delivery areas, processing times, rates and tracking information here before launch. This preview does not take orders.",
 "Refund policy":"Replace this placeholder with your actual return and exchange terms before launch.",
 "Privacy policy":"Replace this placeholder with your privacy policy before connecting payments, analytics or email subscriptions. This preview stores a bag locally in your browser.",
 "Contact":"Add your business email, customer support details and hours here before launch."
};
function openMix(){
 $('#mixTop').innerHTML=PRODUCTS.filter(p=>p.type==='top').map(p=>`<option value="${esc(p.id)}">${esc(p.name)} · ${rupee(p.price)}</option>`).join('');
 $('#mixBottom').innerHTML=PRODUCTS.filter(p=>p.type==='bottom').map(p=>`<option value="${esc(p.id)}">${esc(p.name)} · ${rupee(p.price)}</option>`).join('');
 updateMix(); $('#mixDialog').showModal();
}
function mixItems(){return [PRODUCTS.find(p=>p.id===$('#mixTop').value),PRODUCTS.find(p=>p.id===$('#mixBottom').value)].filter(Boolean)}
function updateMix(){const items=mixItems();$('#mixTotal').textContent='Pairing total · '+rupee(items.reduce((a,p)=>a+p.price,0));$('#mixForm button').disabled=items.length!==2}
$('#mixTop').addEventListener('change',updateMix);$('#mixBottom').addEventListener('change',updateMix);
$('#mixForm').addEventListener('submit',e=>{e.preventDefault();const items=mixItems();if(items.length!==2)return;items.forEach(p=>addToCart({id:p.id,name:p.name,desc:p.desc,price:p.price,cls:printById(p.top).cls}));$('#mixDialog').close();openCart()});
document.addEventListener('click',e=>{const close=e.target.closest('[data-close-dialog]');if(close)close.closest('dialog').close();const info=e.target.closest('[data-info]');if(info){$('#infoTitle').textContent=info.dataset.info;$('#infoBody').textContent=INFO[info.dataset.info];$('#infoDialog').showModal()}});

/* ---------- init ---------- */
$("#year").textContent = new Date().getFullYear();
setFilter("all");
renderPrints();
renderCart();
renderQuiz();
setupGift();
