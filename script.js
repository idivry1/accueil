const CATS = ["Maison","Cuisine","Argent","Numérique"];
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const cardHTML = x => `<article class="tip" data-cat="${esc(x.c)}"><p class="meta"><b>${esc(x.c)}</b> · ${esc(x.m)} min</p><h3>${esc(x.t)}</h3><details><summary>Voir les étapes</summary><ol>${x.s.map(e => `<li>${esc(e)}</li>`).join("")}</ol></details></article>`;
document.getElementById("yr").textContent = new Date().getFullYear();
const page = document.body.dataset.page;

/* Les astuces sont lues dans tips.json (la plus récente en premier). */
function init(TIPS) {
  if (page === "home") {
    document.getElementById("latest").innerHTML = TIPS.slice(0, 3).map(cardHTML).join("");
  }
  if (page === "tips") {
    const params = new URLSearchParams(location.search);
    let cat = CATS.includes(params.get("cat")) ? params.get("cat") : "";
    const q = document.getElementById("q"); q.value = params.get("q") || "";
    const chips = document.getElementById("chips"), list = document.getElementById("list"), count = document.getElementById("count");
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    function draw() {
      chips.innerHTML = ["", ...CATS].map(c => `<li><button type="button" class="chip" data-cat="${c}" aria-pressed="${c === cat}">${c || "Toutes"}</button></li>`).join("");
      const term = norm(q.value.trim());
      const res = TIPS.filter(x => (!cat || x.c === cat) && (!term || norm(x.t + " " + x.s.join(" ")).includes(term)));
      count.textContent = res.length + (res.length > 1 ? " astuces" : " astuce");
      list.innerHTML = res.length ? res.map(cardHTML).join("") : `<p class="empty">Aucune astuce trouvée. Essayez un autre mot ou une autre catégorie.</p>`;
    }
    chips.addEventListener("click", e => { const b = e.target.closest("button"); if (b) { cat = b.dataset.cat; draw(); } });
    q.addEventListener("input", draw);
    draw();
  }
}

if (page === "home" || page === "tips") {
  fetch("tips.json", {cache: "no-cache"})
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(init)
    .catch(() => {
      const box = document.getElementById(page === "home" ? "latest" : "list");
      box.innerHTML = `<p class="empty">Impossible de charger les astuces. Ouvrez le site depuis son adresse en ligne (GitHub Pages), pas depuis un fichier local.</p>`;
    });
}

if (page === "contact") {
  document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent(f.sujet.value + " — " + f.nom.value);
    location.href = `mailto:chmoud82@gmail.com?subject=${subject}&body=${encodeURIComponent(f.message.value)}`;
  });
}
