import React, { useState } from 'react';
import IconButton from '../../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import RealmContext from '../../../../library/realm';
import useRenderCount from '../../../../library/hooks/useRenderCount';
import NoteTagsDrawer from './noteTagsDrawer';
import { ICONS } from '../../../../constants';

export interface NoteIconContentsProps {
   colors: MD3Colors;
   params: { logIndex: number; id: string; uid: string };
}

const NoteIconContents = ({ params, colors }: NoteIconContentsProps) => {
   // so this would be called at SEPARATE BACKBUTTON COMPONENT and WHEREEVER IT IS NEEDED
   const { useRealm, useObject, useQuery } = RealmContext;
   const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);
   const [isSettingDrawerVisible, setSettingDrawerVisible] = useState(false);

   useRenderCount('contents');

   return (
      <>
         {/* add more icons here */}
         <IconButton
            onPress={() => setTagDrawerVisible(true)}
            style={{}}
            renderIcon={() => (
               <AntDesign name='tagso' color={colors.onSurface} size={ICONS.LARGE} />
            )}
         />
         <IconButton
            onPress={() => setSettingDrawerVisible(true)}
            style={[]}
            renderIcon={() => (
               <AntDesign name='setting' color={colors.onSurface} size={ICONS.LARGE} />
            )}
         />
         <NoteTagsDrawer
            isDrawerVisible={isTagDrawerVisible}
            setDrawerVisible={setTagDrawerVisible}
            colors={colors}
            params={params}
         />
      </>
   );
};

export default React.memo(NoteIconContents);
