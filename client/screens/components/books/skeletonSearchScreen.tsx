// bundle this together
import { StyleSheet, View } from 'react-native';
import SkeletonLoader from '../../../components/loader/skeletonLoader';
import SkeletonText from '../../../components/loader/skeletonText';

import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../../../library/helper';

const SkeletonSearchScreen = () => {
   return (
      <View style={{ position: 'absolute' }}>
         <View style={styles.container}>
            <SkeletonLoader height={IMAGE_HEIGHT} width={IMAGE_WIDTH} style={styles.main} />
            <View style={styles.textWrapper}>
               <SkeletonText numberOfLines={1} width={150} style={styles.skeletonText} />
               <SkeletonText
                  numberOfLines={1}
                  width={120}
                  style={[styles.skeletonText, { marginTop: 25 }]}
               />
               <SkeletonText
                  numberOfLines={1}
                  width={120}
                  style={[styles.skeletonText, { marginTop: 5 }]}
               />
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginVertical: 10,
   },
   main: {
      marginHorizontal: 20,
   },
   textWrapper: {
      marginLeft: 15,
   },
   skeletonText: {
      marginVertical: 15,
   },
   shortText: {
      marginVertical: 10,
   },
});

export default SkeletonSearchScreen;
