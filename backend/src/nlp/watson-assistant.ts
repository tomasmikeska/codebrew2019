const AssistantV1 = require('watson-developer-cloud/assistant/v1');
// @ts-ignore
const { CREDENTIALS } = require('./config');
const util = require('util');
const extend = require('extend');

const WATSON_API_VERSION = '2018-02-16';
// @ts-ignore
CREDENTIALS.version = WATSON_API_VERSION;


class ExtendedAssistant extends AssistantV1 {
  constructor(credentials: any) {
    super(credentials);
  }


  // neni dokumentovane, muze se menit
  getStatus(params: any, callback: any) {
    let _params = extend({}, params);
    let _callback = (callback) || function () { };

    let path = {
      workspace_id: _params.workspace_id
    };
    let parameters = {
      options: {
        url: '/v1/workspaces/{workspace_id}/status',
        method: 'GET',
        json: true,
        path: path,
      },
      defaultOptions: extend(true, {}, this._options, {
        headers: extend(true, {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, _params.headers),
      }),
    };
    return this.createRequest(parameters, _callback);
  }
}

const extendAssistant = new ExtendedAssistant(CREDENTIALS);

function promisify(fn: any) {
  return util.promisify(fn).bind(extendAssistant);
}

module.exports = {
  message: promisify(extendAssistant.message),
  createIntent: promisify(extendAssistant.createIntent),
  updateIntent: promisify(extendAssistant.updateIntent),
  deleteIntent: promisify(extendAssistant.deleteIntent),
  createExample: promisify(extendAssistant.createExample),
  listIntents: promisify(extendAssistant.listIntents),
  getIntent: promisify(extendAssistant.getIntent),
  createEntity: promisify(extendAssistant.createEntity),
  updateEntity: promisify(extendAssistant.updateEntity),
  deleteEntity: promisify(extendAssistant.deleteEntity),
  listEntities: promisify(extendAssistant.listEntities),
  getStatus: promisify(extendAssistant.getStatus),
  listLogs: promisify(extendAssistant.listLogs),
};
