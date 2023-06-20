import BookCover from './bookCover';
import BookTitle from './bookTitle';
import Authors from './authors';
import { Text } from 'react-native-paper';
import { View, StyleProp, ViewStyle, StyleSheet, ImageStyle, TextStyle } from 'react-native';
import { BasicBookInfo } from '../../../library/@types/googleBooks';

interface BookInfoProps {
   bookInfo: BasicBookInfo;
   displayPage?: boolean;
   style?: StyleProp<ViewStyle>;
   authorStyle?: StyleProp<ViewStyle & TextStyle>;
   titleStyle?: StyleProp<ViewStyle & TextStyle>;
   imageStyle?: StyleProp<ViewStyle & ImageStyle>;
   descriptionContent?: StyleProp<ViewStyle>;
   image?: string | undefined;
   lowQualityImage?: string | undefined;
   isError?: boolean;
   isLoading?: boolean;
   titleCutoff?: number;
   subtitleCutoff?: number;
   singleAuthorCutoff?: number;
   numberOfAuthorCutoff?: number;
   children?: React.ReactNode;
}

const BookInfo = ({
   bookInfo,
   displayPage = false,
   style,
   descriptionContent,
   authorStyle,
   titleStyle,
   imageStyle,
   isError,
   isLoading,
   image,
   lowQualityImage,
   titleCutoff = 40,
   subtitleCutoff = 40,
   singleAuthorCutoff = 40,
   numberOfAuthorCutoff = 3,
   children,
}: BookInfoProps) => {
   const { title, subtitle, authors, thumbnail, page } = bookInfo;
   const getImage = !image ? thumbnail : image;
   const renderPage = <Text style={{ display: !page ? 'none' : 'flex' }}>Total Page: {page} </Text>;

   // TODO: create an error page where if it fails to fetch the google api it
   // goes to this page
   return (
      <>
         <BookCover thumbnail={getImage} lowQualityThumbnail={lowQualityImage} style={imageStyle} />
         <View style={style}>
            <View style={descriptionContent}>
               <BookTitle
                  title={title as string}
                  subtitle={subtitle}
                  titleCutoff={titleCutoff}
                  subtitleCutoff={subtitleCutoff}
                  style={titleStyle}
               />
               <Authors
                  authors={authors}
                  authorCutoff={singleAuthorCutoff}
                  numberOfAuthorToCut={numberOfAuthorCutoff}
                  style={authorStyle}
               />
               {displayPage ? renderPage : null}
            </View>
            {children}
         </View>
      </>
   );
};

export default BookInfo;

const styles = StyleSheet.create({});
