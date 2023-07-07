import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextInput } from 'react-native';

import TitleInput from './titleInput';
import PageInput from './pageInput';
import NoteDates from './noteDates';

import { NoteAppbarParams, PageParamKeys } from '../../../../constants';
import { width } from '../../../../library/helper';
import { setNoteAttributes } from '../../../../library/zustand/logic/bounded-logic';

import useBoundedStore from '../../../../library/zustand/store';
import { convertPage } from '../../../../library/zustand/utils/notes/converter';
import { shallow } from 'zustand/shallow';

interface EditableAppbarProps extends NoteAppbarParams {
   onBlur: () => void;
   style?: StyleProp<ViewStyle>;
}

const EditableAppbar = ({ params, colors, onBlur, style }: EditableAppbarProps) => {
   const { id, logIndex } = params;
   const [noteAttributes, noteDates] = useBoundedStore(
      (state) => [state.notes[id][logIndex].attr, state.notes[id][logIndex].dates],
      shallow
   );

   const { chapter, title, pageFrom, pageTo, isPrivate } = noteAttributes;
   const { start: createdAt, lastEdited } = noteDates;

   const [isTitleFocused, setTitleFocused] = useState(false);
   const [isSubtitleFocused, setSubtitleFocused] = useState(false);
   const [isPageFromFocused, setIsPageFromFocused] = useState(false);
   const [isPageToFocused, setIsPageToFocused] = useState(false);

   const titleRef = useRef<TextInput>(null);
   const chapterRef = useRef<TextInput>(null);
   const pageFromRef = useRef<TextInput>(null);
   const pageToRef = useRef<TextInput>(null);

   useEffect(() => {
      const timerId = setTimeout(() => {
         if (!isTitleFocused && !isSubtitleFocused && !isPageFromFocused && !isPageToFocused) {
            onBlur();
         }
      }, 50);

      return () => clearTimeout(timerId);
   }, [isTitleFocused, isSubtitleFocused, isPageFromFocused, isPageToFocused]);

   const getParams = (key: 'from' | 'to') =>
      key === 'from'
         ? {
              keys: 'pageFrom' as PageParamKeys,
              page: pageFrom,
           }
         : {
              keys: 'pageTo' as PageParamKeys,
              page: pageTo,
           };

   const setNotePage = (type: PageParamKeys) => (text: string) => {
      const setPage = setNoteAttributes(id, logIndex);
      setPage && setPage(type, text, convertPage);
   };

   const setNoteContent = (type: 'chapter' | 'title') => (text: string) => {
      const setContents = setNoteAttributes(id, logIndex);
      setContents && setContents(type, text);
   };

   // TODO: the background color should be changed on the basis of notebook color
   // use global state to control this part
   return (
      <View style={styles.container}>
         <View style={styles.contentWrapper}>
            <View style={[style, styles.titleContainer]}>
               <TitleInput
                  inputRef={titleRef}
                  nextRef={chapterRef}
                  value={title}
                  onChangeText={setNoteContent('title')}
                  autofocus={true}
                  placeholder='Title'
                  colors={colors}
                  size={'large'}
                  isFocused={isTitleFocused}
                  setIsFocused={setTitleFocused}
               />
            </View>
            <NoteDates dateTime={createdAt} colors={colors} style={styles.dateContainer} />
         </View>
         <View style={styles.subcontentWrapper}>
            <View style={[styles.subtitleContainer, style]}>
               <TitleInput
                  inputRef={chapterRef}
                  nextRef={pageFromRef}
                  value={chapter}
                  onChangeText={setNoteContent('chapter')}
                  placeholder='Chapter'
                  colors={colors}
                  size={'medium'}
                  isFocused={isSubtitleFocused}
                  setIsFocused={setSubtitleFocused}
               />
            </View>
            {/* page reference */}
            <View>
               <PageInput
                  inputRef={pageFromRef}
                  nextRef={pageToRef}
                  colors={colors}
                  isFocused={isPageFromFocused}
                  setIsFocused={setIsPageFromFocused}
                  params={getParams('from')}
                  setPage={setNotePage('pageFrom')}
               />
               <PageInput
                  inputRef={pageToRef}
                  colors={colors}
                  isFocused={isPageToFocused}
                  setIsFocused={setIsPageToFocused}
                  params={getParams('to')}
                  setPage={setNotePage('pageTo')}
               />
            </View>
         </View>
      </View>
   );
};

const HORIZONTAL = 7;
const SUBTITLE_WIDTH = width * 0.55;

const styles = StyleSheet.create({
   container: {
      width: width,
      overflow: 'hidden',
   },
   contentWrapper: {
      flexDirection: 'row',
   },
   titleContainer: {
      width: '70%',
      paddingHorizontal: `${HORIZONTAL}%`,
   },
   dateContainer: {
      position: 'absolute',
      right: 0,
   },
   subcontentWrapper: {
      flexDirection: 'row',
      paddingHorizontal: `${HORIZONTAL}%`,
   },
   subtitleContainer: {
      width: SUBTITLE_WIDTH,
   },
});

export default React.memo(EditableAppbar);
