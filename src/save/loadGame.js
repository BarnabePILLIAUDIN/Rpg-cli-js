import { readFile } from "node:fs/promises"
import getSaves from "./getSaves.js"
import getCheckedAnswer from "../helpers/getCheckedAnswer.js"
import createPlayer from "../player/createPlayer.js"

//Retourne un objet qui peut être utilisé comme un joueur à partir des sauvegardes
//Les méthodes du joueur étant perdu lors de la sauvegarde il faut les lui remmettre
const loadGame = async () => {
  const saves = await getSaves()

  if (saves.length === 0) {
    console.log("No saved found :( You will have a new game".red)

    return createPlayer()
  }

  console.log("les sauvegardes trouvées sont :")
  saves.forEach((element) => {
    console.log(element)
  })
  const answer = await getCheckedAnswer(
    saves,
    "Quelle sauvegarde voulez vous charger\n"
  )
  const file = await readFile(answer, { encoding: "utf-8" })
  const player = JSON.parse(file)
  //Les méthodes ayant étés perdus lors de la sauvegarde en json on les remets dans l'objet
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
  player.isAlive = function () {
    return this.hp > 0
  }

  return player
}

export default loadGame
