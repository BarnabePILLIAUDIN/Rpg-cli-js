import getRandom from "../helpers/getRandom.js"
//Fonction qui calcule les dégats

//On prend la force de l'entité qui attaque qu'on multiplie par un nombre aléatoire entre 0.8 et 1.2

//Pour savoir si le coup est critique on génére un nombre aléatoire entre 1 et 101-la chance du joueur.
//Avec une chance de 100 le joueur sera sur de faire un coup critique. Un coup critique fait 3 fois plus de dégats

//Enfin pour savoir si le joueur à manqué son coup on génére un nombre aléatoire entre 0 et 200, si ce nombre est plus grand que l'agilité le coup est manqué

const getDamages = ({ strength, luck, agility }) =>
  strength *
  (getRandom(8, 12) / 10) *
  (getRandom(1, 101 - luck) === 3 ? 3 : 1) *
  (getRandom(0, 200) > agility ? 0 : 1)

export default getDamages
