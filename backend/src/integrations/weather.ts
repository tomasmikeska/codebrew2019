const axios = require('axios');

module.exports = {
    async getWeatherConditions(date_txt: String, time_txt: String, city: String) {
        try {
            const token = '27137b0fa76c7ef4daa3da3e130cf98f';
            const rslt = (await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},cz&units=metric&mode=json&APPID=${token}`)).data;
            if(rslt.list) {
                return rslt.list.reduce((rsltObj: any, weatherData: any) => {
                    return this.isClosestWeatherData(weatherData, date_txt, time_txt, 3) ? {
                        ...rsltObj,
                        temp: weatherData.main.temp,
                        desc: weatherData.weather[0].description
                    } : rsltObj
                }, {})
            } else {
                return {}
            }
        } catch (exc) {
            console.error(exc)
        }
    },

    isClosestWeatherData(weatherData: any, date_txt: String, time_txt: String, nHoursModel: number) {
        const hour = parseInt(time_txt.split(':')[0])
        const hourReminder = hour % nHoursModel
        const hoursDiff = Math.floor(nHoursModel / 2)
        const rsltHours = hourReminder <= hoursDiff ? hour - hoursDiff : hour + hoursDiff;
        return weatherData.dt_txt === `${date_txt} ${rsltHours}:00:00`
    }
}
