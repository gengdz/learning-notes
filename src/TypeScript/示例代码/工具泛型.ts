namespace Tool {

  type B = Awaited<Promise<Promise<number>>>;

  // type ConstructorParameters<T extends abstract new (...args: any) => any> =
  //   T extends abstract new (...args: infer P) => any ? P : never;

  type T0 = ConstructorParameters<ErrorConstructor>;

  class C {
    x = 0;
    y = 0;
  }

  type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (
    ...args: any
  ) => infer R
    ? R
    : any;

  type T1 = InstanceType<typeof C>;
}

namespace Record {
  interface IPageInfo {
    title: string;
  }

  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, IPageInfo> = {
    home: { title: 'home' },
    about: { title: 'about' },
    contact: { title: 'contact' },
  };

  console.log(nav.home);

  const propObj = <T>(obj: Record<string, T>) => {
    console.log(obj);
  };
  propObj({ name: 'name', age: 18 });

  interface IAnyObj {
    [propName: string]: any;
  }

  function renameKeys<K, T extends IAnyObj>(
    keysMap: Partial<Record<keyof T, string>>,
    obj: T,
  ): Omit<K & T, keyof typeof keysMap> {
    return Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        [`${keysMap[key] || key}`]: obj[key],
      };
    }, {} as any);
  }

  interface IParams {
    code: string;
    name: string;
    other: string;
  }

  interface IResult {
    label: string;
    value: unknown;
  }

  const result = renameKeys<IResult, IParams>(
    { code: 'value', name: 'label' },
    { code: '2222', name: '名称', other: '其他' },
  );
  console.log('result:-----> ', result);

  // type aa = typeof result
  // const aaaa: aa = {
  // }

  const cc = { code: 'value', name: 'label' };
  type typess = Omit<IParams & IResult, keyof typeof cc>;

  // const dataM = { code: 'value', name: 'label' };
  // type Idata =

  function renameKeys2<R extends IAnyObj>(
    keysMap: Record<string, unknown>,
    obj: Record<string, unknown>,
  ): R {
    return Object.keys(obj).reduce((acc, key) => {
      return {
        ...acc,
        [`${keysMap[key] || key}`]: obj[key],
      };
    }, {} as R);
  }

  const result2 = renameKeys2<IResult>(
    { code: 'value', name: 'label' },
    { code: '2222', name: '名称', other: '其他' },
  );

  type rrrr = typeof result2;
}

namespace Exclude {
  type T0 = Exclude<'name' | 'age' | 'sex', 'age' | 'sex'>;
  const a0: T0 = 'name';

  type T1 = Exclude<'a' | 'b' | 'c', 'a'>;
  const a1: T1 = 'b';

  type T2 = Exclude<string | number, 'age' | number>;
  const a2: T2 = '只能是字符串';
}

namespace Extract {
  type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
  const a0: T0 = 'a';
  type T1 = Extract<string | number | (() => void), Function>;
  const a1: T1 = () => {};
}

namespace Nonullable {
  type T0 = NonNullable<string | number | undefined>;
  const a0: T0 = 11;

  type T1 = NonNullable<string[] | null | undefined>;
  const a1: T1 = ['1', '2'];
}

