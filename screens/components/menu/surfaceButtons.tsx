import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomSurfaceButton from './surfaceButton';
import { useNavigation } from '@react-navigation/native';
import { MainNavigatorTimerNavgiationProp } from '../../../library/@types/navigation';
import { setBookVisibility } from '../../../library/zustand/logic/connector-logic/';
import { PrimaryData } from '../../../library/helper/parsePrimaryBooks';

interface SurfaceButtonProps {
   uid: string;
   primaryBookInfo: PrimaryData;
}

const SurfaceButtons = ({ uid, primaryBookInfo }: SurfaceButtonProps) => {
   // const navigation = useNavigation();
   const navigation = useNavigation<MainNavigatorTimerNavgiationProp>();
   const handleStartTimer = () => {
      navigation.navigate('Timer', {
         screen: 'MainTimer',
         params: {
            uid: uid,
            primaryBookInfo: primaryBookInfo,
         },
      });
   };

   const handleLogActivity = () => {
      // handle log activity logic
   };

   const handleSwitchBooks = () => {
      // logic is in <MainMenu /> component
      setBookVisibility(true);
   };

   return (
      <View style={styles.row}>
         <CustomSurfaceButton
            iconName='timer-outline'
            title='Start Timer'
            size={28}
            onPress={handleStartTimer}
         />
         <CustomSurfaceButton
            iconName='plus'
            title='Log Reading'
            size={28}
            onPress={handleLogActivity}
         />
         {/* change */}
         <CustomSurfaceButton
            iconName='bookshelf'
            title='Change Book'
            size={28}
            onPress={handleSwitchBooks}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   row: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      width: '100%',
   },
});

export default SurfaceButtons;
