export const getValueByKey = (key: string) => {
  if (window.localStorage) {
    return window.localStorage.getItem(key);
  }
};

export const saveValue = (key: string, value: string) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, value);
  }
};
