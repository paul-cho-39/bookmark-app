import { Button, Card, Dialog, Portal, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUrl, postFetch, queryKeys } from '../../library/helper/react-query';

interface ButtonDisplayProps {
   id: string;
   uid: string;
}

export const ButtonDisplay = ({ id, uid }: ButtonDisplayProps) => {
   const [visible, setVisible] = useState(false);
   const showDialog = () => setVisible(true);
   const hideDialog = () => setVisible(false);

   const { mutate } = useMutation(queryKeys.userId(uid as string), () =>
      postFetch(getUrl.library.file.addBooks(uid as string, id).reading)
   );

   return (
      <>
         <Card.Actions>
            <Button onPress={showDialog} mode='elevated'>
               Add Button
            </Button>
            <Portal>
               <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
                  <Dialog.Content>
                     <Text variant='headlineSmall'>Edit your library</Text>
                     <Dialog.Actions style={styles.buttonWrapper}>
                        <Button>Save Book</Button>
                        <Button>Delete Book</Button>
                        <Button onPress={() => mutate()}>Reading</Button>
                     </Dialog.Actions>
                  </Dialog.Content>
               </Dialog>
            </Portal>
         </Card.Actions>
      </>
   );
};

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      width: '100%',
   },
   dialog: {
      position: 'absolute',
      right: 0,
      left: -25,
      bottom: -50,
      height: 200,
      width: '100%',
   },
   buttonWrapper: {
      display: 'flex',
      flexDirection: 'column',
   },
});
