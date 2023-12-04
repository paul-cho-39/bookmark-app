import { MaterialCommunityIcons } from '@expo/vector-icons';
import IconButton from '../../../components/buttons/icons/iconButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Animated, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import useBookmarkAnimation from '../../../library/hooks/useBookmarkAnimation';
import CustomSnackbar from '../../../components/snackbar';
import { getUrl, postFetch, queryKeys } from '../../../library/helper/react-query';
import { TimerParamType, AddLogDataType } from '../../../library/@types/timerData';

type SaveCurrentSessionProps = {
   params: Omit<TimerParamType, 'endTime'>;
   data: AddLogDataType['log'];
   style?: StyleProp<ViewStyle>;
   animateIconStyle?: StyleProp<ViewStyle>;
};

// this component will be used again
const SaveCurrentSession = ({ params, data, style, animateIconStyle }: SaveCurrentSessionProps) => {
   const { uid, id, logIndex, startTime } = params;
   // const logIndex = data?.index?.low;
   const queryClient = useQueryClient();
   const mutationKey = queryKeys.timer(uid, startTime?.getMilliseconds());

   const isCurrentlyBookmarked = !data?.isBookmarked;
   const [visible, setVisible] = useState(false);
   const [isBookmarked, setIsBookmarked] = useState<{ bookmarked: boolean }>({
      bookmarked: isCurrentlyBookmarked,
   });

   const { mutate } = useMutation(
      (body: Record<string, boolean>) =>
         postFetch(getUrl.bookLog.file.editLog(uid as string, id, logIndex).editFavorite, body),
      {
         onMutate: (newData) => {
            const updatedData = { ...data, ...newData };
            queryClient.setQueryData(mutationKey, updatedData);

            return data;
         },
         onError: (error) => {
            console.error('Toggling bookmark session failed', error);
            queryClient.setQueryData(mutationKey, data);
         },
         onSettled: () => {
            queryClient.invalidateQueries(mutationKey);
         },
         onSuccess: (_data, variables, _context) => {
            setVisible(true);
         },
      }
   );

   const toggleBookmarkStatus = () => {
      startAnimations();
      setIsBookmarked((prev) => ({ bookmarked: !prev.bookmarked }));

      setTimeout(() => {
         mutate({ bookmarked: !isBookmarked.bookmarked });
      }, 50);
   };

   const {
      displayIcon,
      startAnimations,
      markIconTranslateY,
      unmarkIconTranslateY,
      translateX,
      translateY,
   } = useBookmarkAnimation(isBookmarked.bookmarked);

   const isSaved = isBookmarked.bookmarked;

   return (
      <>
         <IconButton
            testID='save-session'
            accessibilityLabel={`save-to-favorite-session`}
            activeOpacity={1}
            style={[
               style,
               {
                  transform: [
                     {
                        translateX: isSaved ? 0 : (translateX as any),
                     },
                     {
                        translateY: isSaved ? (translateY as any) : 0,
                     },
                  ],
               },
            ]}
            onPress={toggleBookmarkStatus}
            // onPress={() => mutate({ bookmarked: !isBookmarked.bookmarked })}
            renderIcon={() =>
               !isSaved ? (
                  <MaterialCommunityIcons name='book-outline' size={26} color='white' />
               ) : (
                  <MaterialCommunityIcons name='book' size={26} color='skyblue' />
               )
            }
         />
         {displayIcon && (
            <Animated.View
               style={[
                  animateIconStyle,
                  {
                     transform: [
                        {
                           translateY: isSaved ? markIconTranslateY : unmarkIconTranslateY,
                        },
                     ],
                  },
               ]}
            >
               <MaterialCommunityIcons name='bookmark' size={14} color='white' />
            </Animated.View>
         )}
         {visible && (
            <CustomSnackbar
               visible={visible}
               setVisible={setVisible}
               message={!isSaved ? 'Removed from favorite session' : 'Added to favorite session'}
            />
         )}
      </>
   );
};

export default SaveCurrentSession;
