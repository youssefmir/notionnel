export const quizzes = {
  1: [
    {
      question: 'Nina achète une obligation émise par une entreprise. Quel rôle joue-t-elle ?',
      choices: [
        'Elle devient copropriétaire de l’entreprise.',
        'Elle prête de l’argent à l’entreprise.',
        'Elle garantit les dettes de l’entreprise.',
      ],
      answer: 1,
      explanation:
        'L’obligation représente une dette de l’entreprise envers Nina. Une action lui donnerait une part du capital.',
    },
    {
      question:
        'Un meunier achète du blé au cours du jour pour une livraison immédiate. Sur quel marché se trouve-t-il ?',
      choices: ['Le marché au comptant.', 'Le marché des options.', 'Le marché des contrats à terme.'],
      answer: 0,
      explanation:
        'Le prix est convenu pour un échange au délai normal de livraison. C’est le principe du comptant.',
    },
    {
      question: 'Un contrat dépend de l’évolution d’un indice boursier. Quel est son sous-jacent ?',
      choices: [
        'La somme versée pour signer le contrat.',
        'L’entreprise qui a vendu le contrat.',
        'L’indice suivi par le contrat.',
      ],
      answer: 2,
      explanation:
        'Le sous-jacent est la référence qui détermine la valeur du contrat. Un indice, même exprimé en points, peut jouer ce rôle.',
    },
  ],
  2: [
    {
      question:
        'Un importateur devra payer 5 000 dollars dans trois mois. Il fixe aujourd’hui son cours d’achat des dollars. Quel est son objectif ?',
      choices: [
        'Gagner à coup sûr sur le dollar.',
        'Réduire l’incertitude sur sa facture en euros.',
        'Éviter de régler sa facture.',
      ],
      answer: 1,
      explanation:
        'Sa dette en dollars existe déjà. Fixer le cours lui permet de connaître le montant en euros. Cette opération est une couverture.',
    },
    {
      question:
        'Sans avoir besoin de café, Lina s’engage à en acheter à terme car elle prévoit une hausse. Que fait-elle ?',
      choices: [
        'Elle couvre un achat déjà prévu.',
        'Elle réalise un arbitrage sans risque.',
        'Elle prend une position spéculative.',
      ],
      answer: 2,
      explanation:
        'Lina choisit de s’exposer au prix du café. Si le cours baisse, sa position peut lui faire perdre de l’argent.',
    },
    {
      question: 'Dans un exemple sans frais, quelle opération permet de verrouiller un gain d’arbitrage ?',
      choices: [
        'Acheter et revendre simultanément le même titre à deux prix différents, aux mêmes conditions, en achetant au prix le plus bas.',
        'Acheter le titre aujourd’hui en espérant le revendre plus cher demain.',
        'Acheter un titre voisin moins cher et attendre que son cours monte.',
      ],
      answer: 0,
      explanation:
        'Les deux prix doivent être exécutables ensemble et les engagements identiques. Si une étape attend une hausse future, le gain reste incertain.',
    },
  ],
  3: [
    {
      question:
        'Un boulanger s’est engagé à acheter 10 tonnes de blé à 240 € la tonne. À l’échéance, le blé vaut 260 €. Quel est son avantage par rapport à un achat au comptant ?',
      choices: [
        '20 € sur toute la commande.',
        '200 € sur toute la commande.',
        '2 600 € sur toute la commande.',
      ],
      answer: 1,
      explanation:
        'Il paie 2 400 € au lieu de 2 600 €. L’économie vaut 20 € par tonne multipliés par 10 tonnes.',
    },
    {
      question:
        'Sur un future acheté en bourse, le cours de règlement baisse aujourd’hui. Que se passe-t-il pour l’acheteur ?',
      choices: [
        'Il choisit d’annuler la baisse.',
        'Aucun mouvement avant l’échéance.',
        'Son compte de marge est débité de la perte du jour.',
      ],
      answer: 2,
      explanation:
        'Sur futures, les gains et les pertes sont réglés quotidiennement. Une baisse pénalise la position acheteuse.',
    },
    {
      question:
        'Un compte de marge tombe à 350 €, sous le seuil de maintien de 400 €. Combien faut-il verser pour revenir à la marge initiale de 500 € ?',
      choices: ['150 €.', '50 €.', '500 €.'],
      answer: 0,
      explanation:
        'Le seuil de 400 € déclenche l’appel. Le montant demandé pour retrouver 500 € est de 500 − 350 = 150 €.',
    },
  ],
  4: [
    {
      question:
        'Vous avez acheté un call de prix d’exercice 50 € pour une prime de 3 €. L’action vaut 52 € à l’échéance. Quel est le résultat net par action, hors frais ?',
      choices: ['Un gain de 2 €.', 'Une perte de 3 €.', 'Une perte de 1 €.'],
      answer: 2,
      explanation:
        'Exercer rapporte 52 − 50 = 2 €. En retranchant les 3 € déjà payés, il reste −1 €. L’exercice réduit la perte.',
    },
    {
      question:
        'Vous détenez un put de prix d’exercice 50 €. L’action vaut 43 € à l’échéance. Quel droit pouvez-vous exercer ?',
      choices: ['Vendre l’action à 50 €.', 'Acheter l’action à 50 €.', 'Récupérer automatiquement la prime.'],
      answer: 0,
      explanation:
        'Le put donne un droit de vente. Pouvoir vendre à 50 € une action qui vaut 43 € procure un avantage brut de 7 €.',
    },
    {
      question:
        'Avant l’échéance, un call vaut 8 €. Sa valeur intrinsèque est de 5 €. Quelle est sa valeur temps ?',
      choices: ['13 €.', '3 €.', '5 €.'],
      answer: 1,
      explanation:
        'La valeur temps correspond ici à la différence entre le prix de l’option et sa valeur intrinsèque, soit 8 − 5 = 3 €.',
    },
  ],
  5: [
    {
      question:
        'Un swap porte sur 100 000 €. Léa paie 3 % fixe et reçoit 4 % variable sur une année entière. Quel est le solde de ses deux intérêts ?',
      choices: ['Elle verse 1 000 €.', 'Elle reçoit 7 000 €.', 'Elle reçoit 1 000 €.'],
      answer: 2,
      explanation:
        'Elle reçoit 4 000 € et doit 3 000 €. La différence en sa faveur est de 1 000 €, sur le même notionnel et pour la même période.',
    },
    {
      question: 'Dans un swap de taux classique en euros, quel rôle joue le montant notionnel ?',
      choices: [
        'Il sert de base au calcul des intérêts.',
        'Il est donné à la partie qui paie le taux fixe.',
        'Il fixe la perte maximale de chaque partie.',
      ],
      answer: 0,
      explanation:
        'Les paiements d’intérêts sont calculés sur le notionnel. Dans ce swap classique dans une seule devise, le principal ne s’échange pas.',
    },
    {
      question: 'Quelle caractéristique distingue un swap de devises classique ?',
      choices: [
        'Tous les paiements se font dans la même monnaie.',
        'Les paiements portent sur deux monnaies et les principaux peuvent être échangés.',
        'Il permet à chacun d’annuler librement ses paiements.',
      ],
      answer: 1,
      explanation:
        'Les flux sont libellés dans deux monnaies. Dans le montage classique avec échange initial des principaux, les montants convenus sont rééchangés à la fin.',
    },
  ],
  6: [
    {
      question:
        'Le delta d’un call vaut 0,60. L’action monte de 0,10 €. Quel changement de prix du call estime-t-on, toutes choses égales par ailleurs ?',
      choices: [
        'Une hausse d’environ 0,06 €.',
        'Une hausse certaine de 0,60 €.',
        'Une baisse d’environ 0,10 €.',
      ],
      answer: 0,
      explanation:
        'Pour ce petit mouvement, on multiplie le delta par la variation du cours, soit 0,60 × 0,10 € ≈ 0,06 €. Le delta peut ensuite changer.',
    },
    {
      question:
        'On fait varier la volatilité utilisée pour évaluer une option en gardant les autres données fixes. Quelle sensibilité observe-t-on ?',
      choices: ['Le gamma.', 'Le véga.', 'Le thêta.'],
      answer: 1,
      explanation:
        'Le véga mesure la sensibilité au changement de volatilité. Le gamma décrit la variation du delta avec le cours et le thêta, l’effet du temps qui passe.',
    },
    {
      question:
        'Que fournit le modèle de Black-Scholes-Merton dans sa version classique pour une option européenne ?',
      choices: [
        'Le cours exact de l’action à l’échéance.',
        'Un gain garanti pour l’acheteur.',
        'Un prix théorique calculé sous des hypothèses explicites.',
      ],
      answer: 2,
      explanation:
        'Le modèle relie les caractéristiques de l’option et du marché à un prix théorique. Si les hypothèses s’écartent du marché réel, le prix observé peut différer.',
    },
  ],
};

export function gradeQuiz(id, answers) {
  const questions = quizzes[id];
  if (!questions || !Array.isArray(answers) || answers.length !== questions.length) {
    throw new RangeError('Le jeu de réponses est incomplet.');
  }
  const correct = questions.map((item, index) => {
    const answer = answers[index];
    if (!Number.isInteger(answer) || answer < 0 || answer >= item.choices.length) {
      throw new RangeError('Une réponse doit être choisie pour chaque question.');
    }
    return item.answer === answer;
  });
  const score = correct.filter(Boolean).length;
  return { correct, score, total: correct.length, passed: score >= Math.ceil((correct.length * 2) / 3) };
}
