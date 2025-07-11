import { WeightedValue, WeightedPick } from '..';

describe('WeightedPick', () => {
  test('2 values, 50%/50%, 1K times', () => {
    const picker = new WeightedPick([
      new WeightedValue(0, 1),
      new WeightedValue(1, 1),
    ]);

    const n = 1000;
    const values = picker.pickValues(n);

    expect(values).toHaveLength(n); // sanity check
    console.table(Object.fromEntries(histogram(values)));
  });

  test('2 values, 33%/66%, 1K times', () => {
    const picker = new WeightedPick([
      new WeightedValue(0, 1),
      new WeightedValue(1, 2),
    ]);

    const n = 1000;
    const values = picker.pickValues(n);

    expect(values).toHaveLength(n); // sanity check
    console.table(Object.fromEntries(histogram(values)));
  });

  test('5 values, 20%/20%/20%/20%/20%, 1K times', () => {
    const picker = new WeightedPick([
      new WeightedValue(0, 1),
      new WeightedValue(1, 1),
      new WeightedValue(2, 1),
      new WeightedValue(3, 1),
      new WeightedValue(4, 1),
    ]);

    const n = 1000;
    const values = picker.pickValues(n);

    expect(values).toHaveLength(n); // sanity check
    console.table(Object.fromEntries(histogram(values)));
  });

  test('5 values, 10%/10%/30%/25%/25%, 1K times', () => {
    const picker = new WeightedPick([
      new WeightedValue(0, 10),
      new WeightedValue(1, 10),
      new WeightedValue(2, 30),
      new WeightedValue(3, 25),
      new WeightedValue(4, 25),
    ]);

    const n = 1000;
    const values = picker.pickValues(n);

    expect(values).toHaveLength(n); // sanity check
    console.table(Object.fromEntries(histogram(values)));
  });

  test('prod values, 1K times', () => {
    const picker = new WeightedPick([
      new WeightedValue(2, 41),
      new WeightedValue(5, 78),
      new WeightedValue(10, 422),
      new WeightedValue(15, 506),
      new WeightedValue(20, 318),
      new WeightedValue(35, 52),
      new WeightedValue(50, 3),
    ]);

    const n = 1000;
    const values = picker.pickValues(n);

    expect(values).toHaveLength(n); // sanity check
    console.table(Object.fromEntries(histogram(values)));
  });

  test('fails on NaN weight', () => {
    expect(() => new WeightedPick([
      new WeightedValue(2, NaN),
    ])).toThrowError(/NaN weight is not allowed/);
  });

  test.each([
    [null],
    [undefined],
    ['a string'],
    [-1],
    [{}],
    [true],
  ])('fails on non-array weights: %s', () => {
    expect(() => new WeightedPick(null)).toThrowError(/Weights is not an array/);
  });

  test('fails on empty weights', () => {
    expect(() => new WeightedPick([])).toThrowError(/Weights is empty/);
  });
});

function histogram (values) {
  return values.reduce((h, v) => h.set(v, (h.get(v) ?? 0) + 1), new Map());
}
