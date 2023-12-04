// if the color is in rgb it first must be converted to hex
// to use this function
// 'black' is the default

export const getColorByContrast = (hex: string) => {
   let blackContrast = getContrastYIQ(hex);
   if (blackContrast === 'black') {
      return 'black';
   } else {
      return 'white';
   }
};

// helper function
const getContrastYIQ = (hex: string) => {
   let r = parseInt(hex.substring(1, 2), 16);
   let g = parseInt(hex.substring(3, 2), 16);
   let b = parseInt(hex.substring(5, 2), 16);
   let yiq = (r * 299 + g * 587 + b * 114) / 1000;
   return yiq >= 128 ? 'black' : 'white';
};
