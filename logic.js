// API 관련 상수
const apiKey = "&appid=106e1f81e923f25c140ea3f6b963265a";
const apiSource = "https:\/\/api.openweathermap.org/data/2.5/weather?";

// HTML ID,Class 관련 상수
const refresh = document.getElementById('img-button'); // 새로고침 버튼
const loc = document.getElementById('location').children[1]; // 현재 위치
const currentTime = document.getElementById('currentTime').children[0]; // 현재 시각
const middleText = document.getElementById('middleText'); // 현재 온도
const secondMiddle = document.getElementById('secondMiddle'); // 최저/최고 온도
const thirdMiddle = document.getElementById('thirdMiddle'); // 날씨 상태
const sunrise = document.getElementsByClassName('footer-time')[0]; // 일출
const sunset = document.getElementsByClassName('footer-time')[1]; // 일몰
const humidity = document.getElementsByClassName('footer-time')[2] // 습도
const wind = document.getElementsByClassName('footer-time')[3] // 바람

var lat, lon, obj;

function getLocation() {

    navigator.geolocation.getCurrentPosition(function(position) {
        
        lat = position.coords.latitude.toFixed(4);
        lon = position.coords.longitude.toFixed(4);
        refresh.onclick();
    });

}

function infoUpdate() {

    let add = apiSource + "lat=" + lat + "&lon=" + lon + apiKey;

    getLocation();
    fetch(add).then(function(response) {
        return response.json();
    }).then(function(json) {
        obj = json;
    });

    if (lat !== undefined) {
        loc.innerHTML = obj.name + ', ' +obj.sys.country;
        currentTime.innerHTML = setTime();
        middleText.innerHTML = (obj.main.temp - 273.15).toFixed(0) + '°C';
        secondMiddle.innerHTML = (obj.main.temp_max - 273.15) + '°C / ' + (obj.main.temp_min - 273.15) + '°C';
        thirdMiddle.innerHTML = obj.weather[0].main;
        sunrise.innerHTML = timeStamp(obj.sys.sunrise);
        sunset.innerHTML = timeStamp(obj.sys.sunset);
        humidity.innerHTML = obj.main.humidity + '%';
        wind.innerHTML = obj.wind.speed + 'm/s';
    };

}

// Unix 시간 변환
function timeStamp(a) {

    let date = new Date(a * 1000);
    let hours = date.getHours();
    let minutes = '' + date.getMinutes();

    if (hours < 12) {
        return hours + ':' + minutes + ' AM';
    } else {
        return (hours - 12) + ':' + minutes + ' PM';
    };

}

function setTime() {

    let d = new Date();
    let a = d.getFullYear() + ' ' + (d.getMonth() + 1) + ' ' + d.getDate();
    let b = '';
    let c = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    if (d.getMinutes() < 10) {
        b = '0' + d.getMinutes();
    } else {
        b = d.getMinutes();
    }

    if (d.getHours() < 12) {
        return c[d.getDay()] + ' ' + a + ' ' + d.getHours() + ':' + b + ' AM';
    } else {
        return c[d.getDay()] + ' ' + a + ' ' + (d.getHours() - 12) + ':' + b + ' PM';
    }

}

function convertButton() {

    var buttons = document.getElementsByClassName("degreeButtons");
    
    buttons[0].onclick = function() {   
        buttons[0].style.backgroundColor = "white"
        buttons[1].style.backgroundColor = "#e7e7e7"
        middleText.innerHTML = (((obj.main.temp - 273.15) * (9/5)) + 32).toFixed(0) + '°F';
        secondMiddle.innerHTML = (((obj.main.temp_max - 273.15) * (9 / 5)) + 32).toFixed(0)  + '°F / ' + (((obj.main.temp_min - 273.15) * (9 / 5)) + 32).toFixed(0) + '°F';
    };

    buttons[1].onclick = function() {           
        buttons[0].style.backgroundColor = "#e7e7e7"
        buttons[1].style.backgroundColor = "white"
        middleText.innerHTML = (obj.main.temp - 273.15).toFixed(0) + '°C';
        secondMiddle.innerHTML = (obj.main.temp_max - 273.15) + '°C / ' + (obj.main.temp_min - 273.15) + '°C';
    };

}

refresh.onclick = infoUpdate;
infoUpdate();
convertButton();

setInterval(function() {
    refresh.onclick();
}, 60000);