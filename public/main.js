let countID
let totalCardInfo
let i = 0

const main = () => {
  getNasaPic()
  getCard()
  countID = setInterval(beginCountDown, 1000)
}

let nasaImageData

const getNasaPic = async () => {
  console.log('going out to API')

  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  console.log('back from API')
  console.log(response)
  nasaImageData = await response.json()
  console.log(getNasaPic)
  const img = document.createElement('img')
  img.src = nasaImageData.url
  document.querySelector('.spaceImage').appendChild(img)
}

const getCard = async () => {
  console.log('going out to API')
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  console.log('back from API')
  console.log(response)
  totalCardInfo = await response.json()
  console.log(totalCardInfo)
  document.querySelector('.line1').textContent = totalCardInfo[i].mission_name
  document.querySelector('.line2').textContent = totalCardInfo[i].details
  document.querySelector('.line3').textContent =
    totalCardInfo[i].launch_date_unix
  document.querySelector('.line4').textContent = totalCardInfo[i].site_name_long
  console.log(totalCardInfo)
  // beginCountDown()
}

const moveRight = () => {
  if (i === totalCardInfo.length) {
    i = 0
    getCard()
  } else {
    i += 1
    getCard()
  }
}

const moveLeft = () => {
  if (i === 0) {
    i = totalCardInfo.length
    getCard()
  } else {
    i -= 1
    getCard()
  }
}

const beginCountDown = () => {
  const unixConversion = totalCardInfo[i].launch_date_unix * 1000
  const now = new Date().getTime()
  const t = unixConversion - now
  const days = Math.floor(t / (1000 * 60 * 60 * 24))
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((t % (1000 * 60)) / 1000)
  document.querySelector('.days').textContent = days
  document.querySelector('.hours').textContent = hours
  document.querySelector('.minutes').textContent = minutes
  document.querySelector('.seconds').textContent = seconds
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.leftPrevious').addEventListener('click', moveLeft)
document.querySelector('.rightNext').addEventListener('click', moveRight)
