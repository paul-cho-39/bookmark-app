import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput as NativeInput, Keyboard } from 'react-native';
import { Text, Button, Chip, TextInput } from 'react-native-paper';
import { FONT_SIZE, ICONS } from '../../../../assets/constants';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { AntDesign } from '@expo/vector-icons';
import { handleTags } from '../../../../library/zustand/logic/bounded-logic/noteLogic';
import { NoteTagsParams } from '../../../../library/zustand/utils/notes/retriever';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface AddTagsProps {
   noteTags: NoteTagsParams;
   colors: MD3Colors;
   shouldAddTags: boolean;
   keyboardHeight: number;
   setShouldAddTags: (value: AddTagsProps['shouldAddTags']) => void;
}

const Tags = ({
   noteTags,
   colors,
   shouldAddTags,
   keyboardHeight,
   setShouldAddTags,
}: AddTagsProps) => {
   const { id, logIndex, tags: tagsData } = noteTags;
   const [tags, setTags] = useState('');
   const [oldTags, setOldTags] = useState('');

   const onPressAddTags = () => {
      setShouldAddTags(true);
   };

   const tagHandler = () => {
      if (tags) {
         oldTags
            ? handleTags.edit(id, logIndex, oldTags, tags)
            : handleTags.add(id, logIndex, tags);
         clearTags();
      }
      setShouldAddTags(true);
   };

   const clearTags = () => {
      setTags('');
      setOldTags('');
   };

   const removeTags = (tag: string) => {
      handleTags.remove(id, logIndex, tag);
   };

   const editTags = (tag: string) => {
      // setShouldAddTags(true);
      setOldTags(tag);
      setTags(tag);
   };

   const shouldInputDisplay = keyboardHeight >= 1 || tags.length >= 1 ? 'flex' : 'none';
   return (
      <>
         <ScrollView
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps='always'
            alwaysBounceVertical
            automaticallyAdjustKeyboardInsets
            horizontal={false}
            style={styles.chipsContainer}
         >
            <View accessibilityRole='list' style={styles.chipsWrapper}>
               {tagsData?.map((tag, index) => (
                  <Chip
                     key={index}
                     accessibilityLabel={`${tag} tag`}
                     accessibilityRole='button'
                     accessibilityHint='press the right icon to remove the tag and press the tag to edit.'
                     mode='outlined'
                     onClose={() => removeTags(tag)}
                     closeIcon={'window-close'}
                     onPress={() => editTags(tag)}
                     style={styles.chips}
                  >
                     {tag}
                  </Chip>
               ))}
               <Chip
                  mode='outlined'
                  icon='plus'
                  accessibilityRole='button'
                  accessibilityLabel='Add Tags'
                  style={[styles.chips]}
                  onPress={onPressAddTags}
               >
                  Add Tags
               </Chip>
            </View>
         </ScrollView>

         {shouldAddTags && (
            <View
               aria-hidden
               collapsable
               style={[styles.inputContainer, { display: shouldInputDisplay }]}
            >
               <Text variant='titleLarge'>#</Text>
               <TextInput
                  autoFocus
                  clearTextOnFocus
                  aria-valuemax={60}
                  maxLength={60}
                  value={tags}
                  onChangeText={(text) => setTags(text)}
                  onBlur={() => setShouldAddTags(false)}
                  onSubmitEditing={tagHandler}
                  style={[styles.input, { display: shouldInputDisplay }]}
               />
               <IconButton
                  style={[styles.button, { display: shouldInputDisplay }]}
                  onPress={tagHandler}
                  renderIcon={() => (
                     <AntDesign name='pluscircleo' size={ICONS.MEDIUM} color={colors.primary} />
                  )}
               />
            </View>
         )}
      </>
   );
};

const styles = StyleSheet.create({
   chipsContainer: {
      marginHorizontal: '5%',
      overflow: 'scroll',
      flex: 1,
   },
   chipsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
   chips: {
      margin: 5,
      borderRadius: 10,
   },
   inputContainer: {
      marginHorizontal: 10,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
   },
   input: {
      width: '90%',
      backgroundColor: 'transparent',
      paddingHorizontal: 15,
      fontSize: FONT_SIZE.title.medium.fontSize,
   },
   button: {
      alignItems: 'flex-start',
      position: 'absolute',
      right: 20,
   },
});

export default Tags;
