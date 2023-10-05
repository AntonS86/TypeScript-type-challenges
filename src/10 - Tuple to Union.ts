/*
  10 - Tuple to Union
  -------
  by Anthony Fu (@antfu) #medium #infer #tuple #union

  ### Question

  Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

  For example

  ```ts
  type Arr = ['1', '2', '3']

  type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
  ```

  > View on GitHub: https://tsch.js.org/10
*/

/* _____________ Your Code Here _____________ */

type TupleToUnion1<T extends unknown[]> = T extends [infer F, ...infer Tail] ? F | TupleToUnion<Tail> : never;

type TupleToUnion2<T extends unknown[]> = T[number];

type TupleToUnion3<T> = T[number & keyof T];

type TupleToUnion4<T> = T[number & symbol & string];

type TupleToUnio5<T> = T[Extract<keyof T, number>];

type TupleToUnion<T> = T extends (infer R)[] ? R : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10/answer
  > View solutions: https://tsch.js.org/10/solutions
  > More Challenges: https://tsch.js.org
*/
