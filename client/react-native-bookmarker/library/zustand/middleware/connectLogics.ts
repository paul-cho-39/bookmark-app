import { StateCreator, StoreApi } from 'zustand';

type ConnectLogicFunction<T> = (
   ...args: any[]
) => (
   set: (state: Partial<T> | ((state: T) => Partial<T>)) => void,
   get: () => T,
   api: StoreApi<T>
) => void;

type MiddlewareActions<T> = {
   [K in keyof T]: T[K] extends ConnectLogicFunction<T> ? T[K] : never;
};

export function connectLogic<T>(
   actions: MiddlewareActions<T>
): (set: StateCreator<T>, get: () => T, api: StoreApi<T>) => T {
   return (set, get, api) =>
      Object.keys(actions).reduce((acc, actionName) => {
         acc[actionName as keyof T] = ((...args: any[]) =>
            (actions[actionName as keyof MiddlewareActions<T>] as ConnectLogicFunction<T>)(
               ...args,
               set,
               get,
               api
            )) as T[keyof T];
         return acc;
      }, {} as T);
}
