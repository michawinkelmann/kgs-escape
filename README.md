# KGS Escape Room – Vollversion (ca. 3 Stunden) – Offline

Vanilla **HTML/CSS/JS** Escape-Room-Spiel für PCs im Browser – ohne Installation, ohne Internet.

## Starten
- Einfach `index.html` öffnen (offline-fähig, keine Fetch-Calls).
- Für Entwicklung: VS Code + „Live Server“.

## Spiel-Features
- Countdown-Timer (Standard: **180 Minuten**)
- Hinweise (Limit + Zeitstrafe)
- Inventar (Tools, Code-Fragmente & Stabilisator-Ziffern A/B/C)
- Gesperrte Bereiche per Item-Voraussetzung
- Journal: zu besuchten Stationen zurückspringen
- Save/Load (Browser localStorage) + Reset
- Debug: `?debug=1`

## Finale
Im Verlauf sammelt ihr:
- **9 Code-Fragmente (Buchstaben)** → daraus entsteht der **Zeitcode** (Reihenfolge-Hinweis im Keller).
- **3 Stabilisator-Ziffern A/B/C** → verteilt im Spiel (nicht am Anfang).

Im Finale gibt es jetzt **3 Schritte** im Serverraum:
1) Rack verkabeln
2) Stabilisator A–B–C kalibrieren
3) Löschpanel: Zeitcode + A/B/C in getrennten Feldern eingeben

## Puzzletypen
- `code` (Text/Code)
- `mcq` (Multiple Choice)
- `dragdrop` (Reihenfolge)
- `switches` (Mehrfach-Auswahl, genaues Muster)
- `match` (Zuordnen/Dropdown)
- `multi` (Mehrere Eingaben)
- `dials` (Zahlenschloss)

## Inhaltt anpassen
Alles Spiel-spezifische steht in `data.js`.
Lehrkräfte bleiben Platzhalter; Schüler sind fiktiv.
