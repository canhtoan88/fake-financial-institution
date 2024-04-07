export function compareArrays(arr1: any[], arr2: any[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export const isLeafYear = (year: number): boolean => {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};
