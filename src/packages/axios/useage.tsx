import React from 'react';
import axios, { AxiosInstance } from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  function (response) {
    console.log('aaa', response);
    return response;
    // return 'aaaaa';
    // return Promise.reject({ description: '故意让aaa失败' });
    // return Promise.reject(new Error('aaaaaa报错了'));
    // return new Error();
  },
  function (error) {
    return Promise.reject(error);
  }
);

const doRetry = async (instance: AxiosInstance, result) => {
  const { retryCount = 0, _alreadyRetryCount = 0 } = result.config;
  const needRetry = retryCount > 0 && retryCount > _alreadyRetryCount;
  if (!needRetry) return result;
  // 给已经重试的次数进行标记
  (result.config as any)._alreadyRetryCount = _alreadyRetryCount + 1;
  return instance(result.config);
};

instance.interceptors.response.use(
  function (response) {
    const { data } = response;
    console.log('retry,success');
    if (data.success === false) {
      return doRetry(instance, response) as any;
    }
    return response;
  },
  function (error: any) {
    console.log('retry,error');
    const result = doRetry(instance, error);
    // 无需重试，抛出错误
    if (result === error) {
      return Promise.reject(error);
    }
    return result;
  }
);
instance.interceptors.response.use(
  function (response) {
    console.log('bbb', response);
    return response;
  },
  function (error) {
    console.log('bbb-error', error);

    return 'bbbb';
    return Promise.resolve('bbbb');
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    console.log('cccc', response);
    return response;
  },
  function (error) {
    console.log('ccc-error', error);

    return Promise.reject(error);
  }
);

export default function Test() {
  return (
    <button
      onClick={() => {
        instance
          .get('/test/success', { retryCount: 1 })
          .then((res) => {
            console.log('rrrrr-sss请求成功的回调', res);
          })
          .catch((error) => {
            console.log('rrrrr-eee请求失败的回调', error);
          });
      }}
    >
      成功
    </button>
  );
}
