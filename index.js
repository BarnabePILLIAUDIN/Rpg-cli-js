import { createInterface } from "node:readline/promises"

//Objet avec toutes les infos pour la page welcome
const welcome = {
  message: `   WELCOME

  1. Start game 🏁
  2. Load game 💾
  3. Exit game ❌

  Your choice(1- 3): `,
  expectedAnswer: ["1", "2", "3"],
}

//Fonction qui permet d'afficher un message et de retourner la réponse de l'utilistaeur
const prompt = async (str) => {
  const rl = createInterface(process.stdin)
  process.stdout.write(str)
  const output = await rl.question("")
  await rl.close()

  return output
}

//Fonction qui affiche la page welcome et qui renvoie le choix de l'utilisateur
const showWelcomePage = async () => {
  let answer = await prompt(welcome.message)

  while (!welcome.expectedAnswer.includes(answer)) {
    console.clear()
    console.log("INCORRECT INPUT: EXPECTED 1, 2, or 3!")
    answer = await prompt(welcome.message)
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

//Fonction qui retourne un combatant avec les stats communes aux enemies et au joueur
const createEntity = () => {
  return {
    strength: getRandom(0, 250),
    intelligence: getRandom(0, 250),
    agility: getRandom(0, 250),
    luck: getRandom(0, 255),
    hp: getRandom(0, 255),
    showSats: function () {
      console.log(`STATS 📊
  
  💪 : ${this.strength}
  🧠 : ${this.intelligence}
  🤺 : ${this.agility}
  🍀 : ${this.luck}
  🩸 : ${this.hp}      
      `)
    },
  }
}

//Fonction qui retourne un joeur (c'est un enemy avec un stat pour l'agent et une pour l'xp ainsi qu'une fonction showStats mise à jours)
const createPlayer = () => {
  const player = createEntity()

  player.money = getRandom(0, 50)
  player.xp = 0
  player.showSats = function () {
    console.log(` STATS 📊
  
  💪 : ${this.strength}
  🧠 : ${this.intelligence}
  🤺 : ${this.agility}
  🍀 : ${this.luck}
  🩸 : ${this.hp}
  💰 : ${this.money}
  🧬 : ${this.xp}  
      `)
  }

  return player
}

const createGame = () => {
  const player = createPlayer()
  const enemy = createEntity()

  console.clear()
  console.log("\n MAIN MENU\n\n")
  player.showSats()
  enemy.showSats()
}

const main = async () => {
  const welcomeChoice = await showWelcomePage()
  console.log(":" + welcomeChoice)
  switch (welcomeChoice) {
    case "1": {
      createGame()
      break
    }
    case "2": {
      console.clear()
      console.log("Je veux charger une partie")
      break
    }
    case "3": {
      process.exit(0)
      break
    }
    default: {
      handleError("ERROR: UNEXPECTED VALUE", 1)
      break
    }
  }
}

console.clear()

main()
