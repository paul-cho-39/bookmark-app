import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PersistStoreProps, UserInfo } from './types/@types';

interface UserInfoProps extends PersistStoreProps {
   userInfo: UserInfo;
}

const initialState = {};

// const userGeneralPreference = create<UserInfoProps>()(
//     persist(
//        (set) => ({
//        }),
//        {
//         name: 'user-info',
//         storage: createJSONStorage(() => storage),
//         onRehydrateStorage: () => (state) => {
//            state?.setHasHydrated(true);
//         },
//     }
//     )
// );

// if using SQLite have to add
// 1) userBookInfo,
// 2) deleting
