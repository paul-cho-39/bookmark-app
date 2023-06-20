function convertPage(value: string | undefined) {
   if (value === '') {
      return null;
   }
   const num = Number(value);
   return isNaN(num) ? null : num;
}

export { convertPage };
