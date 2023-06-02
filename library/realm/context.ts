import { RealmConfig } from './schema';
import { createRealmContext } from '@realm/react';

// import the schema from ./schema.ts
// export const RealmUserContext = createRealmContext(RealmConfig);

// and instantiate this at the <App /> level
// and at the app level and can create a real context;

// the context is similar to React.Context and can pass down
// information from this tree so it makes sense

// and use custom Realm React hooks for
// e.g. const {RealmProvider, useRealm, useObject, useQuery} =
// use "useObject and useQuery" for 'find, sort, filter'
// use "useRealm" for writing transaction including::
// create, modify, and delete
