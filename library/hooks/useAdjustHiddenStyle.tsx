const useAdjustHiddenStyle = (ref: any, width: number = 4, widthOffset: number = 2.5) => {
   const dispatchStyling = {
      _setStyle: (style: Record<string, string | number>) => {
         if (ref && ref.current) {
            ref.current.setNativeProps({ style: style });
         }
      },
      activated: () => {
         dispatchStyling._setStyle({ width: `${width + widthOffset}%` });
      },
      cancelled: () => {
         dispatchStyling._setStyle({ width: `${width}%` });
      },
   };

   return dispatchStyling;
};

export default useAdjustHiddenStyle;
