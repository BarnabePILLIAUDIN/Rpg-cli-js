import getCheckedAnswer from "../helpers/getCheckedAnswer.js"

//Montre les prix du shop qui sont contenus dans un tableau (ce tableau est dans playerAfterShopping.js)
const showPrices = async (data) => {
  console.log(
    "WELCOME TO THE SHOP!".blue +
      "\n\n Here you can spend your money to improve your stats"
  )

  const keys = Object.keys(data)
  keys.forEach((element) => {
    console.log(
      `\n * +${data[element][0]} ${element} cost ${data[element][1]}💰`
    )
  })

  return await getCheckedAnswer(keys, "Which stat do you want to upgrade\n")
}

export default showPrices
