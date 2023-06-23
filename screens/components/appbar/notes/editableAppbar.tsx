import { RefObject, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextInput } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import TitleInput from './titleInput';
import { width } from '../../../../library/helper';
import {
   createNoteParams,
   setNoteObjWithIndex,
} from '../../../../library/zustand/logic/bounded-logic';
import { EditableHeaderParams } from '../../../../library/zustand/utils/notes/retriever';
import PageInput from './pageInput';
import NoteDates from './noteDates';
import React from 'react';

interface EditableAppbarProps {
   params: EditableHeaderParams;
   colors: MD3Colors;
   onBlur: () => void;
   style?: StyleProp<ViewStyle>;
}

type ParamKeys = 'pageFrom' | 'pageTo';
type NoteContent = 'title' | 'chapter' | ParamKeys;

const EditableAppbar = ({ params, colors, onBlur, style }: EditableAppbarProps) => {
   const { id, logIndex } = params;
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
      }, 100);

      return () => clearTimeout(timerId);
   }, [isTitleFocused, isSubtitleFocused, isPageFromFocused, isPageToFocused]);

   const getParams = (key: 'from' | 'to') =>
      key === 'from'
         ? {
              keys: 'pageFrom' as ParamKeys,
              page: params.pageFrom,
           }
         : {
              keys: 'pageTo' as ParamKeys,
              page: params.pageTo,
           };

   const setNotePage = (type: ParamKeys, text: string, converter: any) => {
      const notes = setNoteObjWithIndex(id, logIndex);
      const setPage = notes && notes(type, text, converter);
      return setPage && setPage;
   };

   const setNoteContent = (type: 'chapter' | 'title') => (text: string) => {
      const setNoteContent = createNoteParams(params.id, params.logIndex, type);
      return setNoteContent && setNoteContent(text);
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
                  value={params.title}
                  // onChangeText={(text) => setTitle(text)}
                  onChangeText={setNoteContent('title')}
                  autofocus={true}
                  placeholder='Title'
                  colors={colors}
                  size={'titleLarge'}
                  isFocused={isTitleFocused}
                  setIsFocused={setTitleFocused}
               />
            </View>
            <NoteDates dateTime={params.createdAt} colors={colors} style={styles.dateContainer} />
         </View>
         <View style={styles.subcontentWrapper}>
            <View style={[styles.subtitleContainer, style]}>
               <TitleInput
                  inputRef={chapterRef}
                  nextRef={pageFromRef}
                  value={params.chapter}
                  onChangeText={setNoteContent('chapter')}
                  // onChangeText={(text) => setChapter(text)}
                  placeholder='Chapter'
                  colors={colors}
                  size={'titleMedium'}
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
                  setPage={setNotePage}
               />
               <PageInput
                  inputRef={pageToRef}
                  colors={colors}
                  isFocused={isPageToFocused}
                  setIsFocused={setIsPageToFocused}
                  params={getParams('to')}
                  setPage={setNotePage}
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
