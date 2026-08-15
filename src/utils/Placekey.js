export function getItemKey(item, index) {
  return item.isExtra ? item.id : `orig_${index}`;
}