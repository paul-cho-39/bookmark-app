import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { BaseUserLogProps } from '../library/@types/timerData';
import { height as HEIGHT, height } from '../library/helper';
import { StyleProp, ViewStyle } from 'react-native';

const DARKEN_BY_DEFAULT = -8;

const ModeEnum = {
   small: 'small',
   large: 'large',
} as const;
type Mode = (typeof ModeEnum)[keyof typeof ModeEnum];

const PageParamKeysEnum = {
   from: 'pageFrom',
   to: 'pageTo',
} as const;
type PageParamKeys = (typeof PageParamKeysEnum)[keyof typeof PageParamKeysEnum];

// not being used
const NoteHeaderIconEnum = {
   tags: 'tags',
   theme: 'theme',
   delete: 'delete',
} as const;
type NoteHeaderIconTypes = (typeof NoteHeaderIconEnum)[keyof typeof NoteHeaderIconEnum];

type NoteThemeParamKeys = 'background' | 'theme';
type PublishedNoteType = 'PUBLIC NOTE' | 'PRIVATE NOTE';

enum NotesFontSize {
   ExtraSmall = 10,
   Emall = 12,
   Medium = 16,
   Large = 20,
   ExtraLarge = 24,
}

enum NoteDarkColor {
   Default = '#1B1B1F',
   SeaGreen = '#2E8B57', // O
   Chocolate = '#D2691E', // O
   DarkGoldenrod = '#B8860B', // O
   DarkViolet = '#9400D3', // A
   Indigo = '#4B0082', // A
   DarkRed = '#8B0000', // A
   Firebrick = '#B22222', // C
   MediumPurple = '#9370DB', // A
}

enum NoteLightColor {
   Default = '#FEFBFF',
   PaleOrange = '#FFEDCC',
   PaleChocolate = '#ECD9C6',
   PaleGoldenrod = '#FAFAD2',
   Thistle = '#D8BFD8',
   PaleIndigo = '#9FA8DA',
   MistyRose = '#FFE4E1',
   Linen = '#FAF0E6',
   PinkLace = '#FFDDF4',
}

let TextColorEnum = {
   default: '#000000',
   blue: '#0000FF',
   green: '#008000',
   red: '#FF0000',
   darkRed: '#8b0000',
   purple: '#800080',
   orange: '#FFA500',
   darkBlue: '#00008B',
   lightBlue: '#ADD8E6',
   teal: '#008080',
} as const;

// IF IT IS POSSIBLE SHOULD TRY TO TEST OUT AND CREATE ENUM FOR DARKENING COLOR
const CONTENT = {
   DEFAULT_TITLE: 'Title',
};

enum NoteMargins {
   TagHeader = 0.05,
}

// TODO: convert this to an object
enum NotesHeightParams {
   _ScrollView = 0.45,
   QuillEditorHeight = 80,
   TagsModalHeight = HEIGHT * 0.65,
   TagsScrollView = HEIGHT * NotesHeightParams._ScrollView,
   TagsInputScrollView = HEIGHT * (NotesHeightParams._ScrollView - NoteMargins.TagHeader * 2),
}

interface NoteAppbarParams {
   params: Omit<BaseUserLogProps, 'uid'>;
   colors: MD3Colors;
   style?: StyleProp<ViewStyle>;
}

interface NoteModalParams extends NoteAppbarParams {
   onCloseModal: () => void;
}

// ---------- MODALS --------------
type ModalName = 'url' | 'textColor' | 'textBgColor' | 'extraEditor';

interface ModalStateType<
   TName extends ModalName,
   TData = null | string | Record<string, string | boolean>
> {
   name: TName;
   isVisible: boolean;
   shouldFocusAfter: boolean;
   modalData: TData;
}
const INITIAL_MODAL_STATE: ModalStateType<ModalName, any>[] = [
   {
      name: 'url',
      isVisible: false,
      shouldFocusAfter: true,
      modalData: null,
   },
   {
      name: 'textColor',
      isVisible: false,
      shouldFocusAfter: true,
      modalData: '',
   },
   {
      name: 'textBgColor',
      isVisible: false,
      shouldFocusAfter: true,
      modalData: '',
   },
   {
      name: 'extraEditor',
      isVisible: false,
      shouldFocusAfter: true,
      modalData: {},
   },
];

// ------------Notes Editor Icons ------------
const ExtraEditorInlineToolsIconEnum = [
   'format-bold',
   'format-italic',
   'format-underline',
   'format-strikethrough',
] as const;

const ExtraEditorAlignmentsIconEnum = [
   'format-align-left',
   'format-align-center',
   'format-align-right',
] as const;

type FormatTypeKeys = 'align' | 'inline';
type FormatTypeParams = {
   align?: string;
   inline?: string[];
};
type ExtraEditorInlineToolsIcon =
   | 'format-bold'
   | 'format-italic'
   | 'format-underline'
   | 'format-strikethrough';
type ExtraEditorIndentsIcon = 'format-indent-increase' | 'format-indent-decrease';
type ExtraEditorAlignmentsIcon = 'format-align-left' | 'format-align-center' | 'format-align-right';

type ExtraEditorIconType =
   | ExtraEditorInlineToolsIcon
   | ExtraEditorIndentsIcon
   | ExtraEditorAlignmentsIcon;

type ExtraEditorButton<T extends ExtraEditorIconType> = {
   name: T;
   onPress: () => void | undefined;
};

type SelectableButton = ExtraEditorButton<
   ExtraEditorInlineToolsIcon | ExtraEditorAlignmentsIcon
> & { selected: boolean };
type IndentButton = ExtraEditorButton<ExtraEditorIndentsIcon>;

type ExtraEditorButtonParams = SelectableButton | IndentButton;

const EDITOR_HEIGHT = 55;
const MODAL_STYLES = {
   MODAL_HEIGHT: 130,
   BORDER_RADIUS: 25,
} as const;

export {
   Mode,
   PageParamKeys,
   NoteThemeParamKeys,
   NoteHeaderIconTypes,
   PublishedNoteType,
   NotesFontSize,
   NoteDarkColor,
   NoteLightColor,
   NoteAppbarParams,
   CONTENT,
   DARKEN_BY_DEFAULT,
   INITIAL_MODAL_STATE,
   NotesHeightParams,
   NoteModalParams,
   TextColorEnum,
   ModalName,
   ModalStateType,
   FormatTypeKeys,
   FormatTypeParams,
   ExtraEditorIconType,
   ExtraEditorButtonParams,
   ExtraEditorButton,
   ExtraEditorInlineToolsIcon,
   ExtraEditorIndentsIcon,
   ExtraEditorAlignmentsIcon,
   ExtraEditorInlineToolsIconEnum,
   ExtraEditorAlignmentsIconEnum,
   EDITOR_HEIGHT,
   MODAL_STYLES,
};
