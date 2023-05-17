//we need a variable to store the api url
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let url_pt1 = 'https://api.openweathermap.org/data/2.5/weather?q=';
let url_pt2 = 'https://api.openweathermap.org/data/2.5/forecast?q=';


let city = 'stockton';
let apikey = '&appid=0ecacdbe014a09213b277cfc3556b115';
let units = '&units=imperial';
let degSymbol = `&deg;F`;

//get all of our id's and and set them to a variable
let place = document.getElementById('place');
let temp = document.getElementById('temp');
let temp_min = document.getElementById('temp_min');
let temp_max= document.getElementById('temp_max');
let feels_like = document.getElementById('feels_like');
let speed = document.getElementById('speed');
let deg = document.getElementById('deg');
let search = document.getElementById('search');
let btn = document.getElementById('btn');
let favBtn = document.getElementById('favBtn');
let delBtn = document.getElementById('delBtn');
let injectFav = document.getElementById('inject');
let favArr = [];
let weatherArr = [];
let searchedCity = '';

let favData = JSON.parse(localStorage.getItem('favWeather'));

if(favData && favData != null){
    favArr = favData;

    for(let i = 0; i< favData.length; i++){
        if(i === 0){
            fetchWeather(favData[i].url);
        let colDiv = document.createElement('div');
            colDiv.classList = 'col';
        let pTag = document.createElement('p');
            pTag.innerText = favData[i].name;
        pTag.addEventListener('click', e => {
            fetchWeather(favData[i].url);
        })
    
        colDiv.appendChild(pTag);
        injectFav.appendChild(colDiv);
        }
        else{
        let colDiv = document.createElement('div');
            colDiv.classList = 'col';
        let pTag = document.createElement('p');
            pTag.innerText = favData[i].name;
        pTag.addEventListener('click', e => {
            fetchWeather(favData[i].url);
        })
    
        colDiv.appendChild(pTag);
        injectFav.appendChild(colDiv);
        }
    }
}

//fav button event listener

btn.addEventListener('click', e => {
    fetchWeather(`${url_pt1}${search.value}${apikey}${units}`);
    fetchWeather2(`${url_pt2}${search.value}${apikey}${units}`);
    
    searchedCity = search.value;
});

search.addEventListener('keypress', e => {
    if(e.key == 'Ender'){
        fetchWeather(`${url_pt1}${search.value}${apikey}${units}`);
        fetchWeather2(`${url_pt2}${search.value}${apikey}${units}`);

        place.innerText = search.value;
        searchedCity = search.value;
    }
})

delBtn.addEventListener('click', e=>{
    for(let i = 0; i< favArr.length; i++){
        if(place.innerText.toLowerCase() === favArr[i].name.toLowerCase()){
            favArr.splice(i,1);
            let colDiv = injectFav.getElementsByClassName('col')[i];
            injectFav.removeChild(colDiv);

        }
    }
    localStorage.setItem('favWeather',JSON.stringify(favArr));
})




favBtn.addEventListener('click', e => {
    let obj = {
        name: weatherArr[weatherArr.length - 1].name,
        url: `${url_pt1}${searchedCity}${apikey}${units}`
    }
    favArr.push(obj);
    let colDiv = document.createElement('div');
        colDiv.classList = 'col';
    let pTag = document.createElement('p');
        pTag.innerText = search.value;
    pTag.addEventListener('click', e => {
        fetchWeather(obj.url);
    })

    colDiv.appendChild(pTag);
    injectFav.appendChild(colDiv);
    
localStorage.setItem('favWeather',JSON.stringify(favArr));

});

//create fetch function to get weather data from openweather api fetchWeather

function fetchWeather(url){
    fetch(url)
        .then(
            response => response.json()
        )
        .then(data => {
            
            getWeather(data);

        })
}
function fetchWeather2(url){
    fetch(url)
        .then(
            response => response.json()
        )
        .then(data => {
            
            getWeather(data);

        })
}

// fetchWeather(url_pt1+city+apikey+units)
fetchWeather(`${url_pt1}${city}${apikey}${units}`)
fetchWeather2(`${url_pt2}${city}${apikey}${units}`)

//create function ot get weather data getWeather

function getWeather(weatherData){
    weatherArr = [];
    weatherArr.push(weatherData);
    // console.log(weatherData)
    let main = weatherData.main;
    place.innerText = weatherData.name;
    temp.innerHTML = `${parseInt(main.temp)}${degSymbol}`;
    temp_min.innerText = parseInt(main.temp_min);
    temp_max.innerText = parseInt(main.temp_max);
    speed.innerText = parseInt(weatherData.wind.speed);
    deg.innerText = parseInt(weatherData.wind.deg);
    search.value;


    weatherArr1 = [];
    weatherArr1.push(weatherData);
    let listM = weatherData.list.main;
    temp1.innerHTML = `${parseInt(list.main.temp)}${degSymbol}`;
}
