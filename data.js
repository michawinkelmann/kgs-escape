/* data.js
   Vollversion (ca. 3 Stunden). Inhalte sind “typische Schulorte”.
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
    { role: "Hausmeister", name: "Herr Beckmann" },
    { role: "Sekretariat", name: "Frau Yilmaz" },
    { role: "IT-AG", name: "Team ByteBären" },
    { role: "Naturwissenschaften", name: "Frau Sommerfeld" }
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
        Eure Mission: Sammelt die <strong>9 Code-Buchstaben</strong> (Chrono-Fragmente), den <strong>Server-Schlüssel</strong>
        und zusätzlich die <strong>3 Stabilisator-Ziffern</strong> <strong>A</strong>, <strong>B</strong> und <strong>C</strong>.
        Erst wenn ihr <em>Zeitcode + A/B/C</em> habt, lässt sich der Chrono-Virus endgültig löschen.
      </p>
      <div class="callout"><strong>Spielregeln:</strong> Hinweise kosten Zeit. Nutzt Journal/Zurück, um euch nicht festzufahren.</div>
    `,
    puzzle: { type: "code", title: "Systemcheck", prompt: "Tippe <code>START</code>, um das Logbuch zu öffnen.", answer: "START", normalize: "alnumUpper" },
    hints: ["Warm-up 🙂", "Das Wort steht da oben: START."],
    rewardItems: [{ id: "logbook", name: "Chrono-Logbuch", tag: "Tool" }],
    requiresItems: [],
    nextId: "hall"
  },

  {
    id: "hall",
    title: "Hauptflur – Flackernde Aushänge",
    badge: "Station 1",
    storyHtml: `
      <p>Im Hauptflur flackern die digitalen Aushänge. Mika zeigt euch einen Zettel:</p>
      <div class="callout"><strong>Notiz:</strong> „Wenn die Zeit spinnt, starte beim <em>normalen Ablauf</em>. Der erste Buchstabe gehört dem <em>Anfang</em>.“</div>
      <p class="muted">Rätseltyp: Multiple Choice. Ziel: logisch denken.</p>
      <p class="muted small">🔧 Ihr hört Lüfter hochdrehen – das Netz wehrt sich gegen den Virus.</p>
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
    rewardItems: [{ id: "l1", name: "Chrono-Fragment „Flur“: K", tag: "Code" }],
    requiresItems: ["logbook"],
    nextId: "computer"
  },

  {
    id: "computer",
    title: "Computerraum – Terminal mit Dreifach-Login",
    badge: "Station 2",
    storyHtml: `
      <p>Im Computerraum läuft ein Terminal im „Lockdown-Modus“. Daneben klebt ein Post-it vom ${SCHOOL.npcs[2].role} (${SCHOOL.npcs[2].name}):</p>
      <div class="callout">
        <strong>Post-it:</strong><br/>
        „Drei Tokens, drei Quellen: <em>Zahlenverständnis</em>, <em>Wortlänge</em>, <em>Rechenweg</em>.“<br/>
        „A beginnt bei den Primzahlen, B steckt im Wort <em>NETZ</em>, C ist die Differenz aus <em>9</em> und <em>4</em>.“
      </div>
      <p class="muted">Rätseltyp: Mehrfacheingabe. (Hinweise sind indirekt.)</p>
      <p class="muted small">📟 Eine Anzeige flackert kurz: „SYNC?“ und verschwindet wieder.</p>
`,
    puzzle: {
      type: "multi",
      title: "Gib die 3 Tokens ein",
      prompt: "Tragt die drei Tokens ein (Zahlen):",
      fields: [
        { id: "a", label: "Token A", placeholder: "z.B. 7", answer: "2", normalize: "alnumUpper" },
        { id: "b", label: "Token B", placeholder: "z.B. 9", answer: "4", normalize: "alnumUpper" },
        { id: "c", label: "Token C", placeholder: "z.B. 1", answer: "5", normalize: "alnumUpper" }
      ]
    },
    hints: ["Denk an die erste Primzahl.", "Wortlänge zählen und eine kleine Subtraktion lösen."],
    rewardItems: [
      { id: "l2", name: "Chrono-Fragment „PC“: G", tag: "Code" },
      { id: "keycard", name: "Schlüsselkarte (Lehrertrakt)", tag: "Tool" }
    ],
    requiresItems: [],
    nextId: "library"
  },

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
      <p class="muted small">🧩 Im Logbuch erscheint eine neue Zeile – irgendwer hat hier Spuren gelegt.</p>
`,
    puzzle: {
      type: "dragdrop",
      title: "Bringe die Schritte in die richtige Reihenfolge",
      prompt: "Ziehe die Schritte so, wie man in einer Bibliothek sinnvoll vorgeht:",
      items: ["Zurückgeben", "Ausleihen", "Lesen/Notieren", "Suchen"],
      correctOrder: ["Suchen", "Ausleihen", "Lesen/Notieren", "Zurückgeben"]
    },
    hints: ["Man sucht zuerst und gibt ganz am Ende zurück.", "Zwischen Ausleihen und Zurückgeben passiert… Lesen 🙂"],
    rewardItems: [{ id: "l3", name: "Chrono-Fragment „Bücher“: S", tag: "Code" }],
    requiresItems: [],
    nextId: "chem"
  },

  {
    id: "chem",
    title: "Chemiesammlung – Sicherheits-Schalter",
    badge: "Station 4",
    storyHtml: `
      <p>In der Chemiesammlung blinkt ein Bedienfeld: „Sicherheitsprotokoll aktivieren, um Zugriff zu erhalten.“</p>
      <div class="callout"><strong>Hinweis:</strong> „Wähle nur die Maßnahmen, die in einem Labor wirklich sinnvoll sind.“</div>
      <p class="muted">Rätseltyp: Schalter/Logik (mehrere richtige). Basics reichen.</p>
      <p class="muted small">⚡ Die Neonröhren surren, als hätte jemand die Zeit an- und ausgeschaltet.</p>
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
      { id: "l4", name: "Chrono-Fragment „Reagenzglas“: C", tag: "Code" }
    ],
    requiresItems: [],
    nextId: "physics"
  },

  {
    id: "physics",
    title: "Physikraum – Einheiten-Chaos",
    badge: "Station 5",
    storyHtml: `
      <p>Im Physikraum liegt ein Zettel: „Der Virus hat die Einheiten vertauscht. Sortiere sie, sonst bleibt alles instabil.“</p>
      <div class="callout"><strong>Mini-Spickzettel:</strong> Spannung (V), Strom (A), Widerstand (Ω), Leistung (W)</div>
      <p class="muted">Rätseltyp: Zuordnen (Dropdowns). Gut machbar ohne Formeln.</p>
      <p class="muted small">🕵️‍♀️ Ihr seht winzige Markierungen – fast wie eine Schnitzeljagd.</p>
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
    rewardItems: [{ id: "l5", name: "Chrono-Fragment „Blitz“: H", tag: "Code" }],
    requiresItems: [],
    nextId: "bio"
  },

  {
    id: "bio",
    title: "Biologieraum – DNA als Zahlencode",
    badge: "Station 6",
    storyHtml: `
      <p>Im Biologieraum findet ihr ein Blatt mit einer Labor-Eselsbrücke.</p>
      <div class="callout">
        <strong>Hinweis:</strong> „Die vier DNA-Basen sind in alphabetischer Reihenfolge nummeriert.“<br/>
        <strong>Zahlenfolge:</strong> 3-1-4-2
      </div>
      <p>Wenn ihr die Buchstaben richtig zusammensetzt, öffnet sich eine Box.</p>
      <p class="muted">Rätseltyp: Code-Eingabe (aus Zuordnung ableiten).</p>
      <p class="muted small">🔒 Jede gelöste Aufgabe beruhigt die Störung für ein paar Sekunden.</p>
`,
    puzzle: { type: "code", title: "Welche DNA-Buchstaben sind das?", prompt: "Gib die Buchstabenfolge ein (nur A/C/G/T).", answer: "GATC", normalize: "alnumUpper" },
    hints: ["Ordne die Buchstaben alphabetisch den Zahlen 1–4 zu.", "Setze dann die Zahlenfolge in Buchstaben um."],
    rewardItems: [
      { id: "pinzette", name: "Pinzette", tag: "Tool" },
      { id: "l6", name: "Chrono-Fragment „DNA“: R", tag: "Code" }
    ],
    requiresItems: [],
    nextId: "teacher"
  },

  {
    id: "teacher",
    title: "Lehrerzimmer – Der Aktenschrank",
    badge: "Station 7 (Lock)",
    storyHtml: `
      <p>Die Tür zum Lehrerzimmer hat einen Kartenleser. Dahinter steht ein Aktenschrank mit Drehkombination.</p>
      <div class="callout">
        <strong>Hinweis am Schrank:</strong> „Vier kleine Rechenwege, vier Ziffern. Reihung zählt.“<br/>
        <em>Minus, Mal, Minus, Minus</em> – an der Tür stehen vier Rechnungen (von links nach rechts):
        <em>9 4, 2 4, 10 2, 7 2</em>.
      </div>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern). Voraussetzung: Schlüsselkarte.</p>
      <p class="muted small">🌀 Ein kurzer Kälteschauer – dann läuft alles wieder normal … fast.</p>
`,
    puzzle: { type: "dials", title: "Stell die vier Ziffern ein", prompt: "Stelle die 4-stellige Kombination ein:", digits: 4, answer: "5885" },
    hints: ["Vier Ergebnisse ergeben den Code.", "Suche die eingeritzten Zahlen an der Tür."],
    rewardItems: [
      { id: "l7", name: "Chrono-Fragment „Aktenschrank“: O", tag: "Code" },
      { id: "folder", name: "Akte „Chrono“", tag: "Hinweis" }
    ],
    requiresItems: ["keycard"],
    nextId: "music"
  },

  {
    id: "music",
    title: "Musikraum – Takt der Zeitschleife",
    badge: "Station 8",
    storyHtml: `
      <p>Im Musikraum ist ein Metronom an und klickt in einem seltsamen Muster. An der Tafel steht:</p>
      <div class="callout">
        <strong>Muster:</strong> KLICK – pause – KLICK – KLICK – pause – KLICK<br/>
        <strong>Regel:</strong> „KLICK = 1, pause = 0. Lies die Folge als Binärzahl.“<br/>
        <span class="muted">Mini-Hilfe: 6 Stellen → Werte: 32 16 8 4 2 1</span>
      </div>
      <p class="muted">Rätseltyp: Multiple Choice (Binär → Dezimal). Machbar mit Teamwork.</p>
      <p class="muted small">🧠 Teamwork hilft: Manche Hinweise ergeben erst gemeinsam Sinn.</p>
`,
    puzzle: {
      type: "mcq",
      title: "Welche Dezimalzahl ist das?",
      prompt: "KLICK(1) pause(0): 1 0 1 1 0 1 → Welche Zahl ist das (binär zu dezimal)?",
      choices: ["45", "53", "37", "29"],
      correctIndex: 0
    },
    hints: ["Nutze die Stellenwerte 32–16–8–4–2–1.", "Addiere nur die Werte an Stellen mit 1."],
    rewardItems: [
      { id: "l8", name: "Chrono-Fragment „Metronom“: N", tag: "Code" },
      { id: "tuningfork", name: "Stimmgabel", tag: "Tool" }
    ],
    requiresItems: [],
    nextId: "art"
  },

  {
    id: "art",
    title: "Kunstraum – Komplementär-Paare",
    badge: "Station 9",
    storyHtml: `
      <p>Im Kunstraum hängt ein Poster: „Komplementärfarben stabilisieren die Anzeige.“</p>
      <div class="callout"><strong>Info:</strong> Komplementärfarben sind Gegensätze im Farbkreis (z.B. Rot ↔ Grün).</div>
      <p class="muted">Rätseltyp: Zuordnen (Paare).</p>
      <p class="muted small">🎯 Ihr seid näher dran: Das Logbuch zeigt „Ankerpunkte aktiv“.</p>
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

  {
    id: "sport",
    title: "Sporthalle – Trainingsplan",
    badge: "Station 10",
    storyHtml: `
      <p>In der Sporthalle blinkt eine Anzeige: „Bevor du sprintest, <em>warm</em> dich auf – sonst stoppt die Zeitschleife alles.“</p>
      <div class="callout"><strong>Aufgabe:</strong> Bringt einen Trainingsplan in sinnvolle Reihenfolge.</div>
      <p class="muted">Rätseltyp: Drag&Drop (Reihenfolge).</p>
      <p class="muted small">⏳ In der Ferne klackt eine Uhr, als würde die Schule mitzählen.</p>
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
      { id: "l9", name: "Chrono-Fragment „Sport“: O", tag: "Code" },
      { id: "band", name: "Sportband (Gummi)", tag: "Tool" }
    ],
    requiresItems: [],
    nextId: "courtyard"
  },

  {
    id: "courtyard",
    title: "Schulhof – Uhrenspiel",
    badge: "Station 11",
    storyHtml: `
      <p>Im Schulhof steht eine alte Sonnenuhr. Daneben liegt eine Kreideformel:</p>
      <div class="callout"><strong>Hinweis:</strong> „Der Schatten wandert in gleich großen Schritten: 3 → 7 → 11 → ?“</div>
      <p class="muted">Rätseltyp: Code-Eingabe (Folge erkennen).</p>
    `,
    puzzle: { type: "code", title: "Folge fortsetzen", prompt: "Welche Zahl kommt als Nächstes?", answer: "15", normalize: "alnumUpper" },
    hints: ["Die Differenzen sind konstant.", "Setz den Sprung fort."],
    rewardItems: [{ id: "chalk", name: "Kreidestück", tag: "Tool" }],
    requiresItems: [],
    nextId: "stairwell"
  },

  {
    id: "stairwell",
    title: "Treppenhaus – Pfeile im Geländer",
    badge: "Station 12",
    storyHtml: `
      <p>Im Treppenhaus sind Pfeile eingeritzt: ↑ ↑ ↓ ↑. Eine kleine Legende am Handlauf erklärt: „↑ zählt hoch, ↓ zählt runter“. Startwert: 5.</p>
      <p class="muted">Rätseltyp: Multiple Choice.</p>
    `,
    puzzle: {
      type: "mcq",
      title: "Zahlensprung",
      prompt: "Start 5: ↑ ↑ ↓ ↑ → welche Zahl?",
      choices: ["6", "7", "8", "9"],
      correctIndex: 1
    },
    hints: ["Jeder Pfeil ändert den Wert um genau 1.", "Bewege dich Schritt für Schritt."],
    rewardItems: [{ id: "step_note", name: "Geländer-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "lockers"
  },

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

  {
    id: "geography",
    title: "Erdkunderaum – Kartenlegende",
    badge: "Station 15",
    storyHtml: `
      <p>Eine Landkarte zeigt nur Symbole (△, ○, ■). Daneben steht: „Legende fehlt – ordne sinnvoll zu.“</p>
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
    hints: ["Denke an typische Kartensymbole.", "Formen deuten auf Landschaftsformen."],
    rewardItems: [{ id: "map_pin", name: "Karten-Pin", tag: "Tool" }],
    requiresItems: [],
    nextId: "mathlab"
  },

  {
    id: "mathlab",
    title: "Mathelab – Reihen mit Sprung",
    badge: "Station 16",
    storyHtml: `
      <p>Auf dem Whiteboard steht: 2, 4, 8, 16, ?</p>
      <p class="muted">Rätseltyp: Code-Eingabe (Verdopplung).</p>
    `,
    puzzle: { type: "code", title: "Fortsetzung", prompt: "Welche Zahl fehlt?", answer: "32", normalize: "alnumUpper" },
    hints: ["Die Zahlen wachsen in einem festen Verhältnis.", "Prüfe den Faktor zwischen den Gliedern."],
    rewardItems: [{ id: "math_stamp", name: "Stempel „geprüft“", tag: "Tool" }],
    requiresItems: [],
    nextId: "history"
  },

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

  {
    id: "french",
    title: "Französischraum – Zahlenvergleich",
    badge: "Station 18",
    storyHtml: `
      <p>Ein Vokabelposter zeigt die französischen Zahlwörter für 1 bis 5.</p>
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
    hints: ["Übersetze die Wörter in Zahlen.", "Addiere bzw. subtrahiere danach."],
    rewardItems: [{ id: "fr_card", name: "Vokabelkarte", tag: "Tool" }],
    requiresItems: [],
    nextId: "english"
  },

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

  {
    id: "auditorium",
    title: "Aula – Sitzplan",
    badge: "Station 21",
    storyHtml: `
      <p>Ein Sitzplan ist durcheinander geraten. Die Reihen sollen von vorne nach hinten sortiert werden.</p>
      <p class="muted">Rätseltyp: Drag&Drop.</p>
      <div class="callout">
        <strong>Merkwürdig:</strong> In der Ecke des Sitzplans ist ein kleines <strong>A</strong> eingeritzt.
        Daneben steht eine einzelne Ziffer. Ihr notiert sie im Chrono-Logbuch.
      </div>
`,
    puzzle: {
      type: "dragdrop",
      title: "Sortiere die Reihen",
      prompt: "Bringe die Reihenfolge in die richtige Abfolge:",
      items: ["Reihe 4 (hinten)", "Reihe 2", "Reihe 1 (vorn)", "Reihe 3"],
      correctOrder: ["Reihe 1 (vorn)", "Reihe 2", "Reihe 3", "Reihe 4 (hinten)"]
    },
    hints: ["Vorne kommt vor hinten.", "Die Zahlen geben die Reihenfolge an."],
    rewardItems: [{ id: "seat_token", name: "Sitzplan-Token", tag: "Tool" },
      { id: "stab_a", name: "Stabilisator-Ziffer A: 4", tag: "Finale" }
    ],
    requiresItems: [],
    nextId: "lab_storage"
  },

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
    hints: ["Ordne nach Alltagsgefühl.", "Sehr hohe Werte gehören zu Heiß."],
    rewardItems: [{ id: "thermo", name: "Thermo-Streifen", tag: "Tool" }],
    requiresItems: [],
    nextId: "outdoor_track"
  },

  {
    id: "outdoor_track",
    title: "Außensportplatz – Runden zählen",
    badge: "Station 23",
    storyHtml: `
      <p>Ein Laufplan nennt drei Abschnitte mit Rundenanzahl. Gesucht ist die Gesamtzahl.</p>
      <div class="callout"><strong>Plan:</strong> Abschnitt A: 2 Runden, Abschnitt B: 1 Runde, Abschnitt C: 3 Runden.</div>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Gesamtrunden", prompt: "Stelle die Gesamtzahl an Runden ein:", digits: 2, answer: "06" },
    hints: ["Addiere alle Abschnitte.", "Zwei Ziffern erforderlich."],
    rewardItems: [{ id: "lap_chip", name: "Runden-Chip", tag: "Tool" }],
    requiresItems: [],
    nextId: "nurse"
  },

  {
    id: "nurse",
    title: "Sanitätsraum – Erste-Hilfe-Code",
    badge: "Station 24",
    storyHtml: `
      <p>Ein Erste-Hilfe-Poster zeigt die Rettungskette, aber ohne Nummerierung.</p>
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
    hints: ["Die Abfolge ist standardisiert.", "Zähle von der ersten zur letzten Maßnahme."],
    rewardItems: [{ id: "med_patch", name: "Erste-Hilfe-Patch", tag: "Tool" }],
    requiresItems: [],
    nextId: "counseling"
  },

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

  {
    id: "cafeteria_storage",
    title: "Mensa-Lager – Kistenlabel",
    badge: "Station 26",
    storyHtml: `
      <p>Im Lager stehen Kisten mit Codes: A1, A2, B1, B2. Ein Zettel: „Bedeutung aus Buchstabenwert und Ziffer“.</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Code berechnen", prompt: "Was ergibt B2?", answer: "4", normalize: "alnumUpper" },
    hints: ["Nutze die Alphabetposition.", "Addiere Buchstabenwert und Ziffer."],
    rewardItems: [{ id: "crate_key", name: "Lager-Schlüssel", tag: "Tool" }],
    requiresItems: [],
    nextId: "schoolyard"
  },

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

  {
    id: "bus_stop",
    title: "Bushaltestelle – Fahrplan",
    badge: "Station 28",
    storyHtml: `
      <p>Der Bus fährt um 13:05, 13:20, 13:35. Ein Zettel fragt nach dem Takt und der nächsten Fahrt.</p>
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
    hints: ["Vergleiche die Abstände.", "Zähle die Minuten weiter."],
    rewardItems: [{ id: "ticket", name: "Bus-Ticket", tag: "Tool" }],
    requiresItems: [],
    nextId: "janitor_closet"
  },

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

  {
    id: "math_advanced",
    title: "Mathe-Raum – Zahlenpyramide",
    badge: "Station 30",
    storyHtml: `
      <p>Eine Pyramide zeigt unten 3, 5, 2. Die Regel steht klein daneben: „Oben entsteht aus den zwei Feldern darunter.“</p>
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
    hints: ["Berechne erst die Mitte.", "Dann die Spitze aus der Mitte."],
    rewardItems: [{ id: "pyramid_note", name: "Pyramiden-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "physics_advanced"
  },

  {
    id: "physics_advanced",
    title: "Physikraum – Schaltungscode",
    badge: "Station 31",
    storyHtml: `
      <p>Ein Schaltplan zeigt zwei Widerstände in Reihe: 4 Ω und 6 Ω. Gesucht ist der Gesamtwert.</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
      <div class="callout">
        <strong>Störung:</strong> Auf dem Schaltplan ist ein <strong>B</strong>-Symbol, als hätte jemand es extra markiert.
        Eine Ziffer daneben wirkt wie ein „Stabilisator“-Hinweis für später.
      </div>
`,
    puzzle: { type: "code", title: "Gesamtwiderstand", prompt: "Welche Summe ergibt sich aus den beiden Werten?", answer: "10", normalize: "alnumUpper" },
    hints: ["In Reihe werden Werte addiert.", "Addiere die beiden Zahlen."],
    rewardItems: [{ id: "resistor", name: "Widerstands-Token", tag: "Tool" },
      { id: "stab_b", name: "Stabilisator-Ziffer B: 1", tag: "Finale" }
    ],
    requiresItems: [],
    nextId: "media_room"
  },

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

  {
    id: "theology",
    title: "Ethikraum – Werte-Reihenfolge",
    badge: "Station 33",
    storyHtml: `
      <p>Ein Plakat nennt drei Werte, aber die Reihenfolge fehlt.</p>
      <p class="muted">Rätseltyp: Drag&Drop.</p>
    `,
    puzzle: {
      type: "dragdrop",
      title: "Ordne die Schritte",
      prompt: "Ziehe die Werte-Reihenfolge richtig:",
      items: ["Handeln", "Zuhören", "Fragen"],
      correctOrder: ["Zuhören", "Fragen", "Handeln"]
    },
    hints: ["Beginne mit dem passivsten Schritt.", "Handeln ist der letzte Schritt."],
    rewardItems: [{ id: "values", name: "Werte-Karte", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "admin"
  },

  {
    id: "admin",
    title: "Sekretariat – Bürocode",
    badge: "Station 34",
    storyHtml: `
      <p>Auf dem Tresen liegt ein Zettel: „Akten A–C werden nach Alphabetposition nummeriert.“</p>
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
    hints: ["Zähle die Buchstabenposition.", "A steht ganz am Anfang."],
    rewardItems: [{ id: "stamp", name: "Sekretariats-Stempel", tag: "Tool" }],
    requiresItems: [],
    nextId: "library_annex"
  },

  {
    id: "library_annex",
    title: "Bibliotheks-Anbau – Signaturen",
    badge: "Station 35",
    storyHtml: `
      <p>Eine Buchsignatur lautet: „BIO-4-7“. Daneben: „Fach und Regal sind codiert.“</p>
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
    hints: ["Die erste Zahl passt zum Fach.", "Die zweite Zahl ist das Regal."],
    rewardItems: [{ id: "signatur", name: "Signatur-Karte", tag: "Tool" }],
    requiresItems: [],
    nextId: "roof"
  },

  {
    id: "roof",
    title: "Dachzugang – Windcode",
    badge: "Station 36",
    storyHtml: `
      <p>Der Wind dreht eine Fahne: N → O → S → W → ?. Eine Notiz: „Richtung im Uhrzeigersinn.“</p>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Nächste Richtung", prompt: "Setze 1=N, 2=O, 3=S, 4=W. Welche Zahl?", digits: 1, answer: "1" },
    hints: ["Der Kreis schließt sich.", "Setze die Richtung in die Zahl um."],
    rewardItems: [{ id: "wind_pin", name: "Wind-Pin", tag: "Tool" }],
    requiresItems: [],
    nextId: "greenhouse"
  },

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

  {
    id: "stage",
    title: "Bühne – Lichtpult",
    badge: "Station 38",
    storyHtml: `
      <p>Das Lichtpult zeigt Kanäle: 1=Rot, 2=Grün, 3=Blau. „Mische zu Weiß.“</p>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Lichtmix", prompt: "Welche Kanäle müssen an? (z.B. 124)", answer: "123", normalize: "alnumUpper" },
    hints: ["Additive Farbmischung.", "Mehrere Kanäle gleichzeitig."],
    rewardItems: [{ id: "spot_token", name: "Spot-Token", tag: "Tool" }],
    requiresItems: [],
    nextId: "language_lab"
  },

  {
    id: "language_lab",
    title: "Sprachlabor – Silbencode",
    badge: "Station 39",
    storyHtml: `
      <p>Ein Tonband sagt: „Zähle die Silben im Wort <em>Projektwoche</em>.“</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Silben zählen",
      prompt: "Trage die Silbenanzahl ein:",
      fields: [{ id: "syll", label: "Projektwoche", placeholder: "Zahl", answer: "4", normalize: "alnumUpper" }]
    },
    hints: ["Sprich das Wort langsam.", "Jeder Vokalblock zählt als Silbe."],
    rewardItems: [{ id: "tape", name: "Tonband", tag: "Tool" }],
    requiresItems: [],
    nextId: "parking"
  },

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

  {
    id: "basement_archive",
    title: "Archivkeller – Aktenkürzel",
    badge: "Station 41",
    storyHtml: `
      <p>Aktenkürzel: MAT, BIO, PHY. Ein Hinweis: „Numeriert nach Reihenfolge im Kellerplan.“</p>
      <div class="callout"><strong>Kellerplan:</strong> 1 = MAT, 2 = BIO, 3 = PHY.</div>
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
    hints: ["Suche die Reihenfolge im Plan an der Wand.", "Nummeriere von oben nach unten."],
    rewardItems: [{ id: "archive_key", name: "Archiv-Schlüssel", tag: "Tool" }],
    requiresItems: [],
    nextId: "break_room"
  },

  {
    id: "break_room",
    title: "Lehrer-Küche – Zutatenliste",
    badge: "Station 42",
    storyHtml: `
      <p>Ein Rezept nennt drei Mengen. Gesucht ist die Summe der Einheiten.</p>
      <div class="callout"><strong>Rezept:</strong> 2 Einheiten Kaffee, 1 Einheit Milch, 3 Einheiten Wasser.</div>
      <p class="muted">Rätseltyp: Code-Eingabe.</p>
    `,
    puzzle: { type: "code", title: "Einheiten addieren", prompt: "Wie viele Einheiten insgesamt?", answer: "6", normalize: "alnumUpper" },
    hints: ["Addiere alle Mengen.", "Einheiten zählen, nicht umrechnen."],
    rewardItems: [{ id: "mug", name: "Messbecher", tag: "Tool" }],
    requiresItems: [],
    nextId: "counselor_office"
  },

  {
    id: "counselor_office",
    title: "Berufsberatung – Prioritäten",
    badge: "Station 43",
    storyHtml: `
      <p>Ein Plan listet vier Schritte, aber die Reihenfolge ist durcheinander.</p>
      <div class="callout"><strong>Schritte (mit Nummern):</strong><br/>1) Bewerben<br/>2) Nachfassen<br/>3) Interessen klären<br/>4) Optionen recherchieren</div>
      <p class="muted small">🔢 Code-Regel: Schreibe die <em>Nummern</em> der Schritte in der <em>richtigen Reihenfolge</em> hintereinander.</p>
      <p class="muted">Rätseltyp: Zahlenschloss (Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Reihenfolge als Code", prompt: "Setze die Reihenfolge als 4-stellige Zahl (1–4).", digits: 4, answer: "3412" },
    hints: ["Was kommt ganz am Anfang? (Interessen klären)", "Dann Optionen recherchieren, danach Bewerben, am Ende Nachfassen."],
    rewardItems: [{ id: "career_note", name: "Berufs-Notiz", tag: "Hinweis" }],
    requiresItems: [],
    nextId: "makerspace"
  },

  {
    id: "makerspace",
    title: "Maker-Space – Bauplan",
    badge: "Station 44",
    storyHtml: `
      <p>Ein Bauplan nennt Bauteile A, B, C mit Zahlen. Gesucht ist eine Summe und ein Endwert.</p>
      <div class="callout"><strong>Bauteile:</strong> A = 6, B = 7, C = 8.</div>
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
    hints: ["Addiere die drei Werte.", "Verdopple die Summe."],
    rewardItems: [{ id: "bolt", name: "Bau-Bolzen", tag: "Tool" }],
    requiresItems: [],
    nextId: "canteen"
  },

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
        <strong>Checksum-Regel:</strong> „Zwei Gerichte addieren, verdoppeln, zwei abziehen, dann Dessert dazu.“
      </div>
      <p>Die richtige Checksum öffnet ein Fach unter dem Tresen.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe (Zwischenschritte).</p>
      <div class="callout">
        <strong>Fund:</strong> Unter dem Tresen klebt ein Aufkleber mit <strong>C</strong> – und einer einzelnen Ziffer.
        Ihr sammelt den Hinweis fürs Finale ein.
      </div>
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
    hints: ["Finde zuerst die zwei Summen.", "Nutze die Regel Schritt für Schritt."],
    rewardItems: [{ id: "magnet", name: "Starker Magnet", tag: "Tool" },
      { id: "stab_c", name: "Stabilisator-Ziffer C: 8", tag: "Finale" }
    ],
    requiresItems: [],
    nextId: "basement"
  },

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
      <p class="muted small">
        Merkt euch: Der Zeitcode allein reicht nicht – am Ende fordert das System zusätzlich die drei Stabilisator-Ziffern <strong>A</strong>, <strong>B</strong>, <strong>C</strong>.
      </p>
`,
    puzzle: { type: "code", title: "Bestätige die Buchstabenfolge", prompt: "Gib die Buchstabenfolge ein (ohne Leerzeichen).", answer: "KGSCHRONO", normalize: "alnumUpper" },
    hints: ["Die Symbole stehen für frühere Stationen.", "Nutzt die Reihenfolge der Symbole, um eure 9 Buchstaben zu sortieren."],
    rewardItems: [{ id: "server_hint", name: "Notiz: Serverraum hinter der Aula", tag: "Hinweis" }],
    requiresItems: ["magnet", "uv"],
    nextId: "workshop"
  },

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

  {
    id: "server",
    title: "Serverraum – Rack verkabeln",
    badge: "Finale 1/3",
    
    storyHtml: `
      <p>Ihr seid im Serverraum. Die Zeitschleife flackert in der Luft – als würde die Realität „puffern“.</p>
      <div class="callout">
        <strong>Rack-Panel:</strong> Drei farbige Buchsen sind frei (Blau, Grün, Rot). Daneben drei Ports:<br/>
        <strong>N</strong> = Netz • <strong>B</strong> = Backup • <strong>S</strong> = Strom/Notstrom
      </div>
      <p>Mit dem <strong>Server-Schlüssel</strong> öffnet ihr die Wartungsklappe. Jetzt müsst ihr die Kabel richtig stecken, sonst geht die Konsole nicht online.</p>
      <p class="muted">Rätseltyp: Zuordnen. (Start des Finales.)</p>
    `,

    puzzle: {
      type: "match",
      title: "Steckt die Kabel in die richtigen Ports",
      prompt: "Ordne jedes Kabel dem passenden Port (N/B/S) zu:",
      rows: [
        { left: "Blaues Kabel", answer: "N" },
        { left: "Grünes Kabel", answer: "B" },
        { left: "Rotes Kabel", answer: "S" }
      ],
      options: ["N", "B", "S", "X"]
    },
    hints: ["Lies die Port-Legende am Panel (N/B/S).", "Blau=Netz (N), Grün=Backup (B), Rot=Strom (S)."],
    rewardItems: [{ id: "rack_on", name: "Rack online", tag: "Finale" }],
    requiresItems: ["server_key"],
    nextId: "server_console"
  },

  {
    id: "server_console",
    title: "Server-Konsole – Stabilisator kalibrieren",
    badge: "Finale 2/3",
    storyHtml: `
      <p>Das Rack summt. Auf der Konsole steht: <strong>„Stabilisator-Kanäle A/B/C“</strong>.</p>
      <div class="callout">
        <strong>Anzeige:</strong> „Drehregler auf A–B–C stellen, sonst bricht die Verbindung ab.“<br/>
        <span class="muted">Ihr habt die drei Stabilisator-Ziffern unterwegs gefunden.</span>
      </div>
      <p class="muted">Rätseltyp: Zahlenschloss (3 Drehziffern).</p>
    `,
    puzzle: { type: "dials", title: "Stellt A–B–C ein", prompt: "Stellt die drei Ziffern (A dann B dann C) ein:", digits: 3, answer: "418" },
    hints: ["Schaut in euer Inventar: dort stehen A, B und C.", "Reihenfolge ist A → B → C."],
    rewardItems: [{ id: "console_unlocked", name: "Konsole entsperrt", tag: "Finale" }],
    requiresItems: ["rack_on", "stab_a", "stab_b", "stab_c"],
    nextId: "server_final"
  },

  {
    id: "server_final",
    title: "Löschpanel – Der Zeitcode",
    badge: "Finale 3/3",
    storyHtml: `
      <p>Jetzt öffnet sich das Löschpanel. Der Cursor blinkt – ihr habt nur noch wenige Minuten Puffer.</p>
      <div class="callout">
        <strong>Benötigt:</strong><br/>
        1) <strong>Zeitcode</strong> (9 Buchstaben) aus den Chrono-Fragmenten<br/>
        2) <strong>A, B, C</strong> als einzelne Ziffern<br/>
        <span class="muted">Die <em>Reihenfolge</em> der Chrono-Fragmente habt ihr im Keller (UV) herausgefunden.</span>
      </div>
      <p class="muted">Rätseltyp: Mehrfacheingabe – wie bei einem echten Panel.</p>
    `,
    puzzle: {
      type: "multi",
      title: "Code eingeben und bestätigen",
      prompt: "Tragt Zeitcode und die drei Ziffern ein:",
      fields: [
        { id: "timecode", label: "Zeitcode (9 Buchstaben)", placeholder: "_________", answer: "KGSCHRONO", normalize: "alnumUpper" },
        { id: "a", label: "A", placeholder: "Ziffer", answer: "4", normalize: "alnumUpper" },
        { id: "b", label: "B", placeholder: "Ziffer", answer: "1", normalize: "alnumUpper" },
        { id: "c", label: "C", placeholder: "Ziffer", answer: "8", normalize: "alnumUpper" }
      ]
    },
    hints: ["Zeitcode: Ordne die neun Fragmente nach der Symbol-Reihenfolge aus dem Keller.", "A/B/C stehen als Items im Inventar."],
    rewardItems: [],
    requiresItems: ["console_unlocked", "l1","l2","l3","l4","l5","l6","l7","l8","l9", "server_key"],
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
