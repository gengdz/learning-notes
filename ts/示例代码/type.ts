import { consoleLog } from './index'

// 字符串字面量类型
type FamilyName = '耿德洲' | 'name1' | 'name2';
const doTask = (taskName: string, peopleName: FamilyName) => `*${peopleName}* 在执行 \`${taskName}\` 的任务`
consoleLog(doTask('背诵岳阳楼记', '耿德洲'));
// consoleLog('doTask', doTask('背诵岳阳楼记', 'other')); // 这就就会报错了


// 元组
const gdz: [string, number, number] = ['耿德洲', 25, 170];
consoleLog(gdz[0], gdz[1], gdz[2]);
gdz.push('前端工作者');
// gdz.push(false); // 这样会报错
consoleLog(gdz)