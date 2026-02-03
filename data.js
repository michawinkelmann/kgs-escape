/* data.js
   Vollversion (ca. 3 Stunden). Inhalte sind “typische Schulorte”, Lehrkräfte bleiben Platzhalter.
   Schülernamen sind fiktiv/rollenbasiert.
*/

const SCHOOL = {
  name: "KGS Schwarmstedt",
  places: [
    "Hauptflur", "Computerraum", "Bibliothek", "Chemiesammlung", "Physikraum",
    "Biologieraum", "Lehrerzimmer", "Musikraum", "Kunstraum", "Sporthalle",
    "Mensa", "Hausmeisterkeller", "Werkraum/Technik", "Serverraum", "Aula"
  ],
  npcs: [
    { role: "Hausmeister", name: "[PLATZHALTER] Herr/Frau X" },
    { role: "Sekretariat", name: "[PLATZHALTER] Frau/Herr Y" },
    { role: "IT-AG", name: "[PLATZHALTER] Technik-Team" },
    { role: "Naturwissenschaften", name: "[PLATZHALTER] Lehrkraft Z" }
  ]
};

const GAME_CONFIG = {
  gameTitle: "Projektwoche: Chrono-Virus",
  gameSubtitle: "3-Stunden-Escape-Room im Browser (offline)",
  totalMinutes: 180,
  hintLimit: 12,
  hintPenaltySeconds: 90,
  storageKey: "kgs_escape_save_v2",
  startStationId: "start",
};

const STATIONS = [
  {
    id: "start",
    title: "Start: Der Chrono-Virus",
    badge: "Briefing",
    storyHtml: `
      <p>Projektwoche. Gerade als ihr starten wollt, friert das Schulnetzwerk ein. Auf einem alten Bildschirm erscheint eine Warnung:</p>
      <div class="callout">
        <strong>ALARM:</strong> „<em>Chrono-Virus</em> aktiv. Zeitschleife startet in <strong>3 Stunden</strong>. Schulnetz wird auf 00:00 zurückgesetzt.“
      </div>
      <p>Die IT-AG findet eine Spur: Der Virus wurde über ein „Zeitkapsel-Protokoll“ verteilt – versteckt in mehreren Bereichen der Schule.</p>
      <p class="muted">
        Eure Mission: Sammelt die <strong>9 Code-Buchstaben</strong> und einen <strong>Server-Schlüssel</strong>.
        Dann könnt ihr den Chrono-Virus im Serverraum stoppen.
      </p>
      <div class="callout"><strong>Spielregeln:</strong> Hinweise kosten Zeit. Nutzt Journal/Zurück, um euch nicht festzufahren.</div>
    `,
    puzzle: { type: "code", title: "Systemcheck", prompt: "Tippe <code>START</code>, um das Logbuch zu öffnen.", answer: "START", normalize: "alnumUpper" },
    hints: ["Warm-up 🙂", "Das Wort steht da oben: START."],
    rewardItems: [{ id: "logbook", name: "Chrono-Logbuch", tag: "Tool" }],
    requiresItems: [],
    nextId: "hall"
  },

  // 1) K
  {
    id: "hall",
    title: "Hauptflur – Flackernde Aushänge",
    badge: "Station 1",
    storyHtml: `
      <p>Im Hauptflur flackern die digitalen Aushänge. Ein fiktiver Schüler („Mika“) zeigt euch einen Zettel:</p>
      <div class="callout"><strong>Notiz:</strong> „Wenn die Zeit spinnt, starte beim <em>normalen Ablauf</em>. Der erste Buchstabe gehört dem <em>Anfang</em>.“</div>
      <p class="muted">Rätseltyp: Multiple Choice. Ziel: logisch denken.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Was kommt in der richtigen Reihenfolge?",
      prompt: "Wählt die Reihenfolge, die am besten zu einem typischen Schultag passt:",
      choices: [
        "Pause → Unterricht → Ankommen → Nach Hause",
        "Ankommen → Unterricht → Pause → Nach Hause",
        "Nach Hause → Ankommen → Unterricht → Pause",
        "Unterricht → Nach Hause → Pause → Ankommen"
      ],
      correctIndex: 1
    },
    hints: ["Man kommt normalerweise zuerst an.", "Nach Hause ist meistens am Ende."],
    rewardItems: [{ id: "l1", name: "Buchstabe 1/9: K", tag: "Code" }],
    requiresItems: ["logbook"],
    nextId: "computer"
  },

  // 2) G + keycard
  {
    id: "computer",
    title: "Computerraum – Terminal mit Dreifach-Login",
    badge: "Station 2",
    storyHtml: `
      <p>Im Computerraum läuft ein Terminal im „Lockdown-Modus“. Daneben klebt ein Post-it vom ${SCHOOL.npcs[2].role} (${SCHOOL.npcs[2].name}):</p>
      <div class="callout">
        <strong>Post-it:</strong><br/>
        1) „Token A ist die <em>kleinste Primzahl</em>.“<br/>
        2) „Token B ist die Anzahl Buchstaben in <em>NETZ</em>.“<br/>
        3) „Token C ist das Ergebnis von <em>9 − 4</em>.“
      </div>
      <p class="muted">Rätseltyp: Mehrfacheingabe. (Alle Infos stehen hier.)</p>
    `,
    puzzle: {
      type: "multi",
      title: "Gib die 3 Tokens ein",
      prompt: "Tragt die drei Tokens ein (Zahlen):",
      fields: [
        { id: "a", label: "Token A", placeholder: "z.B. 2", answer: "2", normalize: "alnumUpper" },
        { id: "b", label: "Token B", placeholder: "z.B. 4", answer: "4", normalize: "alnumUpper" },
        { id: "c", label: "Token C", placeholder: "z.B. 5", answer: "5", normalize: "alnumUpper" }
      ]
    },
    hints: ["Kleinste Primzahl ist 2.", "NETZ hat 4 Buchstaben, 9−4 ist 5."],
    rewardItems: [
      { id: "l2", name: "Buchstabe 2/9: G", tag: "Code" },
      { id: "keycard", name: "Schlüsselkarte (Lehrertrakt)", tag: "Tool" }
    ],
    requiresItems: [],
    nextId: "library"
  },

  // 3) S
  {
    id: "library",
    title: "Bibliothek – Die Zeile, die fehlt",
    badge: "Station 3",
    storyHtml: `
      <p>In der Bibliothek liegt eine Karteikarte mit einer Reihe von Begriffen. Einige sind verdreht – aber es soll eine sinnvolle Reihenfolge ergeben.</p>
      <div class="callout">
        <strong>Karteikarte:</strong> „Wenn du etwas finden willst: <em>Suchen → … → … → Zurückgeben</em>“<br/>
        (Die Worte liegen durcheinander.)
      </div>
      <p class="muted">Rätseltyp: Drag&Drop Reihenfolge.</p>
    `,
    puzzle: {
      type: "dragdrop",
      title: "Bringe die Schritte in die richtige Reihenfolge",
      prompt: "Ziehe die Schritte so, wie man in einer Bibliothek sinnvoll vorgeht:",
      items: ["Zurückgeben", "Ausleihen", "Lesen/Notieren", "Suchen"],
      correctOrder: ["Suchen", "Ausleihen", "Lesen/Notieren", "Zurückgeben"]
    },
    hints: ["Man sucht zuerst und gibt ganz am Ende zurück.", "Zwischen Ausleihen und Zurückgeben passiert… Lesen 🙂"],
    rewardItems: [{ id: "l3", name: "Buchstabe 3/9: S", tag: "Code" }],
    requiresItems: [],
    nextId: "chem"
  },

  // 4) C + UV tool
  {
    id: "chem",
    title: "Chemiesammlung – Sicherheits-Schalter",
    badge: "Station 4",
    storyHtml: `
      <p>In der Chemiesammlung blinkt ein Bedienfeld: „Sicherheitsprotokoll aktivieren, um Zugriff zu erhalten.“</p>
      <div class="callout"><strong>Hinweis:</strong> „Wähle nur die Maßnahmen, die in einem Labor wirklich sinnvoll sind.“</div>
      <p class="muted">Rätseltyp: Schalter/Logik (mehrere richtige). Basics reichen.</p>
    `,
    puzzle: {
      type: "switches",
      title: "Aktiviere das Sicherheitsprotokoll",
      prompt: "Setze die Häkchen bei den sinnvollen Sicherheitsmaßnahmen:",
      options: [
        "Schutzbrille tragen",
        "Offene Flamme direkt neben Papierstapel",
        "Lange Haare zusammenbinden",
        "Essen & Trinken am Labortisch",
        "Arbeitsplatz aufräumen",
        "Chemikalien probieren (schmecken)"
      ],
      correctOn: [0, 2, 4]
    },
    hints: ["Alles, was mit Schutz/Ordnung zu tun hat, ist gut.", "Essen/Trinken/Probieren ist im Labor falsch."],
    rewardItems: [
      { id: "uv", name: "UV-Lampe", tag: "Tool" },
      { id: "l4", name: "Buchstabe 4/9: C", tag: "Code" }
    ],
    requiresItems: [],
    nextId: "physics"
  },

  // 5) H (match)
  {
    id: "physics",
    title: "Physikraum – Einheiten-Chaos",
    badge: "Station 5",
    storyHtml: `
      <p>Im Physikraum liegt ein Zettel: „Der Virus hat die Einheiten vertauscht. Sortiere sie, sonst bleibt alles instabil.“</p>
      <div class="callout"><strong>Mini-Spickzettel:</strong> Spannung (V), Strom (A), Widerstand (Ω), Leistung (W)</div>
      <p class="muted">Rätseltyp: Zuordnen (Dropdowns). Gut machbar ohne Formeln.</p>
    `,
    puzzle: {
      type: "match",
      title: "Ordne Größe ↔ Einheit",
      prompt: "Wähle zu jeder Größe die richtige Einheit:",
      rows: [
        { left: "Spannung", answer: "V" },
        { left: "Stromstärke", answer: "A" },
        { left: "Widerstand", answer: "Ω" },
        { left: "Leistung", answer: "W" }
      ],
      options: ["A", "V", "W", "Ω", "m", "s"]
    },
    hints: ["Die vier richtigen stehen im Spickzettel.", "m und s sind hier Ablenkung."],
    rewardItems: [{ id: "l5", name: "Buchstabe 5/9: H", tag: "Code" }],
    requiresItems: [],
    nextId: "bio"
  },

  // 6) R (code) + pinzette
  {
    id: "bio",
    title: "Biologieraum – DNA als Zahlencode",
    badge: "Station 6",
    storyHtml: `
      <p>Im Biologieraum findet ihr ein Blatt mit einer einfachen Zuordnung:</p>
      <div class="callout">
        <strong>Zuordnung:</strong> A=1, C=2, G=3, T=4<br/>
        <strong>Zahlenfolge:</strong> 3-1-4-2
      </div>
      <p>Wenn ihr die Buchstaben richtig zusammensetzt, öffnet sich eine Box.</p>
      <p class="muted">Rätseltyp: Code-Eingabe (aus Zuordnung ableiten).</p>
    `,
    puzzle: { type: "code", title: "Welche DNA-Buchstaben sind das?", prompt: "Gib die Buchstabenfolge ein (nur A/C/G/T).", answer: "GATC", normalize: "alnumUpper" },
    hints: ["3=G, 1=A, 4=T, 2=C.", "Also: G A T C."],
    rewardItems: [
      { id: "pinzette", name: "Pinzette", tag: "Tool" },
      { id: "l6", name: "Buchstabe 6/9: R", tag: "Code" }
    ],
    requiresItems: [],
    nextId: "teacher"
  },

  // 7) O1 (requires keycard) + dials
  {
    id: "teacher",
    title: "Lehrerzimmer – Der Aktenschrank",
    badge: "Station 7 (Lock)",
    storyHtml: `
      <p>Die Tür zum Lehrerzimmer hat einen Kartenleser. Dahinter steht ein Aktenschrank mit Drehkombination.</p>
      <div class="callout">
        <strong>Hinweis am Schrank:</strong> „Vier Rätsel, vier Ziffern.“<br/>
        1) 8 − 3 = ?<br/>
        2) 2 × 4 = ?<br/>
        3) 9 − 1 = ?<br/>
        4) 7 − 2 = ?
      </div>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern). Voraussetzung: Schlüsselkarte.</p>
    `,
    puzzle: { type: "dials", title: "Stell die vier Ziffern ein", prompt: "Stelle die 4-stellige Kombination ein:", digits: 4, answer: "5885" },
    hints: ["Rechne jede Zeile aus und setz die Ergebnisse hintereinander.", "8−3=5, 2×4=8, 9−1=8, 7−2=5."],
    rewardItems: [
      { id: "l7", name: "Buchstabe 7/9: O", tag: "Code" },
      { id: "folder", name: "Akte „Chrono“", tag: "Hinweis" }
    ],
    requiresItems: ["keycard"],
    nextId: "music"
  },

  // 8) N (mcq) – 101101₂ = 45
  {
    id: "music",
    title: "Musikraum – Takt der Zeitschleife",
    badge: "Station 8",
    storyHtml: `
      <p>Im Musikraum ist ein Metronom an und klickt in einem seltsamen Muster. An der Tafel steht:</p>
      <div class="callout">
        <strong>Muster:</strong> KLICK – pause – KLICK – KLICK – pause – KLICK<br/>
        <strong>Regel:</strong> „KLICK = 1, pause = 0. Lies die Folge als Binärzahl.“
      </div>
      <p class="muted">Rätseltyp: Multiple Choice (Binär → Dezimal). Machbar mit Teamwork.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Welche Dezimalzahl ist das?",
      prompt: "KLICK(1) pause(0): 1 0 1 1 0 1 → Welche Zahl ist das (binär zu dezimal)?",
      choices: ["45", "53", "37", "29"],
      correctIndex: 0
    },
    hints: ["101101₂ = 32 + 8 + 4 + 1", "Das ergibt 45."],
    rewardItems: [
      { id: "l8", name: "Buchstabe 8/9: N", tag: "Code" },
      { id: "tuningfork", name: "Stimmgabel", tag: "Tool" }
    ],
    requiresItems: [],
    nextId: "art"
  },

  // Tool station (wire)
  {
    id: "art",
    title: "Kunstraum – Komplementär-Paare",
    badge: "Station 9",
    storyHtml: `
      <p>Im Kunstraum hängt ein Poster: „Komplementärfarben stabilisieren die Anzeige.“</p>
      <div class="callout"><strong>Info:</strong> Komplementärfarben sind Gegensätze im Farbkreis (z.B. Rot ↔ Grün).</div>
      <p class="muted">Rätseltyp: Zuordnen (Paare).</p>
    `,
    puzzle: {
      type: "match",
      title: "Ordne die Paare zu",
      prompt: "Wähle zu jeder Farbe die passende Gegenfarbe:",
      rows: [
        { left: "Rot", answer: "Grün" },
        { left: "Blau", answer: "Orange" },
        { left: "Gelb", answer: "Violett" }
      ],
      options: ["Grün", "Orange", "Violett", "Schwarz", "Weiß"]
    },
    hints: ["Rot und Grün sind Gegensätze.", "Blau ↔ Orange, Gelb ↔ Violett."],
    rewardItems: [{ id: "wire", name: "Isolierter Draht", tag: "Tool" }],
    requiresItems: [],
    nextId: "sport"
  },

  // 9) O2
  {
    id: "sport",
    title: "Sporthalle – Trainingsplan",
    badge: "Station 10",
    storyHtml: `
      <p>In der Sporthalle blinkt eine Anzeige: „Bevor du sprintest, <em>warm</em> dich auf – sonst stoppt die Zeitschleife alles.“</p>
      <div class="callout"><strong>Aufgabe:</strong> Bringt einen Trainingsplan in sinnvolle Reihenfolge.</div>
      <p class="muted">Rätseltyp: Drag&Drop (Reihenfolge).</p>
    `,
    puzzle: {
      type: "dragdrop",
      title: "Ordne den Trainingsplan",
      prompt: "Ziehe die Schritte in eine sinnvolle Reihenfolge:",
      items: [
        "Cooldown / Dehnen",
        "Technikübung",
        "Aufwärmen",
        "Kurzes Spiel / Anwendung",
        "Hauptteil: Sprints/Belastung"
      ],
      correctOrder: ["Aufwärmen", "Technikübung", "Hauptteil: Sprints/Belastung", "Kurzes Spiel / Anwendung", "Cooldown / Dehnen"]
    },
    hints: ["Aufwärmen kommt immer zuerst.", "Dehnen/Cooldown ist am Ende."],
    rewardItems: [
      { id: "l9", name: "Buchstabe 9/9: O", tag: "Code" },
      { id: "band", name: "Sportband (Gummi)", tag: "Tool" }
    ],
    requiresItems: [],
    nextId: "courtyard"
  },

  // 11
  {
    id: "courtyard",
    title: "Schulhof – Uhrenspiel",
    badge: "Station 11",
    storyHtml: `
      <p>Im Schulhof steht eine alte Sonnenuhr. Daneben liegt eine Kreideformel:</p>
      <div class="callout"><strong>Hinweis:</strong> „Der Schatten wandert in 4er-Schritten: 3 → 7 → 11 → ?“</div>
      <p class="muted">Rätseltyp: Code-Eingabe (Folge erkennen).</p>
    `,
    puzzle: { type: "code", title: "Folge fortsetzen", prompt: "Welche Zahl kommt als Nächstes?", answer: "15", normalize: "alnumUpper" },
    hints: ["Die Folge steigt immer um 4.", "11 + 4 = 15."],
    rewardItems: [{ id: "chalk", name: "Kreidestück", tag: "Tool" }],
    requiresItems: [],
    nextId: "stairwell"
  },

  // 12
  {
    id: "stairwell",
    title: "Treppenhaus – Pfeile im Geländer",
    badge: "Station 12",
    storyHtml: `
      <p>Im Treppenhaus sind Pfeile eingeritzt: ↑ ↑ ↓ ↑. Eine Notiz sagt: „↑ = plus 1, ↓ = minus 1; Startwert 5“.</p>
      <p class="muted">Rätseltyp: Multiple Choice.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Zahlensprung",
      prompt: "Start 5: ↑ ↑ ↓ ↑ → welche Zahl?",
      choices: ["6", "7", "8", "9"],
      correctIndex: 1
    },
    hints: ["Rechne Schritt für Schritt.", "5→6→7→6→7."],
    rewardItems: [{ id: "step_note", name: "Geländer-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "lockers"
  },

  // 13
  {
    id: "lockers",
    title: "Schließfächer – Morgenroutine",
    badge: "Station 13",
    storyHtml: `
      <p>Ein offenes Schließfach zeigt eine Liste: „Rucksack, Jacke, Hefte, Trinkflasche“.</p>
      <p class="muted">Rätseltyp: Drag&Drop (Reihenfolge).</p>
    `,
    puzzle: {
      type: "dragdrop",
      title: "Bringe Ordnung ins Fach",
      prompt: "Sortiere die Schritte der Morgenroutine:",
      items: ["Hefte rauslegen", "Jacke aufhängen", "Trinkflasche in die Seitentasche", "Rucksack öffnen"],
      correctOrder: ["Rucksack öffnen", "Hefte rauslegen", "Trinkflasche in die Seitentasche", "Jacke aufhängen"]
    },
    hints: ["Erst öffnen, dann Dinge sortieren.", "Die Jacke kommt meist zum Schluss an die Garderobe."],
    rewardItems: [{ id: "locker_tag", name: "Schließfach-Tag", tag: "Tool" }],
    requiresItems: [],
    nextId: "foyer"
  },

  // 14
  {
    id: "foyer",
    title: "Foyer – Lautsprecher-Test",
    badge: "Station 14",
    storyHtml: `
      <p>Im Foyer hängt ein Lautsprecher-Plan. Nur die sinnvollen Checks sollen aktiviert werden.</p>
      <p class="muted">Rätseltyp: Schalter/Logik (mehrere richtige).</p>
    `,
    puzzle: {
      type: "switches",
      title: "Soundcheck",
      prompt: "Wähle alle sinnvollen Checks vor einer Durchsage:",
      options: [
        "Mikrofon eingeschaltet",
        "Kabel geprüft",
        "Fenster aufreißen für „mehr Bass“",
        "Lautstärke testen (kurz)",
        "Feedback absichtlich erzeugen",
        "Stromversorgung prüfen"
      ],
      correctOn: [0, 1, 3, 5]
    },
    hints: ["Alles, was prüfen/kurz testen heißt, ist sinnvoll.", "Feedback absichtlich erzeugen ist falsch."],
    rewardItems: [{ id: "audio_ok", name: "Freigabe: Audio", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "geography"
  },

  // 15
  {
    id: "geography",
    title: "Erdkunderaum – Kartenlegende",
    badge: "Station 15",
    storyHtml: `
      <p>Eine Landkarte zeigt Symbole: Berg △, See ○, Stadt ■. Ein Zettel fragt nach der Legende.</p>
      <p class="muted">Rätseltyp: Zuordnen.</p>
    `,
    puzzle: {
      type: "match",
      title: "Ordne die Symbole zu",
      prompt: "Welche Bedeutung hat jedes Symbol?",
      rows: [
        { left: "△", answer: "Berg" },
        { left: "○", answer: "See" },
        { left: "■", answer: "Stadt" }
      ],
      options: ["Berg", "See", "Stadt", "Wüste", "Wald"]
    },
    hints: ["Dreieck = Gipfel/Berg.", "Kreis = See."],
    rewardItems: [{ id: "map_pin", name: "Karten-Pin", tag: "Tool" }],
    requiresItems: [],
    nextId: "mathlab"
  },

  // 16
  {
    id: "mathlab",
    title: "Mathelab – Reihen mit Sprung",
    badge: "Station 16",
    storyHtml: `
      <p>Auf dem Whiteboard steht: 2, 4, 8, 16, ?</p>
      <p class="muted">Rätseltyp: Code-Eingabe (Verdopplung).</p>
    `,
    puzzle: { type: "code", title: "Fortsetzung", prompt: "Welche Zahl fehlt?", answer: "32", normalize: "alnumUpper" },
    hints: ["Jede Zahl ist doppelt so groß wie die vorherige.", "16 × 2 = 32."],
    rewardItems: [{ id: "math_stamp", name: "Stempel „geprüft“", tag: "Tool" }],
    requiresItems: [],
    nextId: "history"
  },

  // 17
  {
    id: "history",
    title: "Geschichtsraum – Zeitstrahl",
    badge: "Station 17",
    storyHtml: `
      <p>Ein Zeitstrahl zeigt drei Ereignisse, aber die Reihenfolge fehlt: „Schulgründung“, „Neubau“, „Jubiläum“.</p>
      <p class="muted">Rätseltyp: Multiple Choice.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Was passt logisch?",
      prompt: "Welche Reihenfolge ist am plausibelsten?",
      choices: [
        "Jubiläum → Neubau → Schulgründung",
        "Schulgründung → Neubau → Jubiläum",
        "Neubau → Jubiläum → Schulgründung",
        "Neubau → Schulgründung → Jubiläum"
      ],
      correctIndex: 1
    },
    hints: ["Erst wird gegründet, später gebaut, dann gefeiert.", "Jubiläum kommt am Ende."],
    rewardItems: [{ id: "timeline", name: "Zeitstrahl-Sticker", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "french"
  },

  // 18
  {
    id: "french",
    title: "Französischraum – Zahlenvergleich",
    badge: "Station 18",
    storyHtml: `
      <p>Ein Vokabelposter zeigt: un=1, deux=2, trois=3, quatre=4, cinq=5.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Trage die Zahlen ein",
      prompt: "Übersetze ins Zahlensystem:",
      fields: [
        { id: "a", label: "deux + trois", placeholder: "Zahl", answer: "5", normalize: "alnumUpper" },
        { id: "b", label: "cinq − un", placeholder: "Zahl", answer: "4", normalize: "alnumUpper" }
      ]
    },
    hints: ["deux=2, trois=3.", "cinq=5, un=1."],
    rewardItems: [{ id: "fr_card", name: "Vokabelkarte", tag: "Tool" }],
    requiresItems: [],
    nextId: "english"
  },

  // 19
  {
    id: "english",
    title: "Englischraum – Anagramm",
    badge: "Station 19",
    storyHtml: `
      <p>Auf dem Tisch liegen Buchstaben: R, E, A, D.</p>
      <p class="muted">Rätseltyp: Code-Eingabe (Wort bilden).</p>
    `,
    puzzle: { type: "code", title: "Bildet ein Wort", prompt: "Ordne die Buchstaben zu einem sinnvollen Wort.", answer: "READ", normalize: "alnumUpper" },
    hints: ["Es hat etwas mit Lesen zu tun.", "READ passt."],
    rewardItems: [{ id: "bookmark", name: "Lesezeichen", tag: "Tool" }],
    requiresItems: [],
    nextId: "art_storage"
  },

  // 20
  {
    id: "art_storage",
    title: "Kunstraum – Farbmischung",
    badge: "Station 20",
    storyHtml: `
      <p>Ein Farbschrank ist verriegelt. Darüber: „Primärfarben mischen“.</p>
      <p class="muted">Rätseltyp: Schalter (mehrere richtige).</p>
    `,
    puzzle: {
      type: "switches",
      title: "Wähle die Primärfarben",
      prompt: "Aktiviere alle Primärfarben:",
      options: ["Rot", "Grün", "Blau", "Gelb", "Schwarz", "Weiß"],
      correctOn: [0, 2, 3]
    },
    hints: ["Rot, Blau, Gelb sind die klassischen Primärfarben.", "Grün entsteht erst durch Mischung."],
    rewardItems: [{ id: "brush", name: "Pinsel", tag: "Tool" }],
    requiresItems: [],
    nextId: "auditorium"
  },

  // 21
  {
    id: "auditorium",
    title: "Aula – Sitzplan",
    badge: "Station 21",
    storyHtml: `
      <p>Ein Sitzplan ist durcheinander geraten. Die Reihen sollen von vorne nach hinten sortiert werden.</p>
      <p class="muted">Rätseltyp: Drag&Drop.</p>
    `,
    puzzle: {
      type: "dragdrop",
      title: "Sortiere die Reihen",
      prompt: "Bringe die Reihenfolge in die richtige Abfolge:",
      items: ["Reihe 4 (hinten)", "Reihe 2", "Reihe 1 (vorn)", "Reihe 3"],
      correctOrder: ["Reihe 1 (vorn)", "Reihe 2", "Reihe 3", "Reihe 4 (hinten)"]
    },
    hints: ["Vorne kommt vor hinten.", "Die Zahlen geben die Reihenfolge an."],
    rewardItems: [{ id: "seat_token", name: "Sitzplan-Token", tag: "Tool" }],
    requiresItems: [],
    nextId: "lab_storage"
  },

  // 22
  {
    id: "lab_storage",
    title: "Laborkammer – Temperatur-Skala",
    badge: "Station 22",
    storyHtml: `
      <p>Ein Thermometer zeigt drei Skalen: Kalt, Warm, Heiß.</p>
      <p class="muted">Rätseltyp: Zuordnen.</p>
    `,
    puzzle: {
      type: "match",
      title: "Skala zuordnen",
      prompt: "Ordne die Temperaturen zu:",
      rows: [
        { left: "5 °C", answer: "Kalt" },
        { left: "22 °C", answer: "Warm" },
        { left: "80 °C", answer: "Heiß" }
      ],
      options: ["Kalt", "Warm", "Heiß", "Gefroren"]
    },
    hints: ["5 °C ist kalt, 22 °C ist normal warm.", "80 °C ist klar heiß."],
    rewardItems: [{ id: "thermo", name: "Thermo-Streifen", tag: "Tool" }],
    requiresItems: [],
    nextId: "outdoor_track"
  },

  // 23
  {
    id: "outdoor_track",
    title: "Außensportplatz – Runden zählen",
    badge: "Station 23",
    storyHtml: `
      <p>Ein Laufplan sagt: „2 Runden Einlaufen, 3 Runden Sprint, 1 Runde Auslaufen“.</p>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Gesamtrunden", prompt: "Stelle die Gesamtzahl an Runden ein:", digits: 2, answer: "06" },
    hints: ["2 + 3 + 1 = 6.", "Bei zwei Ziffern: 06."],
    rewardItems: [{ id: "lap_chip", name: "Runden-Chip", tag: "Tool" }],
    requiresItems: [],
    nextId: "nurse"
  },

  // 24
  {
    id: "nurse",
    title: "Sanitätsraum – Erste-Hilfe-Code",
    badge: "Station 24",
    storyHtml: `
      <p>Ein Erste-Hilfe-Poster listet: Prüfen, Rufen, Drücken, Beatmen.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Kette eintragen",
      prompt: "Gib die Reihenfolge als Zahlenfolge ein (1–4):",
      fields: [
        { id: "a", label: "Prüfen", placeholder: "Zahl", answer: "1", normalize: "alnumUpper" },
        { id: "b", label: "Rufen", placeholder: "Zahl", answer: "2", normalize: "alnumUpper" },
        { id: "c", label: "Drücken", placeholder: "Zahl", answer: "3", normalize: "alnumUpper" },
        { id: "d", label: "Beatmen", placeholder: "Zahl", answer: "4", normalize: "alnumUpper" }
      ]
    },
    hints: ["Die Reihenfolge ist im Poster vorgegeben.", "Es ist 1-2-3-4."],
    rewardItems: [{ id: "med_patch", name: "Erste-Hilfe-Patch", tag: "Tool" }],
    requiresItems: [],
    nextId: "counseling"
  },

  // 25
  {
    id: "counseling",
    title: "Beratungsraum – Fokus-Regel",
    badge: "Station 25",
    storyHtml: `
      <p>Ein Kärtchen sagt: „Kurze Pause nach 25 Minuten Arbeit.“</p>
      <p class="muted">Rätseltyp: Multiple Choice.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Wie heißt die Methode?",
      prompt: "Welche bekannte Methode nutzt 25-Minuten-Blöcke?",
      choices: ["Pomodoro", "Kanban", "Scrum", "Waterfall"],
      correctIndex: 0
    },
    hints: ["Es ist nach einer Tomate benannt.", "Pomodoro passt."],
    rewardItems: [{ id: "focus_note", name: "Fokus-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "cafeteria_storage"
  },

  // 26
  {
    id: "cafeteria_storage",
    title: "Mensa-Lager – Kistenlabel",
    badge: "Station 26",
    storyHtml: `
      <p>Im Lager stehen Kisten mit Codes: A1, A2, B1, B2. Ein Zettel: „A=1, B=2; Zahl addieren“.</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Code berechnen", prompt: "Was ergibt B2?", answer: "4", normalize: "alnumUpper" },
    hints: ["B=2, Zahl=2.", "2+2 = 4."],
    rewardItems: [{ id: "crate_key", name: "Lager-Schlüssel", tag: "Tool" }],
    requiresItems: [],
    nextId: "schoolyard"
  },

  // 27
  {
    id: "schoolyard",
    title: "Pausenhof – Pausenregeln",
    badge: "Station 27",
    storyHtml: `
      <p>Ein Schild zeigt Regeln. Einige sind sinnvoll, andere nicht.</p>
      <p class="muted">Rätseltyp: Schalter.</p>
    `,
    puzzle: {
      type: "switches",
      title: "Regeln auswählen",
      prompt: "Aktiviere die sinnvollen Pausenregeln:",
      options: [
        "Aufeinander achten",
        "Müll in die Tonne",
        "Auf Treppen rennen",
        "Ballspiele nur auf dem Feld",
        "Türen absichtlich zuschlagen",
        "Lehrkräfte informieren bei Problemen"
      ],
      correctOn: [0, 1, 3, 5]
    },
    hints: ["Alles, was Sicherheit/Ordnung stärkt.", "Rennen auf Treppen ist falsch."],
    rewardItems: [{ id: "yard_pass", name: "Pausenhof-Pass", tag: "Tool" }],
    requiresItems: [],
    nextId: "bus_stop"
  },

  // 28
  {
    id: "bus_stop",
    title: "Bushaltestelle – Fahrplan",
    badge: "Station 28",
    storyHtml: `
      <p>Der Bus fährt um 13:05, 13:20, 13:35. Ein Zettel fragt nach dem Takt.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Takt berechnen",
      prompt: "Trage den Takt und die nächste Abfahrt ein:",
      fields: [
        { id: "takt", label: "Takt (Minuten)", placeholder: "Zahl", answer: "15", normalize: "alnumUpper" },
        { id: "next", label: "Nächste Abfahrt nach 13:35", placeholder: "Uhrzeit", answer: "1350", normalize: "alnumUpper" }
      ]
    },
    hints: ["Die Abstände sind gleich.", "13:35 + 15 Minuten = 13:50."],
    rewardItems: [{ id: "ticket", name: "Bus-Ticket", tag: "Tool" }],
    requiresItems: [],
    nextId: "janitor_closet"
  },

  // 29
  {
    id: "janitor_closet",
    title: "Putzraum – Materialliste",
    badge: "Station 29",
    storyHtml: `
      <p>Eine Liste hängt an der Tür: „Nur passende Reinigungsmittel auswählen.“</p>
      <p class="muted">Rätseltyp: Schalter (mehrere richtig).</p>
    `,
    puzzle: {
      type: "switches",
      title: "Was gehört in den Reinigungswagen?",
      prompt: "Wähle alle sinnvollen Materialien:",
      options: [
        "Mikrofasertuch",
        "Zuckerstreuer",
        "Allzweckreiniger",
        "Schraubenzieher",
        "Gummihandschuhe",
        "Haarspray"
      ],
      correctOn: [0, 2, 4]
    },
    hints: ["Reinigung + Schutz zählen.", "Zuckerstreuer/Haarspray sind Ablenkung."],
    rewardItems: [{ id: "gloves", name: "Handschuhe", tag: "Tool" }],
    requiresItems: [],
    nextId: "math_advanced"
  },

  // 30
  {
    id: "math_advanced",
    title: "Mathe-Raum – Zahlenpyramide",
    badge: "Station 30",
    storyHtml: `
      <p>Eine Pyramide zeigt: unten 3, 5, 2. In der Mitte stehen die Summen der unteren Felder.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe (mehrstufig).</p>
    `,
    puzzle: {
      type: "multi",
      title: "Summen eintragen",
      prompt: "Berechne die mittleren Felder und die Spitze:",
      fields: [
        { id: "m1", label: "Mitte links", placeholder: "Zahl", answer: "8", normalize: "alnumUpper" },
        { id: "m2", label: "Mitte rechts", placeholder: "Zahl", answer: "7", normalize: "alnumUpper" },
        { id: "top", label: "Spitze", placeholder: "Zahl", answer: "15", normalize: "alnumUpper" }
      ]
    },
    hints: ["3+5=8, 5+2=7.", "Spitze ist 8+7=15."],
    rewardItems: [{ id: "pyramid_note", name: "Pyramiden-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "physics_advanced"
  },

  // 31
  {
    id: "physics_advanced",
    title: "Physikraum – Schaltungscode",
    badge: "Station 31",
    storyHtml: `
      <p>Ein Schaltplan zeigt zwei Widerstände in Reihe: 4 Ω und 6 Ω. Gesucht ist der Gesamtwert.</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Gesamtwiderstand", prompt: "Welche Summe ergibt sich?", answer: "10", normalize: "alnumUpper" },
    hints: ["Reihenschaltung addiert.", "4 + 6 = 10."],
    rewardItems: [{ id: "resistor", name: "Widerstands-Token", tag: "Tool" }],
    requiresItems: [],
    nextId: "media_room"
  },

  // 32
  {
    id: "media_room",
    title: "Medienraum – Dateiformate",
    badge: "Station 32",
    storyHtml: `
      <p>Ein Schild fragt: „Welches Format ist für Bilder?“</p>
      <p class="muted">Rätseltyp: Multiple Choice.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Bildformat",
      prompt: "Wähle ein typisches Bildformat:",
      choices: ["MP3", "JPG", "MP4", "WAV"],
      correctIndex: 1
    },
    hints: ["MP3/WAV sind Audio, MP4 Video.", "JPG ist Bild."],
    rewardItems: [{ id: "media_tag", name: "Medien-Tag", tag: "Tool" }],
    requiresItems: [],
    nextId: "theology"
  },

  // 33
  {
    id: "theology",
    title: "Ethikraum – Werte-Reihenfolge",
    badge: "Station 33",
    storyHtml: `
      <p>Ein Plakat sagt: „Erst zuhören, dann fragen, dann handeln.“</p>
      <p class="muted">Rätseltyp: Drag&Drop.</p>
    `,
    puzzle: {
      type: "dragdrop",
      title: "Ordne die Schritte",
      prompt: "Ziehe die Werte-Reihenfolge richtig:",
      items: ["Handeln", "Zuhören", "Fragen"],
      correctOrder: ["Zuhören", "Fragen", "Handeln"]
    },
    hints: ["Zuerst zuhören.", "Handeln kommt zum Schluss."],
    rewardItems: [{ id: "values", name: "Werte-Karte", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "admin"
  },

  // 34
  {
    id: "admin",
    title: "Sekretariat – Bürocode",
    badge: "Station 34",
    storyHtml: `
      <p>Auf dem Tresen liegt ein Zettel: „Akten A–C werden alphabetisch sortiert.“</p>
      <p class="muted">Rätseltyp: Zuordnen.</p>
    `,
    puzzle: {
      type: "match",
      title: "Ordne nach Alphabet",
      prompt: "Welche Nummer gehört zu welchem Buchstaben?",
      rows: [
        { left: "A", answer: "1" },
        { left: "B", answer: "2" },
        { left: "C", answer: "3" }
      ],
      options: ["1", "2", "3", "4"]
    },
    hints: ["Alphabetisch von A nach C.", "A=1, B=2, C=3."],
    rewardItems: [{ id: "stamp", name: "Sekretariats-Stempel", tag: "Tool" }],
    requiresItems: [],
    nextId: "library_annex"
  },

  // 35
  {
    id: "library_annex",
    title: "Bibliotheks-Anbau – Signaturen",
    badge: "Station 35",
    storyHtml: `
      <p>Eine Buchsignatur lautet: „BIO-4-7“. Die Regel: Fach = BIO (4), Regal = 7.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Signatur lesen",
      prompt: "Trage Fachnummer und Regal ein:",
      fields: [
        { id: "fach", label: "Fachnummer", placeholder: "Zahl", answer: "4", normalize: "alnumUpper" },
        { id: "regal", label: "Regal", placeholder: "Zahl", answer: "7", normalize: "alnumUpper" }
      ]
    },
    hints: ["BIO steht in der Legende für Fach 4.", "Regal ist die zweite Zahl."],
    rewardItems: [{ id: "signatur", name: "Signatur-Karte", tag: "Tool" }],
    requiresItems: [],
    nextId: "roof"
  },

  // 36
  {
    id: "roof",
    title: "Dachzugang – Windcode",
    badge: "Station 36",
    storyHtml: `
      <p>Der Wind dreht eine Fahne: N → O → S → W → ?. Eine Notiz: „Richtung im Uhrzeigersinn.“</p>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Nächste Richtung", prompt: "Setze 1=N, 2=O, 3=S, 4=W. Welche Zahl?", digits: 1, answer: "1" },
    hints: ["Nach W kommt wieder N.", "N = 1."],
    rewardItems: [{ id: "wind_pin", name: "Wind-Pin", tag: "Tool" }],
    requiresItems: [],
    nextId: "greenhouse"
  },

  // 37
  {
    id: "greenhouse",
    title: "Schulgarten – Gießplan",
    badge: "Station 37",
    storyHtml: `
      <p>Am Gartentisch hängt ein Plan: „Pflanzen A, B, C brauchen Wasser, D nicht.“</p>
      <p class="muted">Rätseltyp: Schalter.</p>
    `,
    puzzle: {
      type: "switches",
      title: "Gießplan aktivieren",
      prompt: "Wähle die Pflanzen, die gegossen werden:",
      options: ["Pflanze A", "Pflanze B", "Pflanze C", "Pflanze D"],
      correctOn: [0, 1, 2]
    },
    hints: ["A, B, C ja – D nein.", "Nur drei sind richtig."],
    rewardItems: [{ id: "watering", name: "Gießmarke", tag: "Tool" }],
    requiresItems: [],
    nextId: "stage"
  },

  // 38
  {
    id: "stage",
    title: "Bühne – Lichtpult",
    badge: "Station 38",
    storyHtml: `
      <p>Das Lichtpult zeigt Kanäle: 1=Rot, 2=Grün, 3=Blau. „Mische zu Weiß.“</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Lichtmix", prompt: "Welche Kanäle müssen an? (z.B. 123)", answer: "123", normalize: "alnumUpper" },
    hints: ["Weiß entsteht aus Rot, Grün, Blau.", "Alle drei Kanäle."],
    rewardItems: [{ id: "spot_token", name: "Spot-Token", tag: "Tool" }],
    requiresItems: [],
    nextId: "language_lab"
  },

  // 39
  {
    id: "language_lab",
    title: "Sprachlabor – Silbencode",
    badge: "Station 39",
    storyHtml: `
      <p>Ein Tonband sagt: „Zähle Silben: Pro-jekt-wo-che“.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Silben zählen",
      prompt: "Trage die Silbenanzahl ein:",
      fields: [{ id: "syll", label: "Projektwoche", placeholder: "Zahl", answer: "4", normalize: "alnumUpper" }]
    },
    hints: ["Pro-jekt-wo-che.", "Das sind 4 Silben."],
    rewardItems: [{ id: "tape", name: "Tonband", tag: "Tool" }],
    requiresItems: [],
    nextId: "parking"
  },

  // 40
  {
    id: "parking",
    title: "Parkplatz – Nummernlogik",
    badge: "Station 40",
    storyHtml: `
      <p>Auf dem Parkplatz stehen die Nummern 12, 14, 18, ?. Der Hinweis: „Zuwachs wächst.“</p>
      <p class="muted">Rätseltyp: Multiple Choice.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Fehlende Nummer",
      prompt: "Welche Nummer passt?",
      choices: ["20", "22", "24", "26"],
      correctIndex: 2
    },
    hints: ["Die Abstände wachsen: +2, +4, +6 …", "12→14(+2), 14→18(+4), 18→24(+6)."],
    rewardItems: [{ id: "parking_tag", name: "Parkplatz-Tag", tag: "Tool" }],
    requiresItems: [],
    nextId: "basement_archive"
  },

  // 41
  {
    id: "basement_archive",
    title: "Archivkeller – Aktenkürzel",
    badge: "Station 41",
    storyHtml: `
      <p>Aktenkürzel: MAT=1, BIO=2, PHY=3. Gesucht: Kürzel → Nummer.</p>
      <p class="muted">Rätseltyp: Zuordnen.</p>
    `,
    puzzle: {
      type: "match",
      title: "Kürzel zuordnen",
      prompt: "Ordne die Nummern zu:",
      rows: [
        { left: "MAT", answer: "1" },
        { left: "BIO", answer: "2" },
        { left: "PHY", answer: "3" }
      ],
      options: ["1", "2", "3", "4"]
    },
    hints: ["Die Kürzel sind direkt zugeordnet.", "MAT=1, BIO=2, PHY=3."],
    rewardItems: [{ id: "archive_key", name: "Archiv-Schlüssel", tag: "Tool" }],
    requiresItems: [],
    nextId: "break_room"
  },

  // 42
  {
    id: "break_room",
    title: "Lehrer-Küche – Zutatenliste",
    badge: "Station 42",
    storyHtml: `
      <p>Ein Rezept: „2 Tassen Wasser, 1 Tasse Zucker, 3 Löffel Kakao“. Gesucht ist die Summe der Einheiten.</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Einheiten addieren", prompt: "Wie viele Einheiten insgesamt?", answer: "6", normalize: "alnumUpper" },
    hints: ["2 + 1 + 3.", "Ergibt 6."],
    rewardItems: [{ id: "mug", name: "Messbecher", tag: "Tool" }],
    requiresItems: [],
    nextId: "counselor_office"
  },

  // 43
  {
    id: "counselor_office",
    title: "Berufsberatung – Prioritäten",
    badge: "Station 43",
    storyHtml: `
      <p>Ein Plan listet: „Informationen sammeln → Optionen abwägen → Entscheidung treffen → Plan umsetzen“.</p>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Reihenfolge als Code", prompt: "Setze die Reihenfolge als 4-stellige Zahl (1–4).", digits: 4, answer: "1234" },
    hints: ["Die Reihenfolge ist direkt vorgegeben.", "1-2-3-4."],
    rewardItems: [{ id: "career_note", name: "Berufs-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "makerspace"
  },

  // 44
  {
    id: "makerspace",
    title: "Maker-Space – Bauplan",
    badge: "Station 44",
    storyHtml: `
      <p>Ein Bauplan sagt: „Bauteile A(5), B(7), C(9). Summe × 2.“</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe (mehrstufig).</p>
    `,
    puzzle: {
      type: "multi",
      title: "Bauplan berechnen",
      prompt: "Trage Zwischensumme und Endwert ein:",
      fields: [
        { id: "sum", label: "Summe", placeholder: "Zahl", answer: "21", normalize: "alnumUpper" },
        { id: "end", label: "Endwert", placeholder: "Zahl", answer: "42", normalize: "alnumUpper" }
      ]
    },
    hints: ["5+7+9=21.", "21×2=42."],
    rewardItems: [{ id: "bolt", name: "Bau-Bolzen", tag: "Tool" }],
    requiresItems: [],
    nextId: "canteen"
  },

  // Magnet
  {
    id: "canteen",
    title: "Mensa – Der Menü-Checksum",
    badge: "Station 45",
    storyHtml: `
      <p>In der Mensa hängt ein „Menü-Board“ – aber der Virus hat Zahlen verteilt. Unten steht:</p>
      <div class="callout">
        <strong>Menü-IDs:</strong><br/>
        Pasta = 12<br/>
        Salat = 7<br/>
        Suppe = 9<br/>
        Dessert = 4<br/>
        Saft = 6<br/>
        <hr/>
        <strong>Checksum-Regel:</strong> (Pasta + Suppe) × 2 − (Salat + Saft) + Dessert
      </div>
      <p>Die richtige Checksum öffnet ein Fach unter dem Tresen.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe (Zwischenschritte).</p>
    `,
    puzzle: {
      type: "multi",
      title: "Gib die Checksum ein",
      prompt: "Rechne die Zwischenschritte aus und trage sie ein:",
      fields: [
        { id: "sum", label: "Pasta + Suppe", placeholder: "Zahl", answer: "21", normalize: "alnumUpper" },
        { id: "sub", label: "Salat + Saft", placeholder: "Zahl", answer: "13", normalize: "alnumUpper" },
        { id: "checksum", label: "Checksum", placeholder: "Zahl", answer: "33", normalize: "alnumUpper" }
      ]
    },
    hints: ["12+9=21, 7+6=13.", "21×2 − 13 + 4 = 33."],
    rewardItems: [{ id: "magnet", name: "Starker Magnet", tag: "Tool" }],
    requiresItems: [],
    nextId: "basement"
  },

  // Keller – requires magnet + UV
  {
    id: "basement",
    title: "Hausmeisterkeller – Unsichtbare Markierungen",
    badge: "Station 46 (Lock+UV)",
    storyHtml: `
      <p>Eine metallische Kellertür klemmt. Mit dem Magneten bekommt ihr sie auf. Drinnen: ein Gang mit unsichtbaren Markierungen.</p>
      <div class="callout">
        <strong>Hinweis:</strong> „Nur unter UV sieht man den Weg.“<br/>
        Unter UV erscheinen neun Symbole (Flur, PC, Bücher, Reagenzglas, Blitz, DNA, Aktenschrank, Metronom, Sport).<br/>
        <em>Ordnet eure gesammelten Buchstaben nach der Reihenfolge dieser Symbole.</em>
      </div>
      <p class="muted">So entsteht der finale Zeitcode – aber ihr braucht noch den <strong>Server-Schlüssel</strong>.</p>
    `,
    puzzle: { type: "code", title: "Bestätige die Buchstabenfolge", prompt: "Gib die Buchstabenfolge ein (ohne Leerzeichen).", answer: "KGSCHRONO", normalize: "alnumUpper" },
    hints: ["Die Symbole stehen für frühere Stationen.", "Nutzt die Reihenfolge der Symbole, um eure 9 Buchstaben zu sortieren."],
    rewardItems: [{ id: "server_hint", name: "Notiz: Serverraum hinter der Aula", tag: "Hinweis" }],
    requiresItems: ["magnet", "uv"],
    nextId: "workshop"
  },

  // Werkraum – server key
  {
    id: "workshop",
    title: "Werkraum/Technik – Der Not-Aus-Kreis",
    badge: "Station 47",
    storyHtml: `
      <p>Im Werkraum findet ihr eine Kiste: „Server-Schlüssel nur bei korrektem Not-Aus-Kreis.“</p>
      <div class="callout">
        <strong>Wandposter (Merkregel):</strong><br/>
        „Erst stoppen, dann sichern, dann holen. Unnötiges Risiko vermeiden.“<br/>
        Auf dem Boden sind sechs Felder im Kreis, aber nur vier gehören zur Sicherheitskette.
      </div>
      <p class="muted">Rätseltyp: Schalter (nur passende Sicherheitsmaßnahmen aktivieren).</p>
    `,
    puzzle: {
      type: "switches",
      title: "Wähle die Schritte des Not-Aus-Kreises",
      prompt: "Aktiviere nur die Schritte, die zu einem sicheren Not-Aus gehören:",
      options: [
        "Stromquelle trennen",
        "Gefahrenbereich sichern",
        "Hilfe holen (Erwachsene/Lehrkraft)",
        "Erste Hilfe leisten / Betreuung",
        "Werkzeug liegen lassen, weiterarbeiten",
        "Mutprobe machen",
        "„Kurz testen, ob es doch geht“"
      ],
      correctOn: [0, 1, 2, 3]
    },
    hints: ["Alles, was das Risiko erhöht, gehört nicht dazu.", "Sicherheitskette: stoppen → sichern → holen → betreuen."],
    rewardItems: [{ id: "server_key", name: "Server-Schlüssel", tag: "Tool" }],
    requiresItems: ["wire", "tuningfork"],
    nextId: "server"
  },

  // Finale
  {
    id: "server",
    title: "Serverraum – Stoppe den Chrono-Virus",
    badge: "Finale",
    storyHtml: `
      <p>Der Serverraum brummt. Das Chrono-Virus zählt herunter. Ihr steckt den Server-Schlüssel ein und das Terminal fordert:</p>
      <div class="callout">
        <strong>INPUT:</strong> „Zeitcode (9 Buchstaben)“<br/>
        <span class="muted">Tipp: Im Keller habt ihr die Folge gesehen. Außerdem stehen die Buchstaben als Items im Inventar.</span>
      </div>
    `,
    puzzle: { type: "code", title: "Gib den Zeitcode ein", prompt: "Zeitcode eingeben:", answer: "KGSCHRONO", normalize: "alnumUpper" },
    hints: ["Im Keller halfen euch die Symbole, die Reihenfolge zu finden.", "Ohne Leerzeichen eintippen."],
    rewardItems: [],
    requiresItems: ["server_key", "l1","l2","l3","l4","l5","l6","l7","l8","l9"],
    nextId: "end"
  },

  {
    id: "end",
    title: "Geschafft!",
    badge: "Ende",
    storyHtml: `
      <p><strong>Der Chrono-Virus ist gestoppt.</strong> Die Uhren springen zurück in den Normalbetrieb. Projektwoche gerettet.</p>
      <div class="callout"><strong>Optional:</strong> Baut Bonus-Rätsel ein (Schulplan, Bilder, Audio, QR-Codes, …).</div>
      <p class="muted">Reset starten, um erneut zu spielen.</p>
    `,
    puzzle: { type: "end", title: "Endscreen", prompt: "Du kannst jetzt Reset drücken, um neu zu starten." },
    hints: [],
    rewardItems: [],
    requiresItems: [],
    nextId: null
  }
];
