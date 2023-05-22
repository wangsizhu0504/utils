/**
 * T | null
 */
export type Nullable<T> = T | null | undefined

/**
 * Array, or not yet
 */
export type Arrayable<T> = T | Array<T>

/**
 * Function
 */
export type Fn<T = void> = () => T

export type Recordable<T = any> = Record<string, T>

export interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T
}

/**
 * Infers the arguments type of a function
 */
export type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never

export type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

export type DeepMerge<F, S> = MergeInsertions<{
  [K in keyof F | keyof S]: K extends keyof S & keyof F
    ? DeepMerge<F[K], S[K]>
    : K extends keyof S
      ? S[K]
      : K extends keyof F
        ? F[K]
        : never;
}>
