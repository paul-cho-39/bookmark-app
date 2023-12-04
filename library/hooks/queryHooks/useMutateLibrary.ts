import { QueryClient, UseMutateFunction, useMutation } from '@tanstack/react-query';
import { Library } from '../../@types/googleBooks';
import { checkBookInLibrary } from '../../helper';
import { postFetch, queryKeys } from '../../helper/react-query';

// should refactor this and store this in another file for cleaner look?
type InitialData = { data: Library };
type Param = keyof Library | 'remove';
type Status = 'error' | 'idle' | 'loading' | 'success';
type MutationFuncVoid = UseMutateFunction<any, unknown, void, unknown>;
type MutationFuncObject = UseMutateFunction<
   any,
   unknown,
   Record<string, unknown> | undefined,
   unknown
>;

interface MutationLibraryReturnType<MutateType extends MutationFuncVoid | MutationFuncObject> {
   mutate: MutateType;
   status: Status;
}

// TESTING: should wrok as intended
export default function useMutateLibraries(
   uid: string,
   id: string,
   setHasMutate: (newState: true) => void,
   queryClient: QueryClient
) {
   const getUrl = (param: Param, optionalParam?: string | undefined) => {
      const params = !optionalParam ? param : param + '/' + optionalParam;
      return `/library/authenticate/${uid}/${id}/${params}`;
   };
   const getMutations = (type: Param, option?: string) => {
      if (type === 'reading' || (option && option === 'include-page')) {
         return useMutateLibraryWithBody(getUrl(type, option), id, uid, queryClient);
      }
      return useMutateLibrary(
         getUrl(type, option),
         uid as string,
         id,
         setHasMutate,
         queryClient,
         type
      );
   };
   const mutationStore = {
      addToCurrent: getMutations('reading') as MutationLibraryReturnType<MutationFuncObject>,
      addToCurrentWithPage: getMutations(
         'reading',
         'include-page'
      ) as MutationLibraryReturnType<MutationFuncObject>,
      addToWant: getMutations('want') as MutationLibraryReturnType<MutationFuncVoid>,
      addToFinished: getMutations('finished') as MutationLibraryReturnType<MutationFuncVoid>,
      addToReReading: getMutations(
         'finished',
         'rereading'
      ) as MutationLibraryReturnType<MutationFuncVoid>,
      removeBook: getMutations('remove') as MutationLibraryReturnType<MutationFuncVoid>,
   };

   return mutationStore;
}

export function useMutateLibrary(
   url: string,
   uid: string,
   id: string,
   setHasMutate: (newState: true) => void,
   queryClient: QueryClient,
   key: Param
) {
   const { mutate, status } = useMutation(queryKeys.userLibrary(uid), () => postFetch(url), {
      onMutate: async () => {
         await queryClient.cancelQueries({ queryKey: queryKeys.userLibrary(uid as string) });

         const initialData = queryClient.getQueryData<InitialData | undefined>(
            queryKeys.userLibrary(uid as string)
         );
         console.log('there is no initial data', initialData);
         const optimisticData = optimisticUpdater(initialData as InitialData, id, key);
         queryClient.setQueryData(queryKeys.userLibrary(uid as string), optimisticData);

         return { initialData };
      },
      onError: (err, context) => {
         queryClient.setQueryData(queryKeys.userLibrary(uid as string), context);
         console.log('Error has occured while mutating:', err);
      },
      onSuccess: () => {
         setHasMutate(true);
      },
      onSettled: () => {
         queryClient.invalidateQueries(queryKeys.userLibrary(uid));
      },
   });

   return { mutate, status };
}

export function useMutateLibraryWithBody(
   url: string,
   id: string,
   uid: string,
   // key: Param,
   // setHasMutate: (newState: true) => void,
   queryClient: QueryClient
) {
   const { mutate, status } = useMutation(
      queryKeys.userLibrary(uid),
      (body: Record<string, unknown> | undefined) => postFetch(url, body),
      {
         onMutate: async (body) => {
            const initialData = queryClient.getQueryData<InitialData>(
               queryKeys.userLibrary(uid as string)
            );

            if (initialData) {
               await queryClient.cancelQueries({ queryKey: queryKeys.userLibrary(uid as string) });
            }
            const optimisticData = optimisticUpdater(initialData as InitialData, id, 'reading');
            queryClient.setQueryData(queryKeys.userLibrary(uid as string), optimisticData);

            return { initialData };
         },
         onError: (err, newValue, context) => {
            queryClient.setQueryData(queryKeys.userLibrary(uid as string), context);
            console.log('Error has occured while mutating:', err);
         },
         onSettled: () => {
            queryClient.invalidateQueries(queryKeys.userLibrary(uid));
         },
         // onSuccess: () => {
         //    setHasMutate(true);
         // },
      }
   );

   return { mutate, status };
}

function optimisticUpdater(initialData: InitialData | undefined, id: string, key: Param) {
   if (key == 'remove' && initialData) {
      key = (checkBookInLibrary(initialData.data, id) as string[]).toString() as keyof Library;
      const optimisticUpdater = {
         ...initialData,
         data: {
            ...initialData?.data,
            [key]: initialData?.data[key]?.filter((bookId) => bookId !== id),
         },
      };
      return optimisticUpdater;
   }
   const optimisticUpdater = {
      ...initialData,
      data: {
         ...initialData?.data,
         [key]: [...(initialData?.data[key as keyof Library] as string[]), id],
      },
   };

   return optimisticUpdater;
}

// export default function useMutateLibraries(
//    uid: string,
//    id: string,
//    setHasMutate: (newState: true) => void,
//    queryClient: QueryClient
// ) {
//    const getUrl = (param: Param, optionalParam?: string | undefined) => {
//       const params = !optionalParam ? param : param + '/' + optionalParam;
//       return `/library/authenticate/${uid}/${id}/${params}`;
//    };
//    const getMutations = (type: Param, option?: string) => {
//       if (type === 'reading' || (option && option === 'include-page')) {
//          return useMutateLibraryWithBody(getUrl(type, option), uid, setHasMutate, queryClient);
//       }
//       return useMutateLibrary(getUrl(type, option), uid, setHasMutate, queryClient);
//    };
//    const mutationStore = {
//       addToCurrent: getMutations('reading') as MutationLibraryReturnType<MutationFuncObject>,
//       addToCurrentWithPage: getMutations(
//          'reading',
//          'include-page'
//       ) as MutationLibraryReturnType<MutationFuncObject>,
//       addToWant: getMutations('want') as MutationLibraryReturnType<MutationFuncVoid>,
//       addToFinished: getMutations('finished') as MutationLibraryReturnType<MutationFuncVoid>,
//       addToReReading: getMutations(
//          'finished',
//          'rereading'
//       ) as MutationLibraryReturnType<MutationFuncVoid>,
//       removeBook: getMutations('remove') as MutationLibraryReturnType<MutationFuncVoid>,
//    };

//    return mutationStore;
// }

// // keys are type of queryKeys
// export function useMutateLibrary(
//    url: string,
//    uid: string,
//    setHasMutate: (newState: true) => void,
//    queryClient: QueryClient
// ) {
//    const { mutate, status } = useMutation(queryKeys.userLibrary(uid), () => postFetch(url), {
//       onError: (err) => console.log('Error has occured while mutating:', err),
//       onSuccess: () => {
//          // TODO: return a toast success that book has been added?
//          setHasMutate(true);
//          queryClient.invalidateQueries(queryKeys.userLibrary(uid));
//       },
//    });

//    return { mutate, status };
// }

// // for reading and include-page
// export function useMutateLibraryWithBody(
//    url: string,
//    uid: string,
//    setHasMutate: (newState: true) => void,
//    queryClient: QueryClient
// ) {
//    const { mutate, status } = useMutation(
//       queryKeys.userLibrary(uid),
//       (body: Record<string, unknown> | undefined) => postFetch(url, body),
//       {
//          onError: (err) => console.log('Error has occured while mutating:', err),
//          onSuccess: () => {
//             setHasMutate(true);
//             queryClient.invalidateQueries(queryKeys.userLibrary(uid));
//          },
//       }
//    );

//    return { mutate, status };
// }
