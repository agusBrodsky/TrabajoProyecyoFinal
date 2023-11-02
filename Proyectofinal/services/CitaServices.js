import {config} from '../dbconfig.js';
import sql from 'mssql';
export class CitaServices
{
    static insert = async (Cita) =>
    {
        let rowsAffected=0;
        console.log('estoy en el insert');
        
        const{Id,IdUsuario,Fecha,Asunto,Notas} = Cita;
        try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pIdUsuario',IdUsuario)
        .input('pFecha',Fecha)
        .input('pAsunto',Asunto)
        .input('pNotas',Notas)
        .query('INSERT INTO Medicacion (IdUsuario, Fecha, Asunto, Notas) VALUES (@pIdUsuario, @pFecha, @pAsunto, @pNotas)')
        console.log(result);
        rowsAffected = result.rowsAffected;
        } catch (error){
            console.log(error)
        }
        return rowsAffected;
    }
}