function convertPage(value: string) {
   if (value === '') {
      return null;
   }
   const num = Number(value);
   return isNaN(num) ? null : num;
}

export { convertPage };
