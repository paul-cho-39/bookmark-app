import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { Button } from 'react-native-paper';

export const LibraryScreen = () => {
   const modalizeRef = useRef<Modalize>(null);

   const onOpen = () => {
      modalizeRef.current?.open();
   };

   const handleOpen = () => {
      Keyboard.dismiss();
      modalizeRef.current?.open();
   };

   return (
      <>
         <TextInput style={{ width: 300, height: 50, borderWidth: 1 }} autoFocus />
         <TouchableOpacity onPress={handleOpen}>
            <Text>Open the modal</Text>
         </TouchableOpacity>

         <Modalize
            // modalHeight={500}
            adjustToContentHeight={true}
            ref={modalizeRef}
            FloatingComponent={
               <View style={{ backgroundColor: 'red', height: 500 }}>
                  <Button onPress={() => console.log('pressed')}>Pressed</Button>
               </View>
            }
            avoidKeyboardLikeIOS={true}
         >
            <View style={{ flex: 1 }}>
               <TextInput />
               <Button onPress={() => console.log('hello')}>Select</Button>
               <Text>Hello</Text>
               <Text>Hello</Text>
               <Text>Hello</Text>
            </View>
         </Modalize>
      </>
   );
};

export default LibraryScreen;
