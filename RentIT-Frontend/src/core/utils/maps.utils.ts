export function mapsAreEqual<K, V>(map1: Map<K, V>, map2: Map<K, V>): boolean {
  if (map1.size !== map2.size) {
    return false;
  }

  for (let [key, value] of map1) {
    const testValue = map2.get(key);

    if (testValue === undefined && !map2.has(key)) {
      return false;
    }

    if (value !== testValue) {
      return false;
    }
  }

  return true;
}
