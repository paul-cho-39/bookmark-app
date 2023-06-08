import { RealmLibrary } from '../../schema';
import ParseLibrary from '../class/parse/parseLib';
import RealmLibraryRead from '../class/read/library';

async function getRealmCurrentBookData(
   library: Realm.Results<RealmLibrary & Realm.Object<unknown, never>>
) {
   const getLibrary = new RealmLibraryRead(library);
   const book = getLibrary.getBooks<'reading'>('reading');
   const cleanedData = new ParseLibrary(book.reading).getCleanedData;
   return cleanedData;
}

export default getRealmCurrentBookData;
