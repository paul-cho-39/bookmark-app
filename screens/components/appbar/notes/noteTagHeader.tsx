import { Text, View } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import BackButton from '../../../../components/buttons/backButton';
import { FONT_SIZE, ICONS } from '../../../../constants';

interface NoteTagHeaderParams {
   isInputFocused: boolean;
   setIsDrawer: (value: boolean) => void;
   colors: MD3Colors;
}

const NoteTagHeader = ({ isInputFocused, setIsDrawer, colors }: NoteTagHeaderParams) => {
   const onPressTags = () => {
      if (isInputFocused) setIsDrawer(false);
      return;
   };

   return (
      <View
         style={{
            margin: '4%',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
         }}
      >
         <Text
            style={{
               ...FONT_SIZE.title.extraSmall,
               fontWeight: 'bold',
               color: colors.onBackground,
               flexGrow: 0.56, // should subtract from margin
            }}
         >
            Tags
         </Text>
         <BackButton
            name='arrow-back'
            color={colors.onSurface}
            size={ICONS.MEDIUM}
            onPress={onPressTags}
            isHighlighted={true}
            activeOpacity={0.68}
            highlighterColor={colors.primary}
         />
      </View>
   );
};

export default NoteTagHeader;
