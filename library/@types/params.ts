export type TagParams = {
   id: string;
   logIndex: number;
   realm: Realm;
   tags: string[];
};

// MENU PARAMS
// add more types here for displaying menu
export type FontAwesomeIconMenu = 'trash-o' | 'star-o';
export type MaterialCommunityIconMenu =
   | 'share-variant'
   | 'download-box-outline'
   | 'tag-outline'
   | 'magnify';
export type MaterialIconMenu = 'info-outline' | 'insert-emoticon' | 'label-outline';

export interface IconMenuItem {
   title: string;
   icon: FontAwesomeIconMenu | MaterialCommunityIconMenu | MaterialIconMenu;
   library: 'FontAwesome' | 'MaterialCommunityIcons' | 'MaterialIcons';
   handler: {
      type: 'modal' | 'toggle' | 'modalize';
      name: string;
   };
}

export const MenuItemTypes = {
   export: {
      title: 'Export',
      icon: 'share-variant',
      library: 'MaterialCommunityIcons',
      handler: {
         type: 'modal',
         name: 'isUploadNotesVisible',
      },
   },
   search: {
      title: 'Search',
      icon: 'magnify',
      library: 'MaterialCommunityIcons',
      handler: {
         type: 'modal', // though this is not a modal its a simple way to display search
         name: 'isSearchVisible',
      },
   },
   tags: {
      title: 'Tags',
      icon: 'tag-outline',
      library: 'MaterialCommunityIcons',
      handler: {
         type: 'modalize',
         name: 'tagModal',
      },
   },
   info: {
      title: 'Info',
      icon: 'info-outline',
      library: 'MaterialIcons',
      handler: {
         type: 'modalize',
         name: 'infoModal',
      },
   },
   save: {
      title: 'Save theme',
      icon: 'download-box-outline',
      library: 'MaterialCommunityIcons',
      handler: {
         type: 'toggle',
         name: 'not defined',
      },
   },
   favorite: {
      title: 'Favorite',
      icon: 'star-o',
      library: 'FontAwesome',
      handler: {
         type: 'toggle',
         name: 'favorite',
      },
   },
   trash: {
      title: 'Delete',
      icon: 'trash-o',
      library: 'FontAwesome',
      handler: {
         type: 'modal',
         name: 'isTrashVisible',
      },
   },
} as const;
