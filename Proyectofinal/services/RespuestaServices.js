import {config} from '../dbconfig.js';
import sql from 'mssql';
import ParteCuerpo from '../models/ParteCuerpo.js';
export class RespuestaServices
{ static getCount = async (Dia1,Dia2,IdUsuario) =>
    {
        let returnEntity = null;
        console.log('Estoy en: Respuesta.getCount()');
        try
        {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("pFecha1",sql.Date,Dia1)
                .input ("pFecha2",sql.Date,Dia2)
                .input ("pIdUsuario",sql.Int,IdUsuario)
                .query(`
                SELECT Pregunta.Id, Pregunta.Texto AS TextoPregunta, COALESCE(COUNT(Respuesta.Id), 0) AS CANTIDAD
FROM Pregunta
LEFT JOIN Respuesta ON Respuesta.Orden = Pregunta.Id
    AND Respuesta.Opcion = 1
    AND Respuesta.Fecha BETWEEN @pFecha1 AND @pFecha2
    AND Respuesta.IdUsuario = 1
GROUP BY Pregunta.Id, Pregunta.Texto
ORDER BY Pregunta.Id;

                `);
            return result.recordsets;
        }
        catch (error)
        {
            console.log(error);
    }
}
/*
        .input("pUsuario", Correo)
        .input("pContraseña", password)
        .query('SELECT * FROM Usuario WHERE Mail = @pUsuario AND Contraseña = @pContraseña');
      rowsAffected = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return rowsAffected;
  };

  */
static insert = async (Respuesta) =>
{
    let rowsAffected=0;
    console.log('estoy en el insert');
    
    const{TextoPregunta,Opcion,Texto,IdParteCuerpo,IdForm,Orden,IdUsuario,Fecha} = Respuesta;
    try{
    let pool = await sql.connect(config);
    let result = await pool.request()
    .input('pTextoPregunta',TextoPregunta)
    .input('pOpcion',Opcion)
    .input('pTexto',Texto)
    .input('pIdParteCuerpo',IdParteCuerpo)
    .input('pOrden',Orden)
    .input('pIdUsuario',IdUsuario)
    .input('pFecha',Fecha)
    .query('INSERT INTO Respuesta (TextoPregunta, Opcion, Texto, IdParteCuerpo, Orden, IdUsuario,Fecha) VALUES (@pTextoPregunta, @pOpcion, @pTexto, @pIdParteCuerpo, @pOrden,@pIdUsuario,@pFecha)')
    console.log(result); 
    rowsAffected = result.rowsAffected;
    } catch (error){
        console.log(error)
    }
    return rowsAffected;
}
static getById = async (Dia1,Dia2,id)  =>{ 
    let returnEntity = null;
    console.log("estoyy en respuesta/getById")
    try{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pOrden',sql.Int,id)
        .input("pFecha1",sql.Date,Dia1)
        .input ("pFecha2",sql.Date,Dia2)
        .query(`SELECT * FROM Respuesta WHERE Orden = @pOrden AND Opcion = 1 AND Respuesta.Fecha BETWEEN @pFecha1 AND @pFecha2`);
        returnEntity = result.recordsets[0];
    }
    catch(error){
        console.log("error");
    }
    return returnEntity;
}

static getAll = async () =>
{
    let returnEntity = null;
    console.log('Estoy en: RespuestaServices.getAll()');
    try
    {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .query('SELECT * FROM Respuesta');
        return result.recordsets[0];
    }
    catch(error){
        console.log(error);
}
}
static insertJ = async (listaR) => 
{ 
  /*
  [
    { "TextoPregunta": "Pregunta 1", "Opcion": "Opción 1", "Texto": "Texto 1", "IdParteCuerpo": 1, "IdForm": 1 },
    { "TextoPregunta": "Pregunta 2", "Opcion": "Opción 2", "Texto": "Texto 2", "IdParteCuerpo": 2, "IdForm": 2 },
  ]
  */

  listaR.map(o => this.insert(o));
}
static getLastRespuesta = async (Fecha, idUsuario) =>
{
    let returnEntity = null;
    console.log('Estoy en: RespuestaServices.getLastRespuesta(Fecha,idUsuario)');
    try
    {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pFecha',Fecha)
        .input('pIdUsuario',idUsuario)
        .query(`SELECT * FROM Respuesta WHERE Fecha = @pFecha `)
        return result.recordsets[0];
    }
    catch(error){
        console.log(error);
    }
    return "jaja invalido!!";
}
static update = async ( respuestas) =>{
    let rowsAffected=0;
    console.log('estoy en el update');
    console.log(respuestas);/*
    const{TextoPregunta,Opcion,Texto,IdParteCuerpo,IdForm,Orden,IdUsuario,Fecha} = respuestas;
    try{
    let pool = await sql.connect(config);
    let result = await pool.request()
    .input('pTextoPregunta',TextoPregunta)
    .input('pOpcion',Opcion)
    .input('pTexto',Texto)
    .input('pIdParteCuerpo',IdParteCuerpo)
    .input('pOrden',Orden)
    .input('pIdUsuario',IdUsuario)
    .input('pFecha',Fecha)
    .query(`INSERT INTO Respuesta (UPDATE Respuesta 
        SET IdUsuario = 2 
        WHERE Fecha = '2023-11-07' and IdUsuario = 1 `)
    console.log(result); 
    rowsAffected = result.rowsAffected;
    } catch (error){
        console.log(error)
    }
    return rowsAffected;*/
    return null;
}

}
