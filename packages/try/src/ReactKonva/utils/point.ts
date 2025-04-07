export type Point = {
  x: number;
  y: number;
};

/**
 * Converts an array of points to a flat array of numbers.
 *
 * @param points - An array of points, where each point is an object with x and y properties.
 *
 * @returns - A flat array of numbers representing the x and y coordinates of each point.
 *
 * @example
 * ```typescript
 * const points = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
 * const serialized = serializePoints(points);
 * console.log(serialized); // [1, 2, 3, 4]
 * ```
 */
export function serializePoints(points: Point[]): number[] {
  return points.flatMap((point) => [point.x, point.y]);
}

/**
 * Converts a flat array of numbers to an array of points.
 *
 * @param points - A flat array of numbers representing the x and y coordinates of each point.
 *
 * @returns - An array of points, where each point is an object with x and y properties.
 *
 * @example
 * ```typescript
 * const serialized = [1, 2, 3, 4];
 * const points = deserializePoints(serialized);
 * console.log(points); // [{ x: 1, y: 2 }, { x: 3, y: 4 }]
 * ```
 */
export function deserializePoints(points: number[]): Point[] {
  const result: Point[] = [];

  for (let i = 0; i < points.length; i += 2) {
    result.push({ x: points[i], y: points[i + 1] });
  }

  return result;
}
