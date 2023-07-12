import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import HeaderMenuIcon from '../../../../components/menu/headerMenuIcon';
import { IconMenuItem, MenuItemTypes } from '../../../../library/@types/params';
import { setNoteMenuModals } from '../../../../library/zustand/logic/connector-logic';
import useConnectStore from '../../../../library/zustand/connectStore';

interface IconMenuProps {
   colors: MD3Colors;
   size: number;
}

const NoteMenuItems: React.FC<IconMenuProps> = ({ colors, size }) => {
   const menuItemTypes = Object.values(MenuItemTypes).flat() as IconMenuItem[];

   const handleMenuPress = (item: IconMenuItem | string) => {
      if (typeof item === 'string') return; // for typescript sake

      item.handler.type === 'modal'
         ? setNoteMenuModals(item.handler.name as any, true)
         : console.log('pressed');
   };

   const note = useConnectStore((state) => state.modal.note);
   console.log('NOTE MODALS:', note);

   return (
      <>
         <HeaderMenuIcon
            headerIcon='dots-three-vertical'
            color={colors.onSurface}
            iconSize={size}
            menuStyle={{ paddingHorizontal: 10 }}
            menuItems={menuItemTypes}
            onMenuPress={handleMenuPress}
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
