# 利用Hook抽离逻辑

下面是是一个示例

```javascript
import React, { useState, useCallback } from 'react';

export default function useDialog() {
  const [visible, setVisible] = useState(false);
  const openDialog = useCallback(() => setVisible(true), []);
  const closeDialog = useCallback(() => setVisible(false), []);

  return {
    visible,
    setVisible,
    openDialog,
    closeDialog,
  };
};
```

