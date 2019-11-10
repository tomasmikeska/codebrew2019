// @ts-ignore
const request = require('request-promise-any');

module.exports = {
  callTaxi(number: any) {
    request.get({
      url: `http://185.8.166.147:5050/call?phone=${number}&text=Hi,%20we%20would%20like%20to%20order%20taxi%20service%20from%20our%20HQ%20to%20main%20train%20station`,
    });
  }
};
