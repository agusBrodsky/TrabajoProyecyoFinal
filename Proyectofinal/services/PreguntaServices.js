import {config} from '../dbconfig.js';
import sql from 'mssql';
export class PreguntaServices
{ static getAll = async () =>
    {
        let returnEntity = null;
        console.log('Estoy en: PreguntaServices.getAll()');
        try
        {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Pregunta');
            return result.recordsets[0];
            
        }
        catch(error){
            console.log(error);
    }
    
}
}