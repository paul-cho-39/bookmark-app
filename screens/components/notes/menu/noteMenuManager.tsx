import { shallow } from 'zustand/shallow';
import useConnectStore from '../../../../library/zustand/connectStore';
import { NoteAppbarParams } from '../../../../constants';
import { View } from 'react-native';
import NoteTagsDrawer from './tags/noteTagsDrawer';
import { IHandles } from 'react-native-modalize/lib/options';
import AddNoteToFavorite from './delete/noteDelete';

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
