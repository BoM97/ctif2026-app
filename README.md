# CTIF 2026 Šumperk — Live Companion App

PWA für Live-Ergebnisse, Zeitplan, Favoriten & Benachrichtigungen (CTIF 2026, Šumperk).

## Lokal starten
\`\`\`
npm install
npm run dev
\`\`\`
Dann http://localhost:5173 öffnen.

## Online stellen (Vercel)
1. Code auf GitHub hochladen
2. Auf vercel.com importieren → Deploy
3. Fertig → eigener Link (z.B. ctif2026.vercel.app)

## Konfiguration
- Google-Sheets-IDs: src/config/sources.ts
- Favoriten-Vorschläge: src/config/suggestedTeams.ts
- Zeitplan/Bus/Unterkunft: src/data/*

## Hinweise
- Sheets müssen öffentlich sein ("Jeder mit Link: Betrachter").
- Parser-Spalten ggf. in src/lib/parser.ts anpassen, sobald echte Daten da sind.
- Benachrichtigungen: nur bei geöffneter App (lokale Notification API).
