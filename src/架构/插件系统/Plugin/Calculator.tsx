import React, { useEffect, useState } from 'react';
import usePluginService from './usePluginService';

// 核心系统
export function Calculator(props: { plugins: any[]; initalValue: number }) {
  const { plugins, initalValue } = props;
  const service = usePluginService({ plugins });
  const [value, setValue] = useState(initalValue || 0);

  useEffect(() => {
    // 核心模块在合适的时机调用这个 hook
    service.applyPlugins({
      key: 'addUIComponent',
      args: { setValue },
    });
  }, [service]);

  return (
    <div>
      <div style={{ textAlign: 'center', background: 'pink' }}>{value}</div>
      <div>
        <button onClick={() => setValue(v => v + 1)}>增加</button>
        <button
          style={{ margin: '0 10px' }}
          onClick={() => setValue(v => v - 1)}
        >
          减少
        </button>
      </div>
    </div>
  );
}
