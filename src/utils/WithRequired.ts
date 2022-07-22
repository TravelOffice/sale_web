export type WithRequired<T, K extends (keyof T | never)> = [K] extends [never] ? T : (
  T & { [P in K]-?: T[P] });
