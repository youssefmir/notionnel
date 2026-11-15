# Écrire une nouvelle leçon

Les six modules du parcours contiennent chacun une leçon complète en Markdown. Pour développer un autre chapitre du manuel, partez de l’exemple ci-dessous. Le premier titre appartient aux métadonnées. Les titres de niveau deux structurent ensuite la lecture, et les citations commençant par **Analogie** ou **À retenir** deviennent des encadrés.

L’exemple porte sur le chapitre 3 et peut servir de point de départ à une leçon consacrée au risque de base. Avant de le publier, attribuez au module un identifiant et une adresse uniques, complétez le parcours et son quiz, puis vérifiez les liens du glossaire et le déploiement sous sous-chemin.

```markdown
---
id: 7
slug: 'risque-de-base'
title: 'Pourquoi une couverture peut-elle être imparfaite ?'
subtitle: 'Comparer le prix local du blé au prix du contrat utilisé pour le couvrir.'
minutes: 4
chapter: 'Hull · chapitre 3'
---

## Deux blés dont les prix évoluent différemment

Un producteur va vendre dix tonnes de blé local. Il vend un contrat à terme sur dix tonnes d’un blé standard, faute de contrat sur la qualité exacte de sa récolte.

> **Analogie** Deux stations-service voisines changent souvent leurs prix dans le même sens, mais l’écart peut s’élargir ou se resserrer d’une semaine à l’autre.

## Suivre l’argent

Pendant la couverture, le prix du blé local passe de 230 à 210 € la tonne. Le prix du contrat passe de 235 à 220 € la tonne. La vente de la récolte rapporte 200 € de moins qu’au prix de départ. La clôture de la position vendeuse à terme procure 150 €. Au total, il manque encore 50 € par rapport à la recette espérée au départ, avant frais.

La base est ici le prix au comptant moins le prix à terme. Elle est passée de −5 à −10 € par tonne. Son évolution explique les 5 € par tonne que la [couverture](glossaire:couverture) laisse à la charge du producteur.

> **À retenir** Pour juger une couverture, additionnez la variation du produit vendu et le résultat du contrat utilisé pour le protéger.

## Dans le manuel

Hull, 10e édition française, §3.3, p. 54, sur le risque de base.
```

Pour le quiz correspondant, demandez par exemple quel serait l’écart restant si le contrat baissait aussi de 20 € la tonne. La bonne réponse est 0 € dans cet exemple, car les deux variations se compenseraient pour les mêmes dix tonnes. Expliquez le calcul après la réponse.
