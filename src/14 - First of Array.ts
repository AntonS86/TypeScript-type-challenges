/*
  14 - First of Array
  -------
  by Anthony Fu (@antfu) #easy #array

  ### Question

  Implement a generic `First<T>` that takes an Array `T` and returns its first element's type.

  For example:

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // expected to be 'a'
  type head2 = First<arr2> // expected to be 3
  ```

  > View on GitHub: https://tsch.js.org/14
*/

/* _____________ Your Code Here _____________ */

type First<T extends any[]> = T extends [] ? never : T[0];

type First1<T extends unknown[]> = T['length'] extends 0 ? never : T[0];

type First2<T extends unknown[]> = T extends never[] ? never : T[0];

type First3<T extends unknown[]> = T extends [infer K, ...infer _] ? K : never;

type First4<T extends unknown[]> = T[0] extends T[number] ? T[0] : never;

type First5<T extends unknown[]> = '0' extends keyof T ? T[0] : never;

type First6<T extends unknown[]> = T extends [infer K, ...any[]] ? K : never;

type First7<T extends unknown[]> = T extends [infer K, ...any] ? K : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14/answer
  > View solutions: https://tsch.js.org/14/solutions
  > More Challenges: https://tsch.js.org
*/
