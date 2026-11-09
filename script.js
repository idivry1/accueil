const TIPS = [
 {t:"Détartrer une bouilloire",c:"Maison",m:30,s:["Remplissez la bouilloire à moitié d’eau et complétez avec autant de vinaigre blanc.","Portez à ébullition, puis laissez agir 30 minutes.","Videz, puis frottez les dépôts restants avec une éponge.","Faites bouillir de l’eau claire deux fois et jetez-la pour chasser l’odeur."]},
 {t:"Neutraliser les odeurs du frigo",c:"Maison",m:10,s:["Videz le frigo et lavez les parois à l’eau tiède avec un peu de bicarbonate.","Séchez soigneusement.","Placez un petit bol de bicarbonate de soude à l’intérieur.","Remplacez-le chaque mois."]},
 {t:"Garder le pain frais plus longtemps",c:"Cuisine",m:5,s:["Coupez le pain en tranches le jour de l’achat.","Mettez-les dans un sac de congélation en chassant l’air.","Congelez, puis sortez la quantité voulue.","Faites-les griller directement, sans décongeler."]},
 {t:"Conserver les herbes fraîches",c:"Cuisine",m:5,s:["Coupez le bas des tiges de persil ou de coriandre.","Plongez-les dans un verre d’eau, comme un bouquet.","Couvrez d’un sac et placez au frigo ; changez l’eau tous les deux jours.","Le basilic préfère la température ambiante, toujours dans un verre d’eau."]},
 {t:"La règle des 24 heures avant d’acheter",c:"Argent",m:1,s:["Pour un achat non essentiel, notez l’objet et son prix dans vos notes.","Attendez 24 heures avant de payer.","Demain, demandez-vous si vous le voulez encore.","Si oui, achetez l’esprit tranquille ; sinon, vous venez d’économiser."]},
 {t:"Traquer les abonnements oubliés",c:"Argent",m:20,s:["Ouvrez vos relevés bancaires des trois derniers mois.","Repérez tous les prélèvements qui reviennent chaque mois.","Pour chacun, demandez-vous : l’ai-je utilisé récemment ?","Résiliez ceux dont vous ne vous servez pas."]},
 {t:"Sauvegarder ses photos avec la règle 3-2-1",c:"Numérique",m:30,s:["Gardez 3 copies de vos fichiers importants.","Placez-les sur 2 supports différents (ordinateur et disque externe, par exemple).","Gardez 1 copie hors de chez vous, par exemple dans un cloud.","Une fois par an, vérifiez que vous pouvez rouvrir les copies."]},
 {t:"Protéger ses comptes en ligne",c:"Numérique",m:15,s:["Installez un gestionnaire de mots de passe.","Changez d’abord les mots de passe de votre messagerie et de votre banque : longs et uniques.","Activez la double authentification sur ces comptes.","Ne réutilisez jamais un mot de passe d’un site à l’autre."]}
];
const CATS = ["Maison","Cuisine","Argent","Numérique"];
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const cardHTML = x => `<article class="tip" data-cat="${x.c}"><p class="meta"><b>${x.c}</b> · ${x.m} min</p><h3>${esc(x.t)}</h3><details><summary>Voir les étapes</summary><ol>${x.s.map(e => `<li>${esc(e)}</li>`).join("")}</ol></details></article>`;
document.getElementById("yr").textContent = new Date().getFullYear();

const page = document.body.dataset.page;
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
if (page === "contact") {
  document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent(f.sujet.value + " — " + f.nom.value);
    location.href = `mailto:chmoud82@gmail.com?subject=${subject}&body=${encodeURIComponent(f.message.value)}`;
  });
}
