import { useEffect, useRef, useState } from 'react';
import {
   ScrollView,
   View,
   Button,
   StyleSheet,
   NativeScrollEvent,
   NativeSyntheticEvent,
} from 'react-native';
import { CurrentBookData } from '../../../library/@types/googleBooks';
import { CONTAINER_HEIGHT, getMiddleValue, MODAL_WIDTH, getUser } from '../../../library/helper';
import ChevronArrowButton from '../../../components/buttons/icons/chevronArrowButton';
import BookInfoInsideModal from '../books/bookInfoModal';
import { useMutation } from '@tanstack/react-query';
import { setHasMutated } from '../../../library/zustand/store';
import { getUrl, postFetch } from '../../../library/helper/react-query';

interface BookCarouselProps {
   data: CurrentBookData[];
   goBack: (value: boolean) => void;
   // changePrimary: () => void;
}

// this may be subject to changes for WANT_TO_READ(?)
const BookCarousel = ({ data, goBack }: BookCarouselProps) => {
   const scrollViewRef = useRef<ScrollView>(null);
   const [activeBookId, setActiveBookId] = useState<string | null>(null);
   const [isModalRendered, setIsModalRendered] = useState(false);
   const [activeIndex, setActiveIndex] = useState(0);
   const uid = getUser() as string;

   useEffect(() => {
      scrollViewRef.current?.scrollTo({
         x: activeIndex * MODAL_WIDTH,
         animated: false,
      });

      if (activeIndex === 0) {
         scrollViewRef.current?.scrollTo({
            x: (data.length - 2) * MODAL_WIDTH,
            animated: false,
         });
      }
      if (activeIndex === data.length - 1) {
         scrollViewRef.current?.scrollTo({
            x: 1 * MODAL_WIDTH,
            animated: false,
         });
      }
   }, [activeIndex]);

   useEffect(() => {
      if (isModalRendered) {
         const id = data[activeIndex].id;
         id && setActiveBookId(id);
      }
   }, [activeIndex, activeBookId, isModalRendered]);

   const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let index: number;
      const velocityX = event.nativeEvent.velocity?.x;
      const offsetX = event.nativeEvent.contentOffset.x;
      index = Math.round(offsetX / MODAL_WIDTH);
      if (velocityX && velocityX < 0 && activeIndex < 1) {
         index = data.length - 2;
      }
      if (velocityX && velocityX > 0 && activeIndex >= data.length - 1) {
         index = 1;
      }
      setActiveIndex(index);
   };

   const handlePrevPress = () => {
      let prevIndex = activeIndex - 1;
      if (prevIndex < 0) {
         prevIndex = data.length - 1;
      }
      setActiveIndex(prevIndex);
   };

   const handleNextPress = () => {
      let nextIndex = activeIndex + 1;
      if (nextIndex > data.length - 1) {
         nextIndex = 0;
      }
      setActiveIndex(nextIndex);
   };

   // optimistic update?
   const { mutate } = useMutation(
      (id: string) => postFetch(getUrl.library.file.editBooks.editPrimary(uid as string, id)),
      {
         onSuccess: () => {
            setHasMutated(true);
         },
      }
   );

   const changePrimary = () => {
      if (activeBookId !== null) {
         mutate(activeBookId);
         goBack(false);
      }
   };

   return (
      <>
         <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={10}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onContentSizeChange={() => setIsModalRendered(true)}
            style={styles.scrollView}
         >
            {data.map((book, index) => (
               <View key={index} style={styles.bookContainer}>
                  <BookInfoInsideModal
                     bookData={book}
                     index={index}
                     thresholdLength={data.length - 1}
                  />
               </View>
            ))}
         </ScrollView>
         <View style={styles.pagination}>
            {data.map((_, index) => (
               <View
                  key={index}
                  style={[
                     styles.dot,
                     {
                        backgroundColor: activeIndex === index ? '#000' : '#bbb',
                        display: index === 0 || index === data.length - 1 ? 'none' : 'flex',
                     },
                  ]}
               />
            ))}
         </View>
         <View style={styles.buttonsContainer}>
            <ChevronArrowButton
               iconName='chevron-left'
               size={34}
               handleDirection={handlePrevPress}
            />
            <ChevronArrowButton
               iconName='chevron-right'
               size={34}
               handleDirection={handleNextPress}
            />
         </View>
         <View>
            <Button title='Change primary' color={'grey'} onPress={changePrimary} />
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   scrollView: {
      // backgroundColor: 'grey',
      height: CONTAINER_HEIGHT,
      width: MODAL_WIDTH,
   },
   bookContainer: {
      // backgroundColor: 'grey',
      width: MODAL_WIDTH,
      flexDirection: 'column',
   },
   pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
   },
   dot: {
      width: 6,
      height: 6,
      borderRadius: 5,
      marginHorizontal: 4,
   },
   buttonsContainer: {
      // backgroundColor: 'red',
      position: 'relative',
      bottom: getMiddleValue(),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      width: MODAL_WIDTH,
      zIndex: 50,
   },
});

export default BookCarousel;
