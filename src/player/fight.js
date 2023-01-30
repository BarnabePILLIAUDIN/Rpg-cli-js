import createEntity from "./createEntity.js"
import prompt from "../helpers/prompt.js"
import getDamages from "./getDamages.js"
import sayGoodBye from "./sayGoodBye.js"
import getRandom from "../helpers/getRandom.js"
import waitSeconds from "../helpers/waitSeconds.js"

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
    } else if (playerDamages === 0) {
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
    await waitSeconds(1)
  }
}

export default fight
