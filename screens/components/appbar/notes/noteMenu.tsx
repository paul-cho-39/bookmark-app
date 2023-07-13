import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import HeaderMenuIcon from '../../../../components/menu/headerMenuIcon';
import { IconMenuItem, MenuItemTypes } from '../../../../library/@types/params';
import { setNoteMenuModals } from '../../../../library/zustand/logic/connector-logic';
import { NoteAppbarParams } from '../../../../constants';
import { IHandles } from 'react-native-modalize/lib/options';
import { setNoteAttributes } from '../../../../library/zustand/logic/bounded-logic';
import useBoundedStore from '../../../../library/zustand/store';
import useConnectStore from '../../../../library/zustand/connectStore';

interface IconMenuProps extends NoteAppbarParams {
   refManager: Record<string, React.RefObject<IHandles>>;
   openModal: (ref: React.RefObject<IHandles>) => void;
   size: number;
}

const NoteMenuItems: React.FC<IconMenuProps> = ({
   params,
   refManager,
   openModal,
   colors,
   size,
   style,
}) => {
   const menuItemTypes = Object.values(MenuItemTypes).flat() as IconMenuItem[];
   const favorite = useBoundedStore(
      (state) => state.notes[params.id][params.logIndex].attr.favorite
   );

   const isTrashVisible = useConnectStore((state) => state.modal.note.isTrashVisible);
   console.log('is it visible?:', isTrashVisible);

   const handleMenuPress = (item: IconMenuItem | string) => {
      if (typeof item === 'string') return; // for typescript

      switch (item.handler.type) {
         case 'modalize':
            const currentRef = refManager[item.handler.name];
            openModal(currentRef);
            break;
         case 'modal':
            console.log(item.handler.name);
            setNoteMenuModals(item.handler.name as any, true);
            break;
         case 'toggle':
            if (item.handler.name === 'favorite') {
               console.log('pressed');
               const toggleNotes = setNoteAttributes(params.id, params.logIndex);
               toggleNotes('favorite', !favorite);
            }
            break;
         default:
            break;
      }
   };

   return (
      <>
         <HeaderMenuIcon
            headerIcon='dots-three-vertical'
            color={colors.onSurface}
            iconSize={size}
            highlighterColor={colors.outline}
            menuItems={menuItemTypes}
            onMenuPress={handleMenuPress}
            favoriteIcon={favorite ? 'star' : 'star-o'}
         />
      </>
   );
};

export default NoteMenuItems;

// these will be modals:
// trash, share-variant, insert-emoticon

// these will be modalize:
//  info-outline, label

// toggler: favorite

// search should be at the header (M?)

// info-outline will be info-outline and there will be none
