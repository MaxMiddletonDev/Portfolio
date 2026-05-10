window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
};

document.querySelector('.card').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

const options = {
    '.workBtn': '.workMsg',
    '.hobbyBtn': '.hobbyMsg',
    '.originBtn': '.originMsg',
    '.statBtn': '.statMsg'
};

Object.entries(options).forEach(([btnClass, msgClass]) => {
    document.querySelector(btnClass).addEventListener('click', () => {
        document.querySelectorAll('.msg').forEach(m => {
            m.classList.remove('active');
            m.style.display = 'none';
        });
        const targetMsg = document.querySelector(msgClass);
        targetMsg.classList.add('active');
        targetMsg.style.display = 'block';
    });
});

function initEnergyDrinkCounter() {
    const drinkDisplay = document.getElementById('energyDrinkCount');
    const startDate = new Date('2026-05-01'); 
    const currentDate = new Date();
    const timeDiff = currentDate - startDate;
    const msPerCan = 120960000; 

    let count = Math.floor(timeDiff / msPerCan);

    if (count < 0) count = 0;

    drinkDisplay.innerText = count;
}

initEnergyDrinkCounter()

const place = 'Stafford';

async function updateWeather() {
    try {
        const response = await fetch(`/api/weather?city=${place}`);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

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
        console.error(error);
        document.getElementById('desc').innerText = "Weather unavailable";
    }
}

updateWeather();;