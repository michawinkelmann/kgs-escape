/* game.js – Escape-Room-Engine (Vanilla JS, offline-fähig)
   Puzzletypen:
   - code, mcq, dragdrop, switches, match, multi, dials, gate, end
*/

(function(){
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, attrs={}, children=[]) => {
    const n = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)){
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const c of children) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    return n;
  };

  const state = {
    stationId: GAME_CONFIG.startStationId,
    solved: new Set(),
    visitedOrder: [GAME_CONFIG.startStationId],
    inventory: [],
    hintsUsed: 0,
    timeLeftSec: GAME_CONFIG.totalMinutes * 60,
    selectedChoice: null,
    dragOrder: null,
    canContinue: false,
    gameOver: false,
  };

  const stationById = new Map(STATIONS.map(s => [s.id, s]));

  const ui = {
    gameTitle: $("#gameTitle"),
    gameSubtitle: $("#gameSubtitle"),
    timeLeft: $("#timeLeft"),
    hintsUsed: $("#hintsUsed"),
    hintLimit: $("#hintLimit"),
    progress: $("#progress"),
    footerText: $("#footerText"),
    placeTitle: $("#placeTitle"),
    placeBadge: $("#placeBadge"),
    story: $("#story"),
    puzzleTitle: $("#puzzleTitle"),
    puzzleHost: $("#puzzleHost"),
    feedback: $("#feedback"),
    btnSubmit: $("#btnSubmit"),
    btnContinue: $("#btnContinue"),
    btnBack: $("#btnBack"),
    btnHint: $("#btnHint"),
    btnReset: $("#btnReset"),
    inventory: $("#inventory"),
    journal: $("#journal"),
    debugPanel: $("#debugPanel"),
  };

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
  function formatTime(sec){
    sec = Math.max(0, Math.floor(sec));
    const m = Math.floor(sec/60);
    const s = sec % 60;
    return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  }
  function normalizeInput(str, mode){
    const raw = (str ?? "").toString();
    if (mode === "alnumUpper"){
      return raw.trim().replace(/\s+/g,"").replace(/[^a-z0-9]/gi,"").toUpperCase();
    }
    if (mode === "trimLower"){
      return raw.trim().toLowerCase();
    }
    return raw.trim();
  }
  function setFeedback(msg, kind=""){
    ui.feedback.textContent = msg || "";
    ui.feedback.className = "feedback" + (kind ? " " + kind : "");
  }
  function hasItem(itemId){ return state.inventory.some(it => it.id === itemId); }
  function addItems(items){
    for (const it of (items || [])){
      if (!hasItem(it.id)) state.inventory.push(it);
    }
  }
  function progressPercent(){
    const playable = STATIONS.filter(s => !["start","end"].includes(s.id));
    const solvedPlayable = playable.filter(s => state.solved.has(s.id)).length;
    return playable.length ? Math.round((solvedPlayable / playable.length) * 100) : 0;
  }

  function save(){
    const payload = {
      stationId: state.stationId,
      solved: Array.from(state.solved),
      visitedOrder: state.visitedOrder,
      inventory: state.inventory,
      hintsUsed: state.hintsUsed,
      timeLeftSec: state.timeLeftSec,
      ts: Date.now()
    };
    localStorage.setItem(GAME_CONFIG.storageKey, JSON.stringify(payload));
  }
  function load(){
    const raw = localStorage.getItem(GAME_CONFIG.storageKey);
    if (!raw) return false;
    try{
      const p = JSON.parse(raw);
      if (!p || !p.stationId) return false;
      state.stationId = p.stationId;
      state.solved = new Set(Array.isArray(p.solved) ? p.solved : []);
      state.visitedOrder = Array.isArray(p.visitedOrder) && p.visitedOrder.length ? p.visitedOrder : [GAME_CONFIG.startStationId];
      state.inventory = Array.isArray(p.inventory) ? p.inventory : [];
      state.hintsUsed = Number.isFinite(p.hintsUsed) ? p.hintsUsed : 0;
      state.timeLeftSec = Number.isFinite(p.timeLeftSec) ? p.timeLeftSec : GAME_CONFIG.totalMinutes * 60;
      return true;
    } catch {
      return false;
    }
  }
  function resetAll(){
    localStorage.removeItem(GAME_CONFIG.storageKey);
    state.stationId = GAME_CONFIG.startStationId;
    state.solved = new Set();
    state.visitedOrder = [GAME_CONFIG.startStationId];
    state.inventory = [];
    state.hintsUsed = 0;
    state.timeLeftSec = GAME_CONFIG.totalMinutes * 60;
    state.selectedChoice = null;
    state.dragOrder = null;
    state.canContinue = false;
    state.gameOver = false;
    setFeedback("");
    render();
    save();
  }

  let tickHandle = null;
  function startTimer(){
    if (tickHandle) clearInterval(tickHandle);
    tickHandle = setInterval(() => {
      if (state.gameOver) return;
      state.timeLeftSec -= 1;
      if (state.timeLeftSec <= 0){
        state.timeLeftSec = 0;
        gameOver();
      }
      updateTopbar();
      save();
    }, 1000);
  }
  function gameOver(){
    state.gameOver = true;
    setFeedback("Zeit abgelaufen. Reset drücken, um neu zu starten.", "bad");
    ui.btnSubmit.disabled = true;
    ui.btnHint.disabled = true;
    ui.btnContinue.disabled = true;
  }

  function updateTopbar(){
    ui.timeLeft.textContent = formatTime(state.timeLeftSec);
    ui.hintsUsed.textContent = String(state.hintsUsed);
    ui.hintLimit.textContent = String(GAME_CONFIG.hintLimit);
    ui.progress.textContent = String(progressPercent());
    ui.footerText.textContent = `${SCHOOL.name} • ${GAME_CONFIG.gameTitle} • gespeichert im Browser`;
  }

  function renderInventory(){
    ui.inventory.innerHTML = "";
    if (!state.inventory.length){
      ui.inventory.appendChild(el("li", {}, [
        el("span", { class: "muted" }, ["(noch leer)"]),
        el("span", { class: "tag" }, ["–"])
      ]));
      return;
    }
    for (const it of state.inventory){
      ui.inventory.appendChild(el("li", {}, [
        el("span", {}, [it.name]),
        el("span", { class: "tag" }, [it.tag || "Item"])
      ]));
    }
  }

  function renderJournal(){
    ui.journal.innerHTML = "";
    const ids = state.visitedOrder.filter(id => stationById.has(id));
    ids.forEach((id) => {
      const s = stationById.get(id);
      const btn = el("button", {
        class: "jbtn" + (id === state.stationId ? " active" : ""),
        type: "button",
        onclick: () => {
          state.stationId = id;
          state.canContinue = state.solved.has(id) || stationById.get(id)?.puzzle?.type === "gate";
          render();
        }
      }, [
        el("div", {}, [s.title]),
        el("span", { class: "jmeta" }, [s.badge || "Station"])
      ]);
      ui.journal.appendChild(btn);
    });
  }

  function markVisited(id){
    if (!state.visitedOrder.includes(id)) state.visitedOrder.push(id);
  }

  function render(){
    const station = stationById.get(state.stationId);
    if (!station){
      setFeedback("Unbekannte Station. Reset drücken.", "bad");
      return;
    }
    markVisited(station.id);

    ui.gameTitle.textContent = GAME_CONFIG.gameTitle;
    ui.gameSubtitle.textContent = GAME_CONFIG.gameSubtitle;
    ui.placeTitle.textContent = station.title;
    ui.placeBadge.textContent = station.badge || "Station";
    ui.story.innerHTML = station.storyHtml || "";
    ui.puzzleTitle.textContent = station.puzzle?.title || "Rätsel";

    state.selectedChoice = null;
    state.dragOrder = null;
    state.canContinue = false;

    ui.btnContinue.disabled = true;
    ui.btnSubmit.disabled = false;
    ui.btnHint.disabled = false;
    ui.btnBack.disabled = state.visitedOrder.length <= 1;
    setFeedback("");

    const missing = (station.requiresItems || []).filter(req => !hasItem(req));
    if (missing.length){
      ui.puzzleHost.innerHTML = "";
      ui.puzzleHost.appendChild(el("div", { class: "callout", html:
        `<strong>Gesperrt:</strong> Dir fehlt: <code>${missing.join(", ")}</code>.<br/>
         <span class="muted">Nutze Journal/Zurück, um fehlende Items zu holen.</span>`
      }));
      ui.btnSubmit.disabled = true;
    } else {
      renderPuzzle(station);
    }

    updateTopbar();
    renderInventory();
    renderJournal();
    save();
    renderDebug();
  }

  function renderPuzzle(station){
    const p = station.puzzle || { type: "code" };
    ui.puzzleHost.innerHTML = "";

    if (p.type === "code"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "Gib die Lösung ein." }));
      ui.puzzleHost.appendChild(el("input", {
        class: "input",
        id: "answerInput",
        type: "text",
        autocomplete: "off",
        spellcheck: "false",
        placeholder: "Antwort eingeben…"
      }));
      $("#answerInput")?.addEventListener("keydown", (e) => { if (e.key === "Enter") onSubmit(); });
      return;
    }

    if (p.type === "mcq"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      const grid = el("div", { class: "choiceGrid", id: "choiceGrid" });
      (p.choices || []).forEach((c, i) => {
        grid.appendChild(el("button", { class: "choice", type: "button", onclick: () => selectChoice(i) }, [c]));
      });
      ui.puzzleHost.appendChild(grid);
      return;
    }

    if (p.type === "dragdrop"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      const list = el("ul", { class: "dragList", id: "dragList" });
      state.dragOrder = (p.items || []).slice();
      state.dragOrder.forEach((label, idx) => {
        list.appendChild(el("li", { class: "dragItem", draggable: "true", "data-idx": String(idx) }, [
          el("div", { class: "dragHandle", title: "ziehen" }, ["≡"]),
          el("div", {}, [label])
        ]));
      });
      enableDnD(list);
      ui.puzzleHost.appendChild(list);
      ui.puzzleHost.appendChild(el("p", { class: "muted" }, [
        "Falls Drag&Drop auf einem PC nicht klappt: nutzt Journal/Debug oder ersetzt den Puzzletyp durch MCQ."
      ]));
      return;
    }

    if (p.type === "switches"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      const wrap = el("div", { class: "switches", id: "switchWrap" });
      (p.options || []).forEach((label, idx) => {
        const id = `sw_${idx}`;
        const checkbox = el("input", { type: "checkbox", id });
        wrap.appendChild(el("label", { class: "switch", for: id }, [ el("span", {}, [label]), checkbox ]));
      });
      ui.puzzleHost.appendChild(wrap);
      return;
    }

    if (p.type === "match"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      const table = el("table", { class: "table", id: "matchTable" });
      const thead = el("thead", {}, [ el("tr", {}, [ el("th", {}, ["Begriff"]), el("th", {}, ["Auswahl"]) ]) ]);
      const tbody = el("tbody");
      (p.rows || []).forEach((row, idx) => {
        const select = el("select", { class: "select", id: `match_${idx}` });
        (p.options || []).forEach(opt => select.appendChild(el("option", { value: opt }, [opt])));
        tbody.appendChild(el("tr", {}, [ el("td", {}, [row.left]), el("td", {}, [select]) ]));
      });
      table.appendChild(thead); table.appendChild(tbody);
      ui.puzzleHost.appendChild(table);
      return;
    }

    if (p.type === "multi"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      const grid = el("div", { class: "grid", id: "multiGrid" });
      (p.fields || []).forEach((f) => {
        const input = el("input", {
          class: "input",
          id: `mf_${f.id}`,
          type: "text",
          autocomplete: "off",
          spellcheck: "false",
          placeholder: f.placeholder || ""
        });
        grid.appendChild(el("div", { class: "field" }, [
          el("label", { for: `mf_${f.id}` }, [f.label || f.id]),
          input
        ]));
      });
      ui.puzzleHost.appendChild(grid);
      ui.puzzleHost.querySelectorAll("input").forEach(inp => inp.addEventListener("keydown", (e)=>{ if (e.key==="Enter") onSubmit(); }));
      return;
    }

    if (p.type === "dials"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      const digits = clamp(Number(p.digits || 4), 1, 8);
      const grid = el("div", { class: "grid", id: "dialGrid" });
      for (let i=0;i<digits;i++){
        const sel = el("select", { class: "select", id: `dial_${i}` });
        for (let d=0; d<=9; d++) sel.appendChild(el("option", { value: String(d) }, [String(d)]));
        grid.appendChild(el("div", { class: "field" }, [ el("label", {}, [`Ziffer ${i+1}`]), sel ]));
      }
      ui.puzzleHost.appendChild(grid);
      return;
    }

    if (p.type === "gate"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      ui.btnSubmit.disabled = true;
      ui.btnContinue.disabled = false;
      state.canContinue = true;
      return;
    }

    if (p.type === "end"){
      ui.puzzleHost.appendChild(el("p", { class: "muted", html: p.prompt || "" }));
      ui.btnSubmit.disabled = true;
      ui.btnContinue.disabled = true;
      ui.btnHint.disabled = true;
      return;
    }

    ui.puzzleHost.appendChild(el("p", { class: "muted" }, ["Unbekannter Puzzletyp: " + p.type]));
  }

  function selectChoice(i){
    state.selectedChoice = i;
    const grid = $("#choiceGrid");
    if (!grid) return;
    [...grid.querySelectorAll(".choice")].forEach((b, idx) => b.classList.toggle("selected", idx === i));
  }

  function enableDnD(list){
    list.addEventListener("dragstart", (e) => {
      const li = e.target.closest(".dragItem");
      if (!li) return;
      const from = Number(li.getAttribute("data-idx"));
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(from));
    });
    list.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; });
    list.addEventListener("drop", (e) => {
      e.preventDefault();
      const target = e.target.closest(".dragItem");
      if (!target) return;
      const from = Number(e.dataTransfer.getData("text/plain"));
      const to = Number(target.getAttribute("data-idx"));
      if (!Number.isFinite(from) || !Number.isFinite(to) || from === to) return;

      const arr = state.dragOrder.slice();
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      state.dragOrder = arr;

      const st = stationById.get(state.stationId);
      const p = st?.puzzle;
      if (p && p.type === "dragdrop") p.items = state.dragOrder.slice();
      render();
    });
  }

  function checkPuzzle(p){
    if (p.type === "code"){
      const inp = $("#answerInput");
      const got = normalizeInput(inp ? inp.value : "", p.normalize || "trimLower");
      const want = normalizeInput(p.answer || "", p.normalize || "trimLower");
      return got.length > 0 && got === want;
    }
    if (p.type === "mcq") return state.selectedChoice === p.correctIndex;

    if (p.type === "dragdrop"){
      const got = (state.dragOrder || p.items || []).slice();
      const want = (p.correctOrder || []).slice();
      if (got.length !== want.length) return false;
      for (let i=0;i<got.length;i++) if (got[i] !== want[i]) return false;
      return true;
    }

    if (p.type === "switches"){
      const on = [];
      (p.options || []).forEach((_, idx) => { if ($(`#sw_${idx}`)?.checked) on.push(idx); });
      const want = (p.correctOn || []).slice().sort((a,b)=>a-b);
      const got = on.slice().sort((a,b)=>a-b);
      if (want.length !== got.length) return false;
      for (let i=0;i<want.length;i++) if (want[i] !== got[i]) return false;
      return true;
    }

    if (p.type === "match"){
      const rows = p.rows || [];
      for (let i=0;i<rows.length;i++){
        if (($(`#match_${i}`)?.value || "") !== rows[i].answer) return false;
      }
      return true;
    }

    if (p.type === "multi"){
      for (const f of (p.fields || [])){
        const got = normalizeInput($(`#mf_${f.id}`)?.value || "", f.normalize || "trimLower");
        const want = normalizeInput(f.answer || "", f.normalize || "trimLower");
        if (!got || got !== want) return false;
      }
      return true;
    }

    if (p.type === "dials"){
      const digits = clamp(Number(p.digits || 4), 1, 8);
      let got = "";
      for (let i=0;i<digits;i++) got += ($(`#dial_${i}`)?.value || "0");
      return got === String(p.answer || "");
    }

    if (p.type === "gate") return true;
    return false;
  }

  function onSubmit(){
    if (state.gameOver) return;
    const station = stationById.get(state.stationId);
    if (!station) return;

    const missing = (station.requiresItems || []).filter(req => !hasItem(req));
    if (missing.length){
      setFeedback("Gesperrt: Dir fehlt ein Item. Schau ins Inventar.", "warn");
      return;
    }

    const ok = checkPuzzle(station.puzzle || {});
    if (ok){
      state.solved.add(station.id);
      addItems(station.rewardItems || []);
      state.canContinue = true;
      ui.btnContinue.disabled = false;
      ui.btnSubmit.disabled = true;
      setFeedback("Richtig! Weiter…", "ok");
      renderInventory(); renderJournal(); updateTopbar(); save();
    } else {
      setFeedback("Noch nicht. Probiert es nochmal.", "bad");
    }
  }

  function onContinue(){
    if (state.gameOver) return;
    const station = stationById.get(state.stationId);
    if (!station) return;

    if (!state.canContinue && station.puzzle?.type !== "gate"){
      setFeedback("Erst lösen, dann weiter.", "warn");
      return;
    }
    if (!station.nextId){
      setFeedback("Kein nächster Abschnitt. Reset?", "warn");
      return;
    }
    state.stationId = station.nextId;
    state.canContinue = false;
    render();
  }

  function onBack(){
    if (state.visitedOrder.length <= 1) return;
    const idx = state.visitedOrder.lastIndexOf(state.stationId);
    if (idx > 0){
      state.stationId = state.visitedOrder[idx - 1];
      state.canContinue = state.solved.has(state.stationId);
      render();
    }
  }

  function onHint(){
    if (state.gameOver) return;
    const station = stationById.get(state.stationId);
    if (!station) return;

    if (state.hintsUsed >= GAME_CONFIG.hintLimit){
      setFeedback("Hinweis-Limit erreicht.", "warn");
      return;
    }

    const hintIndex = station.__hintIndex ?? 0;
    const hint = (station.hints || [])[hintIndex] || "Kein weiterer Hinweis.";
    station.__hintIndex = hintIndex + 1;

    state.hintsUsed += 1;
    state.timeLeftSec = clamp(state.timeLeftSec - GAME_CONFIG.hintPenaltySeconds, 0, 999999);
    updateTopbar(); save();
    setFeedback("Hinweis: " + hint + `  (-${Math.floor(GAME_CONFIG.hintPenaltySeconds/60)}:${String(GAME_CONFIG.hintPenaltySeconds%60).padStart(2,"0")})`, "warn");
  }

  function renderDebug(){
    const url = new URL(window.location.href);
    const debug = url.searchParams.get("debug") === "1";
    ui.debugPanel.hidden = !debug;
    if (!debug) return;

    ui.debugPanel.innerHTML = "";
    ui.debugPanel.appendChild(el("p", { class: "muted" }, ["Sprung zu Station:"]));

    const select = el("select", { class: "select", id: "debugSelect" });
    STATIONS.forEach(s => select.appendChild(el("option", { value: s.id }, [`${s.badge || ""} – ${s.title}`])));
    select.value = state.stationId;

    const btn = el("button", { class: "btn btn--secondary", type: "button", onclick: () => {
      state.stationId = select.value;
      state.canContinue = state.solved.has(state.stationId);
      markVisited(state.stationId);
      render();
    }}, ["Springen"]);

    ui.debugPanel.appendChild(select);
    ui.debugPanel.appendChild(btn);
  }

  ui.btnSubmit.addEventListener("click", onSubmit);
  ui.btnContinue.addEventListener("click", onContinue);
  ui.btnBack.addEventListener("click", onBack);
  ui.btnHint.addEventListener("click", onHint);
  ui.btnReset.addEventListener("click", resetAll);

  const hadSave = load();
  render();
  startTimer();
  window.addEventListener("beforeunload", save);

  if (hadSave) setFeedback("Spielstand geladen (Reset löscht ihn).", "warn");
})();
