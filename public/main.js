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
  displayRocketInfo()
  countID = setInterval(beginCountDown, 1000)
  advanceCard()
}

const advanceCard = () => {
  interval2 = setTimeout(displayNextMissionCycling, 10000)
}
const displayNextMissionCycling = () => {
  buttonRightAdd()
  interval2 = null
  advanceCard()
}
const getNasaPic = () => {
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
const buttonLeftSub = () => {
  console.log('left click')
  if (i === 0) {
    i = rocketInfo.length - 1
    displayRocketInfo()
  }
  // Used Georg's code for this but I don't quite understand the math. If you could leave a comment explaining it, that would be great.
  i = (i - 1) % rocketInfo.length
  displayRocketInfo()
}
const buttonRightAdd = () => {
  console.log('right clicked')
  i = (i + 1) % rocketInfo.length
  displayRocketInfo()
}
const displayRocketInfo = () => {
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

console.log({ test: document.querySelector('.left') })

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.left').addEventListener('click', buttonLeftSub)
document.querySelector('.right').addEventListener('click', buttonRightAdd)
