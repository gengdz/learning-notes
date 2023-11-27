/**
 * 洗牌算法
 * @param data 
 * @description 先从数组末尾开始，选定最后一个元素，与数组中随机一个位置的元素交换位置
 * 然后在已经排好的，「除了最后一个元素」 的位置中,随机产生一个位置，让该位置元素与倒数第二个元素进行交换，
 * 依次类推
 */
const shuffle = (data: any[]) => {
  return data.reduceRight((acc, cur, index) => {
    const point = Math.floor(Math.random() * (index + 1));
    // console.log('iii', index, point)
    [acc[point], acc[index]] = [data[index], data[point]];
    return acc;
  }, data)

}


// 测试如下
const data = [1, 2, 3, 4, 5, 6];
console.log(shuffle(data))