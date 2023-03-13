# 从 Axios 请求重试 2.0 到 npm 包的调试

## 前言和目标

在上一篇文章：[基于 axios 的请求重试方案](https://ata.alibaba-inc.com/articles/229792?spm=ata.25287382.0.0.17db52fbKNsNNf#EDzhBo6m) 中的最后部分讲到：
> 财鲸基建组有计划对 whale-request 进行重构，可以根据财鲸基建标准，进一步完善代码，从而把这个工具贡献到财鲸基建中去。

如果说上面是声明了一个 Promise，现在到了 Promise.then 的时候了。现在我已经把请求重试和完美的类型提示带到了财鲸请求库 ：`whale-axios`。当然，如果只是把代码从项目中搬到请求库中那么没有任何意义写一篇 ATA！好了，废话到此为止。如果你已经掌握以下内容，那么不建议阅读本文。

1. **Axios 拦截器的用法，借助拦截器实现重试功能**。
2. **TypeScript 的 `declare` 的用法**，以及 `.d.ts` 文件中 `import/export` 的作用。
3. **`npm link` 的用法**，跳过编译过程，即改即生效。

我们把上一篇文章中的实现，称之为 1.0 版本，现在的方案称之为 2.0 版本。



## 使用 Axios 拦截器实现请求重试

该阶段要达成的目标：**用户可以使用下面的方式，实现在接口异常时自动进行请求重试**。

```typescript
  request.get('/api/axios/success', {
    retryCount: 2,
  });
```
在 1.0 版本中是使用**增强 Axios 适配器的方式**的方式实现了请求重试，在 `whale-axios` 库，所有增强的功能都是通过新增拦截器的方式去实现，这样保证了功能点是解耦的，所以重试功能也采用了新增请求重试拦截器的方式进行实现。

有两个知识点，由实践得出，声明如下：
* **知识点 1：每一次接口请求都会走到响应拦截器，无论是正常的接口请求，还是重试导致的接口请求。**
* **知识点 2：增强适配器的方式，只会进入一次适配器。所以在 adapter 内部，需要内部构建循环。**



### 实现思路

整个实现思路是这样的：
1. 如果接口成功不做处理；如果接口失败判断是否配置了 `retryCount` 字段。
2. 如果配置了 `retryCount` 字段，就使用原来的请求配置再次发起请求，直到重试的次数达到了 `retryCount` 次。
    
难点在于：*怎么知道重试的次数达到了 `retryCount` 次* ？
解法：发起重试请求的时候，在原来请求配置的基础上，**增加一个标识字段**：`_alreadyRetryCount` 这样就知道已经重试过的次数了。

按照这个思路写出来的代码，大致如下：
```typescript
  const retryInterceptor: RequestMiddleware = (instance) => {
    instance.interceptors.response.use(
      function (response) {
        const { data } = response;
        if (data.success === false) {
          const { retryCount = 0, _alreadyRetryCount = 0 } = response.config as RequestConfigWithRetry;
          const needRetry = retryCount > 0 && retryCount > _alreadyRetryCount;
          if (!needRetry) return response;
          // 给已经重试的次数进行标记
          (response.config as RequestConfigWithRetry)._alreadyRetryCount = _alreadyRetryCount + 1;
          return instance(response.config);
        }
        return response;
      },
      function (error: AxiosError) {
        return Promise.reject(error);
      },
    );
  };
  
```

此时功能已经实现，撒花！！（开心地喝上一口枸杞养生茶～）




### 逻辑完善和代码优化
写到这里，测试发现：*如果 HTTP 状态码不为 2xx，那么就不能做到失败时重试了*，这不是我们想要的。

查阅官方文档和实践得出 **知识点 3：只要 HTTP 状态码是 2xx，那么就会调用拦截器的第一个函数，除此之外会走到第二个函数。**

所以接下来就是把第一个函数的代码再复制粘贴一遍到第二个函数。

这里有重复的代码，于是尝试把这段重复的代码抽离出来：
```typescript
  const doRetry = (instance: AxiosInstance, result: AxiosResponse | AxiosError) => {
    const { retryCount = 0, _alreadyRetryCount = 0 } = result.config as RequestConfigWithRetry;
    const needRetry = retryCount > 0 && retryCount > _alreadyRetryCount;
    if (!needRetry) return result;
    // 给已经重试的次数进行标记
    (result.config as RequestConfigWithRetry)._alreadyRetryCount = _alreadyRetryCount + 1;
    return instance(result.config);
  };
```
到了这一步，功能真的就完成了，撒花！！（再来上一口枸杞养生茶～）



## 使用 `declare` 完善类型

### 2 个类型提示问题

在测试功能的时候，发现有两个问题需要解决：
1. *用户在进行请求配置时，不会提示存在 `retryCount`*。用户可能根本就不知道有这个功能。
2. *开发人员在开发时，不会提示存在 `retryCount`*。后面的维护者可能会抓狂。
    
在 1.0 版本，为了解决这两个问题，我们使用了类型断言，代码大意如下：
    
```typescript
  interface RequestConfig<D> extends AxiosRequestConfig<D> {
    /**
      * 重试次数
      * @description 在发生错误时进行重试
      * @default 0 不进行重试
      */
    retryCount?: number;
  }
  
  export interface AxiosInstance extends Omit<AxiosInstanceRaw, 'get' | 'post' | 'delete'> {
    <R = unknown, D = unknown>(config: RequestConfig<D>): Promise<AxiosResponse<R>>;
    // ...... 省略更多代码
  }
  
  const axiosInstance = (axios.create() as unknown) as AxiosInstance;
  
  function adapterEnhancer(
    adapter: AxiosAdapter,
    options: RetryAdapterOptions
  ): AxiosAdapter {
      // 下面的代码中 将 config 断言为 RequestConfig 类型
    return async (config: RequestConfig) => {
        // ...... 省略更多代码
    }
  }
```

通过这种方式：
1. 永久性解决了问题 1，但是写起来比较麻烦。
2. 临时解决了问题 2，但是写起来比较麻烦。属于手动挡，想要类型的时候自己手动指定。
    
感觉应该有更好的方式解决这个问题，于是就各种查阅资料终于找到了更好的解决方案：`declare`。



### `declare` 解决问题的方式

以下是 `declare` 解决问题的所有代码：
```typescript
  import * as axios from 'axios';

  declare module 'axios' {
    interface AxiosRequestConfig {
      /**
        * 重试次数
        * @description 在发生错误时进行重试
        * @default 0 不进行重试
        */
      retryCount?: number;
    }
  }
  
  declare const instance: axios.AxiosInstance;
  export default instance;
```
这种方式，可以彻底解决 问题 1 & 问题 2。

`declare` 用在声明文件(后缀名为：`.d.ts`)，用来告诉编译器我保证存在这些声明的这些内容，求你不要报错了。使用 `declare` 声明的类型，不需要导入即可使用。

上述代码用的 `declare module 'axios'`，含义就对 axios 中的类型进行修改，这里需要注意的是：
* **知识点 4：需要先引入原有模块，再使用 `declare module` ，只有导入了才是扩充，不导入就变成了覆盖**。
* **知识点 5：如果在声明文件中使用了 import/export，那么在使用的时候，就需要手动 import 了**。


`declare` 并不是一个新的 TypeScript 功能，但是由于这个属性多用于 npm 包中，较少地用在项目中，所以对它的了解不多。在我们这个场景中有奇效。

到了这一步，类型提示也搞定了，撒花！！（继续来上一口枸杞养生茶～）




## 使用 `npm link` 调试

功能已经开发完成，现在就要把我们新增的功能运用到项目中，看看是否 OK。
有两种做法：
1. 发布 npm 包到线上，在项目中引入新版本的包，测试功能，如果有问题，修复再发新包。
2. 使用 npm 软连接的方式，为我们开发的模块创建一个全局链接，在项目中使用软连接替换 npm 包，进行调试。

作用：用来本地开发和测试需要发布的 npm 包。
好处是：不用发布到 npm 服务器就可以在其他项目中使用。
原理：为开发的模块(待发布的 npm 包)创造一个全局链接（链接会存储在：`{prefix}/lib/node_modules/<package>`），在主项目里链接这个依赖的模块，进行测试。



### 使用步骤

目标：**在 main 项目中，使用 `whale-axios` 项目**。

建立连接
1. 在 `whale-axios` 项目中使用 `npm link`。并复制 `package.json` 文件中 的 name 字段：`"name": "whale-axios"`
2. 在 main 项目中使用 `npm link whale-axios` 链接 
3. 在 main 项目中通过 `import axios from 'whale-axios'` 或者 使用 `const axios = require("whale-axios")`

解除连接
1. 在 main 项目中，使用 `npm unlink whale-axios`
2. 在 whale-axios 项目中，使用 `npm unlink`



### 解决连接报错

如果「建立连接」到第 3 步报错为：`Failed to compile with 1 errors: the dependency was not fond`，说明：在 `whale-axios` 中没有生成可以被使用的文件。通过下面的方式解决：
1. 对 `whale-axios` 进行编译。 使用类似 `npm run compile` 的方式，对项目进行编译。
2. 再次在 main 项目中使用 `npm link whale-axios` 链接。

得到了这一步已经不报错了，可以开心的使用 `npm link` 了。



### 跳过编译流程，加速调试过程

如果你使用上面的方式，会发现在使用的过程中，遇到了一个问题：就是如果你对 `whale-axios` 进行了修改，那么必须进行一次编译才能使改动在 main 项目中生效，怎么解决？
1. 修改项目的入口文件。具体操作为：修改 `package.json` 文件中的入口文件 **main** 为非编译后的文件，通常为 `src/index.ts`。
2. 再次在 main 项目中使用 `npm link whale-axios` 链接。

这次就可以随时修改，随时生效了。

到了这一步，如果你改了 **main** 之后，依然没有生效，头疼！如何解决？
1. 查看 `package.json` 文件中是否有 `browser`。如果有，修改 **browser** 为非编译后的文件，通常为：`src/index.ts`
2. 再次在 main 项目中使用 `npm link whale-axios` 链接。
这次就可以随时修改，随时生效了。

原理是：**知识点6：如果有 browser，那么它的优先级会高于 main。所以需要修改 browser**。

收工，撒花！！（再来上一杯枸杞养生茶～）



## 收获和总结

以上就是本篇文档的所有内容，不知道对你是否有一点帮助或者启发。对我而言还有一些额外的感受：
1. 做点和平时不太一样的工作，可能收获会很大。
2. 多进行代码交流，能给编码带来更多乐趣。

