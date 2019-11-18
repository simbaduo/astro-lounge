let rocketInfo
let interval2
let countID
let nasaImageData
let i = 0

const main = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  nasaImageData = await response.json()
  getNasaPic()
  const response2 = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  rocketInfo = await response2.json()
  countID = setInterval(beginCountDown, 1000)
  getCard()
  advanceCard()
  console.log(response2)
  console.log(rocketInfo)
  console.log(right())
}
const advanceCard = () => {
  interval2 = setTimeout(displayNextMissionCycling, 10000)
}

const displayNextMissionCycling = () => {
  right()
  interval2 = null
  advanceCard()
}
const getNasaPic = () => {
  console.log(getNasaPic)
  const img = document.createElement('img')
  img.src = nasaImageData.url
  document.querySelector('.spaceImage').appendChild(img)
  const theData =
    'copyright: ' +
    nasaImageData.copyright +
    ' | ' +
    'title: ' +
    nasaImageData.title
  document.querySelector('.copyrightText').textContent = theData
}

const beginCountDown = () => {
  const unixConversion = rocketInfo[i].launch_date_unix * 1000
  const now = new Date().getTime()
  const t = unixConversion - now
  const days = Math.floor(t / (1000 * 60 * 60 * 24))
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((t % (1000 * 60)) / 1000)
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    document.querySelector('.days').textContent = 'Launched.'
    document.querySelector('.line3').classList.add('hide')
  } else {
    document.querySelector('.line3').classList.remove('hide')
    document.querySelector('.days').textContent = days
    document.querySelector('.hours').textContent = hours
    document.querySelector('.minutes').textContent = minutes
    document.querySelector('.seconds').textContent = seconds
  }
}

const moveLeft = () => {
  if (i === 0) {
    i = rocketInfo.length - 1
    getCard()
  }
  i = (i - 1) % rocketInfo.length
  getCard()
}

const right = () => {
  if (i <= rocketInfo.length) {
    i++
  } else {
    i = 0
  }
}

const getCard = () => {
  document.querySelector('.line1').textContent = rocketInfo[i].mission_name

  if (rocketInfo[i].details == null) {
    document.querySelector('.line2').textContent =
      'No description available yet.'
  } else {
    document.querySelector('.line2').textContent = rocketInfo[i].details
  }
  document.querySelector('.line4').textContent =
    rocketInfo[i].launch_site.site_name_long
}
document.addEventListener('DOMContentLoaded', main)
document.querySelector('.leftPrevious').addEventListener('click', moveLeft)
document.querySelector('.rightNext').addEventListener('click', right)
