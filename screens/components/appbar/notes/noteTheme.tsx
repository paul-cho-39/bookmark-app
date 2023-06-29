import React, { forwardRef, useEffect, useState } from 'react';
import { SegmentedButtons, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
   DARKEN_BY_DEFAULT,
   NoteAppbarParams,
   NoteDarkColor,
   NoteLightColor,
} from '../../../../constants/notes';
import useBoundedStore from '../../../../library/zustand/store';
import { setNoteColor } from '../../../../library/zustand/logic/bounded-logic/noteThemeLogic';
import { Modalize } from 'react-native-modalize';
import useSettingsStore from '../../../../library/zustand/settingsStore';
import darkenColor from '../../../../library/helper/darkenColor';

interface NoteThemeProps extends NoteAppbarParams {}

export type NoteColors = NoteLightColor | NoteDarkColor;

const NoteTheme = forwardRef<Modalize, NoteThemeProps>((props, ref) => {
   const { params, colors } = props;
   const { id, logIndex } = params;

   const colorObj = useBoundedStore((state) => state.notes[id][logIndex].meta);
   const isDarkMode = useSettingsStore(
      (state) => state.userPreference.userGeneralSettings.display.isDarkMode
   );

   const noteColor = isDarkMode ? NoteDarkColor : NoteLightColor;
   const noteThemeColors = Object.values(noteColor).map((color) =>
      darkenColor(color, DARKEN_BY_DEFAULT)
   );

   const [value, setValue] = useState('background');
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

   const renderCheckText = () => <Text style={styles.checkmark}>✓</Text>;

   const renderTitle = () => (
      <SegmentedButtons
         value={value}
         onValueChange={setValue}
         density='small'
         style={[styles.segmentedButtons, { backgroundColor: colors.primaryContainer }]}
         buttons={[
            {
               value: 'background',
               label: 'Background',
               checkedColor: colors.onPrimaryContainer,
               showSelectedCheck: true,
            },
            {
               value: 'theme',
               label: 'Theme',
               checkedColor: colors.onPrimaryContainer,
               showSelectedCheck: true,
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
                     { backgroundColor: item },
                     item === colorObj?.bgColor && pressed && styles.pressed,
                  ]}
                  onPressIn={() => handlePanGesture('disable')}
                  onPressOut={() => {
                     setPressed(false);
                     handlePanGesture('enable');
                  }}
                  onPress={() => handleSwitchColor(item)}
               >
                  <Text>{item}</Text>
                  {item === colorObj?.bgColor && renderCheckText()}
               </TouchableOpacity>
            </TouchableOpacity>
         )}
      </>
   );

   console.log('the new color is: ', colorObj?.bgColor);

   return (
      <Modalize
         closeOnOverlayTap
         avoidKeyboardLikeIOS={true}
         disableScrollIfPossible={true}
         panGestureEnabled={isPanGestureEnabled}
         withHandle={false}
         ref={ref}
         modalHeight={300}
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
      width: '75%',
   },

   // checking?
   circle: {
      width: 50,
      height: 50,
      borderRadius: 50, // half of your width and height
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   pressed: {
      width: 55,
      height: 55,
      borderRadius: 50,
      borderColor: 'grey', // change as needed
      borderWidth: 1,
   },
   checkmark: {
      color: 'black', // adjust color as needed
      fontSize: 24, // adjust size as needed
   },
});

export default NoteTheme;

// <AnimatedModal
//    title={
//       <SegmentedButtons
//          value={value}
//          onValueChange={setValue}
//          density='small'
//          style={{ width: '75%' }}
//          buttons={[
//             {
//                value: 'background',
//                label: 'Background',
//                showSelectedCheck: true,
//             },
//             {
//                value: 'theme',
//                label: 'Theme',
//                showSelectedCheck: true,
//             },
//          ]}
//       />
//    }
//    displayDivider={false}
//    visible={isVisible}
//    setVisible={setIsVisible}
//    animationType='fade'
//    containerStyle={styles.container}
//    titleStyle={styles.title}
// >
//    <View accessibilityElementsHidden>{value === 'background' && <ColorGrid selected={bgColor}/>}</View>
// </AnimatedModal>
