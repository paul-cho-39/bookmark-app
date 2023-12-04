import { postFetch } from '../../helper/react-query/fetchers';
import { useMutation } from '@tanstack/react-query';

interface BodyProps {
   [key: string]: string;
}

type URL = '/user/signin' | '/user/signout' | '/user/signup' | '/user/provider';

const useSendToken = (url: URL) => {
   const {
      mutate: sendToken,
      isError,
      isLoading,
   } = useMutation((body: BodyProps) => postFetch(url, body));
   return { sendToken, isError, isLoading };
};

export default useSendToken;

// async function postFetch<AnyObject extends Record<string, any>>(url: string, body?: AnyObject) {
//    return await useFetcher(url, {
//       method: 'POST',
//       body: JSON.stringify(body),
//       headers: { 'Content-Type': 'application/json' },
//    });
// }

// async function getFetch(url: string) {
//    return await useFetcher(url, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//    });
// }

// async function deleteFetch<AnyObject extends Record<string, any>>(url: string, body: AnyObject) {
//    return await useFetcher(url, {
//       method: 'DELETE',
//       body: JSON.stringify(body),
//       headers: { 'Content-Type': 'application/json' },
//    });
// }

// export { getFetch, postFetch, deleteFetch };
