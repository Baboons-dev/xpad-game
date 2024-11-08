
export const clean = (obj: any) => {
  for (let propName in obj) {
    if (
      obj[propName] === '' ||
      obj[propName] === null ||
      obj[propName] === undefined
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

