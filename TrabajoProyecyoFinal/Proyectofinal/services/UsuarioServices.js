import { config } from '../dbconfig.js';
import sql from 'mssql';

export class UsuarioServices {
  static getAll = async () => {
    let returnEntity = null;
    console.log('Estoy en: Usuario.getAll()');
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .query('SELECT * FROM Usuario');
      returnEntity = result.recordsets[0];
    }
    catch (error) {
      console.log("error");
    }
    return returnEntity;
  }

  static loguearse = async (Correo, Nombre, password) => {
    let usuario;
    let returnEntity = null;
    if (Correo != null) { usuario = Nombre }
    else { usuario = Correo }
    console.log('Estoy en: usuarioServices.Loguearse()');
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input("pUsuario", Correo)
        .input("pContraseña", password)
        .query('SELECT Id FROM Usuario WHERE Mail = @pUsuario AND Contraseña = @pContraseña');
        returnEntity = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  static register = async (User) => {
    let rowsAffected = 0;
    console.log('estoy en el insert');
    console.log(User);
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('pNombre', User.Nombre)
        .input('pApellido', User.Apellido)
        .input('pSexo', User.Sexo)
        .input('pFechaNacimiento', User.FechaDeNacimiento)
        .input('pCorreo', User.Correo)
        .input('pPassword', User.Password)
        .query('INSERT INTO Usuario (Nombre,Apellido,Sexo,FechaNacimiento,Mail,Contraseña) VALUES (@pNombre,@pApellido,@pSexo,@pFechaNacimiento,@pCorreo,@pPassword)');
      rowsAffected = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return rowsAffected;
  };


  static findUserByEmail = async (Correo) => {
    let usuario;
    let returnEntity = null;
    try {
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input("pUsuario", Correo)
        .query('SELECT Id FROM Usuario WHERE Mail = @pUsuario');
      returnEntity = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  };

  
}