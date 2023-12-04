import { View, StyleSheet, TouchableOpacityProps } from 'react-native';
import IconButton from '../../../components/buttons/icons/iconButton';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { setStopModalVisible } from '../../../library/zustand/logic/connector-logic/';

export interface SaveTimeButtonProps {
   isPaused: boolean;
   handlePause: () => void;
   handleResume: () => void;
}

// should this be a modal?
const SaveTimeButton = ({ isPaused, handlePause, handleResume }: SaveTimeButtonProps) => {
   const props: TouchableOpacityProps = {
      activeOpacity: 0.4,
      style: styles.button,
   };

   return (
      <View style={styles.container}>
         <IconButton
            testID='pause-icon-button'
            accessibilityLabel='pause-button'
            onPress={isPaused ? handleResume : handlePause}
            renderIcon={() =>
               isPaused ? (
                  <Entypo name='controller-play' size={40} color='white' />
               ) : (
                  <AntDesign name='pause' color='white' size={40} />
               )
            }
            {...props}
         />
         <IconButton
            testID='stop-icon-button'
            accessibilityLabel='stop-button'
            onPress={() => setStopModalVisible(true)}
            renderIcon={() => <Entypo name='controller-stop' size={40} color='white' />}
            {...props}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginTop: 25, // set a fixed value for this(?)
   },
   button: {
      paddingHorizontal: 10,
   },
});

export default SaveTimeButton;
