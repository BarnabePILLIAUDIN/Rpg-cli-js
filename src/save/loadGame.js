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
  player.showSats = function () {
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
  }
  player.isAlive = function () {
    return this.hp > 0
  }

  return player
}

export default loadGame
