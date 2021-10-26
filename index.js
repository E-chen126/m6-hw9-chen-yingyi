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
    timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes + ' ' + ` <span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
},1000)


// OpenWeather API
let loc = document.getElementById('location');
let tempicon = document.getElementById('climate-icon');
const searchInput = document.getElementById('search-input');
const btn = document.getElementById('search-button');
const currentTempEl = document.getElementById('currentTemp')
const climate = document.getElementById('climate')


getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition(success => {
        let lon = success.coords.longitude;
        let lat = success.coords.latitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=9cc9469727b5c56020c99745d38c6fec`)
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



// const btn = document.querySelector('button');
// const inputValue = document.querySelector('input');



// btn.onclick = function (){

//     fetch('api.openweathermap.org/data/2.5/weather?q='+inputValue+'&appid=9cc9469727b5c56020c99745d38c6fec') // make the request
//     .then(res => res.json())
//     .then(data => console.log(data))
//    // .catch(err => alert('Wrong city name!'))
// }