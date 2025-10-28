/**
 * Calculate value at quantile position,
 * using [linear interpolation between close ranks](https://en.wikipedia.org/wiki/Percentile#The_linear_interpolation_between_closest_ranks_method)
 */
export function quantile(array: readonly number[], q: number): number {
  const sorted = array.slice().sort((a, b) => a - b);
  if (q < 0 || q > 1) return NaN;
  if (sorted.length < 1) return sorted.at(0) ?? NaN;
  const position = q * (array.length - 1);
  if (Number.isInteger(position)) return sorted.at(position) ?? NaN;

  const from = Math.floor(position);
  const to = Math.ceil(position) + 1;

  return sorted
    .slice(from, to)
    .reduce(
      (accumulator, next, _, { length }) => accumulator + next / length,
      0,
    );
}

const values = [15, 20, 20, 10, 5, 50, 25, 90];

// console.log(values);
console.log(quantile(values, 1 / 4)); // lower quartile
console.log(quantile(values, 1 / 2)); // median
console.log(quantile(values, 3 / 4)); // upper quartile
console.log(values);
