# READ ME - RECUP'ROJET 

[![Hey ! I'm Discord](https://cdn.discordapp.com/attachments/978557928195915796/988729043706851338/unknown.png)](https://discord.com/)

Le récup'rojet est un projet d'optimisation de récupération des déchets générés par les entreprises ainsi qu'une optimisation de l'upcyclage et du recyclage de ces déchets.

Pour cela, nous récupérons les informations de production des usines et suivons le remplissages des poubelles en temps réel pour prévoir le moment idéal afin que nos collecteurs viennent récupérer le déchets. 
Lorsqu'une entreprise à besoin d'une collecte, son addresse s'ajoute à une liste de point de passage obligatoire et le lien d'un trajet MAPS est automatiquement généré sur la page de nos collecteurs. Il y a également la possibilité pour nos récupartenaire de récupérer les déchets, on a donc pour cela une récuplateforme ou les déchets récoltés sont automatiquement ajoutés et les récupartenaires peuvent sélectionner ce qu'ils souhaitent récolter.

## Le fonctionnement du récup'rojet
#### Démarage du projet
- Faire un gitclone du projet : https://github.com/Recup-TEAM/R-cup-Usine.git
- Faire un cd R-cup-Usine
- Faire un npm i
- Faire un node start

#### Exemple d'utilisation :
Pour ce projet, il y a 3 possibilités d'utilisation en fonction de quel est votre role :
- Entreprise ou un particulier
- Collecteur
- Administrateur

Si vous êtes une entreprise ou un particulier, vous pourez :
- Remplir le formulaire pour devenir récupartenaire
- Avoir accès à un compte à vote nom sera (créé par nos soins) et sa gestion
- Avoir accès à vos statistiques et à la modification de votre profil
- Demander une collecte en cas de production de déchets imprévue
- Avoir accés à la récuplateforme pour recevoir les déchets des autres récupartenaires

Si vous êtes un collecteur, vous pourez :
- Avoir accés à la page de collecteur où est résumer le trajet avec les arrêt détaillé, ce qu'il faut récupérer et le trajet maps
- Avoir accès à un compte à vote nom sera (créé par nos soins) et sa gestion

Si vous êtes un administrateur, vous pourrez :
- Avoir accés à la gestion de toutes les plateforms et des compte des entreprises et des collecteurs.
- Gérer la base de donnée
- Gérer la création autnome des trajets pour les collecteurs

#### Librairies utilisées
Les librairies utilisées dans ce projet sont :
-- Front --
- Jquery : "3.3.1" (notamment pour les requètes)
- bootstrap : "4.0.0" (facilite la mise en place du css)
- easypick : "1.2.0" (permet la gestion de date)
- fontawesome : "6.1.1" (mise en page)
- Animate.css : "4.1.1" (animation de la page html)
- Over.css : "v2" (animation de la page html)

-- Back --
- express: "^4.18.1" (création d'une API simple et rapide)
- express-session: "^1.17.3" (sous catégorie d'express)
- express-socket.io-session: "^1.3.5" (sous catégorie d'express)
- express-validator: "^6.14.1" (sous catégorie d'express)
- fs: "^0.0.1-security" (ecriture et lecture de fichier)
- md5: "^2.3.0" (cryptage des données)
- mysql2: "^2.3.3" (gestion et création d'une BDD)
- nodemailer: "^6.7.5" (envoie de mail)
- nodemon: "^2.0.16" (lancement de serveur)
- save: "^2.5.0" (sauvegarde de session
- socket.io: "^4.5.1" (pour les sessions)
- socket.io-session: "0.0.5" (sous catégorie de socket)

## Auteurs
- Armand Deffrennes
- Corentin Denoulet
- Pierre Pinateau
- Marie Pivette

## Licenses
- Webstorm
- Teams
- Word
- Canvas
- Google API Maps
- Figma
- GitHub Pro
