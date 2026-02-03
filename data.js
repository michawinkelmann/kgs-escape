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
    nextId: "canteen"
  },

  // Magnet
  {
    id: "canteen",
    title: "Mensa – Der Menü-Checksum",
    badge: "Station 11",
    storyHtml: `
      <p>In der Mensa hängt ein „Menü-Board“ – aber der Virus hat Zahlen verteilt. Unten steht:</p>
      <div class="callout">
        <strong>Menü-IDs:</strong><br/>
        Pasta = 12<br/>
        Salat = 7<br/>
        Suppe = 9<br/>
        Dessert = 4<br/>
        <hr/>
        <strong>Checksum-Regel:</strong> (Pasta + Suppe) − (Salat) + (Dessert) = ?
      </div>
      <p>Die richtige Zahl öffnet ein Fach unter dem Tresen.</p>
      <p class="muted">Rätseltyp: Mehrfacheingabe (hier 1 Feld, als Multi umgesetzt).</p>
    `,
    puzzle: {
      type: "multi",
      title: "Gib die Checksum ein",
      prompt: "Rechne die Checksum aus und trage das Ergebnis ein:",
      fields: [{ id: "sum", label: "Checksum", placeholder: "Zahl", answer: "18", normalize: "alnumUpper" }]
    },
    hints: ["Pasta+Suppe = 21.", "21 − 7 + 4 = 18."],
    rewardItems: [{ id: "magnet", name: "Starker Magnet", tag: "Tool" }],
    requiresItems: [],
    nextId: "basement"
  },

  // Keller – requires magnet + UV
  {
    id: "basement",
    title: "Hausmeisterkeller – Unsichtbare Markierungen",
    badge: "Station 12 (Lock+UV)",
    storyHtml: `
      <p>Eine metallische Kellertür klemmt. Mit dem Magneten bekommt ihr sie auf. Drinnen: ein Gang mit unsichtbaren Markierungen.</p>
      <div class="callout">
        <strong>Hinweis:</strong> „Nur unter UV sieht man den Weg.“<br/>
        Unter UV erkennt ihr die Buchstabenfolge: <code>K G S C H R O N O</code>
      </div>
      <p class="muted">Das ist der finale Zeitcode – aber ihr braucht noch den <strong>Server-Schlüssel</strong>.</p>
    `,
    puzzle: { type: "code", title: "Bestätige die Buchstabenfolge", prompt: "Gib die Buchstabenfolge ein (ohne Leerzeichen).", answer: "KGSCHRONO", normalize: "alnumUpper" },
    hints: ["Die UV-Markierung zeigt die Buchstabenfolge direkt.", "Ohne Leerzeichen: KGSCHRONO."],
    rewardItems: [{ id: "server_hint", name: "Notiz: Serverraum hinter der Aula", tag: "Hinweis" }],
    requiresItems: ["magnet", "uv"],
    nextId: "workshop"
  },

  // Werkraum – server key
  {
    id: "workshop",
    title: "Werkraum/Technik – Der Not-Aus-Kreis",
    badge: "Station 13",
    storyHtml: `
      <p>Im Werkraum findet ihr eine Kiste: „Server-Schlüssel nur bei korrektem Not-Aus-Protokoll.“</p>
      <div class="callout">
        <strong>Protokoll:</strong><br/>
        1) Stromquelle trennen<br/>
        2) Gefahrenbereich sichern<br/>
        3) Hilfe holen (Erwachsene/Lehrkraft)<br/>
        4) „Mutprobe“ machen (NEIN)
      </div>
      <p class="muted">Rätseltyp: Schalter (nur sinnvolle Punkte aktivieren).</p>
    `,
    puzzle: {
      type: "switches",
      title: "Wähle das korrekte Not-Aus-Protokoll",
      prompt: "Aktiviere die sinnvollen Schritte (und lasse Unsinn aus):",
      options: [
        "Stromquelle trennen",
        "Gefahrenbereich sichern",
        "Hilfe holen (Erwachsene/Lehrkraft)",
        "Mutprobe machen"
      ],
      correctOn: [0,1,2]
    },
    hints: ["Die ersten drei sind sinnvoll, die Mutprobe nicht.", "Sicherheit geht vor."],
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
    hints: ["Der Code war im Keller unter UV sichtbar.", "Ohne Leerzeichen: KGSCHRONO."],
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
