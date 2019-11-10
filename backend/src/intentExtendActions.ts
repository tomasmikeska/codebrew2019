const call = require('./integrations/call'); // call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${'taxi_destination:'} at ${time}`);
const sms = require('./integrations/sms');  // sms.sendSms('+421918068460', 'kokot');

function isCompletedIntent(intent: any) {
  return intent.context && intent.context.system && intent.context.system.branch_exited_reason;
}

module.exports = {
  processIntent(intent: any, socket: any) {
    if ((!intent.intents && !intent.intents.length) || !isCompletedIntent(intent)) {
      return;
    }

    const intentName = intent.intents[0].intent;

    switch(intentName) {
      case "taxi":
        call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${intent.context.taxi_destination} at ${intent.context.time}`);
        break;
      case "aaa":
        break;
      default:
        return;
    }
  }
};
