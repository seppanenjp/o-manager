export const randomNumber = (options: { min?: number; max: number }): number =>
  Math.floor(
    Math.random() *
      (options.max > 100
        ? 100
        : options.max - (options.min && options.min > 0 ? options.min : 0)) +
      (options.min && options.min > 0 ? options.min : 0)
  );

export const randomBoolean = (truePercentage: number): boolean =>
  randomNumber({ max: 100 }) <= truePercentage;
