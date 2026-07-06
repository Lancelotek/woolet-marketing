# POST-PRODUCTION SOP — pipeline jednego odcinka

Od skryptu do gotowego pliku 9:16. Dwie ścieżki obrazu, które łączysz w CapCut:
- **Telefon** — Ty, sample w dłoni, sklep, makro (ślady, metki, linijka na mostku). Surowe, autentyczne.
- **AI pipeline** — shoty produktowe / koncepcyjne, których nie nagrasz telefonem (blok acetatu w świetle, ręczna polerka, grawer numeru, numerowany rząd oprawek, animowane przejścia).

**AI pipeline (rdzeń):**
> **Strong reference image → Gemini (Image-to-JSON) → Nano Banana Pro (base model, 8 shots) → Kling 3.0 (animacja ze start/end frame) → CapCut (stitch + keyframes, jedno ciągłe ujęcie).**

---

## 0. Zanim ruszysz (raz na odcinek)

1. Miej gotowy **skrypt** (`03-EPISODES-WEEK-1.md` lub wypełniony `02-DAILY-TEMPLATE.md`).
2. Wypisz **shot list** i oznacz każdy shot: `[TELEFON]` albo `[AI]`.
3. Do każdego shotu `[AI]` przypisz **1 strong reference image** (z `../eyewear-images/`, katalogu `woolet-eyewear-catalogue.json`, KS hero renderów `../kickstarter-obrazki-hero/`, albo własne zdjęcie sampla).

Folder na odcinek (trzymaj porządek — to jest to, co pozwala robić serię codziennie):
```
challenge-1000/episodes/dayXX/
  ├─ 01-ref/          # reference images (input do Gemini)
  ├─ 02-json/         # Gemini JSON per shot
  ├─ 03-shots/        # Nano Banana Pro output (8 na shot)
  ├─ 04-clips/        # Kling 3.0 mp4 (animowane)
  ├─ 05-vo/           # ElevenLabs, linia po linii (line-01.mp3 …)
  ├─ 06-phone/        # nagrania telefonem
  └─ dayXX-FINAL.mp4  # CapCut export
```

---

## 1. Reference image → Gemini (Image-to-JSON)

**Po co:** zamienić dobry obraz referencyjny w ustrukturyzowany opis (JSON), który steruje generacją — spójny styl, światło, materiał, kadr. To gwarantuje, że 8 shotów wygląda jak jedna seria, a nie 8 losowych obrazków.

**Jak:**
1. Wrzuć reference image do Gemini z promptem: *"Analyze this image and return a JSON describing: subject, material, color palette (hex), lighting setup, camera angle, lens/focal feel, background, mood, composition. Be precise enough to regenerate a matching image."*
2. Zapisz odpowiedź jako `02-json/shot-name.json`.
3. **Dopnij brand-lock** do JSON (ręcznie lub w prompcie), żeby trzymać markę:
   ```json
   {
     "palette": { "gold": "#CAA449", "near_black": "#080807", "cream": "#EDE7D9", "havana": "warm tortoise brown" },
     "material": "Mazzucchelli 1849 cotton acetate, hand-polished, warm sheen",
     "lighting": "single warm key, soft shadow, premium product feel",
     "mood": "quiet, crafted, honest — not glossy ad",
     "aspect": "9:16"
   }
   ```

---

## 2. JSON → Nano Banana Pro (base model, 8 shots)

**Po co:** wygenerować bazowe klatki. **8 shotów** na jeden shot z listy = warianty kąta/kadru/detalu, z których wybierasz najlepsze do animacji (i masz start + end frame dla Klinga).

**Jak:**
1. Podaj Nano Banana Pro JSON z kroku 1 jako prompt bazowy + reference image jako obraz wejściowy.
2. Generuj **8 wariantów**. Celuj w parę, która da się animować jako ruch: np. shot szeroki (start) + shot zbliżony/obrócony (end).
3. Zapisz do `03-shots/shot-name-01..08.png`. Odrzuć te z artefaktami (zdeformowany mostek, zły grawer, 6 zauszników itd. — jakość jak w `../eyewear-outlines/_quality.json`).
4. **Wybierz start-frame i end-frame** dla każdego ruchu, który chcesz animować.

Typowe AI shoty serii (z `03-EPISODES-WEEK-1.md`): blok acetatu w świetle, cięcie, ręczna polerka, makro Havana, grawer `№`, numerowany rząd, diagram "hidden width", porównanie temple angle.

---

## 3. Start/End frame → Kling 3.0 (animacja)

**Po co:** ożywić klatki. Kling ze **start frame + end frame** robi płynny ruch między nimi (np. blok acetatu obraca się w świetle; kamera najeżdża na grawer).

**Jak:**
1. W Kling 3.0 wybierz tryb **start & end frame**. Wgraj wybraną parę z kroku 2.
2. Prompt ruchu krótki i konkretny: *"slow push-in, acetate rotating slightly, warm light moving across surface, cinematic, no camera shake"*.
3. Długość klipu dopasuj do linii VO, którą ten shot pokrywa (zwykle 2–4 s).
4. Eksport do `04-clips/shot-name.mp4`. Trzymaj 9:16 lub kadruj później w CapCut.

**Zasada ciągłości:** żeby seria dała się skleić w "jedno ciągłe ujęcie", planuj tak, aby **end frame jednego klipu ≈ start frame następnego** (ten sam kadr/pozycja). Wtedy w CapCut przejście jest niewidoczne.

---

## 4. VO — ElevenLabs, linia po linii

**Równolegle** (nie blokuje obrazu):
1. Głos: męski, ciepły, konwersacyjny, lekko zmęczony founder. **NIE** ekscytowany lektor. (stability ~50%, style ~30%).
2. Generuj **linia po linii** ze skryptu (jedna linia VO = jeden plik `05-vo/line-01.mp3`, `line-02.mp3`…). Łatwiej ciąć i synchronizować w CapCut.
3. Tempo 140–150 wpm. Kropka = pauza, elipsa = dłuższa. Sprawdź wymowę liczb ("twenty-four millimeters", "one dollar").

---

## 5. CapCut — stitch + keyframes (jedno ciągłe ujęcie)

**Montaż odcinka:**
1. Timeline 9:16, 1080×1920.
2. Ułóż **VO linia po linii** jako szkielet (audio steruje długością). Pod każdą linię podłóż odpowiedni shot (telefon lub Kling).
3. **Keyframes dla ciągłości:** na złączach klipów użyj position/scale keyframes, żeby ruch płynął przez cięcie — efekt jednego, nieprzerwanego ujęcia. Dopasuj koniec ruchu klipu A do początku klipu B.
4. **Beat COUNTER:** nałóż grafikę licznika `[YYY] / 1,000` — gold `#CAA449` na near-black, zawsze to samo miejsce i rozmiar (rozpoznawalność serii). Prawdziwa liczba z grupy "Woolet Reserved".
5. **Burned-in captions ZAWSZE:** auto-captions → popraw literówki, font Barlow, wysokie, czytelne na małym ekranie. Bez logo w pierwszych 3 s.
6. **On-screen text:** `DAY [X]` lewy górny róg (Barlow caps), etykiety "field note" w dolnej tercji (cream), badge founder-tier jeśli dotyczy.
7. **End card CTA:** gold na near-black, wordmark Woolet + `reserve for $1 · link in bio`. Ostatnie 3–5 s.
8. **Muzyka:** cicho pod VO, minimalna, ciepła. Nie zabijaj głosu.
9. Export: 9:16, 1080×1920, ~30–45 s, mp4 → `dayXX-FINAL.mp4`.

---

## 6. Publikacja (ta sama pora co wczoraj)

1. **TikTok:** upload, hook w 1,5 s, opis z hashtagami (`01-SCRIPT-ENGINE`/skrypt), link w bio = $1 checkout.
2. **Instagram Reels:** ten sam plik, krótszy opis, **pierwszy komentarz** = CTA + link. Link w bio spójny.
3. **IG Stories (rano):** surowy screenshot licznika grupy "Woolet Reserved" + naklejka. Bez montażu.
4. Wpisz odcinek i wyniki do `05-TRACKER.md`.

---

## Grafiki / brand (stałe)

- Kolory: gold `#CAA449`, near-black `#080807`, cream `#EDE7D9`, woolet-white `#F8F6F1`.
- Fonty: Cormorant Garamond (display), Barlow (captions/UI).
- Materiał w AI: Mazzucchelli 1849 acetat, Havana (ciepły tortoise), ręczna polerka, ciepłe światło.
- Modele: **007** (oval/round), **009** (square). Mostek **24 mm** vs standard 16–19 mm — kluczowy motyw wizualny.
- Reference banki: `../eyewear-images/`, `../kickstarter-obrazki-hero/`, `../woolet-eyewear-catalogue.json`.

## Checklista jakości AI shotów (odrzuć jeśli)

- [ ] Zdeformowany mostek / złe proporcje oprawki
- [ ] Grawer/numer nieczytelny lub błędny
- [ ] Anatomia twarzy popsuta (jeśli jest twarz)
- [ ] Kolor odjechał od palety (za zimno / za glossy — ma być ciepło, matowo-premium)
- [ ] Widać "reklamę" zamiast "warsztatu" — ton ma być honest, nie glossy

## Skróty (gdy nie masz czasu)

- **Minimalny odcinek:** 100% telefon + 1 grafika licznika w CapCut. Serię niosą konsekwencja i szczerość, nie AI shoty.
- **Zapasy:** rób 2–3 AI shoty "na zapas" (blok acetatu, polerka, grawer) — nadają się do wielu odcinków, nie musisz generować codziennie.
