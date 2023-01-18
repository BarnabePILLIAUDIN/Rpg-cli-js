import getRandom from "../helpers/getRandom.js"
//Fonction qui retourne un combatant avec les stats communes aux enemies et au joueur
const createEntity = () => {
  return {
    strength: getRandom(0, 25),
    intelligence: getRandom(0, 250),
    agility: getRandom(100, 200),
    luck: getRandom(0, 100),
    hp: getRandom(100, 255),
    showSats: function () {
      console.log(
        `STATS 📊`.blue +
          `
  
  💪 : ${this.strength}
  🧠 : ${this.intelligence}
  🤺 : ${this.agility}
  🍀 : ${this.luck}
  🩸 : ${this.hp}      
      `
      )
    },
    isAlive: function () {
      return this.hp > 0
    },
  }
}

export default createEntity
