import HeaderMenuIcon from '../../../components/menu/headerMenuIcon';
import settings from '../../../assets/paper-themes/settings.json';

interface HomeMenuDisplayProps {
   showModalDate: (value: boolean) => void;
   showModalEdit: (value: boolean) => void;
   showModalDelete: (value: boolean) => void;
}

const HomeMenuDisplay = ({
   showModalDate,
   showModalEdit,
   showModalDelete,
}: HomeMenuDisplayProps) => {
   const { homeMenuSettings } = settings;
   const handlePress = (item: (typeof homeMenuSettings)[number]) => {
      switch (item) {
         case 'Change dates':
            showModalDate(true);
            break;
         case 'Edit primary':
            showModalEdit(true);
            break;
         case 'Delete book':
            showModalDelete(true);
            break;
         default:
            console.error('Invalid menu item:', item);
      }
   };

   return (
      <>
         <HeaderMenuIcon
            headerIcon='dots-three-vertical'
            menuItems={homeMenuSettings}
            onMenuPress={handlePress}
         />
      </>
   );
};

export default HomeMenuDisplay;
