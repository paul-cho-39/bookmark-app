import React, { forwardRef, useEffect, useState } from 'react';
import { SegmentedButtons, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
   DARKEN_BY_DEFAULT,
   NoteDarkColor,
   NoteLightColor,
   NoteModalParams,
} from '../../../../constants/notes';
import useBoundedStore from '../../../../library/zustand/store';
import { setNoteColor } from '../../../../library/zustand/logic/bounded-logic/noteThemeLogic';
import { Modalize } from 'react-native-modalize';
import useSettingsStore from '../../../../library/zustand/settingsStore';
import darkenColor from '../../../../library/helper/darkenColor';

export type NoteColors = NoteLightColor | NoteDarkColor;

const NoteTheme = forwardRef<Modalize, NoteModalParams>((props, ref) => {
   const { params, colors } = props;
   const { id, logIndex } = params;

   const theme = useTheme();
   const colorObj = useBoundedStore((state) => state.notes[id][logIndex].meta);
   const isDarkMode = useSettingsStore(
      (state) => state.userPreference.userGeneralSettings.display.isDarkMode
   );

   const noteColor = isDarkMode ? NoteDarkColor : NoteLightColor;
   const noteThemeColors = Object.values(noteColor).map((color) => color.toLowerCase());

   const [value, setValue] = useState('background'); // segmentedButton values
   const [isPanGestureEnabled, setPanGestureEnabled] = useState(true);
   const [pressed, setPressed] = useState(false);

   // CONSIDER: creating a hook for this if this function is repeated
   const handlePanGesture = (type: 'enable' | 'disable') => {
      if (type === 'enable') {
         setTimeout(() => !isPanGestureEnabled && setPanGestureEnabled(true), 300);
      } else {
         setPanGestureEnabled(false);
      }
   };

   const handleSwitchColor = (color: NoteColors) => {
      setPressed(true);
      setNoteColor(params.id, params.logIndex, color);

      setTimeout(() => {
         pressed && setPressed(false);
      }, 150);
   };

   const renderCheckText = () => (
      <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
   );

   const renderTitle = () => (
      <SegmentedButtons
         value={value}
         onValueChange={setValue}
         density='small'
         style={[
            styles.segmentedButtons,
            // { backgroundColor: colors.primaryContainer }
         ]}
         theme={{
            ...theme,
            roundness: 5,
            animation: {
               defaultAnimationDuration: 100,
            },
         }}
         buttons={[
            {
               value: 'background',
               label: 'Background',
               showSelectedCheck: true,
               style: [
                  {
                     backgroundColor: value === 'background' ? colors.onPrimary : 'transparent',
                  },
               ],
            },
            {
               value: 'theme',
               label: 'Theme',
               showSelectedCheck: true,
               style: [
                  {
                     backgroundColor: value === 'theme' ? colors.onPrimary : 'transparent',
                  },
               ],
            },
         ]}
      />
   );

   const renderItem = ({ item }: { item: NoteColors }) => (
      <>
         {value === 'background' && (
            <TouchableOpacity
               activeOpacity={1}
               onPressIn={() => handlePanGesture('disable')}
               onPressOut={() => handlePanGesture('enable')}
               style={{ height: 150 }}
            >
               <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                     styles.circle,
                     { backgroundColor: darkenColor(item, DARKEN_BY_DEFAULT) },
                     item === colorObj?.bgColor && pressed && styles.pressed,
                  ]}
                  onPressIn={() => handlePanGesture('disable')}
                  onPressOut={() => {
                     setPressed(false);
                     handlePanGesture('enable');
                  }}
                  onPress={() => handleSwitchColor(item)}
               >
                  {darkenColor(item, DARKEN_BY_DEFAULT) === colorObj?.bgColor && renderCheckText()}
               </TouchableOpacity>
            </TouchableOpacity>
         )}
      </>
   );

   return (
      <Modalize
         closeOnOverlayTap
         avoidKeyboardLikeIOS={true}
         disableScrollIfPossible={true}
         panGestureEnabled={isPanGestureEnabled}
         withHandle={false}
         ref={ref}
         modalHeight={300}
         onClosed={props.onCloseModal}
         HeaderComponent={renderTitle()}
         modalStyle={{ backgroundColor: colorObj?.headerColor }}
         flatListProps={{
            data: noteThemeColors,
            keyExtractor: (item) => item,
            horizontal: true,
            showsHorizontalScrollIndicator: true,
            renderItem: renderItem,
         }}
      />
   );
});

const WIDTH = 88;
const HEIGHT = 50;
const MARGIN_HORIZONTAL = (100 - WIDTH) / 2;

const styles = StyleSheet.create({
   container: {
      width: `${WIDTH}%`,
      borderRadius: 30,
      marginHorizontal: `${MARGIN_HORIZONTAL}%`,
      height: `${HEIGHT}%`,
      padding: 5,
   },
   title: {
      marginTop: 10,
      height: 45,
   },
   segmentedButtons: {
      borderColor: 'transparent',
      marginVertical: 30,
   },

   // checking?
   circle: {
      width: 65,
      height: 65,
      borderRadius: 50,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   pressed: {
      width: 67,
      height: 67,
      borderRadius: 50,
      borderWidth: 1,
   },
   checkmark: {
      fontSize: 24, // adjust size as needed
   },
});

export default NoteTheme;
