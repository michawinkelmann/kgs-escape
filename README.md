# KGS Escape Room – Vollversion (ca. 3 Stunden) – Offline

Vanilla **HTML/CSS/JS** Escape-Room-Spiel für PCs im Browser – ohne Installation, ohne Internet.

## Starten
- Einfach `index.html` öffnen (offline-fähig, keine Fetch-Calls).
- Für Entwicklung: VS Code + „Live Server“.

## Spiel-Features
- Countdown-Timer (Standard: **180 Minuten**)
- Hinweise (Limit + Zeitstrafe)
- Inventar (Tools & Code-Buchstaben)
- Gesperrte Bereiche per Item-Voraussetzung
- Journal: zu besuchten Stationen zurückspringen
- Save/Load (Browser localStorage) + Reset
- Debug: `?debug=1`

## Puzzletypen
- `code` (Text/Code)
- `mcq` (Multiple Choice)
- `dragdrop` (Reihenfolge)
- `switches` (Mehrfach-Auswahl, genaues Muster)
- `match` (Zuordnen/Dropdown)
- `multi` (Mehrere Eingaben)
- `dials` (Zahlenschloss)

## Inhalt anpassen
Alles Spiel-spezifische steht in `data.js`.
Lehrkräfte bleiben Platzhalter; Schüler sind fiktiv.
