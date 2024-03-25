import { PluginAPI } from './pluginAPI';

export default (api: PluginAPI) => {
  ['modifyProps', 'addUIComponent'].forEach(name => {
    api.registerMethod({ name });
  });
};
