import { readFile, writeFile, readdir } from "node:fs/promises"
import { createInterface } from "node:readline/promises"
import "colors"

//__________________________

//DATA

//__________________________

//Objet avec toutes les infos pour la page welcome
const welcome = {
  message:
    `\n   WELCOME`.blue +
    `

  1. Start game 🏁
  2. Load game 💾
  3. Exit game ❌

  Your choice(1- 3): `,
  expectedAnswers: ["1", "2", "3"],
}

//Objet avec la data du main menu
const mainMenu = {
  message1: "\n MAIN MENU\n\n".blue,
  message2: `
  1. Fight 🗡️
  2. Shop 🛒
  3. Save game 💾
  4. Exit ❌
  
  Your choice(1-4):`,
  expectedAnswers: ["1", "2", "3", "4"],
}

//__________________________

//Fonctions pour charger ou suvegarder le jeu

//__________________________

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

//Retourne un objet qui peut être utilisé comme un joueur à partir des sauvegardes
//Les méthodes du joeur étant perdu lors de la sauvegarde il faut les lui remmettre
const loadGame = async () => {
  const saves = await getSaves()
  if (saves.length === 0) {
    console.log("No saved found :( You will have a new game".red)

    return "bruh"
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

//Transforme en string et enregistre dans un json un objet qui reprénsente un jouer
const saveGame = async (element) => {
  const name = await prompt("Entrez un nom pour la sauvarde\n")
  const cleanSave = JSON.stringify(element)
  await writeFile(`${name}.json`, cleanSave, {
    encoding: "utf-8",
    flag: "a+",
  })
}

//__________________________

//Fonction relative au joueur

//__________________________

//Fonction qui retourne un combatant avec les stats communes aux enemies et au joueur
const createEntity = () => {
  return {
    strength: getRandom(0, 25),
    intelligence: getRandom(0, 250),
    agility: getRandom(100, 250),
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

const sayGoodBye = async () => {
  console.clear()
  console.log(
    `\n\n   GAME OVER

  THANKS FOR PLAYING`.red.bold
  )
}

//Fonction qui retourne un joeur (c'est un enemy avec un stat pour l'agent et une pour l'xp ainsi qu'une fonction showStats mise à jours)
const createPlayer = () => {
  const player = createEntity()

  player.money = getRandom(0, 50)
  player.xp = 0
  player.showSats = function () {
    console.log(
      ` STATS 📊`.blue +
        `
  
  💪 : ${this.strength}
  🧠 : ${this.intelligence}
  🤺 : ${this.agility}
  🍀 : ${this.luck}
  🩸 : ${this.hp}
  💰 : ${this.money}
  🧬 : ${this.xp}  
      `
    )
  }

  return player
}
//Fonction qui calcule les dégats

//On prend la force de l'entité qui attaque qu'on multiplie par un nombre aléatoire entre 0.8 et 1.2

//Pour savoir si le coup est critique on génére un nombre aléatoire entre 1 et 101-la chance du joueur.
//Avec une chance de 100 le joueur sera sur de faire un coup critique. Un coup critique fait 3 fois plus de dégats

//Enfin pour savoir si le joueur à manqué son coup on génére un nombre aléatoire entre 0 et 255, si ce nombre est plus grand que l'agilité le coup est manqué

const getDamages = ({ strength, luck, agility }) =>
  strength *
  (getRandom(8, 12) / 10) *
  (getRandom(1, 101 - luck) === 3 ? 3 : 1) *
  (getRandom(0, 255) > agility ? 0 : 1)

const fight = async (player) => {
  const enemy = createEntity()
  enemy.showSats()
  let round = 0
  await prompt("press enter to start the fight")

  while (player.isAlive() && enemy.isAlive()) {
    round++
    console.log(`Round ${round}:`.blue)
    const enemyDamages = getDamages(enemy)
    player.hp -= enemyDamages
    //On évite les nombres de pv à virgule qui rendent mal à l'affichage
    player.hp = Math.floor(player.hp)

    if (enemyDamages > enemy.strength * 1.5) {
      console.log(" 💥 The enemy made a critical shot".red + "")
    } else if (enemyDamages == 0) {
      console.log("🛡️ Nice defence the enemy failed his shot".green)
    }

    if (!player.isAlive()) {
      //Si le joueur est mort alors le combat s'arrère
      console.log(`You lost, the fight last ${round} rounds`.red)
      await prompt("Press enter to continue")
      sayGoodBye()

      return
    }

    const playerDamages = getDamages(player)
    enemy.hp -= playerDamages
    enemy.hp = Math.floor(enemy.hp)

    if (playerDamages > player.strength * 1.5) {
      console.log("💥 Nice one that was a critical shot".green)
    } else {
      console.log("🛡️ You missed that shot".red)
    }

    if (!enemy.isAlive()) {
      //Si l'adversaire est mort alors le combat s'arrête et le joueur recois de l'xp et l'argent
      const moreMoney = getRandom(20, 100)
      player.money += moreMoney
      const moreXp = getRandom(20, 100)
      player.xp += moreXp

      console.log(
        `Congratulation you won! The fight last ${round} rounds. You recieved ${moreMoney}💰 and ${moreXp}🧬`
          .green
      )
      await prompt("Press enter to continue")

      return
    }
    console.log(
      `\n\n You have ${player.hp} pv and your openent has ${enemy.hp} pv\n`
    )
  }
}

//__________________________

//Autres Fonctions utiles

//__________________________

//Fonction qui permet d'afficher un message et de retourner la réponse de l'utilistaeur
const prompt = async (str) => {
  const rl = createInterface(process.stdin)
  process.stdout.write(str)
  const output = await rl.question("")
  await rl.close()

  return output
}

//Fonction qui s'assure que la réponse correspond aux attentes
const getCheckedAnswer = async (expectedAnswers, message) => {
  let answer = await prompt(message)
  while (!expectedAnswers.includes(answer)) {
    console.clear()
    console.log(
      `INCORRECT INPUT: EXPECTED ${expectedAnswers.map((element) => element)}`
        .red.bold
    )
    answer = await prompt(message)
  }
  console.log(answer)
  return answer
}

//Fonction pour gérer les erreus
const handleError = (str, code) => {
  console.log(str)
  process.exit(code)
}

//Fonction pour avoir de l'aléatoir
const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)

//__________________________

//Fonctions qui affichent les menus

//__________________________

//Fonction qui affiche le menu principale et retourne le choix de l'utilisateur
const showMainMenu = async (player) => {
  console.log(mainMenu.message1)
  player.showSats()
  return await getCheckedAnswer(mainMenu.expectedAnswers, mainMenu.message2)
}

//Fonction qui affiche la page welcome et qui renvoie le choix de l'utilisateur

const showWelcomePage = async () =>
  await getCheckedAnswer(welcome.expectedAnswers, welcome.message)

//__________________________

//Fonction principale

//__________________________

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
        console.log("I want to do some shopping!")
        break
      }
      case "3": {
        console.clear()
        await saveGame(player)
        console.log("saved")
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

console.clear()
main()
