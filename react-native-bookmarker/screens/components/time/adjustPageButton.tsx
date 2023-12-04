import { useState, useRef, useEffect } from 'react';
import IconButton from '../../../components/buttons/icons/iconButton';
import { AntDesign } from '@expo/vector-icons';
import { StyleProp, View, ViewStyle } from 'react-native';

interface AdjustPageProps {
   page: number | null;
   setPage: React.Dispatch<React.SetStateAction<number | null>>;
   bookPage?: number;
   style?: StyleProp<ViewStyle>;
}

const AdjustPageButton = ({ page, setPage, bookPage, style }: AdjustPageProps) => {
   const intervalIncreaseRef = useRef<number | any>(null);
   const intervalDecreaseRef = useRef<number | any>(null);

   const pageIsNotNull = page !== null;

   useEffect(() => {
      if (pageIsNotNull && page <= 0) {
         clearInterval(intervalDecreaseRef.current);
      }
      if (pageIsNotNull && page < 0) {
         setPage(0);
      }
   }, [page]);

   const accelerate = () => {
      let acceleration = 0;
      intervalIncreaseRef.current = setInterval(() => {
         acceleration += 0.01;
         setPage((page) => (page as number) + acceleration);
      }, 50);
   };

   const deaccelerate = () => {
      let acceleration = 0;
      intervalDecreaseRef.current = setInterval(() => {
         acceleration += 0.01;
         setPage((page) => (page as number) - acceleration);
      }, 50);
   };

   const handlePressOut = () => {
      if (intervalDecreaseRef.current) {
         clearInterval(intervalDecreaseRef.current);
         intervalDecreaseRef.current = null;
      }
      if (intervalIncreaseRef.current) {
         clearInterval(intervalIncreaseRef.current);
         intervalIncreaseRef.current = null;
      }
   };

   const increase = () => {
      if (bookPage && pageIsNotNull && page >= bookPage) {
         setPage(bookPage);
      }
      setPage((page) => (page as number) + 1);
   };

   const decrease = () => {
      if (pageIsNotNull && page <= 0) return;
      setPage((page) => (page as number) - 1);
   };

   const isDecreasedDisabled = pageIsNotNull && page === 0;
   const isIncreasedDisabled = !!bookPage && pageIsNotNull && page >= bookPage;

   return (
      <View style={style}>
         <IconButton
            onLongPress={deaccelerate}
            onPress={decrease}
            onPressOut={handlePressOut}
            disabled={isDecreasedDisabled}
            style={{ opacity: isDecreasedDisabled ? 0.3 : 1 }}
            renderIcon={() => <AntDesign name='minus' size={26} color='white' />}
         />
         <IconButton
            onLongPress={accelerate}
            onPress={increase}
            onPressOut={handlePressOut}
            disabled={isIncreasedDisabled}
            style={{ opacity: isIncreasedDisabled ? 0.3 : 1 }}
            renderIcon={() => <AntDesign name='plus' size={26} color='white' />}
         />
      </View>
   );
};

export default AdjustPageButton;
