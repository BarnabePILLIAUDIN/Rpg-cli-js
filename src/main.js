import sayGoodBye from "./player/sayGoodBye.js"
import createPlayer from "./player/createPlayer.js"
import showWelcomePage from "./menus/showWelcomePage.js"
import loadGame from "./save/loadGame.js"
import handleError from ".//helpers/handleError.js"
import game from "./player/game.js"
import "colors"

const main = async () => {
  const welcomeChoice = await showWelcomePage()

  switch (welcomeChoice) {
    case "1": {
      const player = createPlayer()
      await game(player)
      sayGoodBye()

      break
    }

    case "2": {
      console.clear()
      const player = await loadGame()
      await game(player)
      sayGoodBye()

      break
    }

    case "3": {
      console.clear()
      sayGoodBye()

      break
    }

    default: {
      console.clear()
      handleError(`ERROR: UNEXPECTED VALUE (${welcomeChoice})`, 1)

      break
    }
  }

  sayGoodBye()
}

export default main
