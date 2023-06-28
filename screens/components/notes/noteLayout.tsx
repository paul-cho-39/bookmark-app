import { StyleSheet, KeyboardAvoidingView, Platform, Appearance } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NoteLayoutProps {
   colors: MD3Colors;
   children: React.ReactNode;
}

// :TODO - for light theme find a background and set it on theme
// and find a correct font while will have to be loaded using useFont
const NoteLayout = ({ colors, children }: NoteLayoutProps) => {
   // :TODO have to do this for Timer component as well
   //  for light / dark mode
   const getColorsFor = () => {
      const colorScheme = Appearance.getColorScheme();
      if (colorScheme == 'dark') {
         return [
            colors.inverseSurface,
            colors.inverseOnSurface,
            colors.inverseOnSurface,
            colors.inverseOnSurface,
            colors.inverseSurface,
         ];
      }

      // light mode colors here
      return [];
   };

   return (
      <>
         {/* enabled
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      > */}
         {/* create another one for light mode here -- dark mode only */}
         <SafeAreaView
            // colors={getColorsFor()}
            testID='note-layout'
            style={styles.container}
         >
            {children}
         </SafeAreaView>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default NoteLayout;
