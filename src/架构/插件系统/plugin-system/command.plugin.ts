interface API {
  registerCommand: (commandOpts) => void;
}

export const pluginDev = (api: API) => {
  console.log('pluginDev----> start');
  api.registerCommand({
    name: 'dev',
    description: 'dev-启动服务',
    fn: () => {
      console.log('服务启动了');
    },
  });
  console.log('pluginDev----> end');
};

export const pluginBulid = (api: API) => {
  api.registerCommand({
    name: 'bulid',
    description: 'bulid-构建服务',
    fn: () => {
      console.log('正在构建了');
    },
  });
};
