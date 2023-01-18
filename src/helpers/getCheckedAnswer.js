import prompt from "./prompt.js"

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

  return answer
}

export default getCheckedAnswer
