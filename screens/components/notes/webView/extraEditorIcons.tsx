import { MaterialIcons } from '@expo/vector-icons';
import useLoadIcons, { IconParams } from '../../../../library/hooks/useLoadIcons';
import {
   StyleProp,
   TouchableHighlightProps,
   TouchableWithoutFeedback,
   View,
   ViewStyle,
} from 'react-native';
import { ExtraEditorIconType } from '../../../../constants/notes';
import { useState } from 'react';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { ICONS } from '../../../../constants';

export interface ExtraEditorIconsProps extends TouchableHighlightProps {
   iconName: ExtraEditorIconType;
   selected?: boolean;
   colors: MD3Colors;
   params: IconParams;
   style?: StyleProp<ViewStyle>;
}

const ExtraEditorIcons = ({
   iconName,
   selected = false,
   colors,
   params,
   style,
   ...props
}: ExtraEditorIconsProps) => {
   const OFFSET_BY = 8;
   const [highlight, setHighlight] = useState(false);

   const handleHighlight = (type: 'on' | 'off') => {
      const turnOff = () => {
         setTimeout(() => {
            setHighlight(false);
         }, 50);
      };
      type === 'on' ? setHighlight(true) : turnOff();
   };

   return (
      <TouchableWithoutFeedback
         accessibilityRole='button'
         accessibilityLabel={iconName}
         onPressIn={() => handleHighlight('on')}
         onPressOut={() => handleHighlight('off')}
         hitSlop={{ top: 2, bottom: 2, left: 1, right: 1 }}
         {...props}
      >
         <View
            aria-label={iconName}
            style={[
               style,
               {
                  borderRadius: 50,
                  width: ICONS.MEDIUM + OFFSET_BY,
                  height: ICONS.MEDIUM + OFFSET_BY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backfaceVisibility: 'hidden',
                  backgroundColor: highlight
                     ? 'grey'
                     : selected
                     ? colors.outlineVariant
                     : 'transparent',
               },
            ]}
         >
            <MaterialIcons name={iconName} {...params} />
         </View>
      </TouchableWithoutFeedback>
   );
};

export default ExtraEditorIcons;
