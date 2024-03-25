import React from 'react';
import { Calculator } from './Calculator';
import { pluginOptButton, pluginDispalyValue, pluginModifyProps } from './plugins';

const plugins = [
  { key: 'modifyProps', apply: pluginModifyProps },
  {
    key: 'optButton',
    apply: pluginOptButton,
  },
  // {
  //   key: 'displayValue',
  //   apply: pluginDispalyValue,
  // },
];

export default function App() {
  return (
    <div>
      <div id="show-value"></div>
      <Calculator initalValue={1} plugins={plugins} />
      <div id="inc-button"></div>
    </div>
  );
}
