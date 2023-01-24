import showMainMenu from "../menus/showMainMenu.js"
import saveGame from "../save/saveGame.js"
import handleError from "../helpers/handleError.js"
import sayGoodBye from "./sayGoodBye.js"
import fight from "./fight.js"
import playerAfterShopping from "../shop/playerAfterShopping.js"

// Fonction qui gère la partie
const game = async (player) => {
  while (player.isAlive()) {
    console.clear()
    const mainAnswer = await showMainMenu(player)

    switch (mainAnswer) {
      case "1": {
        console.clear()
        await fight(player)

        break
      }

      case "2": {
        console.clear()
        player = await playerAfterShopping(player)

        break
      }

      case "3": {
        console.clear()
        await saveGame(player)
        console.log("saved!")

        break
      }

      case "4": {
        player.hp = 0
        sayGoodBye()

        break
      }

      default: {
        console.clear()
        handleError(`ERROR: UNEXPECTED VALUE (${mainAnswer})`, 1)
      }
    }
  }
}
export default game
