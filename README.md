# Gestion des décisions JUB

Cette application permet de gérer et d'analyser des décisions de justice. L'ensemble de la logique se trouve dans `index.html` et utilise des bibliothèques chargées via CDN : Tailwind pour la mise en forme, Handsontable pour les tableaux interactifs, SheetJS pour l'export Excel et Chart.js pour les graphiques.

## Fonctionnalités principales

- **Importation** de fichiers Excel ou CSV dans trois tableaux : toutes les décisions, décisions retenues et décisions exclues.
- **Recherche et pagination** dans les tableaux avec un menu contextuel pour exclure ou intégrer une ligne.
- **Commentaires** par cellule avec sauvegarde et chargement au format JSON.
- **Recherche globale** (raccourci `Ctrl+K`) pour interroger toutes les sources.
- **Détection des doublons** affichée dans l'onglet Réglages.
- **Thème clair/sombre** basculable via un bouton dans l'en‑tête.
- **Statistiques et graphiques** générés automatiquement.
- **Export** des décisions retenues en **DOCX** (filtre par année, mois ou numéro) et de chaque tableau en **Excel**.

## Lancer l'application

Ouvrez simplement `index.html` dans votre navigateur ou servez-le via un serveur web local.

## Tests

Le répertoire `tests` contient plusieurs scripts exécutables avec `node` :

```bash
node tests/date.test.js          # parseFrDate
node tests/duplicates.test.js    # computeDuplicates
node tests/global-search.test.js # matchRow
node tests/stats.test.js         # updateStatsData
```

Vous pouvez aussi exécuter l'ensemble des tests d'un coup :

```bash
npm test
```

## Fonctionnement hors ligne

L'application utilise un *service worker* (`service-worker.js`) qui met en cache
`index.html`, les bibliothèques JavaScript et le fichier `upc-data.json` lorsque
il est disponible. Après avoir visité la page une première fois avec une
connexion réseau, ces ressources restent accessibles et l'interface continue de
fonctionner même hors ligne.

Pour tester ce mode, ouvrez la page dans votre navigateur, puis activez l'option
"Offline" dans les outils de développement (onglet Réseau). Rechargez ensuite
la page : le contenu doit rester opérationnel grâce au cache.
