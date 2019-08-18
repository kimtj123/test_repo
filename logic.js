// API 관련 상수
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=106e1f81e923f25c140ea3f6b963265a

const apiKey = "&appid=106e1f81e923f25c140ea3f6b963265a";
const apiSource = "https:\/\/api.openweathermap.org/data/2.5/weather?";

// HTML ID,Class 관련 상수
const refresh = document.getElementById('refresh'); // 새로고침 버튼
const middleText = document.getElementById('middleText'); // 25℃

/*
refresh.onclick= function()
{
    fetch(apiSource + "lat=35&lon=139" + apiKey).then(function(response)
        { 
            response.text().then(function(text)
            {
                let jsonToObj = JSON.parse(text);
                let lon = jsonToObj.coord.lon; 
                let lat = jsonToObj.coord.lat;

                console.log(text);
                console.log(jsonToObj);        
                console.log(jsonToObj.coord);        
                console.log(lon);
                console.log(lat);
            })
        })
    
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(JSON.stringify(position));
        });
}
 */

function convertButton()
{
    var buttons = document.getElementsByClassName("degreeButtons");
    
    buttons[0].onclick = function() 
    {           
        buttons[0].style.backgroundColor = "white"
        buttons[1].style.backgroundColor = "#e7e7e7"
    };

    buttons[1].onclick = function() 
    {           
        buttons[0].style.backgroundColor = "#e7e7e7"
        buttons[1].style.backgroundColor = "white"
    };
       
   
}

convertButton();
