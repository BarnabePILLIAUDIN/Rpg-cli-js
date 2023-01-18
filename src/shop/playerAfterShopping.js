import "colors"
import showPrices from "./showPrices.js"
const data = {
  //La prmière valeur du tableau est le nombre de points gagnés, la deuxième correspond au prix
  strength: [10, 50],
  agility: [15, 35],
  luck: [10, 35],
  hp: [50, 100],
}

//Retourne le joueur avec ses points en plus et son argent en moins
const playerAfterShopping = async (player) => {
  const answer = await showPrices(data)
  const addedPoints = data[answer][0]
  const price = data[answer][1]

  if (player.money < price) {
    console.log("You don't have enough money".red)

    return player
  }

  player[answer] += addedPoints
  player.money -= price
  console.log(player)

  return player
}

export default playerAfterShopping
