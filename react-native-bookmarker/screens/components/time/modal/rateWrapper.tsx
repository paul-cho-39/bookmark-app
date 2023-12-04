import { StyleSheet, View } from 'react-native';
import Checked from '../../../../components/checkbox';
import FiveStars, { FivestarProps } from '../../../../components/buttons/fiveStars';
import ThumbsUpDown, { ThumbsUpDownProps } from '../../../../components/buttons/thumbsUpDown';
import { useState } from 'react';

interface RateWrapper extends FivestarProps {}

// change accordingly depending on the which rating system has better use case
const RateWrapper = ({ ...rest }: RateWrapper) => {
   const [isChecked, setIsChecked] = useState(false);
   return (
      <View>
         <Checked setChecked={setIsChecked} checked={isChecked} title='Rate' />
         {isChecked && <FiveStars style={styles.stars} {...rest} />}
      </View>
   );
};

const styles = StyleSheet.create({
   stars: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
   },
});

export default RateWrapper;
