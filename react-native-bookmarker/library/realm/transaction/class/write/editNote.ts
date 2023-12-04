import { TagParams } from '../../../../@types/params';
import { RealmNotes } from '../../../schema';
import RealmNotesCreator from './createNote';

export default class RealmNotesEditor extends RealmNotesCreator {
   constructor(id: string, logIndex: number, realm: Realm) {
      super(realm, id, logIndex);
   }
   get getNote() {
      return super.initNote();
   }
   saveNoteData<TData extends Partial<RealmNotes>>(data: TData) {
      // whenever pressed back or saved then will call this
      this.realm.create<RealmNotes>('Notes', { ...data });
   }
   saveTags(tags: string[]) {
      const note = this.getNote;
      note.tags?.concat([...tags]);
   }

   updateLastEdited(datetime: Date) {
      const note = this.getNote;
   }
}

function saveTagsToRealm(params: TagParams) {
   const { id, logIndex, realm, tags } = params;
   const updator = new RealmNotesEditor(id, logIndex, realm);

   updator.saveTags(tags);
}
