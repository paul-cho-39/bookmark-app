import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

const storage: StateStorage = {
   getItem: async (key: string): Promise<string | null> => {
      console.log(key, 'has been retrieved');
      return await AsyncStorage.getItem(key);
   },
   setItem: async (key: string, value): Promise<void> => {
      console.log(key, 'with value', value, 'has been saved');
      await AsyncStorage.setItem(key, value);
   },
   removeItem: async (key: string): Promise<void> => {
      await AsyncStorage.removeItem(key, () => console.log(key, 'has been removed'));
   },
};

export default storage;
