import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';

interface ModalLayoutProps {
   children?: React.ReactNode;
   colors: string[];
}

const ModalLayout = ({ colors, children }: ModalLayoutProps) => {
   return (
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }} colors={colors}>
         {children}
      </LinearGradient>
   );
};

export default ModalLayout;
