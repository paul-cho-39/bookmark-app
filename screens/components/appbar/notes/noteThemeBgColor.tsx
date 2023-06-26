import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { NoteDarkColor, NoteLightColor } from '../../../../constants/notes';
import { setNoteColor } from '../../../../library/zustand/logic/bounded-logic/noteThemeLogic';
import { useState } from 'react';
import { NoteColors } from './noteTheme';

interface ColorGridProps {
   selected: NoteColors | undefined;
   handleSwitchColor: (color: NoteColors) => void;
}

const ColorGrid = ({ selected, handleSwitchColor }: ColorGridProps) => {
   const [pressed, setPressed] = useState(false);
   const noteThemeColors = Object.values(NoteLightColor);

   return (
      <FlatList
         data={noteThemeColors}
         numColumns={3}
         keyExtractor={(item) => item}
         bouncesZoom
         renderItem={({ item }) => (
            <TouchableOpacity
               style={[styles.circle, { backgroundColor: item }, pressed && styles.pressed]}
               onPressIn={() => setPressed(true)}
               onPressOut={() => setPressed(false)}
               onPress={() => handleSwitchColor(item)}
            >
               {item === selected && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
         )}
      />
   );
};

const styles = StyleSheet.create({
   circle: {
      width: 100,
      height: 100,
      borderRadius: 50, // half of your width and height
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   pressed: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderColor: 'black', // change as needed
      borderWidth: 5,
   },
   checkmark: {
      color: '#fff', // adjust color as needed
      fontSize: 20, // adjust size as needed
   },
});

export default ColorGrid;

// picking a color(?) - how would I pick a color?
// if the color is picked then
// cancel and save button together
//
