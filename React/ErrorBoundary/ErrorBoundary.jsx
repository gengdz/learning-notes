import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: false };

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, info);
  }

  render() {
    const { FallbackComponent, children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return FallbackComponent;
    } else {
      return children;
    }
  }
}