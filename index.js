//current time
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const days = ['Sunday','Monday','Tuesday','Wensday','Thursday','Friday','Staturday'];
const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour //remianing
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'
    timeEl.innerHTML = ( hoursIn12HrFormat<10? '0'+hoursIn12HrFormat:hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes:minutes) + ' ' + ` <span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
},1000)



// OpenWeather API
let loc = document.getElementById('location');
let tempicon = document.getElementById('climate-icon');

const climate = document.getElementById('climate')
const currentTempEl = document.getElementById('currentTemp')

const input = document.getElementById('search-input');


let weather = {
    fetchWeather : function(city){
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ebb02a9fb5d812209ec10210d659765c")
        .then((response)=> response.json())
        .then((data)=>this.displayWeather(data));
        
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon,description} = data.weather[0];
        const {temp,feels_like}=data.main;
        console.log(name,icon,description,temp,feels_like);
        loc.textContent = name;
        currentTempEl.innerHTML = 
        `<div class="weather-item">
        <div>Current: ${temp} <span>&#8457;</span></div>
        </div>
        <div class="weather-item">
        <div>Feels like: ${feels_like} <span>&#8457;</span></div>
        </div>`;
        climate.innerHTML = 
        `<img src="icons/${icon}.png">
        <p>${description}</p>
        `
    },
};

const btn = document.querySelector('button')
btn.onclick = function() {
    //console.log('clicked');
    weather.fetchWeather(input.value);
};

input.addEventListener('keyup',function(event){
    if(event.key == "Enter"){
        weather.fetchWeather(input.value);
    }
})



// Current Location by longitude and latitude
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition(success => {
        let lon = success.coords.longitude;
        let lat = success.coords.latitude;
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=9cc9469727b5c56020c99745d38c6fec`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showWeatherData(data);
        })
})
}

function showWeatherData(res){
    let {temp,feels_like}=res.main;
    let {description,icon}=res.weather[0];
    let {name}=res;

    loc.textContent = name;
    
    currentTempEl.innerHTML = 
    `<div class="weather-item">
    <div>Current: ${temp} <span>&#8457;</span></div>
    
    </div>
    <div class="weather-item">
    <div>Feels like: ${feels_like} <span>&#8457;</span></div>
    </div>`

    climate.innerHTML =
    `<img src="icons/${icon}.png">
    <p>${description}</p> `
}
