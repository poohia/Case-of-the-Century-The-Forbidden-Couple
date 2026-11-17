# Notes — retours testeurs malvoyants (2026-11-17)

Retours bruts recueillis auprès de personnes malvoyantes (test avec NVDA).
Aucune modification de code faite à ce stade : ce fichier ne sert qu'à consigner les observations.

## 1. Configuration initiale

- **Ordre des options** : le réglage « lecteur d'écran » devrait être **la première option** de la
  configuration initiale (actuellement il arrive après d'autres réglages).
  Logique : c'est le réglage dont dépend toute la suite de l'expérience.

## 2. Visibilité du focus / de la sélection

- **Focus pas assez marqué** : la différence entre un élément sélectionné et les autres n'est pas
  assez prononcée. Le testeur n'arrive pas à voir quel élément est sélectionné.
  → piste : contour plus épais, contraste plus fort, fond de l'élément actif, éventuellement
  agrandissement ou indicateur supplémentaire.

- **Contour de focus à deux tons écrit (vérifié visuellement dans le jeu, pas avec NVDA)** :
  avant, un seul trait noir de 3 px (`screen_reader.outline` dans `theme.json`, appliqué par
  `src/components/GlobalCSSComponent/index.tsx`, moteur). Maintenant : anneau intérieur noir 2 px
  (`box-shadow`, clé `outline_inner`) + anneau extérieur jaune 4 px (`outline`), décalage 2 px.
  Lisible sur le papier clair comme sur les décors sombres. Valeurs configurables dans `theme.json`.
  Reste à voir : l'état « sélectionné » (`activate`) des boutons, laissé tel quel car le fond des
  boutons est une image volontairement stylée.

## 3. Thèmes / contraste

- **Mode contraste élevé peu perceptible** : le testeur ne voit pas vraiment la différence avec le
  mode normal.
- **Demande d'un mode sombre** en complément (ou en remplacement) du contraste élevé.

- **Audit « couleur seule » (point 1 du plan couleurs) — fait en partie** :
  - Réponses correcte/incorrecte du choix du coupable : vert `#2e7d32` / rouge `#c62828`, quasi
    identiques en deutéranopie (distance RGB 28, contraste 1.14:1). Corrigé dans le module
    (`ModalCulpritSelection/styled.tsx`) : ✓ trait plein / ✗ trait pointillé, gras, couleurs assombries.
  - Pastille de notification des listes (personnages, scénarios, notes, interrogatoires) : point rouge
    12 px. Corrigé dans le module (`ModalParametersCharacters/styles.ts`) : 20 px, liseré blanc, « ! ».
  - **Reste (moteur, non fait)** : la pastille de `ButtonClassicComponent` (boutons du menu pause) est
    encore un point rouge de 12 px.
  - OK tel quel : tampon réussi/échoué (a du texte), jauge de colère (le smiley change aussi), points (texte).
  - Non vérifié : aperçu fait sur une maquette du CSS, pas sur les vrais écrans de fin de partie.

- **Étape A du contraste élevé + mode sombre — écrite (moteur), vérifiée dans le jeu sur la config 4/4,
  pas avec NVDA** : nouveau mode `dark`, fusion de thème par mode (`useTheme` + `theme.modes.json`),
  vieux filtre « contraste élevé » supprimé, bouton « Mode sombre » (fr/en), `aria-pressed` sur les
  boutons à état (`ButtonClassicComponent`), thème des boutons réactif.
  Mesures (sombre) : texte/panneau 15.6:1, bouton 11:1, choisi/non choisi 11:1. En contraste élevé :
  noir/blanc, choisi en jaune. Reste : étapes B (autres modales), C (écrans de dialogue),
  D (couleurs en dur), libellé « Achromatopsie (sans … » tronqué.

- **Étape B (modales) — parcourue dans le jeu en sombre et en contraste élevé, mesure de contraste par script** :
  - Menu pause, Paramètres et ses 5 sous-modales, menu « Mode de couleur » : OK (sombre ≥ 11:1, contraste élevé 21:1).
  - Personnages / Scénarios / Notes / Interrogatoires : les libellés « ???? » des éléments verrouillés
    étaient `#111b2d` sur fond sombre (1.05:1). Corrigé (`ModalParametersCharacters/styles.ts`), maintenant 15.6:1.
  - Accueil, Crédits, fiches « papier » (`PaperSheetComponent`) : texte `textdark` sans image de fond donc
    illisible en sombre/contraste. Corrigé : couleur et fond lus dans `default_modal`, bordure en contraste élevé.
    Mode classique vérifié inchangé (papier + boutons marron).
  - Page Sauvegardes : écran de debug déjà sombre, 10:1, non touché.
  - **Non vérifié** : modales de détail (fiche personnage/note), résumé d'interrogatoire, choix du coupable,
    résumé de fin (accessibles seulement en fin de partie), dialogue de confirmation.
  - Rappel : en cliquant « Supprimer les données de jeu » pendant mes essais, la partie du navigateur de test
    a été réinitialisée (pas de dialogue de confirmation vu).

- **Étape C (écrans de jeu) — parcourue en contraste élevé dans le jeu (dialogues, narrateur, comics,
  choix du coupable, résumé de fin), mesure par script, pas NVDA** :
  - Bulles de dialogue : l'image de bulle est du papier et le texte est noir (≈12:1) dans tous les modes.
    Rien à changer, volontairement cohérent avec l'art.
  - **Défaut trouvé hors modes (aussi en classique)** : la liste « Objectifs » de l'arrivée au
    commissariat grisait l'objectif inactif en `rgba(0,0,0,.4)` sur papier (≈2.8:1). Corrigé :
    `#4a4a4a` (≈7.5:1) + gras pour l'objectif actif, donc plus seulement la couleur
    (`ComicsArrivedCommisseriatScene/styles.ts`). Candidat probable au retour « texte clair sur fond clair ».
  - Choix du coupable : le bouton « Choisir un coupable » était `textdark` sur fond noir (1.22:1).
    Corrigé (couleur de la modale). Couleurs correct/incorrect par mode dans le module
    (`hooks/useAnswerColors`, clair sur sombre : #81c784 / #ff8a80), pas dans le moteur car propres au jeu.
    Règle : tout ce qui est hors du module doit rester générique ; le spécifique au jeu va dans le module.
  - Résumé de fin : OK (min 5.8:1, tampon blanc sur vert).
  - Pastille « ! » de la loupe visible dans le jeu.
  - Non vérifié : résumé d'interrogatoire (`ModalInterrogatoireResume`), états correct/incorrect réellement
    affichés après validation, titre de sous-modale tronqué (« Choisir un coup… », ellipse du moteur).

- **Étape D (couleurs en dur) — diagnostic dans le jeu en sombre et contraste élevé (listes et fiches de
  détail personnages/notes/interrogatoires/scénarios, résumé d'interrogatoire), mesure par script, pas NVDA** :
  - **Un seul vrai défaut** : les bulles du transcript d'interrogatoire (`ModalInterrogatoireCharacterBubble`) ont
    un fond papier en dur mais héritaient du texte du thème, donc clair en sombre/contraste (1.04:1).
    Corrigé : `color: theme.colors.textdark` (`ModalInterrogatoires/styled.ts`). Sombre ≥ 11:1, contraste ≥ 13.5:1.
  - Mode classique vérifié identique : 75 textes de bulles en `rgb(17,27,45)`, minimum 13.55:1 avant et après.
  - OK sans changement : fiches de détail (personnage, note, scénario), résumé d'interrogatoire
    (les 100 % à opacité .72 restent à ≈12:1), le reste des couleurs en dur (ombres, voiles, liserés rgba).
  - Rien ajouté à `theme.json`.
  - Non vérifié : dialogue de confirmation du moteur, bannière d'app mobile, jauge de colère (piste gris clair),
    page Sauvegardes (debug, laissée).

## 4. Focus et navigation NVDA (modales / menus)

- **Perte du mode navigation NVDA en sortie de modale** : en entrant dans un menu (ex. Paramètres)
  puis en le fermant via la croix, le retour au menu Pause fait **perdre le focus** au jeu.
  Le testeur est alors obligé d'aller chercher le bouton à la souris.
  → piste : restaurer le focus sur l'élément déclencheur à la fermeture d'une modale
  (focus trap + restore focus), et s'assurer que le conteneur reste focusable.
  → **Correctif écrit (non testé avec NVDA)** dans `src/components/ModalComponent/index.tsx` (moteur,
  à recopier dans GameDevSoftwareTarget) : le focus est rendu à l'élément d'origine à la fermeture.
  Cause : la modale est retirée du DOM (`return null`), la croix focalisée disparaît, le focus
  retombe sur `body` et rien ne le redonne au bouton d'origine.

## 5. Dialogues — mode manuel

- **Pas de continuité de lecture** : il faut faire flèche haut / flèche bas pour lire la suite du
  texte ; ce n'est pas lu en un seul bloc.
- **Focus perdu entre deux dialogues** : à chaque nouveau dialogue, il faut refaire flèche haut/bas.
- **Attendu** : le jeu garde le focus, et à l'apparition d'un nouveau texte le lecteur d'écran
  le lit directement (annonce automatique du nouveau contenu).

- **Correctif écrit (module, non testé avec NVDA)** : `ContinueArrowComponent` reste monté et reçoit le
  focus une seule fois (lecteur d'écran + mode manuel), `aria-disabled` tant que la réplique n'est pas
  prête ; les 4 scènes (Dialogue, ComicsDouble, ComicsNarrator, GifWithText) passent `show` au lieu de
  démonter le bouton ; l'écran de réponses focalise la première réponse. Vérifié en navigateur sur le
  composant seul (focus conservé sur 5 répliques, clic ignoré pendant l'attente, comportement inchangé
  sans lecteur d'écran et en mode automatique). Risque connu : le focus initial arrive ~950 ms après la
  première réplique et peut couper une réplique longue.

## 6. Dialogues — mode automatique (normal)

- **Nom du locuteur répété** : le lecteur d'écran répète le nom de la personne qui parle à chaque
  réplique. Bien quand le locuteur change, **lassant quand c'est le même**.
  → piste : n'annoncer le nom que lors d'un changement de locuteur.
  → **Correctif écrit (non testé avec NVDA)** dans `VisualNovelTextComponent/index.tsx` (moteur, à
  recopier) : le composant mémorise le dernier nom annoncé et ne le redit que s'il change, sans
  prop à renseigner aux endroits d'usage. La prop `announceName` prévue au point 4 est retirée.
  Après un écran de réponses (composant démonté/remonté), le nom est ré-annoncé.
- **Double lecture** : le texte est bien lu sans appuyer sur les flèches, mais le lecteur d'écran
  **le lit deux fois**.
  → piste probable : contenu présent à la fois dans le DOM accessible et dans une région live
  (aria-live), ou double mise à jour de la région live.
  → **Correctif écrit (non testé avec NVDA)** dans
  `src/GameDevSoftware/modules/GDSTModule/components/VisualNovelTextComponent/index.tsx` (moteur,
  à recopier dans GameDevSoftwareTarget) : une seule copie du texte pour le lecteur d'écran, dans
  une zone `sr-only` `aria-live="polite"` `aria-atomic="true"` toujours montée ; le texte visible
  passe en `aria-hidden` avec lecteur d'écran.
  Limite : deux répliques consécutives au texte identique ne sont pas ré-annoncées.

## 7. Lisibilité des textes (testeur n°2, aperçu rapide via le lien)

- **Texte blanc ou clair sur fond de couleur claire : indéchiffrable** pour ce testeur (basse vision).
  Il n'est pas allé plus loin dans le jeu à cause de ça : c'est donc un **point bloquant dès le
  premier contact**, avant même de pouvoir juger le reste.
  → piste : auditer les ratios de contraste texte/fond sur tous les écrans (home, config initiale,
  menus, dialogues), viser au minimum WCAG AA (4.5:1 texte normal, 3:1 grand texte), y compris
  en thème par défaut — pas seulement en mode contraste élevé. À relier au point 3
  (contraste élevé / mode sombre).
- Contexte : ce testeur est peu disponible cette semaine ; il informe des déficients visuels sur
  l'usage des lunettes connectées (type Ray-Ban Meta). Retour fait « à chaud », test non poursuivi.

## 8. Points positifs

- Le fonctionnement général avec le lecteur d'écran « a l'air de fonctionner » d'après le test.

## Récapitulatif des pistes à traiter

| # | Sujet | Priorité pressentie |
|---|-------|---------------------|
| 1 | Lecteur d'écran en 1re position dans la config initiale | haute (rapide) |
| 2 | Double lecture du texte en mode auto | haute (bug) |
| 3 | Restauration du focus à la fermeture des modales | haute (bloquant souris) |
| 4 | Focus conservé + annonce auto des nouveaux dialogues (mode manuel) | haute |
| 5 | Nom du locuteur annoncé seulement si changement | moyenne |
| 6 | Indicateur de focus/sélection beaucoup plus visible | moyenne |
| 7 | Mode sombre + revoir le mode contraste élevé | moyenne |
| 8 | Contraste texte clair / fond clair (thème par défaut) | haute (bloquant dès l'entrée) |
