//Fonction pour gérer les erreus
const handleError = (str, code) => {
  console.log(str)
  process.exit(code)
}

export default handleError
