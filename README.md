# Gestion des décisions JUB

Cette application web offre une interface unique pour importer, filtrer et exporter des tableaux de décisions de justice. Tout le code se trouve dans `index.html` et s'appuie sur plusieurs bibliothèques chargées via CDN : Tailwind pour le style, Handsontable pour les tableaux interactifs, SheetJS pour les exports Excel, Chart.js pour les graphiques et Firebase pour la synchronisation en temps réel.

## Fonctionnalités principales

- **Importation** de fichiers Excel ou CSV dans trois tableaux : toutes les décisions, décisions retenues et décisions exclues.
- **Recherche et pagination** grâce à Handsontable, avec la possibilité d'exclure ou d'intégrer une décision via un menu contextuel.
- **Statistiques et graphiques** mis à jour dynamiquement (Chart.js).
- **Sauvegarde/chargement JSON** et synchronisation Firestore pour le travail collaboratif.
- **Exportation** des décisions retenues en DOCX et des tableaux en Excel avec mise en forme.

## Lancer l'application

Ouvrez simplement `index.html` dans votre navigateur ou servez-le via un petit serveur web local.

## Tests

Le répertoire `tests` contient plusieurs scripts exécutables avec `node`. Chaque fichier vérifie une fonction clé de l'application :

```bash
node tests/date.test.js         # parseFrDate
node tests/duplicates.test.js   # computeDuplicates
node tests/global-search.test.js # matchRow
node tests/flags.test.js        # computeFlags
node tests/stats.test.js        # updateStats
```

Si tout se passe bien, chaque script affiche un message indiquant que tous les tests passent.

Vous pouvez aussi exécuter l'ensemble des tests d'un coup :

```bash
npm test
```
