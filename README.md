# CODÍCIA — web del còmic i de l'exposició NFC

Lloc web **estàtic i gratuït**, dissenyat per a GitHub Pages i per a les etiquetes NFC NTAG213 de 25 mm. Inclou les **10 il·lustracions definitives**, llegibles per ordre cronològic o per ordre narratiu, i **6 capítols** basats en els apunts de la UD1. Les pàgines de la web estan en català; els textos que ja formen part de les imatges del còmic continuen en castellà.

## Contingut

- `index.html`: portada, cronologia, lector del còmic, sis capítols amb NFC.
- `styles.css`: aspecte adaptat a mòbil, tauleta i ordinador.
- `script.js`: canvi d'ordre de lectura, visor ampliat i navegació entre pàgines.
- `assets/pages/*.webp`: deu il·lustracions optimitzades per carregar més ràpid. No cal pujar imatges addicionals.
- `nfc_links.csv`: taula dels sis xips i els seus enllaços.
- `documentacio/ordre_imatges.md`: l'ordre de lectura i l'origen de cada imatge.
- `.nojekyll`: fitxer buit per a GitHub Pages.

## Per veure la web sense publicar-la

Descomprimeix el ZIP i **obre `index.html` mantenint la carpeta `assets` al costat**. La versió descarregada es pot obrir al navegador sense comprar un domini. Perquè la llegeixin altres mòbils a través dels NFC, cal que estigui publicada a internet.

## Publicar gratis a GitHub Pages

1. Entra a [GitHub](https://github.com/) i crea un repositori nou, **públic**, amb el nom `codicia-nfc`.
2. Posa a l'arrel del repositori **tots els fitxers i carpetes del ZIP** (sobretot `index.html`, `styles.css`, `script.js`, `favicon.svg` i `assets`). No hi posis el ZIP com a fitxer sense descomprimir: GitHub Pages necessita els fitxers extrets.
3. Al repositori, obre **Settings → Pages**.
4. A **Build and deployment**, selecciona **Deploy from a branch**, `main` i `/(root)`; desa els canvis.
5. Quan aparegui l'adreça publicada, normalment tindrà aquest format: `https://EL_TEU_USUARI.github.io/codicia-nfc/`.
6. Comprova al mòbil que pots veure la portada, el còmic i cada apartat del temari.

El teu nom d'usuari encara és desconegut, de manera que aquests exemples **no són enllaços operatius** fins a substituir `EL_TEU_USUARI` pel teu nom real i publicar el repositori.

## Gravar els 6 NFC

Els NTAG213 només han de contenir un enllaç, no les imatges. Utilitza una aplicació com NFC Tools i grava cada xip com a **URL/URI**. Comprova cada xip amb el telèfon i **no el bloquegis en mode només lectura**.

| NFC | Secció física | Fragment d'URL |
|---|---|---|
| 01 | Orfebreria | `#orfebreria` |
| 02 | Materials | `#materials` |
| 03 | Tècniques | `#tecniques` |
| 04 | Joieria | `#joieria` |
| 05 | Gemmologia | `#gemmologia` |
| 06 | Joieria artística i bijuteria | `#evolucio` |

Exemple del xip 01 (només exemple): `https://EL_TEU_USUARI.github.io/codicia-nfc/#orfebreria`

**Consell:** grava els xips només quan l'URL definitiva sigui pública i comprovada. Si més endavant canvies el disseny però no els fragments d'URL, els xips continuaran funcionant.

## Història i cronologia

El lector ofereix **dues ordenacions**. La primera, activa per defecte, és històrica (Egipte → Roma → 1527 → 1530 → museu). La segona conserva l'**ordre de narració original** (comença amb el sacerdot i el cavaller, retrocedeix a l'antic Egipte i torna al 1527). Aquesta diferència és intencionada.

Les il·lustracions són de ficció històrica. La coronació del cavaller per part del papa **no és un fet històric real**; tampoc no es presenta la maledicció del penjoll com un fenomen documentat. Les parts educatives s'han elaborat a partir del PDF «Apunts UD 1» facilitat per l'alumne.

## Ajustos

- Per canviar títols, paràgrafs o definicions: edita `index.html`.
- Per canviar l'ordre, el nom o la descripció de les làmines: edita la llista `pages` de `script.js`.
- Per canviar colors i tipografies: edita les variables `:root` de `styles.css`.
- **No canviïs els IDs** `#orfebreria`, `#materials`, `#tecniques`, `#joieria`, `#gemmologia` ni `#evolucio` un cop gravats els xips.

## Notes tècniques

Web 100% estàtica. Sense registres, galetes, analítiques, backend, rastrejadors, llibreries externes ni tarifes de domini. Una connexió a internet és necessària per obrir la web publicada des d'un xip. Les imatges de les làmines continuen disponibles amb la seva resolució original a la conversa; el web en fa servir versions WEBP d'alta qualitat optimitzades.
