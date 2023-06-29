import { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput as NativeInput, Keyboard } from 'react-native';
import { Text, Button, Chip, TextInput, IconButton as PaperIconButton } from 'react-native-paper';
import { FONT_SIZE, ICONS, NoteAppbarParams, NotesHeightParams } from '../../../../constants';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import { handleTags } from '../../../../library/zustand/logic/bounded-logic/noteLogic';
import { height as HEIGHT } from '../../../../library/helper';

interface AddTagsProps extends NoteAppbarParams {
   tagsData: string[] | undefined;
   inputHeight: number;
}

const Tags = ({ tagsData, inputHeight, params, colors }: AddTagsProps) => {
   const { id, logIndex } = params;
   const [tags, setTags] = useState('');
   const [oldTags, setOldTags] = useState('');

   const tagHandler = () => {
      if (tags) {
         oldTags
            ? handleTags.edit(id, logIndex, oldTags, tags)
            : handleTags.add(id, logIndex, tags);
         clearTags();
      }
   };

   const clearTags = () => {
      setTags('');
      setOldTags('');
   };

   const removeTags = (tag: string) => {
      handleTags.remove(id, logIndex, tag);
   };

   const editTags = (tag: string) => {
      setOldTags(tag);
      setTags(tag);
   };

   const renderNoTags = () => (
      <Text style={styles.tagsNotFound} variant='bodyLarge'>
         No Tags Found
      </Text>
   );

   const scrollViewHeight =
      inputHeight >= 1 ? NotesHeightParams.TagsInputScrollView : NotesHeightParams.TagsScrollView;

   return (
      <>
         <ScrollView
            showsVerticalScrollIndicator={true}
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode='none'
            contentInsetAdjustmentBehavior='never'
            keyboardShouldPersistTaps='always'
            alwaysBounceVertical
            automaticallyAdjustKeyboardInsets
            horizontal={false}
            style={[styles.container, { height: scrollViewHeight }]}
         >
            <View accessibilityRole='list' style={styles.chipsContainer}>
               {tagsData && tagsData?.length < 1 && renderNoTags()}
               {tagsData?.map((tag, index) => (
                  <Chip
                     key={index}
                     testID='tags-chips'
                     accessibilityLabel={`${tag} tag`}
                     accessibilityRole='button'
                     accessibilityHint='press the right icon to remove the tag and press the tag to edit.'
                     mode='outlined'
                     onClose={() => removeTags(tag)}
                     onPress={() => editTags(tag)}
                     style={styles.chips}
                     closeIcon={() => (
                        <PaperIconButton
                           icon={'window-close'}
                           testID='tags-close-icon'
                           accessibilityRole='button'
                           accessibilityLabel={`delete ${tag}`}
                           style={styles.closeIcon}
                           hitSlop={{ top: 5, right: 0, bottom: 5, left: 0 }}
                        />
                     )}
                  >
                     {tag}
                  </Chip>
               ))}
            </View>
         </ScrollView>
         <View aria-hidden style={[styles.inputContainer]}>
            <Text variant='titleLarge'>#</Text>
            <TextInput
               autoFocus={inputHeight >= 1}
               testID='tags-input'
               aria-valuemax={60}
               maxLength={60}
               value={tags}
               blurOnSubmit={false}
               onSubmitEditing={tagHandler}
               style={[styles.input]}
               onChangeText={(text) => {
                  let newText = text.replace(/[^a-zA-Z0-9]/g, '');
                  setTags(newText);
               }}
            />
            <IconButton
               accessibilityLabel='add tag'
               style={[styles.button]}
               onPress={tagHandler}
               hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
               renderIcon={() => (
                  <AntDesign name='pluscircleo' size={ICONS.MEDIUM} color={colors.primary} />
               )}
            />
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      marginHorizontal: '5%',
      overflow: 'scroll',
      flex: 1,
      // height: height * 0.4,
   },
   chipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
   tagsNotFound: {
      width: '100%',
      marginTop: '25%',
      textAlign: 'center',
      opacity: 0.8,
   },
   chips: {
      height: 45,
      margin: 5,
      borderRadius: 10,
   },
   inputContainer: {
      marginHorizontal: 10,
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
      zIndex: 5000,
      right: 25,
   },
   closeIcon: {
      position: 'relative',
      left: '30%',
   },
});

export default Tags;
