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

var lat;
var lon;
var obj;

/* console.log(를)  각 함수에 찍어서 실행순서 확인
 * geolocation이 <infoUpdate() -> 따로 독립시켜 함수화했습니다.>   보다 늦게 실행되서 위도 경도를 받지 못한 채 함수실행 -> 에러 400 발생
 * gelocation을 함수화해서 infoupdate 내에서 실행하면 info보다 먼저 실행되서 변수값(lat,lon)이 정상적으로 할당됨
 */



function getLocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log('geoLocation');
        lat = position.coords.latitude.toFixed(4);
        lon = position.coords.longitude.toFixed(4);
        refresh.onclick();
    });
}

function timeStamp(a) {
    console.log('timeStamp');
    let date = new Date(a * 1000);
    let hours = date.getHours();
    let minutes = '' + date.getMinutes();

    if (hours < 12) {
        return hours + ':' + minutes + ' AM';
    } else {
        return (hours - 12) + ':' + minutes + ' PM';
    };
}

function infoUpdate() 
{ 
    console.log('infoUpdate')
    let add = apiSource + "lat=" + lat + "&lon=" + lon + apiKey;

    getLocation();
    fetch(add).then(function(response) {
        return response.json();
    }).then(function(json) {
        obj = json;
    });

    if (lat !== undefined) {
        loc.innerHTML = obj.name + ', ' +obj.sys.country;
        currentTime.innerHTML = new Date();
        middleText.innerHTML = (obj.main.temp - 273.15).toFixed(0) + '°C';
        secondMiddle.innerHTML = (obj.main.temp_max - 273.15) + '°C / ' + (obj.main.temp_min - 273.15) + '°C';
        thirdMiddle.innerHTML = obj.weather[0].main;
        sunrise.innerHTML = timeStamp(obj.sys.sunrise);
        sunset.innerHTML = timeStamp(obj.sys.sunset);
        humidity.innerHTML = obj.main.humidity + '%';
        wind.innerHTML = obj.wind.speed + 'm/s';
    };

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

console.log(lat)
console.log(lon)
infoUpdate();
convertButton();

/*
    setInterval(function()
    {
        refresh.onclick();
    }, 600000);
*/