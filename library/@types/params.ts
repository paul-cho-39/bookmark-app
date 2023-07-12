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
         type: 'toggle',
         name: 'not defined',
      },
   },
   tags: {
      title: 'Tags',
      icon: 'tag-outline',
      library: 'MaterialCommunityIcons',
      handler: {
         type: 'modal',
         name: 'isTagsVisible',
      },
   },
   info: {
      title: 'Info',
      icon: 'info-outline',
      library: 'MaterialIcons',
      handler: {
         type: 'modal',
         name: 'isInfoVisible',
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
         name: 'not defined',
      },
   },
   trash: {
      title: 'Trash',
      icon: 'trash-o',
      library: 'FontAwesome',
      handler: {
         type: 'modal',
         name: 'isTrashVisible',
      },
   },
} as const;

export type MenuItems = string | IconMenuItem;
