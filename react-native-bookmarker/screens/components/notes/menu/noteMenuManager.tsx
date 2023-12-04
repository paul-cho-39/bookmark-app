import React from 'react';
import { NoteAppbarParams } from '../../../../constants';
import { View } from 'react-native';
// import AddNoteToFavorite from './delete/noteDelete';
import { IHandles } from 'react-native-modalize/lib/options';
import { shallow } from 'zustand/shallow';
import useConnectStore from '../../../../library/zustand/connectStore';

interface NoteMenuManagerParams extends NoteAppbarParams {
   refManager: Record<string, React.RefObject<IHandles>>;
   closeModal: () => void;
}

const NoteMenuManager = ({
   refManager,
   closeModal,
   params,
   colors,
   style,
}: NoteMenuManagerParams) => {
   // dont think params are necesary here
   const [noteMenuModals] = useConnectStore((state) => [state.modal.note], shallow);

   const NoteTagsDrawer = React.lazy(() => import('./tags/noteTagsDrawer'));
   const AddNoteToFavorite = React.lazy(() => import('./delete/noteDelete'));

   return (
      <View>
         <NoteTagsDrawer
            params={params}
            colors={colors}
            ref={refManager.tagModal}
            onCloseModal={closeModal}
         />
         <AddNoteToFavorite params={params} colors={colors} />
      </View>
   );
};

export default NoteMenuManager;

// for note toggle:
//
