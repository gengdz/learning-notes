/**
 * 洗牌算法
 * @param data 
 * @description 先从数组末尾开始，选定最后一个元素，与数组中随机一个位置的元素交换位置
 * 然后往前挪动一个位置，再与数组中的随机一个位置的元素交换位置。
 */
const shuffle = (data: any[]) => {
  return data.reduceRight((acc, cur, index) => {
    console.log('iii', index)
    const point = Math.floor(Math.random() * (index + 1));
    [acc[point], acc[index]] = [data[index], data[point]];
    return acc;
  }, data)

}


// 测试如下
const data = [1, 2, 3, 4, 5, 6];
console.log(shuffle(data))