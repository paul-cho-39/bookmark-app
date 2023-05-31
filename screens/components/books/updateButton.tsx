import { Button, Text } from 'react-native-paper';
import { AddBookNavigationProp } from '../../../library/@types/navigation';
import { Library } from '../../../library/@types/googleBooks';

interface ButtonProps {
   store: Store[];
   select: string;
   navigation: AddBookNavigationProp['navigation'];
   addToLibrary?: (store: any) => void;
}

export interface Store {
   name: string;
   type: keyof Library;
   mutate: () => void | ((body: Record<string, string>) => void) | null;
}

const UpdateBookButton = ({ store, select, navigation, addToLibrary }: ButtonProps) => {
   const selectedName = store.find((data) => data.type === select);

   const onPress = () => {
      if (selectedName && selectedName?.mutate) {
         if (selectedName.type === 'reading') {
            selectedName?.mutate();
         }
         selectedName.mutate();
      }

      // if the mutate contains body, mutate is null
      addToLibrary;

      setTimeout(() => {
         navigation.navigate('Search');
      }, 1000);
   };

   return <Button onPress={onPress}>Save book</Button>;
};

export default UpdateBookButton;
