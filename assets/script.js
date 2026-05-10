window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
};

const apiKey = typeof token !== 'undefined' ? token.API_TOKEN : 'apiKey';
const place = 'Stafford';

async function updateWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main.toLowerCase();

        document.getElementById('temp').innerText = `${temp}°C`;
        document.getElementById('desc').innerText = data.weather[0].description;

        const gifElement = document.getElementById('weatherMe');

        if (condition.includes('rain')) {
            gifElement.src = 'assets/animations/merain.gif'; 
        } else if (condition.includes('clear')) {
            gifElement.src = 'assets/images/motorbikeme.png'; 
        } else if (condition.includes('cloud')) {
            gifElement.src = 'assets/images/cloudyme.png';
        } else if (condition.includes('sunny')) {
            gifElement.src = 'assets/images/motorbikeme.png'; 
        }
    } catch (error) {
        console.error("Weather failed to load", error);
    }
}

updateWeather();