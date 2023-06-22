import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput as NativeInput } from 'react-native';
import { Text, Button, Chip, TextInput } from 'react-native-paper';
import { FONT_SIZE, ICONS } from '../../../../assets/constants';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { AntDesign } from '@expo/vector-icons';
import { handleTags } from '../../../../library/zustand/logic/bounded-logic/noteLogic';

interface AddTagsProps {
   colors: MD3Colors;
   logIndex: number;
   tagsData: string[] | undefined;
   shouldAddTags: boolean;
   setShouldAddTags: (value: AddTagsProps['shouldAddTags']) => void;
}

const Tags = ({ colors, tagsData, logIndex, shouldAddTags, setShouldAddTags }: AddTagsProps) => {
   const [tags, setTags] = useState('');
   const [oldTags, setOldTags] = useState('');

   const tagHandler = () => {
      if (tags) {
         oldTags ? handleTags.edit(logIndex, oldTags, tags) : handleTags.add(logIndex, tags);
         clearTags();
      }
      setShouldAddTags(true);
   };

   const clearTags = () => {
      setTags('');
      setOldTags('');
   };

   const removeTags = (tag: string) => {
      handleTags.remove(logIndex, tag);
   };

   const editTags = (tag: string) => {
      setShouldAddTags(true);
      setOldTags(tag);
      setTags(tag);
   };

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
                  onPress={() => setShouldAddTags(true)}
               >
                  Add Tags
               </Chip>
            </View>
         </ScrollView>

         {shouldAddTags && (
            <View style={[styles.inputContainer, { display: shouldAddTags ? 'flex' : 'none' }]}>
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
                  style={[styles.input]}
               />
               <IconButton
                  style={[styles.button, { display: tags.length >= 1 ? 'flex' : 'none' }]}
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
      fontSize: FONT_SIZE.titleMedium.fontSize,
   },
   button: {
      alignItems: 'flex-start',
      position: 'absolute',
      right: 20,
   },
});

export default Tags;
