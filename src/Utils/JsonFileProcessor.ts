export const importJsonFile = (file: File) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      try{
        resolve(JSON.parse(reader.result as string))
      } catch(err) {
        reject("Parse json error: " + err.toString())
      }
    };
    reader.onerror = function () {
      console.log(reader.error);
      reject(reader.error.toString())
    };
  });
};
