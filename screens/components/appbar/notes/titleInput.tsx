import { LayoutChangeEvent, StyleSheet, TextInput as NativeInput } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { FONT_SIZE } from '../../../../assets/constants';
import { EditableHeaderParams } from '../../../../library/zustand/utils/notes/retriever';
import { useImperativeHandle } from 'react';

export interface TitleInputProps<
   TInput extends EditableHeaderParams['title'] | EditableHeaderParams['pageFrom']
> {
   value: EditableHeaderParams['title'];
   onChangeText: (text: TInput) => void;
   isFocused: boolean;
   setIsFocused: (value: boolean) => void;
   placeholder: string;
   colors: MD3Colors;
   size: keyof typeof FONT_SIZE;
   keyboardType?: 'numeric' | 'default';
   onLayout?: (event: LayoutChangeEvent) => void;
   autofocus?: boolean;
   inputRef?: React.RefObject<NativeInput>;
   nextRef?: React.RefObject<NativeInput>;
}

const TitleInput = <
   TInput extends EditableHeaderParams['title'] | EditableHeaderParams['pageFrom']
>(
   {
      value,
      onChangeText,
      isFocused,
      setIsFocused,
      placeholder,
      colors,
      size,
      keyboardType = 'default',
      onLayout,
      autofocus = false,
      inputRef,
      nextRef,
   }: // onSubmitEditing,
   TitleInputProps<TInput>,
   ref: React.Ref<null>
) => {
   const getSize = FONT_SIZE[size];
   const getMaxLength = keyboardType == 'default' ? 60 : 5;

   const handleChangeText = (text: string) => {
      keyboardType === 'numeric'
         ? onChangeText(parseInt(text, 10) as unknown as TInput)
         : onChangeText(text as unknown as TInput);
   };

   const onSubmitEditing = (ref?: React.RefObject<NativeInput>) => {
      if (ref && ref?.current) {
         ref.current?.focus();
      }
   };

   return (
      <>
         <TextInput
            ref={inputRef}
            autoFocus={autofocus}
            placeholder={placeholder}
            accessibilityLabel={value?.toString()}
            value={value?.toString()}
            placeholderTextColor={colors.onSurfaceDisabled}
            keyboardType={keyboardType}
            returnKeyType='next'
            activeUnderlineColor='transparent'
            underlineColor='transparent'
            spellCheck={keyboardType === 'default'}
            selectionColor={colors.onPrimaryContainer}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={getMaxLength}
            onLayout={onLayout}
            onSubmitEditing={() => onSubmitEditing(nextRef)}
            style={{ ...styles.input, ...getSize }}
         />
      </>
   );
};

const styles = StyleSheet.create({
   input: {
      backgroundColor: 'transparent',
      width: '100%',
   },
});

export default TitleInput;
