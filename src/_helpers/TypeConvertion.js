export function convertPositiveInteger(val = "", oldValue) {
  if (isNaN(val)) {
    return oldValue;
  }
  
  const value = +(val);
  if (!Number.isInteger(value) || value < 0) {
    return oldValue;
  }

  return value;
}
