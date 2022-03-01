const temp_0c = "&#8451;"


async function getForecast(city) {
    var requestInfo = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf7c9d4ddb6544d395301012221701&q=${city}&days=3`);
    return requestInfo;
}
(async function () {
    try {
        var requestInfo = await getForecast("cairo");
        var response = await requestInfo.json();
        if (requestInfo.status == 200) {
            $(".tableContent").slideDown(100);
            firstDay(response);
            nextDay(response, 1, "secondDayWeather");
            nextDay(response, 2, "thirdDayWeather");
        }
    }
    catch {
        printError();
    }
})();

document.querySelector(".search").addEventListener("keyup", function () {
    search(this.value);
})
async function search(value) {
    var requestInfo, response;
    if (value == "") {
        requestInfo = await getForecast("cairo");
        response = await requestInfo.json();
    }
    else {
        requestInfo = await getForecast(value);
        response = await requestInfo.json();
    }
    if (requestInfo.status == 200) {
        $(".tableContent").slideDown(100);
        firstDay(response);
        nextDay(response, 1, "secondDayWeather");
        nextDay(response, 2, "thirdDayWeather");
    }
}


function printError() {
    console.log("connection error");
}
function getDayName(dateString) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var date = new Date(dateString);
    var dayName = days[date.getDay()];
    return dayName;
}
function getDate(dateString) {
    var objDate = new Date(dateString);
    var date = objDate.toLocaleString("en", { day: "numeric" }) + objDate.toLocaleString("en", { month: "long" });
    return date;
}

function firstDay(response) {
    var cityName, day, date, temp_c, text, icon;
    cityName = response.location.name;
    day = getDayName(response.forecast.forecastday[0].date);
    date = getDate(response.forecast.forecastday[0].date);
    temp_c = response.current.temp_c;
    text = response.current.condition.text;
    icon = response.current.condition.icon;
    document.querySelector(".todayWeather .day").innerHTML = day;
    document.querySelector(".todayWeather .date").innerHTML = date;
    document.querySelector(".todayWeather .city").innerHTML = cityName;
    document.querySelector(".todayWeather .deg").innerHTML = temp_c + temp_0c;
    document.querySelector(".todayWeather .iconForecast").src = "http:" + icon;
    document.querySelector(".todayWeather .description").innerHTML = text;
}
function nextDay(response, dayNum, className) {
    var day, maxtemp_c, mintemp_c, text, icon;
    var forecastDay_tem=response.forecast.forecastday[dayNum];
    day = getDayName(forecastDay_tem.date);
    maxtemp_c = forecastDay_tem.day.maxtemp_c;
    mintemp_c = forecastDay_tem.day.mintemp_c;
    icon = forecastDay_tem.day.condition.icon
    text = forecastDay_tem.day.condition.text;
    document.querySelector(`.${className} .day`).innerHTML = day;
    document.querySelector(`.${className} .iconForecast`).src = "http:" + icon;
    document.querySelector(`.${className} .highTemp .deg`).innerHTML = maxtemp_c + temp_0c;
    document.querySelector(`.${className} .lowTemp .deg`).innerHTML = mintemp_c + temp_0c;
    document.querySelector(`.${className} .description`).innerHTML = text;
}