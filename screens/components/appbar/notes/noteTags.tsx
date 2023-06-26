import { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput as NativeInput, Keyboard } from 'react-native';
import { Text, Button, Chip, TextInput } from 'react-native-paper';
import { FONT_SIZE, ICONS, NoteAppbarParams } from '../../../../constants';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { AntDesign } from '@expo/vector-icons';
import { handleTags } from '../../../../library/zustand/logic/bounded-logic/noteLogic';

interface AddTagsProps extends NoteAppbarParams {
   tagsData: string[] | undefined;
   shouldAddTags: boolean;
   keyboardHeight: number;
   setShouldAddTags: (value: AddTagsProps['shouldAddTags']) => void;
}

const Tags = ({
   tagsData,
   params,
   colors,
   shouldAddTags,
   keyboardHeight,
   setShouldAddTags,
}: AddTagsProps) => {
   const { id, logIndex } = params;
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
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode='interactive'
            contentInsetAdjustmentBehavior='never'
            keyboardShouldPersistTaps='always'
            alwaysBounceVertical
            automaticallyAdjustKeyboardInsets
            horizontal={false}
            style={[styles.chipsContainer, { backgroundColor: colors.elevation.level1 }]}
         >
            <View accessibilityRole='list' style={styles.chipsWrapper}>
               {tagsData && tagsData?.length < 1 && (
                  <Text style={styles.noTagsFound} variant='bodyLarge'>
                     No Tags Found
                  </Text>
               )}
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
               {/* <Chip
                  mode='outlined'
                  icon='plus'
                  accessibilityRole='button'
                  accessibilityLabel='Add Tags'
                  style={[styles.chips]}
                  onPress={onPressAddTags}
               >
                  Add Tags
               </Chip> */}
            </View>
         </ScrollView>

         {/* {shouldAddTags && ( */}
         <View
            aria-hidden
            style={[
               styles.inputContainer,
               // { display: shouldInputDisplay }
            ]}
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
               style={[
                  styles.input,
                  // { display: shouldInputDisplay }
               ]}
            />
            <IconButton
               style={[
                  styles.button,
                  // { display: shouldInputDisplay }
               ]}
               onPress={tagHandler}
               renderIcon={() => (
                  <AntDesign name='pluscircleo' size={ICONS.MEDIUM} color={colors.primary} />
               )}
            />
         </View>
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
   noTagsFound: {
      width: '100%',
      // backgroundColor: 'red',
      marginTop: '20%',
      textAlign: 'center',
      opacity: 0.8,
   },
   chips: {
      height: 50,
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
