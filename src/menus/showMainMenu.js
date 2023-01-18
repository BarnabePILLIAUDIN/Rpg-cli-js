import getCheckedAnswer from "../helpers/getCheckedAnswer.js"
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

//Fonction qui affiche le menu principale et retourne le choix de l'utilisateur
const showMainMenu = async (player) => {
  console.log(mainMenu.message1)
  player.showSats()

  return await getCheckedAnswer(mainMenu.expectedAnswers, mainMenu.message2)
}

export default showMainMenu
