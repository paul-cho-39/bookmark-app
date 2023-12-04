import { View, Text, TextProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface DisplayPageProps extends TextProps {
   page: number;
   viewStyle?: StyleProp<ViewStyle>;
   children?: React.ReactNode;
}

const DisplayPage = ({ page, viewStyle, children }: DisplayPageProps) => {
   const { colors } = useTheme();
   return (
      <View style={viewStyle}>
         <Text
            style={{
               color: colors.onSurface,
               opacity: 0.8,
            }}
         >
            Pages read:
         </Text>
         <Text
            style={{
               color: colors.onSurface,
               fontWeight: 'bold',
               fontSize: 20,
            }}
            accessibilityLabel={Math.floor(page).toString()}
         >
            {Math.floor(page)}
         </Text>
         {children}
      </View>
   );
};

export default DisplayPage;
