import { useState } from 'react';
import { INITIAL_MODAL_STATE, ModalName, ModalStateType } from '../../constants/notes';
import { setDefault } from '../helper/setDefaultColor';

function useModalManager(isDarkMode: boolean) {
   const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

   const updateModal = (name: ModalName, updater: (modal: ModalStateType) => ModalStateType) => {
      setModalState((prevState) =>
         prevState.map((modal) => (modal.name === name ? updater(modal) : modal))
      );
   };

   const setModal = (name: ModalName) => ({
      setVisibility: (isVisible: boolean) => {
         updateModal(name, (modal) => ({ ...modal, isVisible }));
      },
      setData: (data: string) => {
         updateModal(name, (modal) => ({ ...modal, modalData: data }));
      },
      setAll: (isVisible: boolean, data?: string | null) => {
         updateModal(name, (modal) => ({ ...modal, isVisible, modalData: data }));
      },
      getModalData: () => modalState.find((modal) => modal.name === name),
   });

   const linkModal = setModal('url');
   const textColorModal = setModal('textColor');
   const textBgColorModal = setModal('textBgColor');

   const modalMessageHandlers: Record<string, (selected?: string) => void> = {
      colorModal: (selected?: string) => {
         if (selected) {
            const fontColor = handleColorModal(isDarkMode, selected);
            textColorModal.setAll(true, fontColor);
         }
      },
      textBackgroundModal: (selected?: string) => {
         if (selected) {
            const textBgColor = handleColorModal(isDarkMode, selected);
            textBgColorModal.setAll(true, textBgColor);
         }
      },
      linkModal: () => linkModal.setVisibility(true),
      toggleModals: () => {
         linkModal.getModalData()?.isVisible && linkModal.setVisibility(false);
         textColorModal.getModalData()?.isVisible && textColorModal.setVisibility(false);
         textBgColorModal.getModalData()?.isVisible && textBgColorModal.setVisibility(false);
      },
   };

   return {
      modals: { linkModal, textColorModal, textBgColorModal },
      modalIncomingMessageHandlers: modalMessageHandlers,
   };
}

// helper function
function handleColorModal(isDarkMode: boolean, selected?: string) {
   return selected === 'none' ? setDefault(isDarkMode) : selected;
}

type ModalTypes = Omit<
   ReturnType<typeof useModalManager>,
   'modalIncomingMessageHandlers'
>['modals'];

export type { ModalTypes };
export default useModalManager;
