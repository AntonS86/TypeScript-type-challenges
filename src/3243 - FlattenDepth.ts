/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

//minus one
type MinusMap = {
  '0': -1
  '1': 0
  '2': 1
  '3': 2
  '4': 3
  '5': 4
  '6': 5
  '7': 6
  '8': 7
  '9': 8
}

type _GetHeadAndLast<T extends string, Acc extends string = ''> = T extends `${infer Head}${infer Tail}`
  ? Tail extends ''
    ? [head: Acc, last: Head]
    : _GetHeadAndLast<Tail, `${Acc}${Head}`>
  : never
type GetHead<T extends string> = _GetHeadAndLast<T>[0]
type GetLast<T extends string> = _GetHeadAndLast<T>[1]

type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never


type MinusOne<T extends number> = `${T}` extends infer _T extends string
  ? _T extends keyof MinusMap
    ? MinusMap[_T]
    : ToNumber<
        GetLast<_T> extends '0'
          ? `${GetHead<_T> extends '1' ? '' : MinusOne<GetHead<_T>>}9`
          : `${GetHead<_T>}${MinusMap[GetLast<_T>]}`
      >
  : never
//-------------

type FlattenDepth<T, N extends number = 1> = T extends [infer Head, ...infer Tail] 
  ? [...(Head extends unknown[] 
          ? N extends 0 ? [Head] : FlattenDepth<Head, MinusOne<N>> 
          : [Head])
    , ...FlattenDepth<Tail, N>] 
  : [];

type m = FlattenDepth<[1, 2, [3, 4], [[[5]]]]>;
//   ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
