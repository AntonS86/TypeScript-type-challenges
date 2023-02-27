/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */
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
type a = GetHead<'12345'>;
//   ^?
type b = GetLast<'12345'>;
//   ^?

type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never

type m = ToNumber<'2'>;
//   ^?

type MinusOne<T extends number> = `${T}` extends infer _T extends string
  ? _T extends keyof MinusMap
    ? MinusMap[_T]
    : ToNumber<
        GetLast<_T> extends '0'
          ? `${GetHead<_T> extends '1' ? '' : MinusOne<GetHead<_T>>}9`
          : `${GetHead<_T>}${MinusMap[GetLast<_T>]}`
      >
  : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
