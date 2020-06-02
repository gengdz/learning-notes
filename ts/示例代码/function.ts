import { StringOrNumber, consoleLog } from './index';

// 接口定义对象的形状
interface IOption {
  label: string;
  value: StringOrNumber;
  [propsName: string]: StringOrNumber;
}

// 定义一个数组
const dictionaryList: IOption[] = [
  { label: '阿里巴巴', value: 'ali' },
  { label: '今日头条', value: 'v', description: 'news' }
];

// 函数表达式 不存在变量提升。
const getAli = (list: IOption[]) => list.filter(item => item.value === 'ali');
const getAli2: (list: IOption[]) => IOption[] = (list: IOption[]) => list.filter(item => item.value === 'ali');

consoleLog(getAli(dictionaryList));
consoleLog('getAli完整的类型', getAli2(dictionaryList));

// 可选参数
const getItem = (list: IOption[], targetValue?: string) => list.filter(item => item.value === (targetValue || 'ali'))
consoleLog('无可选参数，打印阿里:', getItem(dictionaryList))
consoleLog('存在可选参数，打印相应的值:', getItem(dictionaryList, 'v'))

// 参数默认值
const getItemWithDefault = (list: IOption[], targetValue = 'ali') => list.filter(item => item.value === targetValue)
consoleLog('使用参数默认值:', getItemWithDefault(dictionaryList))
consoleLog('不使用默认值:', getItemWithDefault(dictionaryList, 'v'))


export { getAli };
