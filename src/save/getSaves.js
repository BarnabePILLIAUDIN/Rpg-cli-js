import { readdir } from "node:fs/promises"
//Cette fonction parcours les fichiers et retournes les jsons a part package.json et package-lock.json
const getSaves = async () => {
  const files = await readdir(".")

  return files
    .map((element) => {
      if (
        element.split(".")[1] === "json" &&
        element != "package.json" &&
        element != "package-lock.json"
      ) {
        return element
      }
    })
    .filter((element) => element != undefined)
}

export default getSaves
