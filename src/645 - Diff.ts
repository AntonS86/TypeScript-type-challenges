/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff1<O, O1> = {
  [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : (O & O1)[P];
}

type Diff<O, O1> = {
  [P in (keyof O) | (keyof O1) as Exclude<P, (keyof O) & (keyof O1)>]: (O & O1)[P];
}

type Test<A, B> = {
  [P in keyof (A | B)]: (A & B)[P];
}

type A = {
  a: string;
  b: string;
  c: string;
}

type B = {
  c: string;
  d: string;
  e: string;
}

const t: A | B = {
  a: '',
  b: '',
  c: '',
}

type n = (keyof A) | (keyof B);
//   ^?

type n1 = (keyof A) & (keyof B);
//   ^?

type n2 = keyof (A | B);
//   ^?

type n3 = keyof (A & B);
//   ^?

type l = Test<A, B>;
//   ^?



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
