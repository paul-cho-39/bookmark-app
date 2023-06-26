import React, { useEffect, useState } from 'react';
import { SegmentedButtons, Text } from 'react-native-paper';
import AnimatedModal from '../../../../components/animatedModal';
import { FlatList, Button, StyleSheet, View, Pressable } from 'react-native';
import { NoteLightColor, NoteThemeParamKeys } from '../../../../constants/notes';

interface NoteThemeProps {
   isVisible: boolean;
   setIsVisible: (value: boolean) => void;
}

const NoteTheme = ({ isVisible, setIsVisible }: NoteThemeProps) => {
   const [value, setValue] = useState('background');

   return (
      <AnimatedModal
         title={
            <SegmentedButtons
               value={value}
               onValueChange={setValue}
               density='small'
               style={{ width: '75%' }}
               buttons={[
                  {
                     value: 'background',
                     label: 'Background',
                     showSelectedCheck: true,
                  },
                  {
                     value: 'theme',
                     label: 'Theme',
                     showSelectedCheck: true,
                  },
               ]}
            />
         }
         displayDivider={false}
         visible={isVisible}
         setVisible={setIsVisible}
         animationType='fade'
         containerStyle={styles.container}
         titleStyle={styles.title}
      >
         <View accessibilityElementsHidden>{value === 'background' && <ColorGrid />}</View>
      </AnimatedModal>
   );
};

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
});

export default NoteTheme;

const ColorGrid = () => {
   const noteThemeColors = Object.values(NoteLightColor);
   return (
      <FlatList
         data={noteThemeColors}
         numColumns={3}
         keyExtractor={(item) => item}
         bouncesZoom
         renderItem={({ item }) => (
            <>
               {/* create a check button if the color equals the color */}
               <Pressable
                  onPress={() => console.log(item)}
                  style={{
                     width: 50,
                     height: 50,
                     borderRadius: 50,
                     margin: 15,
                     backgroundColor: item,
                  }}
               />
            </>
         )}
      />
   );
};
