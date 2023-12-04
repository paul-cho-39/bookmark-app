import { Data, Items } from '../@types/googleBooks';
// should it throw an error if new data returns undefined?

export default function createUniqueDataSets(data: Data<any>) {
   const _data = data?.pages;
   const newData = _data?.map((page) => page?.items).flatMap((item) => item?.map((i) => i));

   //   returns new objects without duplicated ids
   const newUniqueData = newData?.reduce((uniqueArray: Items<any>[], current) => {
      if (!uniqueArray?.some((idx) => idx?.id === current.id)) {
         uniqueArray.push(current);
      }
      return uniqueArray;
   }, []);

   return newUniqueData;
}

// this should be the default export and change
// across the field
function convertDataToStrings(data: Data<any>) {
   const arrayData = createUniqueDataSets(data);
   return arrayData && arrayData[0].toString();
}
