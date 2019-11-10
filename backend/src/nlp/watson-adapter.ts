const _ = require('lodash');

const assistant = require('./watson-assistant');
// @ts-ignore
const {WORKSPACE_ID} = require('./config');


module.exports = {
  async getMessage(message: any) {
    const result = await assistant.message({
      workspace_id: WORKSPACE_ID,
      input: {
        text: message
      },
    });

    return result;
  },

  async getMessageWithContext(message: any, context: any) {
    const result = await assistant.message({
      workspace_id: WORKSPACE_ID,
      input: {
        text: message
      },
      context
    });

    console.log(result);

    return result;
  },

  async getStatus() {
    let parameters = {
      workspace_id: WORKSPACE_ID,
    };


    return await assistant.getStatus(parameters);
  },

};
