import { Controller, Control } from 'react-hook-form';
import { View, StyleProp } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

import type { LoginFormValues } from '../../library/@types/control';
import LightTheme from '../../library/themes/lightTheme';

interface InputProps<T extends LoginFormValues | Pick<LoginFormValues, 'email'>> {
   control: Control<T, any>;
   name: keyof T | any; // one of T
   isRequired: boolean;
   displayRight?: React.ReactNode;
   isPassword?: boolean;
   shouldDisplayError?: boolean;
   labelColor?: string;
   onFocus?: () => void;
   mode?: 'flat' | 'outlined';
   contentStyle?: StyleProp<any>;
   outlineStyle?: StyleProp<any>;
   style?: StyleProp<any>;
   inputMode?: 'none' | 'email' | 'url';
}

const Inputs = <T extends LoginFormValues | Pick<LoginFormValues, 'email'>>({
   control,
   name,
   style,
   contentStyle,
   outlineStyle,
   isPassword = false,
   shouldDisplayError = true,
   isRequired = true,
   labelColor,
   onFocus,
   displayRight,
   mode = 'flat',
   inputMode = 'email',
}: InputProps<T>) => {
   // Refactor and possibly label is not even needed?
   // onDirty or onFocus the color should change
   const nameCopy = name;
   const firstLetter = nameCopy.slice(0, 1);
   const rest = nameCopy.slice(1);
   const newName = firstLetter.toUpperCase() + rest;

   const labelText = (
      <Text
         style={{
            color: LightTheme.colors.primary,
            backgroundColor: mode === 'outlined' ? labelColor : 'transparent',
            paddingTop: 3,
            elevation: 1,
            zIndex: 1,
         }}
      >
         {newName}
      </Text>
   );
   return (
      <View>
         <Controller
            control={control}
            name={name}
            rules={{ required: { value: isRequired, message: 'The following field is required' } }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
               <View>
                  <TextInput
                     inputMode={inputMode}
                     mode={mode}
                     onBlur={onBlur}
                     value={value}
                     label={labelText}
                     aria-label={newName}
                     onChangeText={onChange}
                     selectTextOnFocus={true}
                     outlineColor={LightTheme.colors.onPrimary}
                     activeOutlineColor={LightTheme.colors.primary}
                     underlineColor={LightTheme.colors.onSurface}
                     secureTextEntry={isPassword}
                     contentStyle={contentStyle}
                     outlineStyle={outlineStyle}
                     style={style}
                     right={displayRight as React.ReactNode}
                     onFocus={onFocus}
                  />
                  <Text
                     style={{
                        color: 'red',
                        marginVertical: shouldDisplayError && error?.message ? 3 : 0,
                        marginHorizontal: 5,
                     }}
                  >
                     {shouldDisplayError && error?.message}
                  </Text>
               </View>
            )}
         />
      </View>
   );
};

export default Inputs;
