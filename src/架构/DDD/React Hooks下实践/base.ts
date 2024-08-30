import { createContext } from "react";

/**
 * 泛型约束，对注入数据的类型推断支持
 *
 * @export
 * @template T
 * @param {(...args: any) => T} useFunc
 * @param {(T | undefined)} [initialData=undefined]
 * @returns
 */
export default function getServiceToken<T>(
  useFunc: (...args: any) => T,
  initialData: T | undefined = undefined
) {
  return createContext(initialData as T);
}



// 监听自定义事件
export default function useCustomEventListener(eventKey: string, cb: (data: any) => any) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    const handler = (e) => {
      cbRef.current(e.detail);
    };

    document.addEventListener(eventKey, handler);
    return () => {
      document.removeEventListener(eventKey, handler);
    };
  }, [eventKey]);
}


// 分发自定义事件
export function dispatchCustomEvent<Data = any>(eventKey: string, data: Data) {
  document.dispatchEvent(new CustomEvent(eventKey, { detail: data }));
}

