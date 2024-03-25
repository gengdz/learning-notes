import { Service } from './service/service';
import { pluginBulid, pluginDev } from './command.plugin';

export const commandDev = () => {
  const service = new Service({
    plugins: [
      { id: 'dev', key: 'dev', apply: pluginDev },
      { id: 'build', key: 'build', apply: pluginBulid },
    ],
  });

  service.run({ name: 'dev' });
};
