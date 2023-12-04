import {
   Image,
   StyleSheet,
   View,
   StyleProp,
   ViewStyle,
   ImageStyle,
   Animated,
   Easing,
} from 'react-native';
import Config from '../../../library/config';
import { useEffect, useState } from 'react';

interface BookCoverProps {
   thumbnail?: string | undefined;
   lowQualityThumbnail?: string | undefined;
   index?: number;
   thresholdLength?: number;
   style?: StyleProp<ViewStyle & ImageStyle>;
}

const BookCover = ({
   thumbnail,
   lowQualityThumbnail,
   index,
   thresholdLength,
   style,
}: BookCoverProps) => {
   const [loading, setLoading] = useState(true);
   const opacity = new Animated.Value(0);

   useEffect(() => {
      let mounted = true;

      if (!loading) {
         Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.step0,
            useNativeDriver: true,
         }).start();
      }

      return () => {
         mounted = false;
         opacity.stopAnimation();
      };
   }, [loading, opacity]);

   // for bookCarousel
   if (index && (index === 0 || index === thresholdLength)) {
      return <View></View>;
   }
   return (
      <>
         <Animated.Image
            style={[styles.image, style, { opacity: loading ? 0 : 1 }]}
            onLoadEnd={() => setLoading(false)}
            source={
               !thumbnail
                  ? require('../../../assets/images/CoverNotAvailable.jpg')
                  : { uri: thumbnail }
            }
         />
         {lowQualityThumbnail && loading && (
            <Image
               style={[styles.image, style, { position: 'absolute' }]}
               source={
                  !thumbnail
                     ? require('../../../assets/images/CoverNotAvailable.jpg')
                     : { uri: lowQualityThumbnail }
               }
            />
         )}
      </>
   );
};

export default BookCover;

const styles = StyleSheet.create({
   image: {
      width: Config.HOME_IMAGE_WIDTH,
      height: Config.HOME_IMAGE_HEIGHT,
   },
});
