# CLAUDE-FRONT.md

Plik konfiguracyjny dla Claude'a w projekcie frontendowym. Przeczytaj na początku każdej sesji.

---

## 1. Zasady współpracy (NAJWAŻNIEJSZE)

### Git — wszystko robi człowiek
- Claude NIGDY nie wykonuje operacji gitowych. Wszystkie operacje na repozytorium wykonuje użytkownik ręcznie.
- Gdy kod gotowy — Claude proponuje typ commita wg Conventional Commits (`feat`, `fix`, `chore` itd.), nie pełną nazwę.

### Podsumowanie po każdej zmianie — KRÓTKO
Format:
> **Pliki:**
> - `ścieżka/Plik.tsx` (NOWY) — co to jest i po co.
> - `ścieżka/Inny.tsx` (ZMIANA) — co zmienione i dlaczego.
>
> **Commit:** sugeruję typ `feat`.

### Decyzje architektoniczne
Zapisujemy w `docs/decisions.md` w repo frontendowym (ten sam format co backend).

---

## 2. Kontekst projektu

Zadanie rekrutacyjne (Codibly / Spyrosoft, staż Software Engineer Intern).

Aplikacja webowa o miksie energetycznym Wielkiej Brytanii — dwie funkcje:
1. Wykres miksu energetycznego na dziś / jutro / pojutrze (udziały źródeł + % czystej energii).
2. Kalkulator optymalnego okna ładowania auta — użytkownik podaje liczbę godzin (1–6), dostaje najczystsze okno w ciągu 48h.

**Stack:** React 18 + TypeScript + Vite + Recharts + (opcjonalnie) Tailwind CSS.

---

## 3. Backend API — kontrakt

Backend działa lokalnie na `http://localhost:8080`. Na produkcji URL przez zmienną środowiskową `VITE_API_BASE_URL`.

### `GET /api/energy-mix`
```json
{
  "days": [
    {
      "date": "2026-06-13",
      "sources": {
        "wind":    50.0,
        "solar":   15.0,
        "nuclear": 10.0,
        "hydro":    2.0,
        "biomass":  3.0
      },
      "cleanEnergyPercent": 80.0
    }
  ]
}
```
Zawsze 3 elementy: dziś, jutro, pojutrze.

### `GET /api/optimal-window?hours={1-6}`
```json
{
  "from": "2026-06-13T12:00Z",
  "to":   "2026-06-13T14:00Z",
  "cleanEnergyPercent": 85.0
}
```
`from` i `to` to stringi ISO 8601 UTC. Godziny do wyświetlenia konwertuj do lokalnej strefy użytkownika.

### Błędy
```json
{
  "timestamp": "2026-06-13T10:00:00Z",
  "status": 400,
  "error": "Parametr 'hours' musi być liczbą od 1 do 6"
}
```

---

## 4. Architektura frontendu

```
src/
├── api/          — funkcje fetch do backendu (jeden plik na endpoint)
├── components/   — komponenty React
│   ├── EnergyMixChart.tsx     — wykres Recharts z miksem 3 dni
│   ├── CleanEnergyBar.tsx     — pasek % czystej energii na dzień
│   └── ChargingWindow.tsx     — formularz + wynik optymalnego okna
├── types/        — TypeScript interfaces odpowiadające kontraktowi API
└── App.tsx       — główny komponent, layout
```

---

## 5. Wymagania UI

- Wykres słupkowy (stacked bar) — każde źródło innym kolorem, 3 słupki (dni).
- Kolory źródeł ustalone raz (stała), spójne między wykresem a legendą.
- Formularz: suwak lub select 1–6 godzin → przycisk → wynik pod spodem.
- Wynik okna: data + godzina startu i końca w lokalnej strefie + % czystej energii.
- Obsługa stanów: ładowanie (spinner/skeleton), błąd (komunikat), brak danych.
- Responsywność: działa na mobile i desktop.

---

## 6. Czego NIE robić

- Nie hardkodować URL backendu — tylko przez `VITE_API_BASE_URL` z `.env`.
- Nie tworzyć własnego store (Redux itp.) — wystarczy `useState` + `useEffect` lub React Query.
- Nie rozbudowywać scope'u ponad wymagania.
- Nie przeklejać całych plików w podsumowaniach.
