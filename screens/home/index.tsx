import { Text, View } from 'react-native';
import styles from './styles';
import { useTheme } from 'react-native-paper';

import { getUser } from '../../library/helper';
import { resetQuery, setHasMutated } from '../../library/zustand/logic/connector-logic';

import MainBookCover from './mainBook';
import EmptyLibrary from './emptyLibrary';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import useGetCurrentReading from '../../library/hooks/realm/useGetCurrentReading';

const HomeScreen = ({}) => {
   const uid = getUser() as string;
   const navigation = useNavigation();
   const { colors } = useTheme();

   // if isRefetchingError persists then it should lead to another screen(?);s
   const { queryObject, primaryBook } = useGetCurrentReading();
   const { data, isSuccess, isError, isRefetchError } = queryObject;
   const currentlyReading = data?.reading;

   // count the number of times it is refetching the error and if it exceeds a certain
   // number then no good. So basically write a error handler for this case;

   // resetting the search query for books
   useEffect(() => {
      navigation.addListener('blur', () => resetQuery());

      return () => {
         navigation.removeListener('blur', () => resetQuery());
      };
   }, [navigation]);

   return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
         {!currentlyReading || !primaryBook ? (
            <EmptyLibrary />
         ) : (
            isSuccess && (
               <>
                  <MainBookCover
                     uid={uid as string}
                     currentBooks={currentlyReading}
                     primaryBook={primaryBook}
                  />
               </>
            )
         )}
      </View>
   );
};

export default HomeScreen;
