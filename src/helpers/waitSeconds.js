const waitSeconds = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("ok")
    }, time * 1000)
  })
}

export default waitSeconds
