import { Text } from 'react-native-paper';
import { CONTENT, Mode, NoteAppbarParams } from '../../../../constants';
import EditableAppbar from './editableAppbar';
import useBoundedStore from '../../../../library/zustand/store';

interface EdiableContentsWrapper extends NoteAppbarParams {
   mode: Mode;
   handleTitlePress: () => void;
}

const EdiableContentsWrapper = (props: EdiableContentsWrapper) => {
   const { mode, handleTitlePress, colors } = props;
   const { id, logIndex } = props.params;

   const title = useBoundedStore((state) => state.notes[id][logIndex].attr.title);
   if (mode === 'small') {
      return (
         <Text variant='titleLarge' style={{ paddingHorizontal: 45 }} onPress={handleTitlePress}>
            {!title ? CONTENT.DEFAULT_TITLE : title}
         </Text>
      );
   }

   return (
      <>
         {mode === 'large' && (
            <EditableAppbar params={props.params} onBlur={handleTitlePress} colors={colors} />
         )}
      </>
   );
};

export default EdiableContentsWrapper;
