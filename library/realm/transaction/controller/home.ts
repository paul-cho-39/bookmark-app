import { RealmLibrary } from '../../schema';
import NormalizeRealmBooks from '../class/normalize/normalizeLib';
import RealmLibraryRead from '../class/read/library';

async function getRealmCurrentBookData(
   library: Realm.Results<RealmLibrary & Realm.Object<unknown, never>>
) {
   const getLibrary = new RealmLibraryRead(library);
   const book = getLibrary.getBooks<'reading'>('reading');
   const cleanedData = new NormalizeRealmBooks(book.reading).getCleanedData;
   return cleanedData;
}

export default getRealmCurrentBookData;
