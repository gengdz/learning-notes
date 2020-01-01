# 利用Hook返回组件
## hook的其中一个功能就是像高阶组件一样，返回一个组件。

下面是是一个示例

```javascript
import React, { useState, useCallback } from 'react';
import { Dialog } from '@alifd/next';

export default function useDialog() {
  const [visible, setVisible] = useState(false);

  const openDialog = useCallback(() => setVisible(true), []);
  const closeDialog = useCallback(() => setVisible(false), []);

  const CustomDialog = ({ children, ...props }) => {
    return (
      <Dialog
        visible={visible}
        onCancel={closeDialog}
        onClose={closeDialog}
        {...props}
      >
        {children}
      </Dialog>
    );
  };

  return {
    visible,
    setVisible,
    openDialog,
    closeDialog,
    CustomDialog,
  };
};
```

