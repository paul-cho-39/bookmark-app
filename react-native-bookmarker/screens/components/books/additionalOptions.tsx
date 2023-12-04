import { View } from 'react-native';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import Checked, { CheckedProps } from '../../../components/checkbox';
import PageInput, { PageInputter } from '../../../components/pageSlider';
import getPageString from '../../../library/helper/getPageString';

interface ExtraInfoProps {
   page: number | undefined;
   isRereading: boolean;
   setIsRereading: (value: React.SetStateAction<boolean>) => void;
   value: string;
   setValue: Dispatch<SetStateAction<string>>;
}

const ExtraInfo = ({ value, setValue, isRereading, setIsRereading, page }: ExtraInfoProps) => {
   const [checkedStarted, setCheckedStarted] = useState(false);

   const { parsedValue, text } = getPageString(value, page);
   useEffect(() => {
      if (!checkedStarted && parsedValue > 0) {
         setValue('0');
      }
   }, [checkedStarted]);

   // if there is a page and the number is entered
   useEffect(() => {
      if (page && page <= parsedValue) {
         const pageInString = page.toString();
         setValue(pageInString);
      }
      if (value && parsedValue < 0) {
         setValue('0');
      }
      if (value && value.includes('.')) {
         const convertToString = Math.round(parsedValue).toString();
         setValue(convertToString);
      }
   }, [value]);

   return (
      <>
         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Checked checked={isRereading} setChecked={setIsRereading} title='Read in the past' />
            <Checked checked={checkedStarted} setChecked={setCheckedStarted} title='In progress' />
         </View>
         <PageInput
            text={text}
            show={checkedStarted}
            textValue={value}
            onTextChange={(newValue) => setValue(newValue)}
         />
      </>
   );
};

export default ExtraInfo;
