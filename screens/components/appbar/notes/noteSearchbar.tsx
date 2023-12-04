import { Keyboard, StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { setQuery } from '../../../../library/zustand/logic/connector-logic';
import useConnectStore from '../../../../library/zustand/connectStore';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import ChevronArrowButton from '../../../../components/buttons/icons/chevronArrowButton';
import { ICONS } from '../../../../constants';

const NoteSearchBar = ({ colors }: { colors: MD3Colors }) => {
   const query = useConnectStore((state) => state.inputs.noteQuery);

   const displayCloseIcon = query.length >= 1;
   const resetQuery = () => {
      setQuery('noteQuery', '');
   };

   // 1) custom back handler (c)
   // 2) on the right-hand side there should be chevron up and down (c)
   // 3) close-button that resets the query (c)
   // 4) if focus on quillJS display to false
   return (
      <>
         <TextInput
            autoFocus
            accessibilityRole='search'
            accessibilityHint='search query in notes'
            onSubmitEditing={() => Keyboard.dismiss()}
            blurOnSubmit={true}
            returnKeyType='search'
            inputMode='search'
            activeUnderlineColor='transparent'
            underlineColor='transparent'
            cursorColor='orange'
            placeholder='Search'
            placeholderTextColor={colors.outline}
            value={query}
            onChangeText={(text) => setQuery('noteQuery', text)}
            right={
               displayCloseIcon && (
                  <TextInput.Icon style={styles.iconClose} icon='close' onPress={resetQuery} />
               )
            }
            style={[styles.inputs, { color: colors.secondary }]}
         />
         <View
            style={{
               position: 'absolute',
               //    backgroundColor: 'red',
               right: '3%',
               flexDirection: 'row',
               alignSelf: 'center',
               justifyContent: 'space-evenly',
            }}
            collapsable
         >
            <ChevronArrowButton
               iconName='chevron-up'
               size={ICONS.EXTRA_LARGE}
               highlighterColor={colors.outline}
               style={{
                  paddingHorizontal: 2,
               }}
               handleDirection={() => console.log('pressed chevron')}
            />
            <ChevronArrowButton
               iconName='chevron-down'
               size={ICONS.EXTRA_LARGE}
               highlighterColor={colors.outline}
               style={{ paddingHorizontal: 2 }}
               handleDirection={() => console.log('pressed chevron')}
            />
         </View>
      </>
   );
};

// padding button total of 8% + 32

const styles = StyleSheet.create({
   inputs: {
      backgroundColor: 'transparent',
      width: '60%',
      marginEnd: '27%',
      alignSelf: 'center',
      fontSize: 18,
      borderColor: '#ccc',
   },
   iconClose: {
      position: 'absolute',
      elevation: 10,
   },
});

export default NoteSearchBar;
