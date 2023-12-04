import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Snackbar, SnackbarProps } from 'react-native-paper';
import { width as WIDTH, height as HEIGHT } from '../library/helper';

interface CustomSnackbarProps {
   visible: boolean;
   setVisible: (value: React.SetStateAction<boolean>) => void;
   message: string;
   duration?: number;
   style?: StyleProp<ViewStyle>;
}

// customize this so that it will can appear at the top as well

const CustomSnackbar = ({
   visible,
   setVisible,
   message,
   duration = 2500,
   style,
}: //    ...rest
CustomSnackbarProps) => {
   const onDismissSnackBar = () => setVisible(false);
   const onToggleSnackBar = () => setVisible(true);

   return (
      <Snackbar
         style={[styles.snackbar, style]}
         duration={duration}
         visible={visible}
         onDismiss={onDismissSnackBar}
         //  {...rest}
      >
         {message}
      </Snackbar>
   );
};

const SNACK_BAR_WIDTH = 0.85;
const SNACK_BAR_MARGIN = (1 - SNACK_BAR_WIDTH) / 2;

const SNACK_TOP = HEIGHT * 0.05;

const styles = StyleSheet.create({
   snackbar: {
      position: 'absolute',
      top: SNACK_TOP,
      justifyContent: 'center',
      alignContent: 'center',
      maxWidth: WIDTH * SNACK_BAR_WIDTH,
      marginHorizontal: WIDTH * SNACK_BAR_MARGIN,
   },
});

export default CustomSnackbar;
