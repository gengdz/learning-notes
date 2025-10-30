let syncQueue = null;

export function scheduleSyncCallback(callback) {
  if (!syncQueue) {
    syncQueue = [callback];
  } else {
    syncQueue.push(callback);
  }
}

export function flushSyncCallback() {
  if (!syncQueue) {
    return;
  }

  syncQueue.forEach((callback) => {
    callback();
  });

  syncQueue = null;
}

export function flush(fn) {
  fn();
  flushSyncCallback();
}
