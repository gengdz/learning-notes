import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { IApi } from '../../components/PluginSystem/types';

// 展示结果 的插件
export const pluginDispalyValue = (api: IApi) => {
  api.addUIComponent(props => {
    function DisplayValue({ value, setValue }) {
      return <div style={{ padding: 10, background: 'pink' }}>{value}</div>;
    }
    const container = document.getElementById('show-value');
    ReactDOM.render(<DisplayValue {...props} />, container);
  });
};

// 操作按钮 的插件
export const pluginOptButton = (api: IApi) => {
  function OptButton({ setValue }) {
    const [text, setText] = useState(0);
    return (
      <div>
        <section>
          <button
            onClick={() => {
              setValue(v => v * v);
            }}
          >
            平方
          </button>
          <button
            style={{ margin: '0 10px' }}
            onClick={() => {
              setValue(v => Math.sqrt(v));
            }}
          >
            开平方
          </button>
        </section>
        <section>
          <span>这是插件内自己的状态：</span>
          <span>{text}(随机数字)</span>
          <div>
            <button onClick={() => setText(Math.floor(Math.random() * 10))}>
              修改文案
            </button>
          </div>
        </section>
      </div>
    );
  }
  api.addUIComponent(props => {
    const container = document.getElementById('inc-button');
    ReactDOM.render(<OptButton {...props} />, container);
  });
};

// 修改 props 的插件
export const pluginModifyProps = (api: IApi) => {
  console.log('pluginDev----> start');
  api.registerCommand({
    name: 'dev',
    description: 'dev-启动服务',
    fn: () => {
      console.log('服务启动了');
    },
  });
  console.log('pluginDev----> end');
  api.modifyProps(props => {
    return { ...props, name: 'gengdezhou' };
  });
};
