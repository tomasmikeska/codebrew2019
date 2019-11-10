// @ts-ignore
const request = require('request-promise-any');

module.exports = {
  callTaxi(number: any, text: any) {
    request.get({
      url: `http://185.8.166.147:5050/call?phone=${number}&text=${encodeURIComponent(text)}`,
    });
  }
};
