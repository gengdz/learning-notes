import { createContext } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { Message } from 'antd';
import { COMMON_MESSAGE_TEXT } from '@/constants';

/**
 *  * -> Boolean
 * 判断是否是空或者 null 或者 undefined
 */
export const isEmptyOrNil = R.anyPass([R.isEmpty, R.isNil]);

// * -> Boolean
export const isNotEmptyAndNil = R.complement(isEmptyOrNil);

/**
 * 判断两个数组是否是值相等的
 *
 * [a] -> [a] -> Boolean
 */
export const equalsArray = R.compose<unknown[], unknown[], unknown[], boolean>(
  isEmptyOrNil,
  R.difference
);

// String -> Moment -> String
export const dateTimeFormat = R.curry((format, date) =>
  R.ifElse(
    isNotEmptyAndNil,
    date => moment(date).format(format),
    R.always('')
  )(date)
);

// Moment -> String  (YYYY-MM-DD)
export const ymdFormat = dateTimeFormat('YYYY-MM-DD');

// Moment -> String  (YYYY-MM-DD HH:mm:ss)
export const ymdhmsFormat = dateTimeFormat('YYYY-MM-DD HH:mm:ss');

// { o: n } -> { k: v } -> { n: v }
export const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);

// [a] -> { o: n } -> [a]
export const renameKeysList: any = R.useWith(R.map, [
  renameKeys,
  R.defaultTo([]),
]);

// [] -> []
export const omitEmptyList = R.filter(isNotEmptyAndNil);

// {a} -> {a}
export function omitEmptyAndNil(data) {
  return R.compose(
    R.map(R.when(R.compose(R.equals('Object'), R.type), omitEmptyAndNil)),
    R.pickBy(isNotEmptyAndNil)
  )(data);
}

// [] -> []
export const omitEmptyAndNilPropsList = R.map(omitEmptyAndNil);

// String -> a -> [b] -> b
export const findByProp = R.curry((prop, value, list) =>
  R.pipe(R.defaultTo([]), R.find(R.propEq(prop, value)))(list)
);

//  a -> [b] -> b
export const findByValue = findByProp('value');

// [k,v] -> [{k:v}] -> String  -> v
export const getValueFromList = R.curry(([keyProp, valueProp], list, key) =>
  R.pipe(
    R.defaultTo([]),
    R.find(R.compose(R.propEq(keyProp, key), R.defaultTo({}))),
    R.defaultTo({}),
    R.propOr('', valueProp)
  )(list)
);

// ['value', 'label'] -> String -> [{ value: label }] -> label
export const getLabelByValueFromList = getValueFromList(['value', 'label']);

// ['value', 'label'] -> String -> [{ value: label }] -> value
export const getValueByLabelFromList = getValueFromList(['label', 'value']);

// a -> (b -> b | a)
export const withDefaultText = defaultText =>
  R.when(isEmptyOrNil, R.always(defaultText));

// { allFiles: value } -> Boolean
export const validateUploadRequired = R.compose(
  R.gt(R.__, 0),
  R.length,
  R.propOr([], 'allFiles')
);

// ((a, a) -> Boolean) -> [a] -> [a] -> Boolean
export const includesListWith = R.converge(R.equals, [
  R.compose(R.length, R.innerJoin),
  R.compose(R.length, R.nthArg(-1)),
]);

// [k] -> (((x1, x2) → Boolean) → [(a → x1), (b → x2)] → (a → b))
export const eqByPropsList = propsList =>
  R.useWith(R.equals, [R.pick(propsList), R.pick(propsList)]);

// {k: v} -> {k: v} -> Boolean
export const allPropsLte = R.curry((smallObj, largeObj) =>
  R.pipe(
    R.toPairs,
    R.find(([key, value]) => value > largeObj[key]),
    R.isNil
  )(smallObj)
);

// a -> Boolean
export const predPositive = R.includes(R.__, [true, '1']);

// a -> [a] -> [a]
export const appendOrReject = R.ifElse(
  R.includes,
  (value, list) => R.reject(item => item === value, list),
  R.append
);

export const { success, error } = Message;
export const operateSuccess = () => success(COMMON_MESSAGE_TEXT.SUCCESS);
export const saveSuccess = () => success(COMMON_MESSAGE_TEXT.SAVE_SUCCESS);
export const submitSuccess = () => success(COMMON_MESSAGE_TEXT.SUBMIT_SUCCESS);

// 打印
export const consoleLog = console.log;

export const getServiceToken = <T>(
  useFunc: (...args: any) => T,
  initialData: T | undefined = undefined
) => createContext(initialData as T);

export function getUrlParams(urlStr, paramName) {
  const url = new URL(urlStr);

  return url.searchParams.get(paramName);
}


