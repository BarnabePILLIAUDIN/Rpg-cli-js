import { createInterface } from "node:readline/promises"

//Fonction qui permet d'afficher un message et de retourner la réponse de l'utilistaeur
const prompt = async (str) => {
  const rl = createInterface(process.stdin)
  process.stdout.write(str)
  const output = await rl.question("")
  await rl.close()

  return output
}

export default prompt
