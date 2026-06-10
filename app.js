// === Zamiempanadas — catálogo + carrito + WhatsApp ===

const WHATSAPP_NUMBER = "5491127854815"; // 011 27854815 — reemplazar cuando el dueño confirme el número definitivo

const SABORES = [
  {
    id: "carne",
    nombre: "Carne cortada a cuchillo",
    desc: "Bola de lomo de ternera cortada a cuchillo, cebolla, verdeo, pimiento rojo, papa, huevo duro y especias seleccionadas.",
    img: "img/carne.png?v=2",
    ingredientes: "img/res1.png?v=2",
    docena: 22400,
    media: 12000,
  },
  {
    id: "queso",
    nombre: "Quesos & Verduras",
    desc: "Dos tipos de queso, cebolla, pimiento rojo, pimiento amarillo, verdeo, tomate y especias seleccionadas.",
    img: "img/quesover.png?v=2",
    ingredientes: "img/res2.png?v=2",
    docena: 22400,
    media: 12000,
  },
  {
    id: "humita",
    nombre: "Humita",
    desc: "Choclo, zapallo, cebolla, morrón, queso y especias seleccionadas.",
    img: "img/humita.png?v=2",
    ingredientes: "img/res3.png?v=2",
    docena: 22400,
    media: 12000,
  },
];

const TOPPINGS = [
  {
    id: "miracielo",
    nombre: "Miracielo Ahumado",
    desc: "Salsa picante a base de ají miracielo, tomate y cebolla ahumados a leña.",
    img: "img/mordida.jpg",
    precio: 11780,
  },
  {
    id: "carroulsel",
    nombre: "Carroulsel",
    desc: "Aderezo ahumado de ají serrano, manzana verde, apio y jengibre.",
    img: "img/tabla.jpg",
    precio: 11780,
  },
  {
    id: "locoto",
    nombre: "Locoto Ahumado",
    desc: "Salsa picante a base de ají locoto, tomate y cebollas ahumados a leña.",
    img: "img/masa.jpg",
    precio: 11780,
  },
];

// 8 cards del carrusel "Los más pedidos" — editá nombres/precios/img acá
const CAROUSEL = [
  { id: "carne",     nombre: "Carne cortada a cuchillo", desc: "Bola de lomo, cebolla, verdeo, pimiento, papa, huevo.", img: "img/tabla.jpg",   precio: 12000, soon: false },
  { id: "queso",     nombre: "Quesos & Verduras",         desc: "Dos quesos, cebolla, pimientos, verdeo, tomate.",      img: "img/masa.jpg",    precio: 12000, soon: false },
  { id: "humita",    nombre: "Humita",                    desc: "Choclo, zapallo, cebolla, morrón y queso.",            img: "img/mordida.jpg", precio: 12000, soon: false },
  { id: "soon-1",    nombre: "Próximamente",              desc: "Nuevo sabor en camino.",                                img: "img/tabla.jpg",   precio: 0,     soon: true  },
  { id: "soon-2",    nombre: "Próximamente",              desc: "Nuevo sabor en camino.",                                img: "img/masa.jpg",    precio: 0,     soon: true  },
  { id: "soon-3",    nombre: "Próximamente",              desc: "Nuevo sabor en camino.",                                img: "img/mordida.jpg", precio: 0,     soon: true  },
  { id: "soon-4",    nombre: "Próximamente",              desc: "Nuevo sabor en camino.",                                img: "img/tabla.jpg",   precio: 0,     soon: true  },
  { id: "soon-5",    nombre: "Próximamente",              desc: "Nuevo sabor en camino.",                                img: "img/masa.jpg",    precio: 0,     soon: true  },
];

const cart = []; // {key, nombre, variante, precio}

const $ = (s) => document.querySelector(s);
const fmt = (n) => "$" + n.toLocaleString("es-AR");

// ====== Render catálogo ======
// Empanada SVG ilustración (sin texto) — flotando sobre cada carta
const EMP_ILLUSTRATION = `
  <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="emp-svg">
    <defs>
      <linearGradient id="empBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#f0c780"/>
        <stop offset="45%" stop-color="#d49a4a"/>
        <stop offset="100%" stop-color="#8b5a23"/>
      </linearGradient>
      <radialGradient id="empShine" cx="38%" cy="22%" r="55%">
        <stop offset="0%" stop-color="rgba(255,235,180,.55)"/>
        <stop offset="100%" stop-color="rgba(255,235,180,0)"/>
      </radialGradient>
    </defs>
    <!-- cuerpo de empanada -->
    <path d="M20,135 Q20,30 110,30 Q200,30 200,135 Z" fill="url(#empBody)" stroke="#5a3a14" stroke-width="2"/>
    <!-- brillo superior -->
    <path d="M20,135 Q20,30 110,30 Q200,30 200,135 Z" fill="url(#empShine)"/>
    <!-- manchitas de horneado -->
    <ellipse cx="70" cy="80" rx="10" ry="7" fill="rgba(90,40,10,.32)"/>
    <ellipse cx="140" cy="65" rx="9" ry="6" fill="rgba(90,40,10,.28)"/>
    <ellipse cx="105" cy="105" rx="11" ry="7" fill="rgba(90,40,10,.30)"/>
    <ellipse cx="165" cy="100" rx="9" ry="6" fill="rgba(90,40,10,.26)"/>
    <ellipse cx="55" cy="115" rx="8" ry="5" fill="rgba(90,40,10,.22)"/>
    <!-- repulgue: hilo trenzado siguiendo el borde superior -->
    <g stroke="#6b3a14" stroke-width="1.2" fill="none">
      <path d="M20,135 Q20,30 110,30 Q200,30 200,135" stroke="#8b5a23" stroke-width="14" stroke-linecap="round" opacity=".95"/>
      <path d="M20,135 Q20,30 110,30 Q200,30 200,135" stroke="#d49a4a" stroke-width="10" stroke-dasharray="14 6" stroke-linecap="round"/>
      <path d="M20,135 Q20,30 110,30 Q200,30 200,135" stroke="#5a3a14" stroke-width="2" stroke-dasharray="2 12" stroke-linecap="round" opacity=".6"/>
    </g>
  </svg>`;

// Frasco SVG flotando sobre cada salsa
const SALSA_ILLUSTRATION = `
  <svg viewBox="0 0 140 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="salsa-svg">
    <defs>
      <linearGradient id="jarBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c83a26"/>
        <stop offset="100%" stop-color="#5a1810"/>
      </linearGradient>
      <linearGradient id="jarLid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5a3a1f"/>
        <stop offset="100%" stop-color="#2c1c10"/>
      </linearGradient>
    </defs>
    <!-- tapa -->
    <rect x="35" y="8" width="70" height="22" rx="3" fill="url(#jarLid)" stroke="#1a0e08" stroke-width="1"/>
    <ellipse cx="70" cy="10" rx="35" ry="4" fill="#2c1c10"/>
    <!-- cuello -->
    <rect x="42" y="28" width="56" height="10" fill="#3a2a1f"/>
    <!-- cuerpo del frasco -->
    <path d="M28,42 H112 V158 Q112,170 100,170 H40 Q28,170 28,158 Z" fill="url(#jarBody)" stroke="#1a0e08" stroke-width="1.5"/>
    <!-- brillo -->
    <ellipse cx="48" cy="80" rx="6" ry="40" fill="rgba(255,200,180,.25)"/>
    <!-- etiqueta crema -->
    <rect x="40" y="78" width="60" height="56" rx="3" fill="#f4ead7" stroke="#a07840" stroke-width="1"/>
    <text x="70" y="105" text-anchor="middle" font-family="Playfair Display, serif" font-size="11" font-weight="700" fill="#5a3018">ZAMI</text>
    <text x="70" y="120" text-anchor="middle" font-family="Inter, sans-serif" font-size="7" fill="#8a5a2a" letter-spacing="1">SALSA</text>
  </svg>`;

function renderSabores() {
  const grid = $("#saboresGrid");
  grid.innerHTML = SABORES.map((s, i) => `
    <article class="emp-card" data-pos="${i}" data-type="empanada" data-flavor="${s.id}">
      <div class="emp-card__img">
        <div class="emp-card__flip">
          <div class="emp-card__face emp-card__face--front">
            <img src="${s.img}" alt="${s.nombre}" loading="lazy" />
            <div class="emp-card__steam" aria-hidden="true">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div class="emp-card__face emp-card__face--back">
            <img src="${s.ingredientes}" alt="Ingredientes de ${s.nombre}" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="emp-card__body">
        <h4 class="emp-card__name">${s.nombre}</h4>
        <div class="emp-card__price">
          <span class="emp-card__label">Docena · Media</span>
          <strong>${fmt(s.docena)} · ${fmt(s.media)}</strong>
        </div>
        <div class="emp-card__actions">
          <button data-add="empanada" data-id="${s.id}" data-variante="media">+ Media</button>
          <button data-add="empanada" data-id="${s.id}" data-variante="docena">+ Docena</button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderToppings() {
  const grid = $("#toppingsGrid");
  grid.innerHTML = TOPPINGS.map((t, i) => `
    <article class="carta-card" data-pos="${i}" data-type="salsa">
      <div class="carta-card__floater">${SALSA_ILLUSTRATION}</div>
      <div class="carta-card__body">
        <h4 class="carta-card__title">${t.nombre}</h4>
        <p class="carta-card__desc">${t.desc}</p>
        <div class="carta-card__price">
          <span class="carta-card__label">Frasco</span>
          <strong>${fmt(t.precio)}</strong>
        </div>
        <div class="carta-card__actions">
          <button data-add="topping" data-id="${t.id}">+ Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
}

// ====== Carrito ======
function addToCart(type, id, variante) {
  if (type === "empanada") {
    const s = SABORES.find((x) => x.id === id);
    const precio = variante === "docena" ? s.docena : s.media;
    cart.push({
      key: `${id}-${variante}-${Date.now()}`,
      nombre: s.nombre,
      variante: variante === "docena" ? "Docena" : "Media docena",
      precio,
    });
  } else {
    const t = TOPPINGS.find((x) => x.id === id);
    cart.push({
      key: `${id}-${Date.now()}`,
      nombre: t.nombre,
      variante: "Salsa",
      precio: t.precio,
    });
  }
  renderCart();
  openCart();
}

function removeFromCart(key) {
  const i = cart.findIndex((x) => x.key === key);
  if (i >= 0) cart.splice(i, 1);
  renderCart();
}

function renderCart() {
  const list = $("#cartList");
  const empty = $("#cartEmpty");
  const total = cart.reduce((s, i) => s + i.precio, 0);

  $("#cartCount").textContent = cart.length;
  $("#cartTotal").textContent = fmt(total);

  if (!cart.length) {
    list.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";
  list.innerHTML = cart.map((i) => `
    <li class="cart__item">
      <div>
        <div class="cart__item-name">${i.nombre}</div>
        <div class="cart__item-meta">${i.variante}</div>
        <button class="cart__item-remove" data-remove="${i.key}">Quitar</button>
      </div>
      <div class="cart__item-price">${fmt(i.precio)}</div>
    </li>
  `).join("");
}

function openCart() { $("#cart").setAttribute("aria-hidden", "false"); }
function closeCart() { $("#cart").setAttribute("aria-hidden", "true"); }

// ====== WhatsApp ======
function sendWhatsApp() {
  if (!cart.length) {
    alert("Tu pedido está vacío. Agregá algo de la carta antes de enviarlo 🤍");
    return;
  }
  const total = cart.reduce((s, i) => s + i.precio, 0);
  const lines = [
    "¡Hola Zamiempanadas! 👋 Quiero hacer este pedido:",
    "",
    ...cart.map((i, n) => `${n + 1}. ${i.nombre} — ${i.variante} — ${fmt(i.precio)}`),
    "",
    `*Total: ${fmt(total)}*`,
    "",
    "Necesito coordinar envío / retiro. ¡Gracias!",
  ];
  const msg = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
}

// ====== Eventos ======
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add, add.dataset.id, add.dataset.variante);
    return;
  }
  const rm = e.target.closest("[data-remove]");
  if (rm) {
    removeFromCart(rm.dataset.remove);
    return;
  }
});

$("#openCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#closeCartBtn").addEventListener("click", closeCart);
$("#sendWa").addEventListener("click", sendWhatsApp);
const waLinkEl = document.getElementById("waLink");
if (waLinkEl) waLinkEl.href = `https://wa.me/${WHATSAPP_NUMBER}`;
$("#year").textContent = new Date().getFullYear();

// Cards de pedido — cada una abre WhatsApp con su mensaje preformateado
document.querySelectorAll(".pedido-card[data-wa]").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(card.getAttribute("data-wa") || "");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  });
});

function renderCarousel() {
  const track = document.getElementById("carouselTrack");
  if (!track) return;
  const cardHTML = (c) => `
    <article class="cc ${c.soon ? "cc--soon" : ""}">
      <div class="cc__img" style="background-image:url('${c.img}')"></div>
      <div class="cc__body">
        <h3 class="cc__title">${c.nombre}</h3>
        <p class="cc__desc">${c.desc}</p>
        <div class="cc__foot">
          <span class="cc__price">${c.soon ? "—" : fmt(c.precio) + " / media"}</span>
          ${c.soon
            ? `<button class="cc__add" disabled>Pronto</button>`
            : `<button class="cc__add" data-add="empanada" data-id="${c.id}" data-variante="media">+ Agregar</button>`}
        </div>
      </div>
    </article>
  `;
  // Duplicado para loop continuo sin saltos
  track.innerHTML = CAROUSEL.map(cardHTML).join("") + CAROUSEL.map(cardHTML).join("");
}

// === Intro splash + audio: 1ra interacción activa, 2da detiene (definitivo) ===
(() => {
  const intro = document.getElementById("intro");
  const audio = document.getElementById("introAudio");
  if (!intro) return;
  document.body.classList.add("intro-active");

  if (audio) {
    audio.volume = 0.85;
    audio.muted = true;
    audio.loop = false;            // no se repite automáticamente
    audio.play().catch(()=>{});
  }

  let dismissed = false;
  let audioActivated = false;
  let audioDisabled = false;       // flag permanente: una vez apagado, nunca más
  let stopListenersRegistered = false;

  const startAudio = (sourceEvent) => {
    if (!audio || audioActivated || audioDisabled) return;
    audio.muted = false;
    audio.volume = 0.85;
    audio.loop = false;
    const p = audio.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        audioActivated = true;
        console.log("[audio] reproduciendo, gatillado por:", sourceEvent);
      }).catch((err) => {
        console.warn("[audio] play() rechazado en", sourceEvent, ":", err.message);
      });
    } else {
      audioActivated = true;
    }
  };

  const stopAudio = () => {
    if (!audio) return;
    try { audio.pause(); audio.currentTime = 0; } catch(_) {}
    audioActivated = false;
    audioDisabled = true;          // bloquea cualquier futura reproducción
    audio.src = "";                 // libera el recurso, ya no se puede recuperar
    audio.removeAttribute("src");
    console.log("[audio] detenido definitivamente");
  };

  const dismissIntro = () => {
    if (dismissed) return;
    dismissed = true;
    intro.classList.add("intro--leaving");
    document.body.classList.remove("intro-active");
    setTimeout(() => intro.classList.add("intro--gone"), 2000);
  };

  const registerStopListeners = () => {
    if (stopListenersRegistered) return;
    stopListenersRegistered = true;
    const stopAll = () => stopAudio();
    setTimeout(() => {
      window.addEventListener("click",    stopAll, { once: true });
      window.addEventListener("wheel",    stopAll, { once: true, passive: true });
      window.addEventListener("touchmove",stopAll, { once: true, passive: true });
      window.addEventListener("keydown",  stopAll, { once: true });
    }, 700);
  };

  // Handler unificado: en CADA evento intenta encender audio + cerrar intro + registrar stop
  const onAnyInteraction = (sourceEvent) => {
    if (!audioActivated) startAudio(sourceEvent);
    if (!dismissed) dismissIntro();
    if (audioActivated && !stopListenersRegistered) registerStopListeners();
  };

  // Solo CLICK / TAP activa el audio y abre la web (scroll deshabilitado)
  window.addEventListener("click",      () => onAnyInteraction("click"));
  window.addEventListener("pointerdown",() => onAnyInteraction("pointerdown"));
  window.addEventListener("touchstart", () => onAnyInteraction("touchstart"), { passive: true });
  window.addEventListener("touchend",   () => onAnyInteraction("touchend"));
  window.addEventListener("keydown",    (e) => {
    if (["Space","Enter"].includes(e.code)) onAnyInteraction("keydown:"+e.code);
  });
})();

// === Nav: ocultar al hacer scroll hacia abajo, mostrar al scrollear arriba ===
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const goingDown = y > lastY;
    // umbral mínimo para evitar parpadeo
    if (Math.abs(y - lastY) > 6) {
      if (goingDown && y > 80) {
        nav.classList.add("nav--hidden");
      } else {
        nav.classList.remove("nav--hidden");
      }
      lastY = y;
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

renderSabores();
renderCart();
