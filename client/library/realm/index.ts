import { createRealmContext } from '@realm/react';
import { RealmConfig } from './schema';

const RealmContext = createRealmContext(RealmConfig);
export default RealmContext;
