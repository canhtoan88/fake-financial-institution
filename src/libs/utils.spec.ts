import { compareArrays, isLeafYear } from './utils';

describe('compareArrays', () => {
  it('should return true if two arrays quals', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];
    expect(compareArrays(a, b)).toEqual(true);
  });

  it('should return false if two arrays not equal', () => {
    const a = [1];
    const b = [2];
    expect(compareArrays(a, b)).toEqual(false);
  });
});

describe('compareArrays', () => {
  // ...existing tests...

  it('should return true for a leap year', () => {
    const year = 2020;
    expect(isLeafYear(year)).toEqual(true);
  });

  it('should return false for a non-leap year', () => {
    const year = 2021;
    expect(isLeafYear(year)).toEqual(false);
  });

  it('should return false for a non-leap year', () => {
    const year = 2000;
    expect(isLeafYear(year)).toEqual(true);
  });

  it('should return false for a non-leap year', () => {
    const year = 1900;
    expect(isLeafYear(year)).toEqual(false);
  });
});
