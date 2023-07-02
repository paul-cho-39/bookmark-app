import { StyleSheet, KeyboardAvoidingView, Platform, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NoteLayoutProps {
   children: React.ReactNode;
}
const NoteLayout = ({ children }: NoteLayoutProps) => {
   return (
      <>
         <SafeAreaView
            style={styles.container}
            // colors={getColorsFor()}
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
