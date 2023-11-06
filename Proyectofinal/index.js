import config from './dbconfig.js';
import sql from 'mssql';
import { application } from 'express';
import express from "express";
import cors from "cors";

import { PreguntaServices } from './services/PreguntaServices.js';
import { ParteCuerpoServices } from './services/ParteCuerpoServices.js';
import { RespuestaServices } from './services/RespuestaServices.js';
import { MedicacionServices } from './services/MedicacionServices.js';
import { FormServices } from './services/FormServices.js';
import {UsuarioServices} from './services/UsuarioServices.js';
import {citaServices} from './services/CitaServices.js';
import Medicacion from './models/Medicacion.js';
import Respuesta from './models/Respuesta.js';
import ParteCuerpo from './models/ParteCuerpo.js';
import Cita from './models/Cita.js';




const app = express();
const port = 3000; 
app.use(cors());
app.use(express.json());

app.get('/Pregunta',async(req,res)=>{
    const Pregunta = await PreguntaServices.getAll(req.params.Id)
    res.status(200).send(Pregunta)
})

app.get('/ParteCuerpo',async(req,res)=>{
    const ParteCuerpo = await ParteCuerpoServices.getAll(req.params.Id)
    res.status(200).send(ParteCuerpo)
})
app.get('/Respuesta/:idPregunta', async (req, res) => { 
    console.log("entré a respuesta!!")
    const respuesta = await RespuestaServices.getById(req.params.idPregunta)
    res.status(200).send(respuesta)
});


app.post('/Medicacion',async(req,res)=>{
    try{
        await MedicacionServices.insert(req.body)
        res.status(200).json({message:'Medicacion creada'});
    }   catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insertar'});
    }
})
app.get('/Medicacion',async(req,res)=>{
    const Medicacion = await MedicacionServices.getAll(req.params.Id)
    res.status(200).send(Medicacion)
})

app.get('/Respuesta',async(req,res)=>{ 
    const Respuesta = await RespuestaServices.getAll()
    res.status(200).send(Respuesta)
})

app.post('/Respuesta',async(req,res)=>{
    try{
        await RespuestaServices.insert(req.body)
        res.status(200).json({message:'Respuesta insertada'});
    }   catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insertar'});
    }
})
app.post('/Lista',async(req,res)=>{
    try{
        await RespuestaServices.insertJ(req.body)
        res.status(200).json({message:'Respuesta insertada'});
    }   catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insertar'});
    }
})

app.get('/Fecha/:Dia1/:Dia2/:IdUsuario',async(req,res)=>{ 
    console.log(req.params);
    const Respuesta = await RespuestaServices.getCount(req.params.Dia1,req.params.Dia2,req.params.IdUsuario)
    console.log(Respuesta);
    res.status(200).send(Respuesta)
})
app.get('/Respuesta/:Dia1/:Dia2/:idPregunta',async(req,res)=>{
    console.log(req.params);
    const Respuesta = await RespuestaServices.getById(req.params.Dia1,req.params.Dia2,req.params.idPregunta)
    res.status(200).send(Respuesta)
})

app.get('/FormF',async(req,res)=>{
    const Form = await FormServices.getFormFiltrado(req.params.Id)
    res.status(200).send(Form)
})

app.get('/FormI/:IdUsuario',async(req,res)=>{
    const Form = await FormServices.getByIdUsuario(req.params.IdUsuario)
    res.status(200).send(Form)
})

app.get('/FormUsuario/:IdUsuario',async(req,res)=>{
    const Form = await FormServices.getFormFiltradoByIdUSuario(req.params.IdUsuario)
    res.status(200).send(Form)
}) 
// ------------------------------------------------------SANTI.!!!!! USA ESTOS DOS DE EJEMPLO--------------------------------!!!
app.post('/Usuario', async (req, res) => {
    console.log("llegue a backend /Usuario!")
    console.log(req.body);
    const login = await UsuarioServices.loguearse(req.body.Correo,req.body.Usuario, req.body.Password)
    if (login.Id > 0) {
        console.log("porfin guafff");
    res.status(200).send({'message': 'authenticated', 'Id': login.Id })
    }
    else { res.status(404).send({'message':'user not found'})}
    
})



app.post('/register', async (req, res) => {
    try {
      console.log(req.body);
      const register = await UsuarioServices.register(req.body);
      // Obtener el ID del usuario recién registrado
      const user = await UsuarioServices.findUserByEmail(req.body.Correo); // Implementa esta función para encontrar el usuario por correo electrónico
      if (user && user.Id) {
        res.status(200).send({'message': 'usuario cargado en la base de datos!', Id: user.Id });
      } else {
        res.status(500).send({'message': 'Error al obtener el ID del usuario'});
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({'message': 'user not registered'});
    }
  });

  
app.get('/ValidarForm/:dia1/:idUsuario', async (req, res) => {
    console.log("llegue a validarForm!!");
    (req.params.idUsuario) ? console.log("falta hacer el login!!") : {}
    const valido = await FormServices.validar(req.params.dia1, req.params.idUsuario);
    console.log("valido");
    if (valido) {
        
        res.status(200).send({'message': 'formulario ya hecho!', 'valido': true});
        return true;
    } else {
        res.status(200).send({'message': 'formulario no encontrado!', 'valido' : false});
    }
});

app.get('/getMedicacion', async (req, res) => {
    console.log("llegue a ver la medicacion");
    const med = await MedicacionServices.getAll();
    console.log("valido");
    if (med) {
        
        res.status(200).send({'message': 'Medicacion encontrada', 'valido':true});
        return true;
    } else {
        res.status(200).send({'message': 'Medicacion no encontrada', 'valido' : false});
    }
});

app.post('/agMed', async (req, res) => {
    try {
      console.log(req.body);
      const med = await MedicacionServices.insert(req.body);
      if (med) {
        res.status(200).send({'message': 'Medicacion insertada con exito'});
      } else {
        res.status(500).send({'message': 'Error al insertar la medicacion'});
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({'message': 'medicacion no insertada'});
    }
  });
app.get('/getLastRespuesta/:Fecha/:idUsuario', async (req,res)=>{
    console.log("llegue a getLastRespuesta")
    try{
        const Respuestas = await RespuestaServices.getLastRespuesta(req.params.Fecha,req.params.idUsuario)
        res.status(200).send(Respuestas)
    }
    catch(error){
        console.log(req.params.Fecha,req.params.idUsuario)
        console.log("error");
        res.status(500).send({'message': 'error al traer las respuestas para editar!'})
    }
})
app.listen(port, () =>
{
    console.log("escucho");
}
)

