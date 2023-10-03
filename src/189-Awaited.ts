/*
  189 - Awaited
  -------
  by Maciej Sikora (@maciejsikora) #easy #promise #built-in

  ### Question

  If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

  For example: if we have `Promise<ExampleType>` how to get ExampleType?

  ```ts
  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
  ```

  > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

  > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

type MyAwaited1<T extends (Promise<any> | { then: (onfulfilled: (arg: any) => any) => any })> = T extends Promise<infer M> 
  ? M extends Promise<any> 
    ? MyAwaited1<M> 
    : M
  : T extends  { then: (onfulfilled: (arg: infer D) => any) => any } ? D : never;


type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer M> ? M extends PromiseLike<any> ? MyAwaited<M> : M : never;

type MyAwaited1<T extends {then(onfulfiled: any): any}> = T extends null | undefined ? T :
T extends object & {then(onfulfilled: infer R): any} 
  ? R extends (value: infer M) => unknown
    ? M extends Promise<any> ? MyAwaited<M> : M
    : never 
  : never;

// не рабочий в одном тесте
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U> ? U extends Promise<unknown> ? MyAwaited<U> : U : T;



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
