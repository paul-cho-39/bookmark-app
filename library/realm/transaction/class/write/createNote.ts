import { Realm } from '@realm/react';
import { RealmBook, RealmLogs, RealmNotes } from '../../../schema';

export default class RealmNotesCreator {
   realm: Realm;
   id: string;
   logIndex: number;

   constructor(realm: Realm, id: string, logIndex: number) {
      this.realm = realm;
      this.id = id;
      this.logIndex = logIndex;
   }
   get getCurrentId() {
      return this.id;
   }
   get getCurrentLogIndex() {
      return this.logIndex;
   }
   private get getNotes() {
      return this.realm
         .objects<RealmNotes>('Notes')
         .find((note) => note.id === this.id && note.logIndex === this.logIndex);
   }
   initNote() {
      const currentNote = this.getNotes;
      if (currentNote) {
         return currentNote;
      }
      return this.realm.create<RealmNotes>('Notes', {
         id: this.id,
         logIndex: this.logIndex,
      });
   }
}

// the idea here is to use this class more globally
// create / write to realm database for notes
// when pressed back want to set in ./controller where it can write
// note, tags, title, and more into the dataset

// inside the controller
// CREATE IT SO THAT IT COMPLIES w/ dependency injection

// connecting the realm objects b/w notes, logs <-> book
// this will likely be the parent component
class RealmInit {
   realm: Realm;
   id: string;

   constructor(realm: Realm, id: string) {
      this.realm = realm;
      this.id = id;
   }

   private get currentBook() {
      return this.realm.objects<RealmBook>('Book').filtered(`id = "${this.id}" `)[0];
   }

   connectLog(log: RealmLogs) {
      this.currentBook.logs?.push(log);
   }

   connectNote(note: RealmNotes) {
      this.currentBook.notes?.push(note);
   }
}
