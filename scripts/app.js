let weatherSearchBar = document.getElementById('weather-search')
let weatherSearchBtn = document.getElementById('weather-search-btn')
let errorBox = document.querySelector('.hero-section .error-box')
let additionalInfo = document.querySelector('.additional-info')
let weatherReportArea = document.querySelector('.weather-report-area')
let feelsLike = document.querySelector('#feels-like')
let windSpeed = document.querySelector('#wind-speed')
let humidity = document.querySelector('#humidity')
let weatherIcon = document.querySelector('.today-weather-value .weather-icon img')
let weatherDescription = document.querySelector('.weather-desc')
let loadingCircle = document.getElementById('loading-circle')
let visibility = document.getElementById('visibility')
let cloudPercentage = document.getElementById('cloud-percentage')

weatherSearchBar.addEventListener('keydown', (e)=>{
    errorBox.style.display = 'none'
    errorBox.innerHTML = ''
    if(e.key == "Enter"){
        console.log('pressed')
        performAPICall()
    }
})
weatherSearchBtn.addEventListener('click',()=>{
    performAPICall()
})

async function performAPICall(){

    console.log('function is called')
    let apiKey = '7590d9abc14638044eaf61fe4db81c82'
    let city = weatherSearchBar.value.trim()
    console.log(city)
    if(weatherSearchBar.value.length > 0 && weatherSearchBar.value.trim() !== '' && weatherSearchBar.innerText.trim() !== null){
        console.log('everything met')
        try{
            loadingCircle.classList.add('loader')
            let weatherStats = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, {
            method : "GET",
        })
        let data = await weatherStats.json()
        if(weatherStats.status === 404){
            loadingCircle.classList.remove('loader')
            errorBox.style.display = 'flex'
            errorBox.innerHTML = `Your requested city data is not available.`
        }else if(weatherStats.status === 200) {
            loadingCircle.classList.remove('loader')
            weatherReportArea.classList.add('show-weather')
            additionalInfo.classList.add('show-info')
            additionalInfo.style.display = 'flex'
            let currentCity = document.querySelector('.current-city')
            let weatherValue = document.querySelector('.weather-value-wrapper .weather-value')
            currentCity.innerText = data.name
            weatherValue.innerText = Math.round(Number.parseInt(data.main.temp))
            weatherIcon.src = `../graphics/Weather-Condition-Icons/${data.weather[0].icon}.svg`
            weatherDescription.innerHTML = `${data.weather[0].description}`
            feelsLike.innerHTML = `${Math.round(data.main.feels_like)}<span class="degree">°C</span>`
            windSpeed.innerHTML = `${Math.round(data.wind.speed * 3.6)}Km/hr`
            humidity.innerHTML = `${data.main.humidity}%`
            visibility.innerHTML = `${data.visibility/1000}Km`
            cloudPercentage.innerHTML = `${data.clouds.all}%`
            console.log(data)   
            
        }
        }catch(error){
            console.log(error)
        }
        
    }
}