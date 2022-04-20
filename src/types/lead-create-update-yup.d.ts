import * as yup from 'yup';

declare module 'yup' {
  interface ObjectSchema<
      TShape extends ObjectShape,
      TContext extends AnyObject = AnyObject,
      TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
      TOut extends Maybe<AssertsShape<TShape>> = AssertsShape<TShape> | Optionals<TIn>,
    > extends yup.BaseSchema<TIn, TContext, TOut> {
    isValidCountry(message: string): ObjectSchema<TShape, TContext, TIn, TOut>
    isValidSelect(array: string[], message: string): ObjectSchema<TShape, TContext, TIn, TOut>
  }
}
