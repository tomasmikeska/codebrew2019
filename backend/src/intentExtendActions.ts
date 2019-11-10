const moment = require('moment');

const call = require('./integrations/call'); // call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${'taxi_destination:'} at ${time}`);
const sms = require('./integrations/sms');  // sms.sendSms('+421918068460', 'kokot');
const mail = require('./integrations/calendar'); //mail.sendMailWithCalendarEntry()
const weather = require('./integrations/weather');



module.exports = {
  async processIntent(intentName: any, intent: any, socket: any) {
    console.log('ExtendAction: ', intentName);

    switch (intentName) {
      case "taxi":
        call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${intent.context.taxi_destination} at ${intent.context.time}`);
        break;
      case "reserve-meeting":
        sms.sendSms('+420774532168', `reserved meeting room: ${intent.context.room} at ${intent.context.time}`);
        mail.sendMailWithCalendarEntry();
        break;
      case "weather":
        const weatherData = await weather.getWeatherConditions(intent.context.date, moment().format('hh:mm:ss'), intent.context.location);
        console.log(weatherData);
        if (weatherData && weatherData.temp && weatherData.desc) {
          const message = `The temperature will be around ${Math.floor(weatherData.temp)} degrees and you will see ${weatherData.desc}.`;
          socket.emit('assistant', {
            messages: [{ content: message }]
          })
        } else {
          socket.emit('assistant', {
            messages: [{ content: "Sorry, but weather forecasts for such data are unpredictable. Try fortune teller." }]
          })
        }
        break;
      default:
        return;
    }
  },

  isCompletedIntent(intent: any) {
    return intent.context && intent.context.system && intent.context.system.branch_exited;
  }
};
