import {config} from '../dbconfig.js';
import sql from 'mssql';

export class MedicacionServices
{
    static insert = async (Medicacion) =>
    {
        let rowsAffected=0;
        console.log('estoy en el insert');
        
        const{Nombre,Cuando,Hora,Descripcion,IdUsuario} = Medicacion;
        try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pNombre',Nombre)
        .input('pCuando',Cuando)
        .input('pHora',Hora)
        .input('pDescripcion',Descripcion)
        .input('pIdUsuario',IdUsuario)
        .query('INSERT INTO Medicacion (Nombre, Cuando, Hora, Descripcion, IdUsuario) VALUES (@pNombre, @pCuando, @pHora, @pDescripcion, @pIdUsuario)')
        console.log(result);
        rowsAffected = result.rowsAffected;
        } catch (error){
            console.log(error)
        }
        return rowsAffected;
    }
    
    static getAll = async () =>
    {
        let returnEntity = null;
        console.log('Estoy en: MedicacionServices.getAll()');
        try
        {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM Medicacion');
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
    }
}
}