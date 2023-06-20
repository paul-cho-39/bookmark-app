import { TextInput, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput as NativeInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SearchProps } from '../../../../library/@types/navigation';
import useConnectStore from '../../../../library/zustand/connectStore';
import {
   resetQuery,
   setQuery,
   setSubmittedQuery,
} from '../../../../library/zustand/logic/connector-logic';

interface TextInputProps {
   displayCloseIcon: boolean;
   disabled?: boolean;
}

const TOUCHED_ICON = 22;
const UNTOUCHED_ICON = 20;

const ControlledTextInput = ({ displayCloseIcon, disabled = false }: TextInputProps) => {
   const { colors } = useTheme();

   const query = useConnectStore((state) => state.inputs.query);
   const [shouldFocus, setShouldFocus] = useState(false);
   const navigation = useNavigation<SearchProps['navigation']>();
   const route = useRoute();

   const adjustIconSize = displayCloseIcon ? TOUCHED_ICON : UNTOUCHED_ICON;

   const handleButtonPress = () => {
      setTimeout(() => {
         navigation.navigate('Search');
      }, 100);
   };

   // 03/28/23 - keyboard pops up and deleting the addListener
   useEffect(() => {
      if (route.name === 'Search') {
         setShouldFocus(true);
      }
   }, [navigation, route, setQuery, setShouldFocus]);

   return (
      <View
         style={[
            styles.container,
            !shouldFocus ? styles.unfocusedContainer : styles.focusedContainer,
            { backgroundColor: shouldFocus ? colors.backdrop : colors.inverseOnSurface },
         ]}
      >
         <Ionicons
            name='ios-search-outline'
            size={adjustIconSize}
            color={colors.onBackground}
            onPress={handleButtonPress}
            style={styles.icon}
         />
         <TextInput
            onPressIn={handleButtonPress}
            onSubmitEditing={() => setSubmittedQuery(query)}
            blurOnSubmit={true}
            autoFocus={shouldFocus}
            testID='main-search-bar'
            accessibilityRole='search'
            returnKeyType='search'
            inputMode='search'
            activeUnderlineColor='transparent'
            underlineColor='transparent'
            placeholder='Title, authors, or ISBN...'
            placeholderTextColor={colors.outline}
            value={query}
            onChangeText={(text) => setQuery(text)}
            style={[styles.inputs, shouldFocus && styles.focusedInput, { color: colors.secondary }]}
            disabled={disabled}
            right={
               displayCloseIcon && (
                  <TextInput.Icon style={styles.iconClose} icon='close' onPress={resetQuery} />
               )
            }
         />
      </View>
   );
};

export default ControlledTextInput;

const styles = StyleSheet.create({
   container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: 35,
      borderWidth: 0.5,
      height: 40,
   },
   unfocusedContainer: {
      paddingLeft: 0,
      paddingRight: 15,
      marginRight: 15,
   },
   focusedContainer: {
      marginHorizontal: 10,
      width: '85%',
   },
   inputs: {
      paddingHorizontal: 15,
      backgroundColor: 'transparent',
      fontSize: 14,
      borderColor: '#ccc',
   },
   focusedInput: {
      paddingHorizontal: 20,
      fontSize: 18,
      textAlign: 'left',
   },
   icon: {
      marginLeft: 25,
      marginRight: -10,
      width: 30,
   },
   iconClose: {
      marginRight: 15,
      paddingRight: 15,
   },
});
