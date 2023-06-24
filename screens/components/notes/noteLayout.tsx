import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, KeyboardAvoidingView, Platform, Appearance } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { HEADERS } from '../../../constants';

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
      <KeyboardAvoidingView
         enabled
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
         {/* create another one for light mode here -- dark mode only */}
         <LinearGradient
            // colors={getColorsFor()}
            testID='note-layout'
            colors={[colors.inverseOnSurface, colors.inverseOnSurface]}
            style={styles.container}
         >
            {children}
         </LinearGradient>
      </KeyboardAvoidingView>
   );
};

const WIDTH = 0.9;
const MARGIN_HORIZONTAL = (1 - WIDTH) / 2;

const styles = StyleSheet.create({
   container: {
      marginTop: 10, // this comes creating custom headers
      flex: 1,
   },
});

export default NoteLayout;
