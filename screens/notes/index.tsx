import NoteLayout from '../components/notes/noteLayout';
import useGetKeyboardHeight from '../../library/hooks/useGetKeyboardHeight';

import { NotesNavigationProp } from '../../library/@types/navigation';
import Notepad from '../components/notes/notepad';
// when the modal is being loaded have to show the sign

interface AddNotesProp {}

const Notes = ({ navigation, route }: NotesNavigationProp) => {
   const keyboardHeight = useGetKeyboardHeight();
   const { logIndex, id } = route.params.params;
   const params = { id, logIndex };

   return (
      <NoteLayout>
         <Notepad keyboardHeight={keyboardHeight} params={params} />
      </NoteLayout>
   );
};

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
