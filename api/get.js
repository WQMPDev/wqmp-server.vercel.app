import { connect } from '@planetscale/database'
import { CSV } from './csv.min.js'
export default async function handler(request, response) {
    const config = {
        url: process.env['DATABASE_URL']
    }

    const conn = connect(config);
    const result = await conn.execute('select * from Records', []);
    return CSV.stringify(result.rows.map(o=>{delete o.RecordId; delete o.DeviceId; return o;}), function(key, value) {
        if(key === null) {
            return value.toLowerCase();
        }
        return value;
    });
}
