import { TextColors, setDefaultColor } from '../../../../library/helper/setDefaultColor';
import { ModalTypes } from '../../../../library/hooks/useModalManager';
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
   const { linkModal, textBgColorModal, textColorModal } = modals;
   return (
      <>
         <LinkModal
            visible={linkModal.getModalData()?.isVisible as boolean}
            setVisible={linkModal.setVisibility}
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
         />
      </>
   );
};

export default ModalManager;
