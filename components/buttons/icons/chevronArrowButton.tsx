import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ChevronArrowButtonProps {
   iconName: 'chevron-right' | 'chevron-left';
   size: number;
   handleDirection: () => void;
}

const ChevronArrowButton = ({ iconName, size, handleDirection }: ChevronArrowButtonProps) => {
   const theme = useTheme();
   return (
      <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={handleDirection}>
         <MaterialIcons name={iconName} size={size} color={theme.colors.onBackground} />
      </TouchableOpacity>
   );
};

export default ChevronArrowButton;
