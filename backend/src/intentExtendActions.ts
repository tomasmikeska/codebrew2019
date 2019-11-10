const call = require('./integrations/call'); // call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${'taxi_destination:'} at ${time}`);
const sms = require('./integrations/sms');  // sms.sendSms('+421918068460', 'kokot');



module.exports = {
  async processIntent(intentName: any, intent: any, socket: any) {
    console.log('ExtendAction: ', intentName);

    switch(intentName) {
      case "taxi":
        call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${intent.context.taxi_destination} at ${intent.context.time}`);
        break;
      case "aaa":
        break;
      default:
        return;
    }
  },

  isCompletedIntent(intent: any) {
    return intent.context && intent.context.system && intent.context.system.branch_exited;
  }
};
