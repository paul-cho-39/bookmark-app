import React, { useState } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { Appbar, Divider, IconButton, Menu } from 'react-native-paper';
import { setNoteObjWithIndex } from '../../../../library/zustand/logic/bounded-logic';
import { PublishedNoteType } from '../../../../constants';

interface NoteSettingsProps {
   wrapperStyle: StyleProp<ViewStyle>;
   iconStyle: StyleProp<ViewStyle>;
   menuStyle: StyleProp<ViewStyle>;
   iconSize: number;
   logIndex: number;
}

const NoteSettings = ({
   iconSize,
   iconStyle,
   menuStyle,
   wrapperStyle,
   logIndex,
}: NoteSettingsProps) => {
   const [visible, setVisible] = useState(false);
   const [content, setContent] = useState<PublishedNoteType>('PUBLIC');

   const title = (content: PublishedNoteType) =>
      content == 'PUBLIC' ? 'Public note' : 'Private note';
   const item = content == 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';

   const openMenu = () => setVisible(true);
   const closeMenu = () => setVisible(false);

   const setNoteContent = (title: PublishedNoteType) => {
      const isPrivate = content === 'PRIVATE';
      setNoteContent(title);
      const updateGlobalContent = setNoteObjWithIndex(logIndex, 'isPrivate');
      setTimeout(() => {
         updateGlobalContent(isPrivate);
      }, 100);
   };

   return (
      <View style={wrapperStyle}>
         <Appbar.Content title={title(content)} onPress={() => setVisible(!visible)} />
         <Menu
            testID='note-appbar-menu'
            visible={visible}
            anchorPosition='bottom'
            anchor={
               <IconButton
                  icon='chevron-down'
                  size={iconSize}
                  onPress={openMenu}
                  style={iconStyle}
               />
            }
            onDismiss={closeMenu}
            style={menuStyle}
         >
            <Menu.Item onPress={() => setNoteContent(item)} title={title(item)} />
         </Menu>
         <Divider />
      </View>
   );
};

export default NoteSettings;
