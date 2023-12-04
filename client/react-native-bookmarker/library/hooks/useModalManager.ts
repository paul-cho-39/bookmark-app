import { useState } from 'react';
import {
   FormatTypeParams,
   INITIAL_MODAL_STATE,
   ModalName,
   ModalStateType,
} from '../../constants/notes';
import { setDefault } from '../helper/setDefaultColor';

function useModalManager(isDarkMode: boolean) {
   const [modalState, setModalState] = useState(INITIAL_MODAL_STATE);

   const updateModal = (
      name: ModalName,
      updater: (modal: ModalStateType<ModalName, any>) => ModalStateType<ModalName, any>
   ) => {
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
      setAll: <TData extends null | string | FormatTypeParams>(
         isVisible: boolean,
         data?: TData
      ) => {
         updateModal(name, (modal) => ({ ...modal, isVisible, modalData: data }));
      },
      getModalData: () => modalState.find((modal) => modal.name === name),
   });

   const linkModal = setModal('url');
   const textColorModal = setModal('textColor');
   const textBgColorModal = setModal('textBgColor');
   const extraEditorModal = setModal('extraEditor');

   const modalMessageHandlers: Record<string, (selected?: any) => void> = {
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
      extraEditorModal: (selected?: Record<string, string | boolean>) => {
         if (selected) {
            extraEditorModal.setAll(true, processSelection(selected));
         }
      },
      linkModal: () => linkModal.setVisibility(true),
      toggleModals: () => {
         linkModal.getModalData()?.isVisible && linkModal.setVisibility(false);
         textColorModal.getModalData()?.isVisible && textColorModal.setVisibility(false);
         textBgColorModal.getModalData()?.isVisible && textBgColorModal.setVisibility(false);
         extraEditorModal.getModalData()?.isVisible && extraEditorModal.setVisibility(false);
      },
   };

   return {
      modals: { linkModal, textColorModal, textBgColorModal, extraEditorModal },
      modalIncomingMessageHandlers: modalMessageHandlers,
   };
}

// helper functions
function handleColorModal(isDarkMode: boolean, selected?: string) {
   return selected === 'none' ? setDefault(isDarkMode) : selected;
}

function processSelection(data: Record<string, string | boolean>): FormatTypeParams {
   const alignKeys = ['align'];
   const inlineKeys = ['bold', 'strike', 'italic', 'underline'];

   let output: FormatTypeParams = { align: 'left' };

   for (const key in data) {
      // Make sure the value is truthy
      if (alignKeys.some((alignKey) => key.includes(alignKey))) {
         output.align = data[key] as string;
      }

      if (inlineKeys.some((inlineKey) => key.includes(inlineKey))) {
         if (output.inline) {
            output.inline.push(parseStrikeThrough(key));
         } else {
            output.inline = [parseStrikeThrough(key)];
         }
      }
   }

   function parseStrikeThrough(key: (typeof inlineKeys)[number]) {
      return key === 'strike' ? 'strikethrough' : key;
   }

   return output;
}

type ModalTypes = Omit<
   ReturnType<typeof useModalManager>,
   'modalIncomingMessageHandlers'
>['modals'];

export type { ModalTypes };
export default useModalManager;
