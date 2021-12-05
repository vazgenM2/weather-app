let result = {}

let weather = {
	apiKey: "e18494b501363fae5b6a7eef697485bf",
	fetchWeather: (city) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e18494b501363fae5b6a7eef697485bf&units=metric`)
		.then(response => response.json())
		.then(res => result = res)
		.catch(e => console.log(e))
}

let capitaliz = str => str[0].toUpperCase() + str.split('').slice(1).join('')

document.querySelector('.search-btn').addEventListener('click', async () => {
	let cityName = document.querySelector('.search-inp').value
	if (cityName) {
		await weather.fetchWeather(cityName)
		if (result.cod == 200) {
			document.querySelector('.city-name').innerHTML = `Weather in ${result.name} (${result.sys.country})`
			document.querySelector('.temp').style.display = 'block'
			document.querySelector('.temp').innerHTML = result.main.temp + '°C'

			document.querySelector('.wind-speed').style.display = 'block'
			document.querySelector('.wind-speed span').innerHTML = result.wind.speed + 'km/h'

			document.querySelector('.humidity').style.display = 'block'
			document.querySelector('.humidity span').innerHTML = result.main.humidity + '%'

			document.querySelector('.weather').style.display = 'flex'
			document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
			document.querySelector('.description').innerHTML = capitaliz(result.weather[0].description)
		}
		else {
			let message = capitaliz(result.message)
			document.querySelector('.city-name').innerHTML = message
			document.querySelector('.temp').style.display = 'none'
			document.querySelector('.weather').style.display = 'none'
			document.querySelector('.wind-speed').style.display = 'none'
			document.querySelector('.humidity').style.display = 'none'
		}
		document.querySelector('.weather-info').style.display = 'block'
		// else alert('city not found')
	}
})