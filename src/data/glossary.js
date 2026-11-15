// Les identifiants sont aussi les ancres publiques du glossaire.
export const moduleLabels = {
  1: 'Les sous-jacents',
  2: 'Les produits dérivés',
  3: 'Les contrats à terme',
  4: 'Les options',
  5: 'Les swaps',
  6: 'La gestion des risques',
  7: 'Les options exotiques',
};

export const glossary = [
  {
    slug: 'actif',
    term: 'Actif',
    module: 1,
    aliases: 'asset actif financier',
    definition:
      'Un bien ou un droit qui a une valeur économique. Un actif financier donne des droits, par exemple sur une entreprise ou sur des paiements futurs.',
    example:
      'Une machine est un actif matériel pour la boulangerie. Une part du capital de cette boulangerie est un actif financier pour son propriétaire.',
  },
  {
    slug: 'action',
    term: 'Action',
    module: 1,
    aliases: 'stock equity part dividende',
    definition:
      'Une petite part du capital d’une entreprise. Sa valeur peut monter ou baisser. L’entreprise peut aussi distribuer une partie de ses bénéfices aux actionnaires.',
    example:
      'Si vous achetez une action 30 € et la revendez 33 €, vous gagnez 3 €, hors frais et dividendes éventuels.',
  },
  {
    slug: 'obligation',
    term: 'Obligation',
    module: 1,
    aliases: 'bond coupon dette prêteur',
    definition:
      'Un titre représentant une dette. Son émetteur promet des paiements selon un calendrier, généralement des intérêts puis le remboursement du montant prévu.',
    example:
      'Une obligation de 100 € portant un coupon annuel de 3 % prévoit 3 € d’intérêts par an. Si l’émetteur fait défaut, ces paiements peuvent manquer.',
  },
  {
    slug: 'matiere-premiere',
    term: 'Matière première',
    module: 1,
    aliases: 'commodity marchandises blé cuivre pétrole',
    definition:
      'Un bien physique, comme le blé, le cuivre ou le pétrole, dont le prix dépend notamment des quantités disponibles et des besoins des acheteurs.',
    example: 'Après une mauvaise récolte, un meunier peut devoir payer plus cher la tonne de blé.',
  },
  {
    slug: 'devise',
    term: 'Devise',
    module: 1,
    aliases: 'currency forex change monnaie',
    definition:
      'Une monnaie considérée dans ses échanges avec une autre. Le taux de change indique combien d’unités de la seconde monnaie on obtient pour une unité de la première.',
    example: 'À 1,10 dollar pour un euro, 100 € permettent d’obtenir 110 dollars, hors frais.',
  },
  {
    slug: 'indice',
    term: 'Indice',
    module: 1,
    aliases: 'index panier CAC 40',
    definition:
      'Un nombre qui résume l’évolution d’un ensemble d’actifs selon des règles précises. Certains indices prennent aussi en compte les revenus distribués.',
    example:
      'Pour suivre un groupe d’entreprises d’un seul coup d’œil, on peut regarder la variation de leur indice boursier.',
  },
  {
    slug: 'sous-jacent',
    term: 'Sous-jacent',
    module: 1,
    aliases: 'underlying actif de référence prix taux',
    definition:
      'La référence dont dépend un contrat dérivé. Il peut s’agir d’une action, d’une marchandise, d’une devise, d’un taux ou encore d’un indice.',
    example: 'Pour un contrat qui fixe le prix futur d’une tonne de cuivre, le cuivre est le sous-jacent.',
  },
  {
    slug: 'marche-au-comptant',
    term: 'Marché au comptant',
    module: 1,
    aliases: 'spot prix au comptant cours du jour',
    definition:
      'Le marché sur lequel on convient d’un prix aujourd’hui pour un échange au délai de règlement habituel, généralement court.',
    example:
      'Un magasin commande du café au cours du jour pour une livraison immédiate. Il achète au comptant.',
  },
  {
    slug: 'produit-derive',
    term: 'Produit dérivé',
    module: 2,
    aliases: 'derivative contrat financier',
    definition:
      'Un contrat dont la valeur dépend d’une référence, le sous-jacent. Ses règles précisent les droits, les obligations et les paiements de chacun.',
    example:
      'Le droit d’acheter une action à 50 € devient plus intéressant si cette action vaut maintenant 65 €.',
  },
  {
    slug: 'couverture',
    term: 'Couverture',
    module: 2,
    aliases: 'hedge hedging protéger assurance',
    definition:
      'Une opération qui réduit un risque déjà présent en ajoutant une position dont les variations compensent au moins en partie ce risque.',
    example:
      'Une société qui doit payer en dollars dans trois mois fixe aujourd’hui son cours d’achat des dollars. Elle peut ainsi préparer son budget en euros.',
  },
  {
    slug: 'speculation',
    term: 'Spéculation',
    module: 2,
    aliases: 'speculation miser parier position',
    definition:
      'La prise volontaire d’un risque de marché dans l’espoir de tirer profit d’un mouvement de prix. Si le marché évolue autrement, la position peut perdre de la valeur.',
    example:
      'Sans blé à vendre ni farine à produire, un acheteur prend une position à terme sur le blé parce qu’il prévoit une hausse.',
  },
  {
    slug: 'arbitrage',
    term: 'Arbitrage',
    module: 2,
    aliases: 'arbitrage absence de risque écart de prix',
    definition:
      'Une combinaison d’opérations qui verrouille un gain sans risque de marché et sans mise nette initiale positive, en tenant compte des frais et du financement.',
    example:
      'Pour le même titre et le même règlement, un achat simultané à 10 € et une vente à 10,20 € laissent 0,20 € si les deux opérations sont garanties et sans frais.',
  },
  {
    slug: 'effet-de-levier',
    term: 'Effet de levier',
    module: 2,
    aliases: 'leverage mise exposition',
    definition:
      'La possibilité d’être exposé à des variations de valeur importantes par rapport à la somme engagée au départ. Les pertes comme les gains peuvent être amplifiés.',
    example:
      'Une option achetée 2 € est revendue 3 €. Le gain de 1 € représente 50 % de la prime initiale. Si elle expire sans valeur, toute cette prime est perdue.',
  },
  {
    slug: 'forward',
    term: 'Contrat à terme de gré à gré',
    module: 3,
    aliases: 'forward OTC terme ferme livraison',
    definition:
      'Un accord entre deux parties qui s’engagent aujourd’hui sur le prix et la date d’un échange futur. Elles peuvent adapter la quantité et les autres conditions à leurs besoins.',
    example:
      'Une ferme s’engage à vendre précisément 18 tonnes de blé à une minoterie dans quatre mois, à 215 € par tonne.',
  },
  {
    slug: 'futures',
    term: 'Contrat à terme standardisé',
    module: 3,
    aliases: 'future futures bourse contrat à terme organisé',
    definition:
      'Un engagement à terme négocié en bourse, dont les caractéristiques sont standardisées. Les gains et les pertes sont réglés chaque jour par l’intermédiaire de la compensation.',
    example:
      'Une acheteuse de futures reçoit un gain sur son compte de marge si le cours de règlement monte entre deux séances.',
  },
  {
    slug: 'chambre-de-compensation',
    term: 'Chambre de compensation',
    module: 3,
    aliases: 'clearing house contrepartie centrale',
    definition:
      'L’organisme qui s’interpose entre acheteurs et vendeurs de contrats compensés. Il collecte des garanties et organise les règlements pour limiter le risque de défaut.',
    example:
      'Sur un marché de futures, la chambre applique les variations quotidiennes aux comptes de ses membres.',
  },
  {
    slug: 'marge',
    term: 'Marge',
    module: 3,
    aliases: 'margin marge initiale marge de maintien dépôt de garantie',
    definition:
      'Une garantie demandée pour couvrir les pertes possibles d’une position. Sur futures, le compte de marge évolue avec les règlements quotidiens.',
    example:
      'Un dépôt initial de 500 € peut garantir une exposition bien supérieure. Une perte dépassant 500 € reste possible.',
  },
  {
    slug: 'appel-de-marge',
    term: 'Appel de marge',
    module: 3,
    aliases: 'margin call maintien',
    definition:
      'Une demande d’apport de garanties supplémentaires. Pour un future, elle peut survenir quand le compte passe sous la marge de maintien.',
    example:
      'Avec une marge initiale de 500 €, un seuil de maintien de 400 € et un solde tombé à 350 €, un retour à 500 € demande 150 €.',
  },
  {
    slug: 'option',
    term: 'Option',
    module: 4,
    aliases: 'option européenne américaine exercice',
    definition:
      'Un contrat qui donne à l’acheteur le droit d’acheter ou de vendre un sous-jacent à un prix convenu. Le vendeur reçoit une prime et doit respecter les conditions si l’option est exercée.',
    example:
      'Une option européenne s’exerce uniquement à l’échéance. Une option américaine peut aussi s’exercer avant cette date.',
  },
  {
    slug: 'call',
    term: 'Option d’achat (call)',
    module: 4,
    aliases: 'call long short droit acheter',
    definition:
      'Le droit, pour son acheteur, d’acheter le sous-jacent au prix d’exercice. À l’échéance, ce droit a une valeur si le sous-jacent vaut davantage que ce prix.',
    example:
      'Avec un prix d’exercice de 40 € et un cours final de 46 €, le droit vaut 6 €. Une prime payée de 2 € ramène le gain net à 4 €, hors frais.',
  },
  {
    slug: 'put',
    term: 'Option de vente (put)',
    module: 4,
    aliases: 'put long short droit vendre',
    definition:
      'Le droit, pour son acheteur, de vendre le sous-jacent au prix d’exercice. À l’échéance, ce droit a une valeur si le sous-jacent vaut moins que ce prix.',
    example:
      'Pouvoir vendre à 60 € une action qui vaut 54 € procure 6 € à l’exercice. Si la prime était de 4 €, le gain net est de 2 €, hors frais.',
  },
  {
    slug: 'prix-exercice',
    term: 'Prix d’exercice',
    module: 4,
    aliases: 'strike strike price K',
    definition:
      'Le prix convenu dans l’option pour acheter ou vendre le sous-jacent si l’acheteur exerce son droit.',
    example:
      'Un call de prix d’exercice 50 € permet à son détenteur d’acheter à 50 €, même si le cours a atteint 58 €.',
  },
  {
    slug: 'prime',
    term: 'Prime',
    module: 4,
    aliases: 'premium prix option',
    definition:
      'Le prix de l’option. À l’achat, la prime est payée au vendeur. L’acheteur doit en tenir compte pour savoir s’il a gagné de l’argent.',
    example: 'Un droit acheté 3 € qui rapporte 2 € à l’échéance laisse une perte nette de 1 €, hors frais.',
  },
  {
    slug: 'echeance',
    term: 'Échéance',
    module: 4,
    aliases: 'maturity expiration date',
    definition:
      'La date prévue pour la fin du contrat. Pour une option européenne, c’est à cette date que son détenteur peut exercer son droit.',
    example:
      'Un put européen qui expire le 30 juin s’exerce ce jour-là si son détenteur choisit de l’utiliser.',
  },
  {
    slug: 'valeur-intrinseque',
    term: 'Valeur intrinsèque',
    module: 4,
    aliases: 'intrinsic value exercice immédiat',
    definition:
      'L’avantage brut que procurerait un exercice au cours considéré, avec un minimum de zéro. Pour un call, on compare le cours au prix d’exercice. Pour un put, on inverse la comparaison.',
    example:
      'Si l’action vaut 35 € et le prix d’exercice est de 30 €, le call a une valeur intrinsèque de 5 € et le put, de 0 €.',
  },
  {
    slug: 'valeur-temps',
    term: 'Valeur temps',
    module: 4,
    aliases: 'time value valeur temporelle',
    definition:
      'L’écart entre le prix de l’option et sa valeur intrinsèque. Il dépend notamment du temps restant, de la volatilité et des conditions de financement. Il disparaît à l’échéance.',
    example: 'Pour une option cotée 7 € ayant une valeur intrinsèque de 5 €, la valeur temps est de 2 €.',
  },
  {
    slug: 'seuil-de-rentabilite',
    term: 'Seuil de rentabilité',
    module: 4,
    aliases: 'point mort break-even équilibre',
    definition:
      'Le cours du sous-jacent pour lequel la position a un résultat net nul. À l’échéance, on ajoute la prime au prix d’exercice pour un call et on la retranche pour un put, hors frais et financement.',
    example:
      'Un call de prix d’exercice 50 € acheté 3 € atteint l’équilibre à 53 €. À ce cours, l’avantage de l’exercice rembourse exactement la prime.',
  },
  {
    slug: 'swap',
    term: 'Swap',
    module: 5,
    aliases: 'échange flux swap de taux devise',
    definition:
      'Un contrat par lequel deux parties échangent des paiements définis à l’avance. Leur calcul peut dépendre de taux d’intérêt ou de monnaies différentes.',
    example:
      'Une entreprise verse les intérêts calculés à taux fixe et reçoit ceux calculés à taux variable, selon le calendrier du contrat.',
  },
  {
    slug: 'notionnel',
    term: 'Notionnel',
    module: 5,
    aliases: 'notional montant nominal capital référence',
    definition:
      'Le montant de référence utilisé pour calculer les paiements. Dans un swap classique de taux dans une seule monnaie, ce montant ne change pas de mains.',
    example: 'À 3 % par an sur un notionnel de 10 000 €, un paiement fixe pour une année entière vaut 300 €.',
  },
  {
    slug: 'taux-fixe',
    term: 'Taux fixe',
    module: 5,
    aliases: 'fixed rate intérêts fixe',
    definition:
      'Un taux d’intérêt convenu à l’avance pour la durée prévue. Le taux reste le même à chaque période concernée.',
    example: 'Pour une année entière à 4 % sur 1 000 € de capital constant, les intérêts s’élèvent à 40 €.',
  },
  {
    slug: 'taux-variable',
    term: 'Taux variable',
    module: 5,
    aliases: 'floating rate taux flottant indexé',
    definition:
      'Un taux d’intérêt qui évolue conformément à une référence et à des règles convenues. Le contrat précise notamment les dates ou la méthode d’observation.',
    example:
      'Si une dette porte le taux de référence majoré d’un point, une référence de 2 % donne un taux de 3 % pour la période.',
  },
  {
    slug: 'risque-de-contrepartie',
    term: 'Risque de contrepartie',
    module: 5,
    aliases: 'counterparty défaut crédit',
    definition:
      'Le risque qu’une partie à un contrat manque à son engagement alors qu’elle doit quelque chose à l’autre partie.',
    example:
      'Une entreprise a droit à un paiement sur son swap. Si sa contrepartie fait défaut, elle peut ne recevoir qu’une partie du montant.',
  },
  {
    slug: 'volatilite',
    term: 'Volatilité',
    module: 6,
    aliases: 'volatility variations dispersion',
    definition:
      'Une mesure de la dispersion des rendements d’un actif. Une volatilité élevée correspond à des variations plus amples, à la hausse comme à la baisse.',
    example:
      'Deux actions finissent le mois au même cours qu’au départ. Celle dont les rendements quotidiens ont davantage fluctué a eu une volatilité historique plus élevée.',
  },
  {
    slug: 'delta',
    term: 'Delta',
    module: 6,
    aliases: 'grecques sensibilité cours',
    definition:
      'La variation approximative du prix d’une option pour un petit mouvement du cours du sous-jacent, en gardant les autres facteurs constants.',
    example:
      'Avec un delta de 0,40, une hausse de l’action de 0,10 € ajoute environ 0,04 € à la valeur de l’option.',
  },
  {
    slug: 'gamma',
    term: 'Gamma',
    module: 6,
    aliases: 'grecques courbure variation delta',
    definition:
      'La sensibilité du delta au cours du sous-jacent. Elle indique à quelle vitesse l’exposition au prochain petit mouvement change lorsque le cours se déplace.',
    example:
      'Un gamma de 0,02 par euro signifie qu’une hausse de 0,10 € de l’action augmente le delta d’environ 0,002, toutes choses égales par ailleurs.',
  },
  {
    slug: 'theta',
    term: 'Thêta',
    module: 6,
    aliases: 'theta grecques temps',
    definition:
      'La sensibilité du prix d’une option au passage du temps, si le cours et les autres facteurs restent identiques. Son unité peut être le jour ou l’année.',
    example:
      'Un thêta de −0,03 € par jour indique une baisse d’environ trois centimes quand un jour s’écoule, toutes choses égales par ailleurs.',
  },
  {
    slug: 'vega',
    term: 'Véga',
    module: 6,
    aliases: 'vega grecques volatilité implicite',
    definition:
      'La sensibilité du prix d’une option à la volatilité utilisée pour l’évaluer, les autres facteurs restant constants. Il faut vérifier l’unité de variation annoncée.',
    example:
      'Un véga de 0,12 € par point de pourcentage donne une hausse d’environ 0,12 € si la volatilité passe de 20 % à 21 %.',
  },
  {
    slug: 'black-scholes',
    term: 'Modèle de Black-Scholes-Merton',
    module: 6,
    aliases: 'Black Scholes BSM prix théorique',
    definition:
      'Un modèle qui relie le prix théorique d’une option européenne aux caractéristiques du contrat et du marché. Il repose sur des hypothèses, notamment une volatilité constante dans sa version de base.',
    example:
      'Pour évaluer un call européen sur une action sans dividende, on renseigne son cours, le prix d’exercice, la durée restante, le taux sans risque et la volatilité.',
  },
  {
    slug: 'option-exotique',
    term: 'Option exotique',
    module: 7,
    aliases: 'exotic option options exotiques non standard',
    definition:
      'Une option dont les règles diffèrent de celles d’un call ou d’un put classique. Par exemple, le versement peut dépendre de plusieurs cours observés pendant la vie du contrat.',
    example:
      'Un call classique peut donner 10 € si l’action finit à 110 € pour un prix d’exercice de 100 €. Une clause de barrière peut supprimer ce versement selon le chemin suivi.',
  },
  {
    slug: 'option-a-barriere',
    term: 'Option à barrière',
    module: 7,
    aliases: 'barrier option knock-in knock-out activante désactivante',
    definition:
      'Une option dont le droit d’exercice apparaît ou disparaît selon qu’un cours atteint un seuil convenu. Le contrat précise le seuil, le sens du franchissement et les moments où le cours est observé.',
    example:
      'Pour une barrière haute de 120 € observée uniquement aux clôtures mensuelles, un sommet à 122 € entre deux observations ne suffit pas, à lui seul, à déclencher la barrière.',
  },
  {
    slug: 'barriere-desactivante',
    term: 'Barrière désactivante',
    module: 7,
    aliases: 'knock-out knock out KO extinction barrière haute ou basse up-and-out down-and-out',
    definition:
      'Un seuil qui met fin à l’option lorsque la condition prévue est satisfaite. Un versement à l’extinction n’existe que si le contrat en prévoit un.',
    example:
      'Avec une barrière haute de 120 € désactivante dès qu’une clôture observée atteint ce niveau, une clôture à 120 € éteint l’option. Un retour à 114 € ne la réactive pas.',
  },
  {
    slug: 'option-asiatique',
    term: 'Option asiatique',
    module: 7,
    aliases: 'Asian option average price option moyenne de cours',
    definition:
      'Une option dont le paiement dépend d’une moyenne de cours observés aux dates prévues. Pour un call sur moyenne à prix d’exercice fixe, on reçoit l’excédent éventuel de cette moyenne sur le prix d’exercice.',
    example:
      'Si la moyenne retenue vaut 106 € et le prix d’exercice 100 €, le call sur moyenne verse 6 € par action, avant déduction de la prime.',
  },
  {
    slug: 'moyenne-arithmetique',
    term: 'Moyenne arithmétique',
    module: 7,
    aliases: 'arithmetic average moyenne arithmétique équipondérée observations',
    definition:
      'Pour des observations de même poids, on additionne les valeurs et on divise par leur nombre. Les dates et les poids retenus sont définis dans le contrat.',
    example:
      'Trois clôtures à 90 €, 105 € et 120 € de même poids donnent une moyenne de (90 + 105 + 120) ÷ 3 = 105 €.',
  },
].sort((a, b) => a.term.localeCompare(b.term, 'fr'));

export function normalizeSearch(value) {
  return value
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/gu, '')
    .replace(/œ/gu, 'oe')
    .replace(/[^a-z0-9]+/gu, ' ')
    .trim();
}

export function matchesTerm(entry, query) {
  const terms = normalizeSearch(query).split(/\s+/u);
  const content = normalizeSearch([entry.term, entry.aliases, entry.definition, entry.example].join(' '));
  return terms.every((word) => content.includes(word));
}
