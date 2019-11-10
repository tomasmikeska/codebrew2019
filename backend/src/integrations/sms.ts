const request = require('request-promise-any');

module.exports = {
  async smsSend(number: any, text: any) {
    const response = await request.post({
      url: 'https://app.gosms.cz/oauth/v2/token',
      form: {
        client_id: process.env.GOSMS_CLIENT_ID,
        client_secret: process.env.GOSMS_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    });

    const accessToken = JSON.parse(response).access_token;

    await request.post({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: 'https://app.gosms.cz/api/v1/messages', // odeber test pro produkci
      body: {
        // message: 'Ahoj! Tady Artin Chatbot, mrkni na https://artin.cz, co vsechno delame! A nezapomen, hledame studenty presne jako jsi ty, neboj se k nam pridat.',
        message: text,
        recipients: [number],
        channel: 244920,
        expectedSendStart: 'now',
      },
      json: true,
    });
  }
}
