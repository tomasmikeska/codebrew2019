const call = require('./integrations/call'); // call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${'taxi_destination:'} at ${time}`);
const sms = require('./integrations/sms');  // sms.sendSms('+421918068460', 'kokot');
const mail = require('./integrations/calendar'); //mail.sendMailWithCalendarEntry()



module.exports = {
  async processIntent(intentName: any, intent: any, socket: any) {
    console.log('ExtendAction: ', intentName);

    switch(intentName) {
      case "taxi":
        call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${intent.context.taxi_destination} at ${intent.context.time}`);
        break;
      case "reserve-meeting":
        sms.sendSms('+421949674752', `reserved meeting room: ${intent.context.room} at ${intent.context.time}`);
        mail.sendMailWithCalendarEntry();
        break;
      default:
        return;
    }
  },

  isCompletedIntent(intent: any) {
    return intent.context && intent.context.system && intent.context.system.branch_exited;
  }
};
