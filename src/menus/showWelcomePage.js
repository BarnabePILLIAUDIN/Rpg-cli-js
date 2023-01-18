import getCheckedAnswer from "../helpers/getCheckedAnswer.js"
// Objet avec toutes les infos pour la page welcome
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

const showWelcomePage = async () =>
  await getCheckedAnswer(welcome.expectedAnswers, welcome.message)

export default showWelcomePage
