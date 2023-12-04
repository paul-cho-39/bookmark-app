import { View, StyleSheet } from 'react-native';
import InfoContent, { InfoContentProps } from './infoContent';

interface ContentWrapperProps {
   pages: number;
   note: string;
   time: string;
}

const ContentWrapper = ({ pages, note, time }: ContentWrapperProps) => {
   return (
      <View style={styles.container}>
         <InfoContent iconName='book-open-outline' content={pages} info='Read' />
         <InfoContent iconName='note-text-outline' content={note} info='Notes' />
         <InfoContent iconName='timelapse' content={time} info='Elapsed' />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: 15,
      marginBottom: 10,
   },
});

export default ContentWrapper;
