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
         {linkModal.getModalData()?.isVisible && (
            <LinkModal
               visible={linkModal.getModalData()?.isVisible as boolean}
               setVisible={linkModal.setVisibility}
               colors={colors}
               sendMessage={sendMessage}
            />
         )}
         {textColorModal.getModalData()?.isVisible && (
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
         )}
         {textBgColorModal.getModalData()?.isVisible && (
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
         )}
         {extraEditorModal.getModalData()?.isVisible && (
            <ExtraEditorModal
               visible={extraEditorModal.getModalData()?.isVisible as boolean}
               setVisible={extraEditorModal.setVisibility}
               formatType={extraEditorModal.getModalData()?.modalData}
               sendMessage={sendMessage}
               keyboardHeight={keyboardHeight}
               colors={colors}
            />
         )}
      </>
   );
};

export default ModalManager;
