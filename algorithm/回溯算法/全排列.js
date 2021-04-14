
function permute(nums) {
  const result = [];

  function backtrack(nums, track) {
    if (track.length === nums.length) {
      result.push([...track]);
      return;
    }
    for (let num of nums) {
      if (track.includes(num)) continue;
      track.push(num);
      backtrack(nums, track);
      track.pop();
    }
  }
  backtrack(nums, []);

  return result;
}


console.log(permute([1, 2, 3]))
