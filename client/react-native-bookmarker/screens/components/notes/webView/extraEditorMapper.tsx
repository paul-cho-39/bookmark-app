import { StyleProp, View, ViewStyle } from 'react-native';
import { ExtraEditorButtonParams } from '../../../../constants/notes';
import ExtraEditorIcons, { ExtraEditorIconsProps } from './extraEditorIcons';
import { ICONS } from '../../../../constants';

interface ExtraEditorMapperProps extends Omit<ExtraEditorIconsProps, 'params' | 'iconName'> {
   iconParams: ExtraEditorButtonParams[];
   style?: StyleProp<ViewStyle>;
   iconStyle?: StyleProp<ViewStyle>;
}

const ExtraEditorMapper = (props: ExtraEditorMapperProps) => {
   const { iconParams } = props;
   return (
      <View collapsable style={[props.style, { flexDirection: 'row' }]}>
         {iconParams.map((icon) => {
            if ('selected' in icon) {
               return (
                  <ExtraEditorIcons
                     key={icon.name}
                     iconName={icon.name}
                     onPress={icon.onPress}
                     selected={icon.selected}
                     colors={props.colors}
                     params={{ color: props.colors.onSurface, size: ICONS.MEDIUM }}
                     style={[props.iconStyle, { paddingHorizontal: 5 }]}
                  />
               );
            } else {
               return (
                  <ExtraEditorIcons
                     key={icon.name}
                     iconName={icon.name}
                     onPress={icon.onPress}
                     colors={props.colors}
                     params={{ color: props.colors.onSurface, size: ICONS.MEDIUM }}
                     style={[props.iconStyle, { paddingHorizontal: 5 }]}
                  />
               );
            }
         })}
      </View>
   );
};

export default ExtraEditorMapper;
