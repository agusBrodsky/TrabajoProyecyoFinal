import {config} from '../dbconfig.js';
import sql from 'mssql';
export class FormServices
{
    static insert = async (Form) =>
    {
        let rowsAffected=0;
        console.log('estoy en el insert');
        console.log(Form);
        const{IdUsuario,Dia} = Form;
        console.log(Dia);
        try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pIdUsuario',IdUsuario)
        .input('pDia',Dia)
        .query('INSERT INTO Formulario (IdUsuario, Dia) VALUES (@pIdUsuario, @pDia)')
        console.log(result);
        rowsAffected = result.rowsAffected;
        } catch (error){
            console.log(error)
        }
        return rowsAffected;
    }
    
   static getByFecha = async (Dia1,Dia2) =>
    {
        let returnEntity = null;
        console.log('Estoy en: Form.getByFecha()');
        try
        {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input("pFecha1",sql.Date,Dia1)
                                    .input ("pFecha2",sql.Date,Dia2)
                                    .query("SELECT * FROM Formulario WHERE Dia BETWEEN @pFecha1 AND @pFecha2");
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
    }
    
}
static getFormFiltrado = async (IdUsuario) =>
    {
        let returnEntity = null;
        console.log('Estoy en: Form.getFormFiltrado()',IdUsuario);
        try
        {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query("SELECT Formulario.*,R.TextoPregunta,R.Opcion,R.Texto,ParteCuerpo.Nombre FROM Formulario INNER JOIN Respuesta R on R.IdForm = Formulario.Id INNER JOIN ParteCuerpo on ParteCuerpo.Id = R.IdParteCuerpo");
            return result.recordsets[0];
        }
        catch(error){
            console.log(error);
    }
    
}
static getByIdUsuario = async (IdUsuario) =>
{
    let returnEntity = null;
    console.log('Estoy en: Form.getByIdUsuario()');
    try
    {
        let pool = await sql.connect(config);
        let result = await pool.request()
                                .input("pIdUsuario",sql.Int,IdUsuario)
                                
                                .query("SELECT * FROM Formulario WHERE @pIdUsuario = IdUsuario");
        return result.recordsets[0];
    }
    catch(error){
        console.log(error);
}


}
static getFormFiltradoByIdUSuario = async (IdUsuario) =>
{
    let returnEntity = null;
    console.log('Estoy en: Form.getFormFiltradoByIdUsuario()');
    try
    {
        let pool = await sql.connect(config);
        let result = await pool.request()
                                .input("pIdUsuario",sql.Int,IdUsuario)
                                
                                .query("SELECT Formulario.*,R.TextoPregunta,R.Opcion,R.Texto,ParteCuerpo.Nombre FROM Formulario INNER JOIN Respuesta R on R.IdForm = Formulario.Id INNER JOIN ParteCuerpo on ParteCuerpo.Id = R.IdParteCuerpo WHERE @pIdUsuario = IdUsuario");
        return result.recordsets[0];
    }
    catch(error){
        console.log(error);
}
}
static validar = async (dia1, idUsuario) => {
    console.log("llegue a formServices");
    let rowsAffected = 0;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("pDia1", sql.Date, dia1)
            .input("pIdUsuario", sql.Int, idUsuario)
            .query('SELECT * FROM Respuesta WHERE Fecha = @pDia1 and IdUsuario = @pIdUsuario');
        
        rowsAffected = result.rowsAffected;
        console.log(rowsAffected);
        console.log(result.rowsAffected);
    } catch (error) {
        console.log(error);
    }
    if(rowsAffected > 0) return true; 
    else {return false}
    return rowsAffected > 0; // Devuelve true si hay filas afectadas, es decir, si el formulario se encontró
}
}