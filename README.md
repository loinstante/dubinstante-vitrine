# DubInstante — Site Vitrine Officiel (v2)

Site vitrine moderne, interactif et ultra-rapide pour **DubInstante**, le studio de doublage vidéo et bande rythmo libre et open-source.

Déployé sur : [dubinstante.vercel.app](https://dubinstante.vercel.app/)

---

## 🎨 Design System & Technologies

- **Framework** : [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Style** : [Tailwind CSS](https://tailwindcss.com/) avec les tokens officiels du logiciel DubInstante 2026 :
  - Fond Obsidienne : `#0d0d12`
  - Surfaces Studio : `#161622` et `#212130`
  - Bordures : `#2a2a3c`
  - Accent Électrique : `#926bff` / `#a185ff`
  - Barre Rythmo & Record : `#ff4d66`
  - Vumètres Audio : Vert `#12c582` / Ambre `#f3a400`
- **Icônes** : [Lucide React](https://lucide.dev/)

---

## ✨ Fonctionnalités Clés

1. **Simulateur Interactif de Bande Rythmo (60 FPS)** :
   - Défilement fluide de syllabes synchronisées à l'image près vers la barre rouge centrale.
   - Boucle de rendu optimisée via `requestAnimationFrame` et manipulations directes du DOM (zéro re-render React pour zéro saccade).
   - Contrôle à la souris ou avec la barre **Espace** (capturée uniquement lors de l'interaction avec le lecteur pour ne pas parasiter le défilement de la page).
   - Mode adaptatif mobile (1 piste simplifiée sur petits écrans).
2. **Grand Comparatif 3 Voies** :
   - DubInstante vs. Logiciels studio propriétaires (VoiceQ à 999€–3999€, Nuendo ADR, Stellar) vs. Outils obsolètes des années 2000.
3. **Hub de Téléchargement Multiplateforme** :
   - Détection automatique de l'OS de l'utilisateur (macOS, Windows, Linux, Android APK).
   - Configuration centralisée des liens dans `src/config/downloads.ts` (prêt pour un bucket S3, CDN ou GitHub Releases).
4. **Table de Mixage & Vumètres Audio Interactifs** :
   - Simulation du moteur N-pistes avec contrôle de gain en direct et visualisation sonore.
5. **Station Interactive de Raccourcis Clavier** :
   - Clavier tactile illustrant `Espace`, `Ctrl+S`, `←`, `→`, `Échap`.
6. **Support Bilingue Instantané (FR / EN)** :
   - Bascule de langue sans rechargement de page.

---

## 🚀 Démarrage Local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement local
npm run dev

# Vérifier le typage TypeScript
npm run typecheck

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

---

## ⚙️ Configuration des Téléchargements

Les URLs de téléchargement et tags GitHub Release sont centralisés dans `src/config/downloads.ts`.

---

## 📜 Licence

Sous licence open-source EUPL 1.2 — Développé pour la communauté audiovisuelle et du doublage par [LOINSTANTE](https://github.com/loinstante).
