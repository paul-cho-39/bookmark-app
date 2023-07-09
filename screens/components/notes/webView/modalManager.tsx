import { useTheme } from 'react-native-paper';
import { TextColors, setDefaultColor } from '../../../../library/helper/setDefaultColor';
import { ModalTypes } from '../../../../library/hooks/useModalManager';
import ExtraEditorModal from './extraEditorModal';
import LinkModal from './linkModal';
import SelectColorModal from './selectColorModal';

interface ModalManagerProps {
   modals: ModalTypes;
   sendMessage: (messageType: string, messageBody: any) => void;
   keyboardHeight: number;
   isDarkMode: boolean;
}

const ModalManager: React.FC<ModalManagerProps> = ({
   modals,
   sendMessage,
   keyboardHeight,
   isDarkMode,
}) => {
   const { linkModal, textBgColorModal, textColorModal, extraEditorModal } = modals;
   const { colors } = useTheme();
   return (
      <>
         <LinkModal
            visible={linkModal.getModalData()?.isVisible as boolean}
            setVisible={linkModal.setVisibility}
            colors={colors}
            sendMessage={sendMessage}
         />
         <SelectColorModal
            header='Font color'
            colorType='color'
            visible={textColorModal.getModalData()?.isVisible as boolean}
            setVisible={textColorModal.setVisibility}
            textColors={setDefaultColor(isDarkMode)}
            selectedColor={textColorModal.getModalData()?.modalData as string}
            setColor={textColorModal.setData}
            keyboardHeight={keyboardHeight}
            sendMessage={sendMessage}
            colors={colors}
         />
         <SelectColorModal
            header='Highlight'
            colorType='background'
            visible={textBgColorModal.getModalData()?.isVisible as boolean}
            setVisible={textBgColorModal.setVisibility}
            textColors={setDefaultColor(isDarkMode)}
            selectedColor={textBgColorModal.getModalData()?.modalData as string}
            setColor={textBgColorModal.setData}
            keyboardHeight={keyboardHeight}
            sendMessage={sendMessage}
            colors={colors}
         />
         <ExtraEditorModal
            visible={extraEditorModal.getModalData()?.isVisible as boolean}
            setVisible={extraEditorModal.setVisibility}
            formatType={extraEditorModal.getModalData()?.modalData}
            sendMessage={sendMessage}
            keyboardHeight={keyboardHeight}
            colors={colors}
         />
      </>
   );
};

export default ModalManager;

// 1) change the layout (make it look more crisp)
// 2) closing-button a bit more toward the left
// 3) more responsive to different mobile
// 4) see how it can be used so it DOES NOT re-render again
// 5) when highlighter color is "white" then it should just cancel the format;
// 6) an optional name for 'link'
// 7) checkbutton should have better animation
