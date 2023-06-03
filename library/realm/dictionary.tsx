export interface RealmTimer extends Realm.Dictionary {
   hours: number;
   minute: number;
   seconds: number;
}

export interface RealmBookInfo extends Realm.Dictionary {
   title: string;
   subtitle?: string;
   //    authors?: Realm.List<string>;
   //    page?: number;
   //    //    averageRating: string;
   //    language?: string;
   //    publisher?: string;
   //    publishedDate?: string;
}
