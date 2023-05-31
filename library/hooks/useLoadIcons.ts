import { useEffect, useState } from 'react';

type IconComponentType<T> = (iconName: T, params: IconParams) => JSX.Element;
export type IconParams = { color: string; size: number };

export default function useLoadIcons<T>(
   fontLoaders: Array<() => Promise<void>>,
   getIconComponent: IconComponentType<T>,
   backupComponent: JSX.Element,
   params: { color: string; size: number }
) {
   const [fontsLoaded, setFontsLoaded] = useState(false);

   useEffect(() => {
      const loadFonts = async () => {
         try {
            await Promise.all(fontLoaders.map((loader) => loader()));
            setFontsLoaded(true);
         } catch (err) {
            setFontsLoaded(false);
            console.error('module @expo/vector-icons failed to load', err);
         }
      };

      loadFonts();
   }, []);

   const iconComponent = (iconName: T) => {
      if (!fontsLoaded) {
         return backupComponent;
      }

      return getIconComponent(iconName, params);
   };

   return iconComponent;
}
