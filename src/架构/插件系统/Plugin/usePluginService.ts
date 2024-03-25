import { useEffect, useMemo } from 'react';
import { Service } from '../plugin-system';

export default function usePluginService({ plugins }) {
  const service = useMemo(() => new Service({ plugins }), [plugins]);

  // 初始化
  useEffect(() => {
    service.run();
  }, [service]);

  return service;
}
