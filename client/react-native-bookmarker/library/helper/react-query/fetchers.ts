import useFetcher from '../../hooks/useFetcher';

async function postFetch<AnyObject extends Record<string, any>>(url: string, body?: AnyObject) {
   return await useFetcher(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
   });
}

async function getFetch(url: string) {
   return await useFetcher(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
   });
}

async function deleteFetch<AnyObject extends Record<string, any>>(url: string, body: AnyObject) {
   return await useFetcher(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
   });
}

export { getFetch, postFetch, deleteFetch };
