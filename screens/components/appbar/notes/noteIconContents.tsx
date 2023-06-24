import { useEffect, useLayoutEffect, useState } from 'react';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import BottomDrawer from '../../../../components/bottomDrawer';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import useGetKeyboardHeight from '../../../../library/hooks/useGetKeyboardHeight';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Tags from './noteTags';
import { ICONS } from '../../../../constants';
import NoteTagHeader from './noteTagHeader';
import { NoteTagsParams } from '../../../../library/zustand/utils/notes/retriever';
import RealmContext from '../../../../library/realm';
import useRenderCount from '../../../../library/hooks/useRenderCount';
import NoteTagsDrawer from './noteTagsDrawer';

export interface NoteIconContentsProps {
   colors: MD3Colors;
   params: { logIndex: number; id: string; uid: string };
   // noteTags: NoteTagsParams;
}

const NoteIconContents = ({ params, colors }: NoteIconContentsProps) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;
   const [isDrawerVisible, setDrawerVisible] = useState(false);
   const [shouldAddTags, setShouldAddTags] = useState(false);
   const keyboardHeight = useGetKeyboardHeight();

   useRenderCount('contents');

   return (
      <>
         {/* add more icons here */}
         <IconButton
            onPress={() => setDrawerVisible(true)}
            style={{}}
            renderIcon={() => (
               <AntDesign name='tagso' color={colors.onSurface} size={ICONS.LARGE} />
            )}
         />
         <NoteTagsDrawer
            isDrawerVisible={isDrawerVisible}
            setDrawerVisible={setDrawerVisible}
            colors={colors}
            params={params}
            // noteTags={noteTags}
         />
      </>
   );
};

const styles = StyleSheet.create({
   bottomDrawer: {
      borderWidth: 0,
      borderRadius: 10,
   },
   container: {
      flex: 1,
      width: '100%',
   },
});

export default NoteIconContents;
