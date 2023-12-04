import constants from 'expo-constants';
import Config from '../config';

// fetcher used for backend support
// this is the main connector to the backend server;
export default async function useFetcher(req: RequestInfo, res: RequestInit, error?: string) {
   // const getApiEndpoint = constants.expoConfig?.extra?.apiUrl + '/api' + req;
   const getApiEndpoint = Config.apiUrl + '/api' + req;
   console.log('Inside the fetcher, the url is:', getApiEndpoint);
   const response = await fetch(getApiEndpoint, res);
   if (response && response.ok) {
      return response.json();
   } else {
      throw new Error(!error ? 'The request cannot be made' : error);
   }
}

// fetcher used for google api
export const fetcher = async (input: RequestInfo, tries: number = 0) => {
   try {
      const res = await fetch(input);
      return res.json();
   } catch (error) {
      let totalTries: number = tries - 1;
      if (totalTries > 0) {
         await fetcher(input, totalTries);
      }
      console.log('Is it throwing the error here?', error);
   }
};
