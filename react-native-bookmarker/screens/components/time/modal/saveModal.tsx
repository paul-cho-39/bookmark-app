import { StyleSheet, View, TouchableHighlight, Text, StyleProp, ViewStyle } from 'react-native';
import CustomModal, { ModalProps } from '../../../../components/modal';
import useBoundedStore from '../../../../library/zustand/store';
import {
   formatDate,
   formatTime,
   formatTimer,
} from '../../../../library/helper/timer/getTimerValue';
import TimeContent from './timeContent';
import ContentWrapper from './infoContentWrapper';
import ModalLayout from './modalLayout';
import TouchableSaveButton from '../../../../components/buttons/touchableCustomButton';
import { setStopModalVisible } from '../../../../library/zustand/logic/connector-logic/';
import useLocalTime from '../../../../library/hooks/useGetLocalTime';
import FiveStars, { FivestarProps } from '../../../../components/buttons/fiveStars';
import { useState } from 'react';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import useConnectStore from '../../../../library/zustand/connectStore';

interface SaveModalProps extends FivestarProps {
   colors: MD3Colors;
   containerStyle?: StyleProp<ViewStyle>;
}

const SaveModal = ({ containerStyle, colors, ...rest }: SaveModalProps) => {
   const [currentPage, startTime, timer] = useBoundedStore((state) => [
      state.currentPage,
      state.timerWithDate.startTime,
      state.timer,
   ]);
   const isStopModalVisible = useConnectStore((state) => state.modal.timer.isStopTimeVisible);

   const current = useLocalTime();
   const [isChecked, setIsChecked] = useState(false);

   const currentDate = formatDate(current).replaceAll('-', '/');
   const start = formatTime(startTime as Date);
   const end = formatTime(new Date(current));

   return (
      // TODO: change title(?)
      <CustomModal
         title={`${currentDate}`}
         displayGoBack={true}
         visible={isStopModalVisible}
         setVisible={setStopModalVisible}
         displayDivider={false}
         color={colors.elevation.level2}
         containerStyle={containerStyle}
      >
         <ModalLayout
            colors={[colors.elevation.level3, colors.elevation.level3, colors.elevation.level5]}
         >
            <View style={styles.timeContentWrapper}>
               <TimeContent
                  name='Start time'
                  time={start?.time as string}
                  meridiem={start?.meridiem as string}
               />
               <TimeContent
                  name='End time'
                  time={end?.time as string}
                  meridiem={end?.meridiem as string}
               />
            </View>
            {/* TODO have it correctly */}
            <ContentWrapper note='none' pages={currentPage as number} time={formatTimer(timer)} />
            <View style={styles.buttonWrapper}>
               <TouchableSaveButton
                  activeOpacity={0.8}
                  style={[styles.saveButton, { backgroundColor: colors.elevation.level5 }]}
                  name='Bookmark'
               />
               {/* even when it is pressed it is saved(?) */}
               <TouchableSaveButton
                  activeOpacity={0.6}
                  style={[styles.cancelButton]}
                  textStyle={[{ color: colors.onErrorContainer }]}
                  name='Do not save'
               />
            </View>
         </ModalLayout>
      </CustomModal>
   );
};

const styles = StyleSheet.create({
   timeContentWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
   },
   buttonWrapper: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
   },
   saveButton: {
      padding: 10,
      borderRadius: 5,
      borderWidth: 0.5,
      alignItems: 'center',
      borderColor: 'white',
      width: '75%',
      marginBottom: 25,
   },
   cancelButton: {},
});

export default SaveModal;

// a five-star rating

// AND a thumbs-up
