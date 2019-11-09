/* eslint-disable quote-props */
// @ts-ignore
const CREDENTIALS = {
  url: 'https://gateway-fra.watsonplatform.net/assistant/api',
  'iam_apikey': process.env.WATSON_API,
};
// @ts-ignore
const WORKSPACE_ID = process.env.WORKSPACE_ID;

module.exports = {
  CREDENTIALS, WORKSPACE_ID
};
