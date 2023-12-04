import { useState } from 'react';
import { TextStyle } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';

type TextAlign = TextStyle['textAlign'];

function useRichTextEditor(colors: MD3Colors) {
   const [isBold, setIsBold] = useState(false);
   const [isItalic, setIsItalic] = useState(false);
   const [isUnderlined, setIsUnderlined] = useState(false);
   const [fontSize, setFontSize] = useState(14);
   const [textAlign, setTextAlign] = useState<TextAlign>('left');
   const [color, setColor] = useState(colors.onBackground);

   const toggleBold = () => {
      setIsBold(!isBold);
   };

   const toggleItalic = () => {
      setIsItalic(!isItalic);
   };

   const toggleUnderline = () => {
      setIsUnderlined(!isUnderlined);
   };

   // use flatList inside the menu(?)
   const changeFontSize = (newFont: number) => {
      setFontSize(newFont);
   };

   const changeTextAlign = (type: TextAlign) => {
      type && setTextAlign(type);
   };

   const changeTextColor = (newColor: string) => {
      setColor(newColor);
   };

   const textStyle: TextStyle = {
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecorationLine: isUnderlined ? 'underline' : 'none',
      fontSize: fontSize,
      textAlign: textAlign,
      color: color,
   };

   const editors = {
      text: [
         {
            name: 'bold',
            value: isBold,
            icon: 'format-bold',
            handler: toggleBold,
         },
         {
            name: 'italic',
            value: isItalic,
            icon: 'format-italic',
            handler: toggleItalic,
         },
         {
            name: 'underline',
            value: isUnderlined,
            icon: 'format-underline',
            handler: toggleUnderline,
         },
      ],
      size: {
         name: 'size',
         value: fontSize,
         icon: fontSize,
         handler: changeFontSize,
      },
      align: [
         {
            name: 'align to left',
            value: 'left',
            icon: 'format-align-left',
            handler: () => changeTextAlign('left'),
         },
         {
            name: 'align to center',
            value: 'center',
            icon: 'format-align-center',
            handler: () => changeTextAlign('center'),
         },
         {
            name: 'align to right',
            value: 'right',
            icon: 'format-align-right',
            handler: () => changeTextAlign('right'),
         },
      ],
      color: {
         name: 'font color',
         value: color,
         icon: 'text-format',
         handler: changeTextColor,
      },
   };

   return { textStyle, editors };
}

type RichTextEditorReturnType = ReturnType<typeof useRichTextEditor>;
export type EditorType = RichTextEditorReturnType['editors'];

export default useRichTextEditor;
