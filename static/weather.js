const container = document.getElementById('container');
const notFound = document.getElementById('not-found');

const loadWeatherApi = (city) => {
    const API_KEY = `79f33bd55b2973175177e2725149b516`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    fetch(url)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch((error) => {
            console.log(error);

            container.classList.remove('hidden');
            notFound.classList.add('hidden');

            container.innerHTML = `
            <div class="flex items-center justify-center pt-5">
            <h1 class="text-2xl bg-gradient-to-l from-bgFirst to-bgSecond text-transparent bg-clip-text bg-transparent font-medium text-center">Not Found. Please Type <br>Valid City Name...</h1>
            </div>
            `;
            // spinner 
            toggleSpinner(false);
        })
}
const displayWeather = (data) => {
    console.log(data);

    // catch error remove 
    notFound.classList.remove('hidden');
    container.classList.add('hidden');

    const weatherTemp = document.getElementById('weather-temp');
    const cityName = document.getElementById('city-name');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    // cloud img 
    const cloudImg = document.getElementById('weather-img');

    if (data.main.temp > 29) {
        cloudImg.innerHTML = `
        <img src="icon/sun.png">
        `;

    } else if (data.main.temp > 17 && data.main.temp <= 29) {
        cloudImg.innerHTML = `
        <img src="icon/cloudy.png">
        `;
    } else {
        cloudImg.innerHTML = `
        <img src="icon/snow.png">
        `;
    }


    const temp = data.main.temp;
    weatherTemp.innerText = `${Math.floor(temp)}°C`;

    cityName.innerText = `${data.name}, ${data.sys.country}`;
    humidity.innerText = `${data.main.humidity}%`;
    windSpeed.innerText = `${data.wind.speed}`;

    // spinner 
    toggleSpinner(false);
}

//loading
const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('spinner');
    if (isLoading) {
        loadingSection.classList.remove('hidden');
    } else {
        loadingSection.classList.add('hidden');
    }
}

// search section 
const search = () => {
    const inputField = document.getElementById('input-field');
    const searchCity = inputField.value;
    loadWeatherApi(searchCity);
    toggleSpinner(true);
}

document.getElementById('input-field').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        search();
    }
})
document.getElementById('search-btn').addEventListener('click', function() {
    search();
})

loadWeatherApi('dhaka');
