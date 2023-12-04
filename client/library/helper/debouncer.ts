function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
   let timerId: NodeJS.Timeout | null;
   const debouncedFunc = (...args: Parameters<F>) => {
      if (timerId) {
         clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
         func(...args);
      }, delay);
   };

   debouncedFunc.cancel = () => {
      if (timerId) {
         clearTimeout(timerId);
      }
   };

   return debouncedFunc;
}

export default debounce;
