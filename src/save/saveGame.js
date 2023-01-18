import { writeFile } from "node:fs/promises"
import prompt from "../helpers/prompt.js"

//Transforme en string et enregistre dans un json un objet qui reprénsente un jouer
const saveGame = async (element) => {
  const name = await prompt("Entrez un nom pour la sauvarde\n")
  const cleanSave = JSON.stringify(element)
  await writeFile(`${name}.json`, cleanSave, {
    encoding: "utf-8",
    flag: "a+",
  })
}

export default saveGame
