export function capitalizeFirstLetter(str: string) {
   return str.replace(/^(.)|\s(.)/g, function ($1) {
      return $1.toUpperCase();
   });
}
