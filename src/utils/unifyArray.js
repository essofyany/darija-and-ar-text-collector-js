export function unifyArray(arr) {
  // arr is the array with duplications
  const unifiedArray = [
    ...new Map(arr.map((item) => [item.tweetId, item])).values(),
  ];
  return unifiedArray;
}
