# CLAUDE.md — la-france-applaudit

Landing page "LA FRANCE APPLAUDIT" — mouvement de soutien hebdomadaire à ceux qui font la différence en France.

## Stack

- React + Vite (vanilla, pas de framework CSS — CSS pur avec variables)
- Aucune dépendance backend pour l'instant (contenu statique)

## Structure

- `src/App.jsx` — page complète (header, hero, contenu, CTA)
- `src/App.css` — styles globaux de la page (layout, header, hero, CTA)
- `src/components/FranceMap.jsx` + `FranceMap.css` — carte de France en SVG stylisée avec pins animés par ville (Lille, Paris, Rennes, Lyon, Bordeaux, Marseille) + Corse
- `src/components/Icons.jsx` — icônes SVG maison (logo clap, mini-badges, spark décoratifs, groupe, cœur, chevron, pin)

## Données affichées (statiques pour l'instant)

- Compteurs par ville, stats globales (128 482 applaudissements, 1 240 initiatives, +32 481 participants) — tout est en dur dans `App.jsx` / `FranceMap.jsx`. À brancher sur une vraie source de données quand disponible.

## Commandes

```
npm run dev      # serveur de dev (http://localhost:5173)
npm run build    # build de prod
```

## À faire / pistes suivantes

- Rendre le compteur de villes dynamique (API ou fichier JSON)
- Ajouter les sections ancrées par la nav (Le concept, Initiatives, Comment ça marche, FAQ) — actuellement des liens `#` sans contenu
- Brancher le bouton "Nous contacter" et "Rejoindre l'événement" sur une vraie action
