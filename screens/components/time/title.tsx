import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Authors, BookTitle } from '../books';

interface BookIconProps {
   title: string;
   authors?: string[];
   viewStyle?: StyleProp<ViewStyle>;
   children?: React.ReactNode;
}

const Title: React.FC<BookIconProps> = ({ title, authors, viewStyle, children }) => {
   return (
      <View style={viewStyle}>
         <BookTitle title={title} cutoff={0} style={styles.title} />
         <Authors
            authors={authors}
            numberOfAuthorToCut={3}
            authorCutoff={35}
            style={styles.authors}
         />
         {children}
      </View>
   );
};

export default Title;

const styles = StyleSheet.create({
   text: {},
   title: {
      opacity: 0.7,
      paddingBottom: 5,
   },
   authors: {
      opacity: 0.6,
   },
});
