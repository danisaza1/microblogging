// prisma/seed.js
import prisma from "../lib/prisma.js";
import slugify from 'slugify'; // npm install slugify (si vous ne l'avez pas déjà)

const usersData = [
  { username: 'pola', email: 'pola@mail.com', prenom: 'Pola', nom: 'Dupont', passwordHash: '...', role: 'USER' },
  { username: 'hugo', email: 'hugo@example.com', prenom: 'Hugo', nom: 'Martin', passwordHash: '...', role: 'USER' },
  { username: 'chloe', email: 'chloe@example.com', prenom: 'Chloé', nom: 'Lemoine', passwordHash: '...', role: 'USER' },
  { username: 'sofia', email: 'sofia@example.com', prenom: 'Sofia', nom: 'Herrera', passwordHash: '...', role: 'USER' },
  { username: 'claire', email: 'claire@example.com', prenom: 'Claire', nom: 'Dumont', passwordHash: '...', role: 'USER' },
  { username: 'mariana', email: 'mariana@example.com', prenom: 'Mariana', nom: 'Ríos', passwordHash: '...', role: 'USER' },
  { username: 'camille', email: 'camille@example.com', prenom: 'Camille', nom: 'Bernard', passwordHash: '...', role: 'USER' },
  { username: 'emma', email: 'emma@example.com', prenom: 'Emma', nom: 'Ruiz', passwordHash: '...', role: 'USER' },
  { username: 'julien', email: 'julien@example.com', prenom: 'Julien', nom: 'Moreau', passwordHash: '...', role: 'USER' },
  
];


// Vos données d'articles statiques complètes
const articlesData = [
  {
    imageUrl: "/monos.jpg",
    altText: "Monos, un chaos sublime venu de Colombie",
    categoryName: "Cinema", // Forcez le thème pour tous ces articles
    title: "Monos, un chaos sublime venu de Colombie",
    description: "Un thriller sensoriel et brutal au cœur des montagnes colombiennes...",
    authorName: "Pola Dupont",
    theme: "Culture",
    content: `
Sur les hauteurs brumeuses des Andes colombiennes, entre ciel menaçant et jungle étouffante, *Monos* d’Alejandro Landes explore les frontières floues entre l’innocence et la barbarie. Le film, salué internationalement, bouscule les conventions du cinéma de guerre avec une force esthétique et émotionnelle rare.

## Une guerre sans visage
Huit adolescents armés jusqu’aux dents gardent une otage américaine et une vache baptisée Shakira. Ce groupe rebelle — surnommé les « Monos » — reçoit ses ordres d’un mystérieux commandant via radio. Pourtant, la hiérarchie s’effrite rapidement, laissant place à l’instinct, à la folie et à la survie brute.

Ni le nom du pays ni celui de la guerre n’est mentionné. Landes ne cherche pas à documenter, mais à plonger le spectateur dans un état de confusion sensorielle, entre rêve et cauchemar. Le film prend des allures d’*Apocalypse Now*, croisé avec *Sa Majesté des mouches*.

## Une mise en scène viscérale
La caméra d’Alejandro Landes est organique, presque animale. Chaque plan semble respirer, suinter, haleter. La nature devient personnage, menaçante et indifférente. La musique envoûtante de Mica Levi (*Under the Skin*) complète ce tableau sonore d’une intensité rare, marquant chaque moment de tension d’un bourdonnement presque tribal. 

## 🇨🇴 Une jeunesse en perdition
*Monos* est aussi un cri d’alerte sur la fragilité des jeunes plongés dans la violence armée. À travers des personnages livrés à eux-mêmes, le film évoque la perte d’identité, l’absence de repères, et une humanité en ruine. Aucun manichéisme ici : seulement des enfants dévorés par la guerre, dans un monde sans adultes. 

## Un film à ne pas manquer
Récompensé à Sundance et sélectionné aux Oscars par la Colombie, *Monos* confirme l’émergence d’un cinéma colombien audacieux, politique et visuellement puissant.
`,
  },
  {
    imageUrl: "/les-glorieuses.png",
    altText: "Les Glorieuses, manifeste d’un féminisme inclusif et engagé",
    categoryName: "Féminisme",
    title: "Les Glorieuses, manifeste d’un féminisme inclusif et engagé",
    description: "Un essai percutant qui mêle données, récits et appels à l’action pour l’égalité des genres.",
    authorName: "Hugo Martin",
    theme: "Culture",
    content: `
Avec *Les Glorieuses*, Rebecca Amsellem signe un ouvrage accessible, didactique et profondément engagé. Née d’une newsletter devenue mouvement, cette œuvre hybride explore les luttes féministes d’hier et d’aujourd’hui à travers un prisme intersectionnel.

## Un féminisme politique
Pas question ici de féminisme tiède ou décoratif. Amsellem revendique une action politique concrète : congé menstruel, parité salariale, réformes structurelles. À l’aide de données et de témoignages, elle dresse un état des lieux sans fard des inégalités persistantes.

## Intersectionnalité et solidarité
Les voix de femmes racisées, queer, précaires ou en situation de handicap y trouvent une place centrale. L’autrice déconstruit le féminisme blanc dominant et appelle à un mouvement solidaire, à l’écoute des vécus multiples et souvent invisibilisés.

## Une lecture vivifiante
Dans une langue claire et incisive, *Les Glorieuses* donne des clés de compréhension et d’action. Le livre se lit comme un manifeste pour un monde plus juste — un féminisme des actes autant que des idées.
`,
  },
  {
    imageUrl: "/waterlicht.jpg",
    altText: "Waterlicht, une mer de lumière pour alerter sur le climat",
    categoryName: "Art",
    title: "Waterlicht, une mer de lumière pour alerter sur le climat",
    description: "Une installation poétique et immersive qui réinvente la montée des eaux à travers la lumière.",
    authorName: "Chloé Lemoine",
    theme: "Culture",
    content: `
À la tombée de la nuit, les visiteurs marchent sous une mer de lumière bleutée, envoûtante et mouvante. *Waterlicht*, œuvre de l'artiste néerlandais Daan Roosegaarde, transforme l’espace urbain en une expérience sensorielle autant qu’un message d’alerte.

## Une simulation poétique
À l’aide de lasers et de brouillard artificiel, l’artiste crée une illusion saisissante : celle d’être immersé sous une vague virtuelle. Le spectateur prend conscience, de façon physique et émotionnelle, des effets de la montée des eaux liée au changement climatique.

## Art, science et écologie
Roosegaarde inscrit son travail à la croisée de l’art et de la technologie. *Waterlicht* est présenté dans des villes menacées par la mer, suscitant débat et réflexion autour de l’adaptation urbaine et de la responsabilité collective.

## Une œuvre à vivre
Plus qu’une simple installation, *Waterlicht* est une expérience collective, immersive et poétique. Une preuve que l’art peut éveiller les consciences sans discours, par la simple magie de la lumière.
`,
  },
  {
    imageUrl: "/vivantes.jpg",
    altText: "Vivantes !, un hommage à la résilience des femmes artistes",
    categoryName: "Exposition",
    title: "Vivantes !, un hommage à la résilience des femmes artistes",
    description: "Une exposition collective poignante qui met à l’honneur des voix féminines invisibilisées de l’art contemporain.",
    authorName: "Sofia Herrera", 
    theme: "Culture",
    content: `
Présentée au Palais de Tokyo, l’exposition *Vivantes !* rassemble une trentaine d’artistes femmes, issues de continents et d’histoires diverses. Loin des poncifs esthétiques, l’exposition est un cri de vie, une traversée sensible des blessures, des luttes et des renaissances.

## Des œuvres incarnées
Peintures, vidéos, installations, broderies… Chaque médium devient un moyen de résistance. Le corps féminin y est omniprésent, tantôt célébré, tantôt mutilé, mais toujours revendiqué comme territoire politique.

## Une cartographie engagée
Des artistes algériennes, brésiliennes, iraniennes ou françaises racontent l’exil, la guerre, les violences, mais aussi la solidarité et la sororité. L’exposition propose un regard pluriel, refusant tout discours homogène sur la « femme artiste ».

## Une exposition nécessaire
*Vivantes !* secoue, émeut, questionne. Elle rappelle l’importance d’accorder une vraie place aux artistes femmes dans les institutions et l’histoire de l’art.
`,
  },
  {
    imageUrl: "/survival.jpg",
    altText: "Survival International, la voix des peuples autochtones",
    categoryName: "Anthropologie",
    title: "Survival International, la voix des peuples autochtones",
    description: "Une organisation en première ligne pour la défense des droits des peuples indigènes à travers le monde.",
    authorName: "Claire Dumont",
    theme: "Culture",
    content: `
Depuis 1969, *Survival International* lutte aux côtés des peuples autochtones pour défendre leurs terres, leurs droits et leurs cultures. En dénonçant les violences coloniales modernes, l’organisation propose une approche radicalement respectueuse de l’autodétermination des peuples.

## Défendre sans parler à la place
Contrairement à certaines ONG paternalistes, Survival ne se substitue pas aux communautés. Elle relaie leur parole, soutient leurs campagnes et les aide à faire pression sur les gouvernements et multinationales responsables de spoliations ou de génocides culturels.

## Un combat global
Des Yanomami du Brésil aux Pygmées d’Afrique centrale, Survival agit sur tous les continents. Ses campagnes alertent sur les menaces des projets extractivistes, des routes illégales ou du tourisme forcé. 

## Une anthropologie engagée
En refusant l’exotisation et en plaçant les peuples autochtones au centre de leur récit, Survival réinvente une anthropologie de terrain, militante et éthique. Une voix précieuse dans un monde qui efface encore trop souvent ses peuples premiers.
`,
  },
  {
    imageUrl: "/los-reyes.jpg",
    altText: "Los Reyes del Mundo, une odyssée brute dans la Colombie invisible",
    categoryName: "Cinema",
    title: "Los Reyes del Mundo, une odyssée brute dans la Colombie invisible",
    description: "Un road movie poétique et rageur sur la jeunesse des rues à la recherche d’une terre promise.",
    authorName: "Mariana Ríos",
    theme: "Culture",
    content: `
*Los Reyes del Mundo* de Laura Mora Ortega suit cinq adolescents marginaux, errant dans une Colombie post-conflit, à la recherche d’un territoire hérité de leurs ancêtres. Entre réalisme social et onirisme poétique, le film trace une ligne fragile entre espoir et désillusion.

## Une quête initiatique
Rá, Culebro, Sere, Winny et Nano ne croient plus aux promesses de l’État. Leur seule loi est l’amitié. Ensemble, ils traversent villes déchues, forêts luxuriantes et souvenirs flous, dans une errance à la fois violente et sublime.

## Un regard cru et tendre
Mora Ortega filme avec humanité des corps souvent invisibilisés par les médias. Caméra à l’épaule, lumière naturelle, visages vrais. La beauté surgit de la boue, la poésie naît de la rage.

## Une métaphore du pays
Le film questionne l’idée de territoire : à qui appartient-il ? À ceux qui l’ont conquis ou à ceux qui l’ont perdu ? Dans une Colombie post-accord de paix, les promesses de restitution restent aussi instables que les routes empruntées par ces jeunes rois sans royaume.
`,
  },
  {
    imageUrl: "/fatigue-decision.jpg",
    altText: "Fatigue de décision, un mal silencieux du quotidien",
    categoryName: "Psychologie",
    title: "La fatigue de décision, un mal silencieux du quotidien",
    description: "Entre choix constants et surcharge mentale, notre cerveau s’épuise à décider.",
    authorName: "Camille Bernard",
    theme: "Culture",
    content: `
Vous hésitez longuement devant Netflix, puis vous abandonnez ? Vous remettez au lendemain des décisions simples ? Vous êtes peut-être en proie à ce que les psychologues nomment la *fatigue de décision*.

## Un mécanisme bien réel
Chaque décision puise dans notre énergie mentale. Plus nous faisons de choix, plus notre capacité à bien juger diminue. À la fin de la journée, même les décisions les plus banales peuvent paraître insurmontables.

## Des expériences probantes
Des études ont montré que des juges, en fin de journée, rendaient plus de verdicts défavorables. Même nos achats sont biaisés par la fatigue mentale : on opte pour le plus simple, pas le plus juste.

## Comment l’éviter ?
Routine, limitation des options, pauses régulières… L’idée est de réduire les micro-choix. Steve Jobs ne portait qu’un seul style de vêtements, justement pour garder sa clarté mentale pour l’essentiel.

## Une société trop exigeante
Entre ultra-connexion, multitâche et pression à la productivité, notre société surexige notre cerveau. Reconnaître cette fatigue, c’est aussi s’autoriser à ralentir, à déléguer, à choisir... de ne pas choisir.
`,
  },
  {
    imageUrl: "/creer.jpg",
    altText: "Créer sans filtre, l’art de libérer sa pratique artistique",
    categoryName: "Création",
    title: "Créer sans filtre : 5 pistes pour libérer sa pratique artistique",
    description: "Et si on arrêtait de chercher à faire “beau” ? Conseils pour créer librement et sans blocage.",
    authorName: "Emma Ruiz",
    theme: "Culture",
    content: `
Créer, c’est souvent affronter un jugement — le sien et celui des autres. Que l’on peigne, écrive ou compose, le perfectionnisme nous paralyse. Voici cinq pistes concrètes pour faire de l’art de manière libérée et joyeuse.

## 1. Créez sans but
Ne cherchez pas tout de suite à “faire une œuvre”. Posez une couleur, un mot, un geste. Laissez venir sans attente de résultat.

## 2. Travaillez vite (et mal)
En production rapide, vous évitez le mental critique. Mettez un minuteur, dessinez ou écrivez sans lever la main. Vous serez surpris·e.

## 3. Coupez-vous des regards
Prenez un moment hors des réseaux, des validations extérieures. L’important n’est pas d’être vu·e mais de s’exprimer.

## 4. Inspirez-vous des autres, mais pas trop
Regarder d’autres artistes stimule. Mais attention à la comparaison. Rappelez-vous : vous n’en êtes pas au même stade ni dans le même monde intérieur.

## 5. Créez comme un enfant
Rappelez-vous ce plaisir brut de peindre sans se demander si c’était “joli”. L’art est un jeu — retrouvez cette légèreté-là.
`,
  },
  {
    imageUrl: "/mecanique.jpg",
    altText: "Mécanique sans pression, l’art de comprendre et bricoler sans stress",
    categoryName: "Mécanique",
    title: "Mécanique sans stress : 5 pistes pour se lancer sans complexe",
    description: "Pas besoin d’être expert pour mettre les mains dans le moteur. Conseils pour démarrer la mécanique simplement et sereinement.",
    authorName: "Julien Moreau",
    theme: "Voiture",
    content: `
Faire de la mécanique, c’est souvent oser se tromper, tester, apprendre. Qu’on répare son vélo ou démonte un moteur, la peur de mal faire freine souvent. Voici cinq pistes concrètes pour se lancer avec plaisir et confiance.

## 1. Commencez petit
Pas besoin de démonter un moteur tout de suite. Changez une ampoule, vérifiez la pression des pneus, observez comment les choses fonctionnent.

## 2. Acceptez l’imperfection
Les erreurs font partie du processus. Une vis mal remise, un joint mal choisi — on apprend en pratiquant. Ne cherchez pas la perfection dès le départ.

## 3. Travaillez sans pression extérieure
Coupez les vidéos tuto un moment et testez par vous-même. Vous verrez que votre logique vous guide plus que vous ne le pensez.

## 4. Apprenez des autres, mais à votre rythme
Forums, garages partagés, amis bricoleurs : écoutez, observez, mais ne vous comparez pas. Chacun a ses galères et ses réussites.

## 5. Bricolez comme un·e gamin·e
Soyez curieux·se, touchez, démontez (et remontez !). Faites-le pour comprendre, pour le plaisir, pas pour cocher une case de “réparateur parfait”.
`,
  },
  {
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481419/microblog/dmt4eojkqcqvresxpukb.webp",
  altText: "Les Radium Girls peignant des cadrans luminescents",
  categoryName: "Santé publique",
  title: "Quand le radium brillait plus que la vérité",
  description: "Une tragédie industrielle aux allures fluorescentes, où la science a illuminé... la cupidité.",
  authorName: "Emma Ruiz",
  theme: "Science & Technologie",
  content: `
Au début du XXe siècle, alors que la radioactivité était encore perçue comme une promesse de modernité, de nombreuses jeunes femmes furent embauchées pour peindre des cadrans de montre avec une peinture au radium. Le résultat ? Une tragédie sanitaire dissimulée sous des couches de vernis… luminescent.

## Le rêve fluorescent

Nous sommes dans les années 1910-1920. Le radium, fraîchement découvert par les Curie, est à la mode. Il brille dans le noir, ce qui en fait une aubaine pour les horlogers. Les ouvrières, appelées plus tard les « Radium Girls », sont chargées de peindre à la main les chiffres des montres. Pour affiner leur pinceau, elles l'humectent… avec leurs lèvres.

Résultat ? Elles ingèrent chaque jour de minuscules doses de radium. On leur promet que c’est inoffensif. Certaines l’utilisent même comme maquillage ou pour faire rire dans le noir.

## Dents qui tombent, mâchoires qui s’effritent

Rapidement, les premières douleurs apparaissent. Dents déchaussées, nécroses osseuses, cancers. Mais les entreprises nient. On accuse les ouvrières d’avoir la syphilis, histoire de discréditer leur témoignage.

Ce n’est qu’après de longues batailles judiciaires que certaines obtiendront réparation. Trop tard pour beaucoup.

## Une lueur de justice

Les Radium Girls ont contribué, malgré elles, à faire avancer le droit du travail et la régulation des substances toxiques. Elles sont devenues le symbole d’un combat pour la reconnaissance des maladies professionnelles et la responsabilité des employeurs.

## Et aujourd’hui ?

Cette histoire nous rappelle que le progrès scientifique, sans éthique, peut littéralement empoisonner. Et que les « lueurs » de la science ne doivent jamais masquer les zones d’ombre de l’industrie.
`
},
{
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481420/microblog/jdhoaufnypvhd2kequbm.jpg",

  altText: "Carte météo du nuage radioactif de Tchernobyl",
  categoryName: "Nucléaire",
  title: "Le nuage radioactif... stoppé net à la frontière française ?",
  description: "En 1986, la catastrophe de Tchernobyl a irradié l’Europe, sauf – paraît-il – la France. Une prouesse météorologique, ou une intox d’État ?",
  authorName: "Hugo Martin",
  theme: "Science & Technologie",
  content: `
Le 26 avril 1986, le réacteur n°4 de la centrale de Tchernobyl explose. Un nuage radioactif commence alors son voyage au-dessus de l’Europe. Partout, les cartes d’alerte s’affolent... sauf en France. Là, le nuage aurait fait une pause. Respectueusement. À la frontière. 🛑🇫🇷

## Le miracle météorologique

Dès les premiers jours, les autorités françaises affirment que le nuage n’a **pas traversé l’Hexagone**. En Allemagne, on jette les épinards. En Italie, on arrête les récoltes. En France ? On continue à manger les salades arrosées de pluie radioactive. Bon appétit.

## Communication officielle

Des scientifiques français mesurent pourtant une hausse de la radioactivité dans les Alpes, en Corse, en Lorraine. Le professeur Pellerin – alors directeur du Service central de protection contre les rayonnements ionisants – rassure : pas de danger, rien d’alarmant.

## Une omerta bien orchestrée

Les médias relaient largement les discours officiels. Des années plus tard, des journalistes et associations révèlent un effort manifeste pour éviter la panique… et préserver l’image du nucléaire français.

## Conséquences sanitaires

En Corse, une hausse de cancers de la thyroïde est constatée dans les décennies suivantes. Certains médecins et collectifs réclament la reconnaissance d’un lien avec Tchernobyl. L’État, lui, reste discret.

## Ce qu’il en reste

Aujourd’hui encore, l’épisode du “nuage arrêté à la frontière” fait sourire – jaune. Plus que le nuage, c’est le silence qui interroge. Car parfois, ce qu’on ne dit pas en dit très long.
`
},
{
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481417/microblog/i9o3g1omgqccwptbdrzc.jpg",

  altText: "Bio-impression d’un tissu cardiaque humain en laboratoire",
  categoryName: "Santé publique",
  title: "Quand l’encre devient vie : la bio-impression d’organes humains",
  description: "Une technologie où les cellules remplacent l’encre, et où l’imprimante façonne l’espoir.",
  authorName: "Julien Moreau",
  theme: "Science & Technologie",
  content: `
La bio-impression redéfinit notre rapport à la médecine. Imprimer un cœur, une peau ou un foie ? C’est désormais possible — grâce à des encres faites de cellules vivantes.

## Imprimer, mais le vivant
Les bio-imprimantes fonctionnent couche par couche, déposant des matériaux biologiques pour recréer des tissus humains. Elles offrent une précision inégalée, rendant possible la fabrication de structures complexes comme des organes miniatures.

## Un accélérateur médical
Ces « organoïdes » permettent de tester des traitements sans recours aux animaux, avec des résultats plus proches du corps humain réel. Un gain de temps et d’éthique.

## Vers un futur sur mesure
Demain, on pourrait imprimer des organes personnalisés à partir des cellules du patient. Cela réduirait :
- les risques de rejet,
- les délais de greffe,
- et les souffrances liées aux pénuries.

Mais cette avancée pose aussi des questions : comment gérer la longévité de ces organes ? Quelles limites éthiques fixer ? Une science enthousiasmante, mais à encadrer.
`
},
{
  imageUrl: "https://res.cloudinary.com/dtbwsvacq/image/upload/v1753481418/microblog/sppj4f7pmfi1pep00xsx.jpg",
  altText: "Panneaux solaires déployés sur la surface lunaire",
  categoryName: "Énergie",
  title: "Quand la Lune éclaire notre avenir",
  description: "Et si la conquête spatiale devenait le laboratoire de notre transition énergétique ?",
  authorName: "Sofia Herrera",
  theme: "Science & Technologie",
  content: `
La Lune devient un terrain d’expérimentation énergétique et écologique. Des technologies conçues pour survivre au vide spatial pourraient aussi inspirer notre monde terrestre.

## L’énergie venue d’ailleurs
Des panneaux solaires géants sont prévus pour le pôle Sud lunaire. Capables de suivre la lumière du Soleil, ils pourraient alimenter des bases entières.

## De la poussière, de la vie
À partir du régolithe — la poussière lunaire — des scientifiques ont réussi à produire :
- de l’eau,
- de l’oxygène,
- et même des matériaux de construction.

## Imprimer pour survivre
Des imprimantes 3D utilisent cette poussière comme matière première pour bâtir des habitats spatiaux. Pas besoin d’importer depuis la Terre : on construit sur place.

La Lune devient un laboratoire pour une autonomie durable. Une conquête qui éclaire autant nos futurs spatiaux… que nos enjeux terrestres.
`
},
  //Articles de la rubrique VOYAGE :
  {
  imageUrl: "/hanoi-street-food.jpg",
  altText: "Une vendeuse de pho dans une ruelle de Hanoï",
  categoryName: "Gastronomie autour du monde",
  title: "Découvrir Hanoï par sa cuisine de rue",
  description: "Goûter Hanoï, c’est déambuler entre les marmites fumantes, les bouillons parfumés et les sourires complices des marchandes de rue.",
  authorName: "Emma Ruiz",
  theme: "Voyage",
  content: `
Impossible d’évoquer le Vietnam sans parler de sa cuisine. À Hanoï, la rue est un théâtre culinaire où se joue chaque jour une symphonie de saveurs.

## Une immersion olfactive et sensorielle
Du matin au soir, la ville crépite : brochettes de porc grillées, soupe *pho*, *banh mi* croustillants... Chaque trottoir devient une scène où les ustensiles tintent et les odeurs dansent.

## Manger assis sur un tabouret en plastique
Ici, pas de formalités : on mange sur le pouce, accroupi, aux côtés d’inconnus. Mais tout le monde partage la même quête : celle de la bouchée parfaite, généreuse et sincère.

## Une mémoire vivante
La cuisine de rue est une tradition, mais aussi un acte de résistance. Derrière chaque plat se cache une histoire, souvent transmise de mère en fille. Goûter, c’est aussi écouter.
`,
},
{
  imageUrl: "/resto-local.jpg",
  altText: "Un petit resto local avec une cuisine ouverte",
  categoryName: "Gastronomie autour du monde",
  title: "Comment éviter les restos à touristes et manger local",
  description: "Manger local, ce n’est pas qu’une question de budget, c’est un choix éthique, culturel… et souvent délicieux.",
  authorName: "Camille Bernard",
  theme: "Voyage",
  content: `
On le sait : les restaurants à touristes proposent souvent une version édulcorée (et chère) de la cuisine locale. Voici comment les éviter.

## Mes 3 repères
1. **Pas de menu traduit en 5 langues**.
2. **Les locaux y mangent** (et pas seulement sur Instagram).
3. **On y sent les odeurs de cuisson dès l’entrée.**

## Le pouvoir de la curiosité
Demandez aux habitants : un vendeur de rue, votre hôte, un taxi. C’est souvent comme ça que j’ai fait mes meilleures découvertes.

## Une démarche responsable
En mangeant local, on soutient l’économie du pays et on découvre sa vraie culture. Ce n’est pas juste un repas, c’est un échange.
`,
},
{
  imageUrl: "/arepas.jpg",
  altText: "Arepas dorées, tasse de café fumant et paysage montagneux colombien",
  categoryName: "Gastronomie autour du monde",
  title: "Saveurs de Colombie : entre arepas, café et convivialité",
  description: "Un voyage gustatif au cœur de la Colombie, entre spécialités locales, marchés animés et traditions chaleureuses.",
  authorName: "Julien Moreau",
  theme: "Voyage",
  content: `
Mon voyage en Colombie a été une explosion de saveurs. Chaque région a sa spécialité, mais partout, j’ai retrouvé un point commun : la générosité.

## Les arepas, en version mille fois revisitée
Ces galettes de maïs sont partout. Farcies au fromage, à la viande ou même sucrées… J’en ai goûté une différente chaque jour !

## Le café, une fierté nationale
Rien à voir avec ce que je buvais en France. Ici, le café est doux, fruité, presque sucré naturellement. Visiter une finca (plantation) dans la région du Quindío m’a appris tout le processus, du grain à la tasse.

## Des repas comme des fêtes
Chaque repas était une invitation à partager. J’ai été accueillie comme une amie, avec du *sancocho* (soupe) mijotée pendant des heures, ou des empanadas croustillantes.

La gastronomie colombienne, c’est une expérience de cœur autant que de palais.
`,
},
{
  imageUrl: "/petit-dejeuner.jpg",
  altText: "Un collage de petits-déjeuners typiques (croissant, soupe pho, huevos rancheros...)",
  categoryName: "Gastronomie autour du monde",
  title: "Tour du monde des petits-déjeuners",
  description: "Du salé au sucré, du copieux au léger : chaque pays a sa manière de commencer la journée. Petit voyage matinal.",
  authorName: "Chloé Lemoine",
  theme: "Voyage",
  content: `
Le petit-déjeuner est souvent considéré comme le repas le plus important de la journée. Il est surtout l’un des plus révélateurs d’une culture.

## Vietnam : la soupe *pho*
Oui, on commence la journée avec un bol fumant de soupe ! Riche, parfumée, garnie de bœuf, d’herbes fraîches et de nouilles.

## Mexique : *huevos rancheros*
Des œufs sur une tortilla, nappés de sauce tomate, accompagnés de haricots. Énergique et relevé : idéal avant une journée d’exploration.

## France : croissant, pain-beurre et café noir
Simple, mais efficace. Et toujours accompagné d’un sourire en terrasse (quand il fait beau…).

## Le petit-déjeuner dit tout
En le partageant avec les locaux, on comprend leur rythme, leurs envies, leur quotidien. C’est une porte d’entrée délicieuse.
`,
},
{
  imageUrl: "/dolomites.jpg",
  altText: "Paysage montagneux des Dolomites au lever du soleil",
  categoryName: "Récits personnels & Aventures",
  title: "À pied dans les Dolomites : solitude et émerveillement",
  description: "Un trek de 6 jours au cœur des montagnes italiennes. Entre silence, orages et beauté brute.",
  authorName: "Julien Moreau",
  theme: "Voyage",
  content: `
Partir seul dans les Dolomites, c’était un pari. Sans itinéraire figé, juste un sac léger, une tente et une carte.

## 🌄 Des levers de soleil à couper le souffle
Le matin, les sommets prenaient feu. Le rose des montagnes contrastait avec le vert des alpages. J’ai pleuré un matin, sans trop savoir pourquoi. 

## ⛈️ L'orage, la peur, l’adrénaline
Un soir, l’orage m’a surpris près du lac Sorapis. J’ai couru, trempé, transi, et terriblement vivant.

## 🙌 Se retrouver
Il ne s’est rien passé d’exceptionnel. Et pourtant, tout a changé. Je suis revenu plus ancré, plus simple. Les Dolomites m’ont appris le silence.
`,
},
{
  imageUrl: "/van.jpg",
  altText: "Un van garé face à l’océan au Portugal, coucher de soleil",
  categoryName: "Récits personnels & Aventures",
  title: "En van à travers le Portugal : un été de liberté",
  description: "Des vagues de Nazaré aux ruelles d’Alfama, journal d’un road trip en van rempli d’imprévus et de rencontres.",
  authorName: "Camille Bernard",
  theme: "Voyage",
  content: `
Cet été-là, j’ai quitté Paris avec mon vieux van Volkswagen et zéro plan. Cap au sud.

## 🏄‍♀️ Nazaré et les géants
J’ai dormi trois nuits au bord de la falaise. Le vent tapait, les surfeurs volaient presque. Un pêcheur m’a appris à faire griller des sardines.

## 🛣️ Perdu·e, mais jamais vraiment seul·e
Un pneu éclaté en Alentejo, une vieille dame m’a offert un café et son téléphone. Elle s’appelait Dona Amélia. Ce genre de geste qui reste.

## 🎶 Lisbonne et ses fados
J’ai fini le périple dans les ruelles de l’Alfama. Les chants montaient des bars minuscules. On pleurait tous sans trop savoir pourquoi.

Ce n’était pas juste un voyage. C’était un chapitre.
`,
},
{
  imageUrl: "/voyage-seule.jpg",
  altText: "Dans une gare, Emma de dos avec un sac et une valise",
  categoryName: "Récits personnels & Aventures",
  title: "Mon premier voyage en solo : 3 semaines au Japon",
  description: "Entre Tokyo et Kyoto, ce voyage a été bien plus qu’un simple itinéraire. C’était une rencontre avec moi-même.",
  authorName: "Emma Ruiz",
  theme: "Voyage",
  content: `
J'avais peur. Mais j’ai pris ce billet seule, un soir de doute. Trois semaines plus tard, je regardais Tokyo depuis Shibuya Crossing.

## 🗼 Tokyo : le chaos organisé
Métro, néons, ramen à minuit. Tout était rapide, mais étrangement rassurant. J’étais anonyme, et c’était doux.

## 🎌 Kyoto : silence et temples
Les jardins, les geishas furtives, les torii rouges de Fushimi Inari. Je passais des heures à marcher sans but. 

## 🙋‍♀️ Apprendre à être seule
Manger seule au resto, se perdre, demander en anglais bancal. Tout ça m’a fait grandir. J’étais vulnérable, mais forte.

Je n’étais pas juste en voyage. J’étais en train de devenir quelqu’un.
`,
},
{
    imageUrl: "/roadtrip-canada.jpg",
    altText: "Road trip au Canada",
    categoryName: "Récits personnels & Aventures",
    title: "10 jours à travers les Rocheuses canadiennes",
    description: "Un itinéraire inoubliable entre lacs turquoise, forêts denses et montagnes majestueuses.",
    authorName: "Hugo Martin",
    theme: "Voyage",
    content: `
## 🏔️ Des paysages à couper le souffle
Partez de Calgary et traversez Banff, Jasper et Yoho. Chaque parc national offre ses trésors naturels : lacs glaciaires, cascades, randonnées inoubliables.

## 🚗 Conseils pratiques
- Louer un van aménagé
- Prévoir des réservations pour les campings
- Respecter la faune sauvage (ours, élans…)

Un road trip idéal pour les amoureux de nature et de liberté.
`,
  },
  {
  imageUrl: "/sac-a-dos-minimaliste.jpg",
  altText: "Un sac à dos minimaliste parfaitement organisé",
  categoryName: "Conseils pratiques",
  title: "Comment préparer un sac à dos minimaliste pour un mois",
  description: "Les essentiels pour voyager léger et éviter les galères de surpoids.",
  authorName: "Claire Dumont",
  theme: "Voyage",
  content: `
## L’art de voyager léger
Quand on part en sac à dos pour plusieurs semaines, chaque gramme compte. Après plusieurs essais (et quelques lumbagos), j’ai enfin trouvé l’équilibre entre confort, praticité et légèreté.

### Ce que j’emporte toujours
- 3 t-shirts techniques, 2 pantalons convertibles
- Une serviette microfibre
- Un sac pliable pour les sorties
- Une trousse de secours réduite à l’essentiel

### Mes 3 règles d’or
1. Chaque objet doit avoir **au moins deux usages**.
2. Je roule les vêtements au lieu de les plier.
3. J’emporte uniquement ce que je porte en 7 jours maximum.

Un sac bien organisé, c’est moins de stress, plus de mobilité et... plus de place pour les souvenirs !
  `
},
{
  imageUrl: "/app-voyage.jpg",
  altText: "Applications de voyage ouvertes sur un téléphone",
  categoryName: "Conseils pratiques",
  title: "10 applis indispensables en voyage",
  description: "Mon kit numérique pour ne jamais être perdu, fauché ou mal logé.",
  authorName: "Pola Dupont",
  theme: "Voyage",
  content: `
## Mon top 10 après 6 mois de voyage
Voici les applications que j’utilise (presque) tous les jours quand je suis à l’étranger :

1. **Maps.me** – pour les cartes hors ligne
2. **XE Currency** – convertisseur de devises
3. **Booking** et **Hostelworld** – trouver un lit rapidement
4. **Rome2Rio** – planifier les trajets multimodaux
5. **Google Translate** – avec traduction par image
6. **Polarsteps** – pour garder une trace de mes voyages
7. **Splitwise** – partager les dépenses facilement
8. **Trail Wallet** – gestion du budget
9. **Flightradar24** – suivre son avion en temps réel
10. **HappyCow** – trouver des restos végé où que je sois

Un bon téléphone, une batterie externe, et je suis prêt à partir !
  `
},
{
  imageUrl: "/budget-voyage.jpg",
  altText: "Carnet de voyage avec calculatrice et devises étrangères",
  categoryName: "Conseils pratiques",
  title: "Gérer son budget en voyage : mes astuces testées",
  description: "Comment voyager plusieurs mois sans exploser ses finances.",
  authorName: "Sofia Herrera",
  theme: "Voyage",
  content: `
## Voyager sans se ruiner, c’est possible
En 8 mois autour de l’Asie et de l’Amérique du Sud, j’ai appris à **optimiser chaque dépense** sans sacrifier l’expérience.

### Mes astuces concrètes :
- **Changer son argent dans les banques locales**, pas à l’aéroport
- Manger dans les marchés ou petits bouis-bouis, c’est **moins cher et plus authentique**
- Toujours négocier poliment les prix en Asie
- Voyager lentement : **moins de transport = plus d’économies**

### Outils utilisés :
- Un tableau Google Sheets partagé avec moi-même
- Une carte bancaire sans frais à l’étranger
- Des alertes de prix pour les vols

J’ai gardé mes dépenses à 25€/jour en moyenne. Comme quoi, le rêve est souvent plus accessible qu’on ne le pense !
  `
},
{
  imageUrl: "/marche-local.jpg",
  altText: "Touriste discutant avec un artisan local dans un marché",
  categoryName: "Voyage éthique",
  title: "Voyager éthique : comment respecter les populations locales",
  description: "Être un voyageur responsable, ce n’est pas si compliqué.",
  authorName: "Mariana Ríos",
  theme: "Voyage",
  content: `
## Voyager sans déranger
J’ai souvent vu des touristes prendre des photos sans demander, mal s’habiller dans des lieux sacrés, ou encore négocier jusqu’à l’absurde. Ça m’a fait réfléchir.

### Mes règles simples :
- Toujours **se renseigner sur la culture locale** avant d’arriver
- Acheter auprès d’artisans et de producteurs locaux
- Demander la permission avant de prendre quelqu’un en photo
- Choisir des hébergements tenus par des habitants

### Une question d'attitude
Voyager, c’est un échange. **Le respect commence par la curiosité et l’humilité.** En changeant quelques habitudes, on fait une vraie différence.
  `
},
{
  imageUrl: "/dechets-plage.jpg",
  altText: "Voyageuse ramassant des déchets sur une plage",
  categoryName: "Voyage étique",
  title: "Mes astuces pour limiter mon impact écologique en voyage",
  description: "Réduire son empreinte tout en continuant à découvrir le monde.",
  authorName: "Amira Ben Salah",
  theme: "Voyage",
  content: `
## Voyager et écologie : mission impossible ?
Pas forcément. En adaptant quelques comportements, j’ai pu **réduire drastiquement mon empreinte carbone** tout en profitant pleinement de mes voyages.

### Mes habitudes :
- Je privilégie le train ou le bus au lieu de l’avion
- J’emporte une **gourde filtrante** et des sacs réutilisables
- Je mange local et végétarien dès que possible
- Je participe à des actions de nettoyage avec des ONG

### Bonus :
Je compense mes trajets les plus polluants via des programmes de reforestation. Ce n’est pas parfait, mais c’est un début. **Chaque geste compte !**
  `
},
{
  imageUrl: "/ferme-bio_sri_lanka.jpg",
  altText: "Touriste aidant dans une ferme biologique au Sri Lanka",
  categoryName: "Voyage éthique",
  title: "Voyager autrement : mes choix pour un tourisme plus responsable",
  description: "Moins de luxe, plus de lien humain et de conscience environnementale.",
  authorName: "Claire Dumont",
  theme: "Voyage",
  content: `
## Repenser notre manière de découvrir le monde
Je me suis longtemps posé la question : peut-on vraiment voyager sans nuire à l’environnement ou aux habitants ? J’ai trouvé quelques pistes concrètes.

### Mes engagements :
- J’évite les hôtels de chaîne au profit d’**écolodges** ou de logements chez l’habitant
- Je refuse toute activité impliquant l’exploitation animale
- Je participe à des projets de **volontariat local** (fermes bio, écoles…)

### Et au quotidien ?
Je consomme moins, je choisis des transports bas carbone, et je prends le temps de **comprendre les enjeux locaux** avant d’agir.

🌍 Voyager éthique, ce n’est pas une contrainte : c’est une autre façon d’aimer le monde.
  `
}
];
async function main() {
  console.log('Start seeding ...');

  //  Étape 0 – Audit des doublons déjà présents dans la base
  // On identifie les articles qui ont le même titre et le même auteur
  // sans les supprimer automatiquement (audit seulement)
  const allPosts = await prisma.post.findMany({
    select: { id: true, title: true, userId: true },
    orderBy: { id: 'asc' }, // On conserve l’ordre de création
  });

  const keySet = new Set(); // Pour stocker les combinaisons uniques titre+auteur
  const duplicates = [];    // On y met les ID détectés en doublon

  for (const post of allPosts) {
    const key = `${post.title}-${post.userId}`;
    if (keySet.has(key)) {
      duplicates.push(post.id);
    } else {
      keySet.add(key);
    }
  }

  // Résultat de l'audit
  if (duplicates.length > 0) {
    console.log(`🚨 ${duplicates.length} doublon(s) détecté(s) par titre + auteur :`);
    for (const id of duplicates) {
      const post = allPosts.find(p => p.id === id);
      console.log(`- ID: ${id}, Titre: ${post?.title}`);
    }
  } else {
    console.log(' Aucun doublon détecté par contenu');
  }

  // 👤 Étape 1 – Création ou récupération des utilisateurs
  const createdUsers = {}; // Accès rapide par username
  const createdUsersByFullName = {}; // Accès rapide par prénom + nom

  for (const user of usersData) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    createdUsers[user.username] = createdUser;

    const fullName = `${user.prenom} ${user.nom}`;
    createdUsersByFullName[fullName] = createdUser;

    console.log(`User créé/trouvé : ${createdUser.username} (${fullName})`);
  }

  // Étape 2 – Création ou récupération des thèmes
  const themesToCreate = ['Culture', 'Voiture', 'Science&Technologie', 'Voyage'];
  const createdThemes = {};

  for (const themeName of themesToCreate) {
    const theme = await prisma.theme.upsert({
      where: { name: themeName },
      update: {},
      create: { name: themeName },
    });
    createdThemes[themeName] = theme;
    console.log(`Created/found theme: ${theme.name} (ID: ${theme.id})`);
  }

  // Étape 3 – Création ou récupération des catégories associées aux thèmes
  const createdCategories = {}; // Organisation : themeId → { categoryName: category }
  const categoriesToProcess = new Set();

  for (const article of articlesData) {
    categoriesToProcess.add(JSON.stringify({ name: article.categoryName, themeName: article.theme }));
  }

  for (const categoryInfoString of categoriesToProcess) {
    const { name: categoryName, themeName } = JSON.parse(categoryInfoString);
    const theme = createdThemes[themeName];

    if (!theme) {
      console.warn(`Thème non trouvé : "${themeName}" → catégorie "${categoryName}" ignorée`);
      continue;
    }

    const category = await prisma.category.upsert({
      where: {
        name_themeId: {
          name: categoryName,
          themeId: theme.id,
        },
      },
      update: {},
      create: {
        name: categoryName,
        themeId: theme.id,
      },
    });

    if (!createdCategories[theme.id]) {
      createdCategories[theme.id] = {};
    }

    createdCategories[theme.id][categoryName] = category;
    console.log(`Category créée/trouvée : ${category.name} (ID: ${category.id}, Thème: ${theme.name})`);
  }

  //  Étape 4 – Insertion des articles (avec vérifications complètes)
  let insertedCount = 0;
  let skippedCount = 0;

  for (const article of articlesData) {
    // Génération d’un slug unique basé sur le titre
    const slugBase = slugify(article.title, { lower: true, strict: true });
    let uniqueSlug = slugBase;
    let count = 1;

    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slugBase}-${count++}`;
    }

    // Vérification de l’auteur
    const authorUser = createdUsersByFullName[article.authorName];
    if (!authorUser) {
      console.warn(`Auteur introuvable : ${article.authorName} → Article sauté : "${article.title}"`);
      skippedCount++;
      continue;
    }

    // Vérification du thème
    const theme = createdThemes[article.theme];
    if (!theme) {
      console.warn(`Thème introuvable : ${article.theme} → Article sauté : "${article.title}"`);
      skippedCount++;
      continue;
    }

    // Vérification de la catégorie
    const category = createdCategories[theme.id]?.[article.categoryName];
    if (!category) {
      console.warn(`Catégorie introuvable : ${article.categoryName} → Article sauté : "${article.title}"`);
      skippedCount++;
      continue;
    }

    // Vérification finale du slug (sécurité en doublon)
    const existing = await prisma.post.findUnique({ where: { slug: uniqueSlug } });
    if (existing) {
      console.log(`Article déjà existant : "${article.title}" → slug : "${uniqueSlug}"`);
      skippedCount++;
      continue;
    }

    // Création de l’article
    await prisma.post.create({
      data: {
        title: article.title,
        description: article.description,
        imageUrl: article.imageUrl,
        altText: article.altText,
        content: article.content,
        slug: uniqueSlug,
        userId: authorUser.id,
        categoryId: category.id,
      },
    });

    console.log(`📝 Article inséré : "${article.title}" – Auteur : ${article.authorName}`);
    insertedCount++;
  }

  console.log(`Résumé du seed : ${insertedCount} article(s) inséré(s), ${skippedCount} sauté(s)`);
}
