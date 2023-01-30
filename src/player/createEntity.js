import getRandom from "../helpers/getRandom.js"
//Fonction qui retourne un combatant avec les stats communes aux enemies et au joueur
const createEntity = () => {
  return {
    strength: getRandom(1, 25),
    intelligence: getRandom(1, 250),
    agility: getRandom(100, 200),
    luck: getRandom(1, 100),
    hp: getRandom(100, 255),
    showSats: function () {
      console.log(
        `STATS 📊`.blue +
          `
  
  Strength 💪 : ${this.strength}
  Intelligence 🧠 : ${this.intelligence}
  Agility 🤺 : ${this.agility}
  Luck 🍀 : ${this.luck}
  Hp 🩸 : ${this.hp}      
      `
      )
    },
    isAlive: function () {
      return this.hp > 0
    },
  }
}

export default createEntity
