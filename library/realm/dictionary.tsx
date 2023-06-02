export interface RealTimer extends Realm.Dictionary {
   hours: number;
   minute: number;
   seconds: number;
}

export interface RealmBookInfo extends Realm.Dictionary {
   title: string;
   subtitle?: string;
   authors?: Realm.List<string>;
   overallRating?: string | number;
   language?: string;
   publisher?: string;
   publishedDate?: string;
   pageCount?: number;
}
