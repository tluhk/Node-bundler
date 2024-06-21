# Node Bundler

See projekt on Node.js skript, mis töötleb JavaScripti faile, leides ja rekursiivselt sidudes kõik lokaalsed 'require' kutsed. Projekti eesmärk on koondada kõik projektis kasutatavad failid üheks suureks failiks, et lihtsustada nende kasutamist ja levitamist.

Projekti eesmärk on pakkuda lihtsat ja tõhusat viisi kõigi projektis kasutatavate failide koondamiseks üheks failiks selleks, et anda loodud fail näiteks AI-le analüüsimiseks, dokumentatsiooni loomiseks jne.

> NB! Loodud fail ei ole mõeldud tootmiskeskkonnas kasutamiseks, kuna see ei sisalda kõiki vajalikke sõltuvusi ja konfiguratsioone, mis on vajalikud Node.js rakenduse käivitamiseks.

## Paigaldamine

- **Node.js ja NPM paigaldamine**:
   Veendu, et Su arvutisse on paigaldatud `Node.js` ja `npm`. Kui need ei ole paigaldatud, saad need alla laadida ja paigaldada [Node.js ametlikult lehelt](https://nodejs.org/).

- **Projekti allalaadimine ja sõltuvuste paigaldamine**:
   Laadi alla projekti kood:

   ```bash
   git clone https://github.com/tluhk/Node-bundler.git
   cd Node-bundler
   ```

## Kasutamine

- **Skripti seadistamine**:
   Veendu, et peamine sisendfail ja väljundfail on õigesti määratud. Vaikimisi on need seadistatud järgmiselt:

   ```javascript
   const entryFile = './app.js'; // Peamine sisendfail
   const outputFile = './bundled.js'; // Väljundfail
   ```

   Kui sinu projekti peamine fail asub teises asukohas või soovid väljundfaili teise asukohta, muuda neid väärtusi vastavalt.

- **Skripti käivitamine**:
   Käivita skript, et koondada kõik failid üheks:

   ```bash
   node bundler.js
   ```

   See skript alustab määratud sisendfailist, töötleb kõik lokaalsed 'require' kutsed, ja koondab kogu sisu üheks suureks failiks.

## Funktsioonide Ülevaade

- **isThirdPartyModule(modulePath)**:
   Funktsioon, mis kontrollib, kas 'require' kutsutud moodul on kolmanda osapoole moodul, kuna kolmanda osapoole mooduleid ei tohiks koondatud faili lisada.

- **findLocalRequires(fileContent)**:
   Funktsioon, mis leiab kõik lokaalsed 'require' kutsed antud faili sisust.

- **processFile(filePath)**:
   Rekursiivne funktsioon, mis töötleb faili ja kõiki selle 'require'-itud faile, vältides tsüklilisi viiteid.

- **bundleFiles(entryFile, outputFile)**:
   Funktsioon, mis koondab kõik failid üheks. Alustab määratud sisendfailist, töötleb kõik lokaalsed 'require' kutsed ja kirjutab kogu sisu ühte väljundfaili.

## Näidis Rakendus

Oletame, et sul on Node.js projekt, mille peamine fail on `app.js` ja sa tahad koondada kõik failid üheks failiks nimega `bundled.js`. Veendu, et fail `bundler.js` sisaldab järgmisi ridu:

```javascript
const entryFile = './app.js';
const outputFile = './bundled.js';

bundleFiles(entryFile, outputFile);
```

Kui need read on olemas, käivita skript:

```bash
node bundler.js
```

Pärast skripti käivitamist, leiad koondatud sisu failist `bundled.js`.

## Lisamärkused

- Skript kasutab Node.js `fs` ja `path` mooduleid failide lugemiseks ja töötlemiseks.
- Veendu, et kõik lokaalsed failid, mida 'require'-itakse, on kättesaadavad ja õigetes asukohtadesu.
- Kui tekib probleeme või vigu, vaata konsooli väljundit, et saada täpsemat informatsiooni probleemi allika kohta.
