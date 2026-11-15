# Sources et correspondance pédagogique

John C. Hull, *Options, futures et autres actifs dérivés*, 10e édition française, Pearson France, 2017. Édition française dirigée par Patrick Roger avec Christophe Hénot et Laurent Deville. ISBN 978-2-3260-0156-5.

Les références des six modules de base correspondent à l’édition française fournie pour ce projet. Les pages sont les **pages imprimées du livre**. Par exemple, le chapitre 1 commence à la page imprimée 1, qui est la 32e page du PDF. Les textes, montants, situations et illustrations du site ont été élaborés pour ce parcours. Le PDF du manuel n’est pas distribué avec le dépôt.

| Module | Repères dans le manuel | Application dans la leçon |
| --- | --- | --- |
| 1. Les actifs et les sous-jacents | §1.3, p. 6 (comptant et terme) ; §4.6, p. 84 (obligations) ; §5.1, p. 107, et §5.9 à 5.11, p. 118, 121 et 124 (familles d’actifs) ; §10.3, p. 211 (sous-jacents d’options). | Identifier ce qui est échangé, l’unité de cotation et les droits associés. |
| 2. À quoi sert un produit dérivé ? | Chapitre 1, §1.3 à 1.5 sur les instruments et §1.6 à 1.10 sur les intervenants et les risques. Voir en particulier §1.9, p. 16, sur l’arbitrage. | Comparer l’exposition avant et après un contrat ; distinguer couverture, spéculation, arbitrage et levier. |
| 3. Les contrats à terme | §1.3 et 1.4 ; chapitre 2, p. 25, notamment §2.2 à 2.4 et §2.10 ; chapitre 3, §3.1, p. 49, et §3.3, p. 54. | Comparer l’engagement de gré à gré et le futures standardisé ; reconstituer un appel de marge ; repérer le risque de base. |
| 4. Les options d’achat et de vente | Chapitre 10, §10.1, p. 207, §10.2, p. 210, et §10.3 à 10.4 ; chapitre 11, §11.1 à 11.3, à partir de la p. 231. | Séparer le montant brut reçu à l’échéance de la prime et du résultat net. Reconnaître les quatre positions du simulateur. |
| 5. Les swaps de taux et de devises | Chapitre 7, p. 155 ; §7.1, p. 156 ; §7.7, p. 168 ; §7.8 et 7.9. | Retracer les intérêts à taux fixe et variable ; distinguer notionnel de calcul et capitaux échangés en devises. |
| 6. Comprendre les risques d’une option | Chapitre 15, §15.4, p. 332, §15.5 à 15.8 et §15.11 ; chapitre 19, §19.4, p. 421 (delta), §19.5, p. 428 (thêta), §19.6, p. 430 (gamma), §19.8, p. 435 (véga), et §19.10 à 19.11. | Estimer des variations locales, indiquer les unités et les hypothèses, distinguer prime théorique et résultat final. |

## Approfondissement avec Bouzoubaa et Osseiran

Mohamed Bouzoubaa et Adel Osseiran, *Exotic Options and Hybrids: A Guide to Structuring, Pricing and Trading*, John Wiley & Sons, Ltd, 2010, ISBN 978-0-470-68803-8. Le chapitre 10 commence à la page imprimée 145, qui correspond à la page 167 du PDF fourni.

| Objet de la lecture | Sections et pages imprimées | Application dans le module 7 |
| --- | --- | --- |
| Call ordinaire et option asiatique | §3.2, p. 32, et §3.9, p. 43–44 | Comparer le cours final et la moyenne arithmétique de trois clôtures pour un même prix d’exercice. |
| Structuration | §3.10, p. 44 | Partir des dates d’achat d’une entreprise pour choisir les dates d’observation pertinentes. |
| Barrière désactivante et surveillance | §10.1.1, p. 145, et §10.2.3, p. 154 | Faire varier une clôture et vérifier si le droit s’éteint à la barrière. |
| Dérivé hybride | Chapitre 19, p. 295, et §19.1.1, p. 296 | Identifier deux risques de familles différentes, par exemple une matière première et une devise. |

Les deux trajectoires de prix, le seuil de 120 € et la prime de 4 € sont des hypothèses pédagogiques propres au module. L’exercice calcule les paiements sur des trajectoires connues. L’évaluation d’une prime de marché demanderait notamment des hypothèses sur les trajectoires futures.

## Conventions du simulateur

Le sous-jacent est une unité d’action dont le prix est supposé positif ou nul. Le prix d’exercice est noté K, la prime P et le cours à l’échéance S. Les résultats ci-dessous sont par action, hors frais, fiscalité et financement de la prime. Le règlement est représenté par sa valeur monétaire, y compris pour un contrat qui serait livré en titres.

| Position | Paiement brut à l’échéance | Résultat après la prime |
| --- | --- | --- |
| Call acheté | max(S − K, 0) | max(S − K, 0) − P |
| Call vendu | −max(S − K, 0) | P − max(S − K, 0) |
| Put acheté | max(K − S, 0) | max(K − S, 0) − P |
| Put vendu | −max(K − S, 0) | P − max(K − S, 0) |

Le résultat du vendeur est l’opposé de celui de l’acheteur pour la même prime. Le seuil usuel est K + P pour un call et K − P pour un put. Si P dépasse K, ce dernier seuil est négatif et donc inaccessible pour l’action considérée. Avec une prime nulle, toute la partie de la courbe où l’option expire sans valeur donne aussi un résultat nul. Le repère K marque alors le début ou la fin de cette zone.

Les situations chiffrées du parcours utilisent des hypothèses explicites. La marge n’est pas un plafond de perte. Le swap de taux de la leçon 5 utilise un notionnel constant et des périodes d’un an. Les sensibilités de la leçon 6 se lisent par petite variation, toutes choses égales par ailleurs.
