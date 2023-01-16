import { createInterface } from "node:readline/promises"

//Objet avec toutes les infos pour la page welcome
const welcome = {
  message: `   WELCOME

  1. Start game 🏁
  2. Load game 💾
  3. Exit game ❌

  Your choice(1- 3): `,
  expectedAnswers: ["1", "2", "3"],
}

const sayGoodBye = () => {
  console.clear()
  console.log(`\n\n GAME OVER

  THANKS FOR PLAYING`)
}

const mainMenu = {
  message1: "\n MAIN MENU\n\n",
  message2: `
  1. Fight 🗡️
  2. Shop 🛒
  3. Save game 💾
  4. Exit ❌
  
  Your choice(1-4):`,
  expectedAnswers: ["1", "2", "3", "4"],
}
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
    )
    answer = await prompt(message)
  }
  console.log(answer)
  return answer
}

//Fonction qui affiche la page welcome et qui renvoie le choix de l'utilisateur
const showWelcomePage = async () =>
  await getCheckedAnswer(welcome.expectedAnswers, welcome.message)

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
    strength: getRandom(0, 25),
    intelligence: getRandom(0, 250),
    agility: getRandom(0, 250),
    luck: getRandom(0, 255),
    hp: getRandom(100, 255),
    showSats: function () {
      console.log(`STATS 📊
  
  💪 : ${this.strength}
  🧠 : ${this.intelligence}
  🤺 : ${this.agility}
  🍀 : ${this.luck}
  🩸 : ${this.hp}      
      `)
    },
    isAlive: function () {
      return this.hp > 0
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

const player = createPlayer()

//Fonction qui affiche le menu principale et retourne le choix de l'utilisateur
const showMainMenu = async () => {
  console.log(mainMenu.message1)
  player.showSats()
  return await getCheckedAnswer(mainMenu.expectedAnswers, mainMenu.message2)
}

//Fonction qui calcule les dégats
//On prend la force de l'entité qui attaque qu'on multiplie par un nombre aléatoire entre 0.8 et 1.2
//En plus l'attaquant à 1 chance sur 10 de faire un coup critique. Pour savoir on génère un nombre aléatoire entre 1 et 10 et s'il vaut 5
//l'attaquant fait 3 fois plus de dégats

//TODO : FAIRE EN SORTE QUE LE L'ATTAQUE PUISSE RATER EN FONCTION DE L'AGILITE

const getDamages = ({ strength }) =>
  strength * (getRandom(8, 12) / 10) * (getRandom(1, 10) === 5 ? 3 : 1)

const fight = async () => {
  const enemy = createEntity()
  enemy.showSats()
  let round = 0

  while (player.isAlive() && enemy.isAlive()) {
    round++
    const enemyDamages = getDamages(enemy)
    player.hp -= enemyDamages
    //On évite les nombres de pv à virgule qui rendent mal à l'affichage
    player.hp = Math.floor(player.hp)
    if (!player.isAlive()) {
      //Si le joueur est mort alors le combat s'arrère
      console.log(`You lost, the fight last ${round} rounds`)
      await prompt("appuyez sur entrer pour continuer")
      sayGoodBye()
    }
    const playerDamages = getDamages(player)
    enemy.hp -= playerDamages
    enemy.hp = Math.floor(enemy.hp)

    if (!enemy.isAlive()) {
      //Si l'adversaire est mort alors le combat s'arrête et le joueur recois de l'xp et l'argent
      const moreMoney = getRandom(20, 100)
      player.money += moreMoney
      const moreXp = getRandom(20, 100)
      player.xp += moreXp

      console.log(
        `Congratulation you won! The fight last ${round} rounds. You recieved ${moreMoney}💰 and ${moreXp}🧬`
      )

      return
    }
    console.log(
      ` Round ${round}:
      \n You have ${player.hp} pv and your openent has ${enemy.hp} pv\n`
    )
  }
}

//Fonction principale
const main = async () => {
  const welcomeChoice = await showWelcomePage()
  switch (welcomeChoice) {
    case "1": {
      while (player.isAlive()) {
        console.clear()
        const mainAnswer = await showMainMenu()
        switch (mainAnswer) {
          case "1": {
            console.clear()
            fight()
            break
          }
          case "2": {
            console.clear()
            console.log("I want to do some shopping!")
            break
          }
          case "3": {
            console.clear()
            console.log("I want to save!")
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
      break
    }
    case "2": {
      console.clear()
      console.log("I want to load a previous game")
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

console.clear
main()
