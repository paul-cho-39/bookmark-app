import { View, StyleSheet } from 'react-native';
import HeaderMenuIcon from '../../../components/menu/headerMenuIcon';
import { MainTimerNavigationProp } from '../../../library/@types/navigation';
// .json file
import settings from './../../../assets/constants/settings.json';
import IconButton from '../../../components/buttons/icons/iconButton';
import Entypo from '@expo/vector-icons/Entypo';
import { BaseUserLogProps } from '../../../library/@types/timerData';
import { useEffect, useState } from 'react';
import useBoundedStore from '../../../library/zustand/store';

interface TimerHeaderIconsProps {
   navigation: MainTimerNavigationProp['navigation'];
   params: BaseUserLogProps;
}

const TimerHeaderIcons = ({ navigation, params }: TimerHeaderIconsProps) => {
   // this will be connected ./screen/timer/index
   const isDataAvailable = useBoundedStore((state) => state.isDataAvailable);
   const { timerMenuSettings } = settings;

   const handleNoteSettings = () => {
      if (isDataAvailable) {
         navigation.navigate('Notes', { params });
      }
   };

   const handleMenuSettings = (menuItem?: (typeof timerMenuSettings)[number]) => {
      if (isDataAvailable) {
         switch (menuItem) {
            case 'Save':
               // call stopTime(mutateEndReading here)
               break;
            case 'Cancel Session':
               // should not automatically cancel
               // have to "undo" an action so for now leave it as it is
               break;
            case 'Timer Settings':
               return navigation.navigate('TimerSettings');
            default:
               console.error('Invalid menu item:', menuItem);
         }
      }
   };

   return (
      <View style={styles.container}>
         <IconButton
            onPress={handleNoteSettings}
            style={styles.iconContainer}
            renderIcon={() => <Entypo name='plus' color={'white'} size={22} />}
         />
         <HeaderMenuIcon
            iconStyle={[styles.iconContainer]}
            iconSize={18}
            menuItems={timerMenuSettings}
            onMenuPress={handleMenuSettings}
            headerIcon='dots-three-vertical'
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   iconContainer: {
      padding: 5,
      marginHorizontal: 2,
   },
});

export default TimerHeaderIcons;

// menu items
// 1) menu
// a) not sure how fast they read(?) -> have them take a test(?)
// if so have to save this .json file for reading samples
// b) should notify(?) -> alert* if notifications off to go on settings for this change
// c)

// 2) note
// a) plain note b) tags c) upload d) googles ocr (premium later)
// 3)
