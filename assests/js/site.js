/* Renders the page from window.SITE (assets/data/content.js) + window.KPIS */
(function () {
  "use strict";
  var S = window.SITE, K = window.KPIS || {}, P = S.person;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fmt = function (n) { return n >= 1e6 ? (n / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M" : n >= 1e4 ? Math.round(n / 1e3) + "k" : n.toLocaleString("en-CA"); };

  /* simple bindings */
  document.querySelectorAll("[data-bind]").forEach(function (el) { var v = P[el.dataset.bind]; if (v != null) el.textContent = v; });
  $("#heroImg").src = P.images.hero;
  $("#year").textContent = new Date().getFullYear();

  /* nav */
  var links = [["#work", "Work"]].concat(S.doors.map(function (d) { return ["#" + d.id, d.title]; })).concat([["#story", "My story"], ["#contact", "Contact"]]);
  var navShort = [["#top", "Home"], ["#work", "Work"], ["#story", "My story"], ["#contact", "Contact"]];
  $("#navLinks").innerHTML = navShort.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("");
  $("#mobileMenu").innerHTML = [["#top", "Home"]].concat(links).map(function (l) { return '<a href="' + l[0] + '">' + esc(l[1]) + "</a>"; }).join("");
  var menuBtn = $("#menuBtn"), mm = $("#mobileMenu");
  menuBtn.addEventListener("click", function () { mm.hidden = !mm.hidden; menuBtn.setAttribute("aria-expanded", String(!mm.hidden)); });
  mm.addEventListener("click", function (e) { if (e.target.tagName === "A") { mm.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); } });

  /* clock */
  function tick() {
    var now = new Date();
    try {
      var t = now.toLocaleTimeString("en-CA", { timeZone: P.timezone, hour: "numeric", minute: "2-digit" }).replace(/\s?([ap])\.?m\.?/i, function (m, a) { return a.toLowerCase() + "m"; });
      var d = now.toLocaleDateString("en-GB", { timeZone: P.timezone, day: "numeric", month: "long", year: "numeric" });
      $("#clockTime").textContent = t; $("#clockDate").textContent = d; $("#footTime").textContent = t;
    } catch (e) { $("#clockTime").textContent = now.toTimeString().slice(0, 5); }
  }
  tick(); setInterval(tick, 15000);

  /* flip card */
  $("#rings").innerHTML = new Array(12).fill("<i></i>").join("");
  var ri = 0, page = $("#flipPage"), word = $("#flipWord"), count = $("#flipCount"), total = S.roles.length;
  function setRole(i) { word.textContent = S.roles[i]; count.textContent = pad(i + 1) + " / " + pad(total); }
  setRole(0);
  if (!reduce) setInterval(function () {
    ri = (ri + 1) % total; page.classList.remove("is-flipping"); void page.offsetWidth; page.classList.add("is-flipping");
    setTimeout(function () { setRole(ri); }, 250);
  }, 2600);

  /* tools marquee */
  var tools = S.skills.technical.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
  $("#tools").innerHTML = tools + '<span aria-hidden="true" style="display:contents">' + tools + "</span>";

  /* doors */
  /* painted artwork for each dock door (stroke = paint colour) */
  var ART = {
    bi: '<rect x="14" y="60" width="12" height="26" rx="1.5"/><rect x="32" y="44" width="12" height="42" rx="1.5"/><rect x="50" y="52" width="12" height="34" rx="1.5"/><rect x="68" y="30" width="12" height="56" rx="1.5"/><polyline points="10,44 32,26 54,34 84,10"/><circle cx="84" cy="10" r="3.5" class="fill"/>',
    eng: '<circle cx="14" cy="50" r="8"/><circle cx="48" cy="22" r="8"/><circle cx="48" cy="78" r="8"/><circle cx="86" cy="50" r="8" class="fill"/><path d="M21 45 L40 27 M21 55 L40 73 M56 26 L79 45 M56 74 L79 55"/><path d="M73 40 L79 45 L71 47 M73 60 L79 55 L71 53"/>',
    stream: '<path d="M6 30 q11 -14 22 0 t22 0 t22 0 t22 0"/><path d="M6 52 q11 -14 22 0 t22 0 t22 0 t22 0"/><path d="M6 74 q11 -14 22 0 t22 0 t22 0 t22 0"/><circle cx="94" cy="52" r="4" class="fill"/>',
    ml: '<g class="thin"><path d="M14 22 L50 14 M14 22 L50 38 M14 22 L50 62 M14 22 L50 86 M14 50 L50 14 M14 50 L50 38 M14 50 L50 62 M14 50 L50 86 M14 78 L50 14 M14 78 L50 38 M14 78 L50 62 M14 78 L50 86 M50 14 L86 36 M50 38 L86 36 M50 62 L86 36 M50 86 L86 36 M50 14 L86 64 M50 38 L86 64 M50 62 L86 64 M50 86 L86 64"/></g><circle cx="14" cy="22" r="5" class="fill"/><circle cx="14" cy="50" r="5" class="fill"/><circle cx="14" cy="78" r="5" class="fill"/><circle cx="50" cy="14" r="5"/><circle cx="50" cy="38" r="5"/><circle cx="50" cy="62" r="5"/><circle cx="50" cy="86" r="5"/><circle cx="86" cy="36" r="6" class="fill"/><circle cx="86" cy="64" r="6"/>',
    certs: '<path d="M38 58 L28 92 L40 84 L46 96 L52 64 M62 58 L72 92 L60 84 L54 96 L48 64"/><circle cx="50" cy="38" r="26"/><circle cx="50" cy="38" r="18" class="thin"/><path class="fill" d="M50 26 l3.6 7.4 8.1 1.2 -5.9 5.7 1.4 8.1 -7.2 -3.8 -7.2 3.8 1.4 -8.1 -5.9 -5.7 8.1 -1.2z"/>'
  };
  var STENCIL = { bi: "BI", eng: "ETL", stream: "LIVE", ml: "ML", certs: "CERT" };
  $("#dock").innerHTML = S.doors.map(function (d, i) {
    var n = d.certs ? S.certs.length : d.projects.length;
    return '<button class="door" type="button" style="--tint:var(--door-' + ((i % 5) + 1) + ')" data-door="' + d.id + '" aria-label="Open ' + esc(d.title) + ' (' + n + (d.certs ? " certificates" : " projects") + ')">' +
      '<div class="door__bay"><span class="door__plate">DOOR ' + pad(i + 1) + '</span><span class="door__lamp" aria-hidden="true"></span><div class="door__opening">' +
      '<div class="door__inside"><span class="mono">' + (d.certs ? "Certificates" : "Projects loaded") + '</span><span class="big">' + pad(n) + '</span><span class="mono">' + esc(d.kicker) + "</span></div>" +
      '<div class="door__shutter" aria-hidden="true"><span class="door__num">' + pad(i + 1) + '</span><span class="door__code">' + (STENCIL[d.id] || "") + '</span>' +
      '<svg class="door__art" viewBox="0 0 100 100">' + (ART[d.id] || "") + '</svg><span class="door__sticker">Pull to open ↑</span></div></div><div class="door__bumper"></div></div>' +
      '<div class="door__meta"><strong>' + esc(d.title) + "</strong><span>" + esc(d.kicker) + "</span></div></button>";
  }).join("");
  $("#footWork").innerHTML = S.doors.map(function (d) { return '<li><a href="#' + d.id + '">' + esc(d.title) + "</a></li>"; }).join("");

  /* charts */
  function lineChart(obj, label) {
    var keys = Object.keys(obj), vals = keys.map(function (k) { return obj[k]; }), max = Math.max.apply(null, vals);
    var W = 600, H = 200, pl = 46, pb = 22, pt = 10;
    var x = function (i) { return pl + i * (W - pl - 6) / (vals.length - 1); }, y = function (v) { return pt + (H - pt - pb) * (1 - v / max); };
    var pts = vals.map(function (v, i) { return x(i).toFixed(1) + "," + y(v).toFixed(1); }).join(" ");
    var grid = [0, .5, 1].map(function (f) { var v = Math.round(max * f); return '<line x1="' + pl + '" x2="' + W + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--line)" fill="none"/><text x="' + (pl - 4) + '" y="' + (y(v) + 3) + '" text-anchor="end">' + fmt(v) + "</text>"; }).join("");
    var ticks = [0, Math.floor(vals.length / 2), vals.length - 1].map(function (i) { return '<text x="' + x(i) + '" y="' + (H - 4) + '" text-anchor="' + (i === 0 ? "start" : i === vals.length - 1 ? "end" : "middle") + '">' + keys[i] + "</text>"; }).join("");
    var mi = vals.indexOf(max);
    return '<div class="chart"><div class="chart__title"><span>' + label + '</span><span>peak ' + keys[mi] + "</span></div>" +
      '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + label + '">' + grid +
      '<polygon points="' + x(0) + "," + y(0) + " " + pts + " " + x(vals.length - 1) + "," + y(0) + '" fill="var(--accent-soft)"/>' +
      '<polyline points="' + pts + '" fill="none" stroke="var(--accent)" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<circle cx="' + x(mi) + '" cy="' + y(max) + '" r="3.2" fill="var(--accent)"/>' + ticks + "</svg></div>";
  }
  function barChart(obj, label) {
    var keys = Object.keys(obj), vals = keys.map(function (k) { return obj[k]; }), max = Math.max.apply(null, vals);
    var W = 600, H = 200, pl = 46, pb = 22, pt = 10, bw = (W - pl) / vals.length;
    var y = function (v) { return pt + (H - pt - pb) * (1 - v / max); };
    var grid = [0, .5, 1].map(function (f) { var v = Math.round(max * f); return '<line x1="' + pl + '" x2="' + W + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--line)" fill="none"/><text x="' + (pl - 4) + '" y="' + (y(v) + 3) + '" text-anchor="end">' + fmt(v) + "</text>"; }).join("");
    var bars = vals.map(function (v, i) { var bx = pl + i * bw + bw * .18; return '<rect x="' + bx.toFixed(1) + '" y="' + y(v).toFixed(1) + '" width="' + (bw * .64).toFixed(1) + '" height="' + (y(0) - y(v)).toFixed(1) + '" rx="2" fill="var(--accent)" opacity="' + (v === max ? 1 : .55) + '"/><text x="' + (bx + bw * .32).toFixed(1) + '" y="' + (H - 4) + '" text-anchor="middle">' + keys[i].slice(0, 1) + "</text>"; }).join("");
    return '<div class="chart"><div class="chart__title"><span>' + label + "</span><span>Jan–Dec</span></div>" + '<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + label + '">' + grid + bars + "</svg></div>";
  }
  function hbars(obj, label, prefix) {
    var keys = Object.keys(obj), max = Math.max.apply(null, keys.map(function (k) { return obj[k]; }));
    return '<div class="chart"><div class="chart__title"><span>' + label + '</span></div><div class="bars-h">' + keys.map(function (k) {
      return "<div><span>" + esc(k.replace(/_/g, " ")) + '</span><i style="width:' + (obj[k] / max * 100).toFixed(1) + '%"></i><em>' + (prefix || "") + fmt(obj[k]) + "</em></div>";
    }).join("") + "</div></div>";
  }
  function kpiBlock(key) {
    var k = K[key]; if (!k) return "";
    var tiles = key === "olist"
      ? [[k.orders.toLocaleString("en-CA"), "orders"], ["R$" + fmt(k.gmv), "GMV"], [k.avg_delivery_days + " d", "avg delivery"], [k.avg_review + " / 5", "avg review"], [k.late_pct + "%", "late deliveries"]]
      : [[fmt(k.revenue), "revenue"], [k.orders.toLocaleString("en-CA"), "orders"], [Math.round(k.aov).toLocaleString("en-CA"), "avg order value"], [k.qty.toLocaleString("en-CA"), "units sold"]];
    var charts = key === "olist"
      ? lineChart(k.monthly_orders, "Orders per month, 2017–2018") + hbars(k.top_categories, "GMV by category (top 6)", "R$")
      : barChart(k.monthly, "Revenue by month, 2023") + hbars(k.region, "Revenue by region");
    return '<div class="kpis">' + tiles.map(function (t) { return "<div class=\"kpi\"><b>" + t[0] + "</b><span>" + t[1] + "</span></div>"; }).join("") + "</div>" + charts +
      '<span class="mono muted" style="font-size:.6rem">Figures computed from the report\'s data model</span>';
  }

  /* room */
  var room = $("#room"), body = $("#roomBody"), lastDoor = null;
  function caseHTML(p) {
    var media = "";
    if (p.image) media += '<button class="shot" type="button" data-zoom="' + p.image + '" style="padding:0;cursor:zoom-in"><img src="' + p.image + '" alt="Screenshot: ' + esc(p.title) + '" loading="lazy"></button>';
    if (p.gallery) media += '<div class="thumbs">' + p.gallery.map(function (g) { return '<button type="button" data-zoom="' + g + '"><img src="' + g + '" alt="More from ' + esc(p.title) + '" loading="lazy"></button>'; }).join("") + "</div>";
    if (p.stats) media += '<div class="kpis">' + p.stats.map(function (t) { return '<div class="kpi"><b>' + esc(t[0]) + "</b><span>" + esc(t[1]) + "</span></div>"; }).join("") + "</div>";
    if (p.kpis) media += kpiBlock(p.kpis);
    var bodyH = '<div class="case__body"><span class="mono case__label">' + esc(p.label) + "</span><h3>" + esc(p.title) + '</h3><p class="case__sub">' + esc(p.sub) + '</p><p class="case__text">' + esc(p.text) + '</p><div class="case__tags">' +
      p.tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>" +
      (p.links ? '<div class="case__links">' + p.links.map(function (l) { return '<a href="' + l.href + '" target="_blank" rel="noopener">' + esc(l.label) + " ↗</a>"; }).join("") + "</div>" : "") + "</div>";
    return '<article class="case' + (media ? "" : " case--plain") + '">' + bodyH + (media ? '<div class="case__media">' + media + "</div>" : "") + "</article>";
  }
  function openRoom(id, push) {
    var i = S.doors.findIndex(function (d) { return d.id === id; }); if (i < 0) return;
    var d = S.doors[i];
    $("#roomDoor").textContent = "DOOR " + pad(i + 1) + " / " + pad(S.doors.length);
    $("#roomKicker").textContent = d.kicker; $("#roomTitle").textContent = d.title; $("#roomBlurb").textContent = d.blurb;
    body.innerHTML = d.certs
      ? '<div class="certs">' + S.certs.map(function (c) { return '<button class="cert" type="button" data-zoom="' + c.image + '"><img src="' + c.image + '" alt="' + esc(c.title) + ' certificate" loading="lazy"><strong>' + esc(c.title) + "</strong><span>" + esc(c.org) + " · " + esc(c.date) + "</span></button>"; }).join("") + "</div>"
      : '<div class="room__list">' + d.projects.map(function (k) { return caseHTML(S.projects[k]); }).join("") + "</div>";
    if (!room.open) room.showModal();
    room.scrollTop = 0;
    if (push && location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  }
  function closeRoom() { if (room.open) room.close(); }
  room.addEventListener("close", function () {
    if (S.doors.some(function (d) { return "#" + d.id === location.hash; })) history.replaceState(null, "", "#work");
    if (lastDoor) lastDoor.focus();
  });
  $("#roomClose").addEventListener("click", closeRoom);
  $("#dock").addEventListener("click", function (e) { var b = e.target.closest(".door"); if (b) { lastDoor = b; openRoom(b.dataset.door, true); } });
  function route() { var h = location.hash.slice(1); if (S.doors.some(function (d) { return d.id === h; })) openRoom(h, false); else closeRoom(); }
  window.addEventListener("hashchange", route);
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var h = a.getAttribute("href").slice(1);
    if (S.doors.some(function (d) { return d.id === h; })) { e.preventDefault(); openRoom(h, true); }
    else if (room.open && h) closeRoom();
  });

  /* lightbox */
  var lb = $("#lightbox");
  document.addEventListener("click", function (e) { var z = e.target.closest("[data-zoom]"); if (!z) return; $("#lightImg").src = z.dataset.zoom; $("#lightImg").alt = (z.querySelector("img") || {}).alt || ""; lb.showModal(); });
  $("#lightClose").addEventListener("click", function () { lb.close(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });

  /* ability card */
  var ab = $("#ability"), A = S.abilityCard;
  $("#acard").innerHTML = '<div class="acard__top"><strong>' + esc(P.name) + '</strong><span class="acard__hp">LVL ' + new Date().getFullYear() % 100 + "</span></div>" +
    '<div class="acard__img"><img src="' + P.images.hero + '" alt=""></div><p class="acard__type">' + esc(P.headline) + " · " + esc(P.location) + "</p>" +
    A.stats.map(function (s) { return '<div class="stat"><span>' + esc(s.label) + '</span><i><b style="width:' + s.value + '%"></b></i><em>' + s.value + "</em></div>"; }).join("") +
    '<div class="acard__moves">' + A.moves.map(function (m) { return "<div>" + esc(m) + "</div>"; }).join("") + "</div>" +
    '<div class="acard__moves" style="border:0;padding:0"><span class="mono muted" style="font-size:.6rem">Speaks ' + P.languages.join(" · ") + "</span></div>" +
    '<button class="btn btn--dark acard__close" type="button" id="abClose" style="padding:0 1.2rem">Close card</button>';
  $("#abilityBtn").addEventListener("click", function () { ab.showModal(); });
  ab.addEventListener("click", function (e) { if (e.target === ab || e.target.id === "abClose") ab.close(); });
  $("#heroFigure").addEventListener("click", function (e) { if (e.target.tagName === "IMG") this.classList.toggle("is-color"); });

  /* story */
  var tl = $("#timeline");
  tl.innerHTML = S.story.map(function (s, i) {
    return '<li data-i="' + i + '"' + (i === 0 ? ' class="is-active"' : "") + '><span class="mono">' + esc(s.when) + "</span><h3>" + esc(s.title) + '</h3><span class="org">' + esc(s.org) + "</span><ul>" +
      s.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></li>";
  }).join("");
  $("#storyTotal").textContent = pad(S.story.length);
  var items = tl.querySelectorAll(":scope > li"), mark = $("#storyMark"), cur = -1;
  function setStory(i) {
    if (i === cur) return; cur = i;
    items.forEach(function (li, j) { li.classList.toggle("is-active", j === i); });
    $("#storyIdx").textContent = pad(i + 1); $("#storyWhen").textContent = S.story[i].when;
    $("#storyBar").style.width = ((i + 1) / S.story.length * 100) + "%";
    mark.classList.add("is-rolling");
    setTimeout(function () { mark.firstChild.textContent = S.story[i].mark; mark.classList.remove("is-rolling"); }, reduce ? 0 : 220);
  }
  setStory(0);
  function onScroll() {
    var mid = window.innerHeight * .45, best = 0;
    items.forEach(function (li, j) { if (li.getBoundingClientRect().top < mid) best = j; });
    setStory(best);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* contact */
  $("#emailText").textContent = P.email;
  $("#mailBtn").href = "mailto:" + P.email; $("#liBtn").href = P.linkedin; $("#ghBtn").href = P.github;
  $("#copyEmail").addEventListener("click", function () {
    var btn = this;
    var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy email"; }, 1800); };
    try { navigator.clipboard.writeText(P.email).then(done, sel); } catch (e) { sel(); }
    function sel() { var r = document.createRange(); r.selectNodeContents($("#emailText")); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Press Ctrl+C"; }
  });

  route();
})();
