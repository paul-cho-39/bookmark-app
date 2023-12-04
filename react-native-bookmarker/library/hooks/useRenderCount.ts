import { useRef } from 'react';
import { useLayoutEffect } from 'react';

const useRenderCount = (name: string) => {
   const renderCount = useRef(0);
   useLayoutEffect(() => {
      renderCount.current = renderCount.current + 1;
      console.log(`Rendered the componet ${name} ${renderCount.current} times`);
   });
};

export default useRenderCount;
