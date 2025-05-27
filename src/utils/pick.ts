/**
 * Create an object composed of the picked object properties
 */
function pick<T extends object, K extends keyof T>(
  object: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      (obj as Pick<T, K>)[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K>);
}

export default pick;
