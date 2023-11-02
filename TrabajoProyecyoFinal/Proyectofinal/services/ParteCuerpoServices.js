import {config} from '../dbconfig.js';
import sql from 'mssql';
export class ParteCuerpoServices
{ static getAll = async () =>
    {
        let returnEntity = null;
        console.log('Estoy en: ParteCuerpo.getAll()');
        try
        {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM ParteCuerpo');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
    }
}
}