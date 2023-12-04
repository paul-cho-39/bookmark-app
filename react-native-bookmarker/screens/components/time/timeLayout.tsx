import { StyleSheet } from 'react-native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

export interface TimeLayoutProps {
   colors: MD3Colors;
   children?: React.ReactNode;
}

const TimeLayout: React.FC<TimeLayoutProps> = ({ colors, children, ...rest }) => {
   return (
      <LinearGradient
         start={{ x: 0.5, y: 0 }}
         end={{ x: 0.7, y: 0.8 }}
         colors={[
            colors.background,
            colors.surfaceVariant,
            colors.surfaceVariant,
            colors.background,
         ]}
         style={[StyleSheet.absoluteFill]}
         {...rest}
      >
         {children}
      </LinearGradient>
   );
};

export default TimeLayout;
