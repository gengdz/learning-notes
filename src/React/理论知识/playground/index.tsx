import { Fiber, NoLane, LegacyRoot } from './constants';
import { createHostRootFiber } from './fiber';
import listenToAllEvents from './listenToAllEvents';
import React from './react';
import renderSync from './render-sync';

const element = (
  <div title="title">
    <h1>i am h1</h1>
  </div>
);

function App() {
  return <div style={{ color: 'green' }}>i am function component</div>;
}

class ClassApp extends React.Component {
  state: { a: number };
  constructor(props) {
    super(props);
    this.state = {
      a: 1,
    };
  }
  render() {
    return (
      <div
        style={{ color: 'blue' }}
        onClick={() => {
          this.setState({ a: 2 });
          this.setState({ a: 3 });
          this.setState({ a: 4 });
        }}
      >
        i am class component
        {this.state.a}
      </div>
    );
  }
}

const root = {
  container: document.getElementById('root'),
  current: null as unknown as Fiber,
  pendingLane: NoLane, // 记录所有变更的优先级
  callbackPriority: NoLane, // 记录已有的待渲染任务的优先级
};

listenToAllEvents(root.container);

const hostRootFiber = createHostRootFiber(LegacyRoot, true);
root.current = hostRootFiber;
hostRootFiber.stateNode = root;

renderSync(root, <ClassApp />);
// renderSync(root, <App />);
