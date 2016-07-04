import Model, {
    Field,
    Collection,
    ObjectId
} from './Model';

import Database from './Database';
import Query from './Query';

@Collection('Application')
class Application extends Model {
    @Field
    public name: string
    @Field
    public _id: ObjectId
}

async function main() {
    Database.setUri('mongodb://cums:cums@120.55.240.23:27017/cums');
    const a:Application = await new Query(Application)
            .where('name').eq('cums-test-application')
            .where('accessSecret').eq('A0GR8mwRJ3SAJxV2LjnSSDO9QBAfUZE2U')
            .findOne();
    console.log(a);
    console.log(a.toJSON());
    process.exit(0);
}

main()
.catch(e => {
    console.log(e.stack || e);
    process.exit(1);
});
