const useAdjustHiddenStyle = (ref: any, widthOffset: number) => {
   const WIDTH = 4;
   const dispatchStyling = {
      _setStyle: (style: Record<string, string | number>) => {
         if (ref && ref.current) {
            ref.current.setNativeProps({ style: style });
         }
      },
      activated: () => {
         dispatchStyling._setStyle({ width: `${WIDTH + widthOffset}%` });
      },
      cancelled: () => {
         dispatchStyling._setStyle({ width: `${WIDTH}%` });
      },
   };

   return dispatchStyling;
};

export default useAdjustHiddenStyle;
