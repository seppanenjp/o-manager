export const randomNumber = (options: { min?: number; max: number }): number =>
  Math.floor(
    Math.random() * (options.max - (options.min || 0)) + (options.min || 0)
  );

export const randomBoolean = (truePercentage: number): boolean =>
  randomNumber({ max: 100 }) <= truePercentage;
