import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface TimeContentProps {
   name: string;
   time: string;
   meridiem: string;
}

const TimeContent = ({ name, time, meridiem }: TimeContentProps) => {
   return (
      <View style={styles.timeContainer}>
         <Text variant='bodySmall'>{meridiem}</Text>
         <Text style={styles.timeDescription} variant='headlineLarge'>
            {time}
         </Text>
         <Text variant='bodyLarge'>:</Text>
         <Text style={styles.description} variant='bodySmall'>
            {name}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   timeContainer: {
      padding: 5,
      marginVertical: 10,
      flexDirection: 'row-reverse',
   },
   description: {
      textTransform: 'uppercase',
      maxWidth: 50,
      flexWrap: 'wrap',
      textAlign: 'right',
      marginRight: 3,
      // backgroundColor: 'red',
   },
   timeDescription: {
      paddingHorizontal: 2,
      bottom: 5,
   },
});

export default TimeContent;
