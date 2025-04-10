export function buildfilter<T = object>(baseUrl: string, options: T) {
  if (!options) return baseUrl;
  const convert = Object.entries(options);
  baseUrl += "?";

  let flag = false;
  while (true) {
    const item = convert.pop();
    if (!item) break;
    if (item[1]) {
      flag = true;
      baseUrl += `${item[0]}=${item[1]}&`;
    }
  }

  return flag ? baseUrl.slice(0, baseUrl.length - 1) : baseUrl;
}
