import createEntity from "./createEntity.js"
import getRandom from "../helpers/getRandom.js"
//Fonction qui retourne un joeur (c'est un enemy avec un stat pour l'agent et une pour l'xp ainsi qu'une fonction showStats mise à jours)
const createPlayer = () => {
  const player = createEntity()

  player.money = getRandom(0, 50)
  player.xp = 0
  player.showSats = function () {
    console.log(
      ` STATS 📊`.blue +
        `
  
  Strength💪 : ${this.strength}
  Intelligence 🧠 : ${this.intelligence}
  Agility 🤺 : ${this.agility}
  Luck 🍀 : ${this.luck}
  Hp 🩸 : ${this.hp}
  Money 💰 : ${this.money}
  Xp 🧬 : ${this.xp}  
      `
    )
  }

  return player
}
export default createPlayer
