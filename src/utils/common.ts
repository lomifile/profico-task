export const omit = (object: Record<string, unknown>, keys: string[]) => {
  if (!object) return object;
  const result = { ...object };
  keys.forEach((key) => delete result[key]);
  return result;
};
