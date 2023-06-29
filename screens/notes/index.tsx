import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import NoteLayout from '../components/notes/noteLayout';
import { height as HEIGHT, width as WIDTH } from '../../library/helper';
import useGetKeyboardHeight from '../../library/hooks/useGetKeyboardHeight';
import { useFocusEffect } from '@react-navigation/native';
import useBoundedStore from '../../library/zustand/store';
import { NotesNavigationProp } from '../../library/@types/navigation';
import Notepad from '../components/notes/notepad';
import { useEffect } from 'react';
// when the modal is being loaded have to show the sign

interface AddNotesProp {}

const Notes = ({ navigation, route }: NotesNavigationProp) => {
   const { colors } = useTheme();
   const keyboardHeight = useGetKeyboardHeight();
   const { logIndex, id } = route.params.params;
   const params = { id, logIndex };

   return (
      <NoteLayout colors={colors}>
         {/* <ParentComponent /> */}
         <Notepad keyboardHeight={keyboardHeight} params={params} />
      </NoteLayout>
   );
};

const styles = StyleSheet.create({});
// get the height of the header && the height of the keyboard and also the sides(?);

export default Notes;

// make a header -- inside the headerRight -> "save" button
// require a) currentPage / between pages -- and ways of editing pages

// plans for making this goddman note screen:
// * wrap it with <KeyboardAvoidingView />
// * use animatedFAB for adding button styling

// features -
// a) text editing
// i) styling options --bold, italic, underline
// ii) highglither for notes(?)
// b) voice-to-text
// c) note sharing
// d) allow offline notetaking (in general have offline capability?)
// e) is there ways to connect notes(?)

// textInput -> this component will be used for a) adding tags b)

// should there be a public notebook?
// a notebook kind of like a wikipedia that can be edited and changed by people(?)
