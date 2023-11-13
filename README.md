# Proyecto-Final-2023

Este es el README de nuestro proyecto final de 5to año. Es una aplicación para eficientar la vida de la gente que sufre parkinson, para que puedan tener un paso de la enfermedad más controlado. Tanto paciente como medico van a poder acceder a un formulario el cual se completa todos los dias para mantener un control y que el especialista pueda realizar el seguimiento correspondiente. Al mismo tiempo el que va a usar la aplicación podrá agregar todos los remedios que necesita tomar y así no sufre de olvidarse cuando debe ingerirlos. La misma fue desarrolada con React Native, Node.js y Microsoft SQL Server. Abajo esta toda la informacion para ejecutar y hacer uso de la aplicacion de HelPark.

# Creado con

* ![image](https://github.com/agusBrodsky/Proyecto-Final-2023/assets/106318798/b1221d8d-d54b-42e5-9bda-6c67318a5dcc)
* ![image](https://github.com/agusBrodsky/Proyecto-Final-2023/assets/106318798/441315cf-6874-4224-b851-27a8314f4235)
* ![image](https://github.com/agusBrodsky/Proyecto-Final-2023/assets/106318798/0a9cc519-ac08-4111-b761-bc143cf41051)
* ![image](https://github.com/agusBrodsky/Proyecto-Final-2023/assets/106318798/e9daf52e-08f6-4a94-bead-a136d8aa1894)

# Instalación
Para ejecutar el proyecto tenes que: 
* Abir el Visual Studio Code
* Una vez abierto vamos a la ventana "Terminal".
* Ponemos "Nueva terminal" o clickeamos Ctrl + Shift + N
* Al abirse la terminal, ejecutamos la siguiente linea de codigo:
* 
  ```sh
   git clone https://github.com/agusBrodsky/TrabajoProyecyoFinal.git
   ```
* Esperamos que termine de cargar y abrimos nuevamente la terminal.
* Ejecutamos "cd ./TrabajoProyecyoFinal/" para abrir el trabajo
* Clickeamos Ctrl + Shift + 5 para abrir 2 terminales al mismo tiempo
En la Primera Terminal!
* Escribimos "cd ./TrabajoProyecyoFinal/" para pararnos en el archivo front-end del proyecto
* Luego ejecutamos "npm i"
* Y "npm i expo-cli"

Segunda Terminal!
* En la segunda terminal ejecutamos "cd ./ProyectoFinal/" para pararnos en el archivo back-end del proyecto
* Ejecutamos "npm i"
* Abrimos el archivo .env Y modificamos en "DB_SERVER" actualizando por el nombre de nuestra computadora!

SQL

* Abrimos "Microsoft SQL Server Management Studio 18"
* Iniciamos utilizando "SQL Connect Authentication"
* Seleccionamos el boton que dice "New Query" en la parte de arriba de SQL. (se abrira una pagina en blanco con la posiblidad de escribir)
* Abriremos github, y en la carpeta llamada "ProyectoFinal" buscamos el archivo llamado ProyectoFinal-HelPark.sql Entramos, y lo copiamos.
* Pegamos el codigo de la base de datos en SQL y ponemos "Execute" o clickeamos f5.
* Apretamos nuevamente en "New Query" y pegamos el siguiente codigo
```sh
    USE [master]
    GO
    CREATE LOGIN [Proyecto2] WITH PASSWORD=N'Proyecto2', DEFAULT_DATABASE=[ProyectoFinal-HelPark], CHECK_EXPIRATION=OFF,
    CHECK_POLICY=OFF
    GO

    USE [ProyectoFinal-HelPark]
    GO
    CREATE USER [Proyecto2] FOR LOGIN [Proyecto2]
    GO
    USE [ProyectoFinal-HelPark]
    GO
    ALTER ROLE [db_owner] ADD MEMBER [Proyecto2]
    GO
   ```
* Y nuevamente corremos el codigo (apretamos Execute o f5)
* en la parte de la izquierda apretamos en el icono enchufe con una "x" roja y luego el de al lado (el icono enchufe sin "x").
* Se nos abrira nuevamente un modal para iniciar sesión. Y en la parte de Authentication seleccionamos "SQL Server Authentication"
* Y nos logueamos con Login:"Proyecto2" Y Password:"Proyecto2"

Volvemos a Visual Studio Code
* Ejecutamos en la primera terminal "expo-start --tunnel"
* En la primera terminal descargamos ngrow (clickeando "Y") - en el caso de que sea necesario!.
* Y luego "W" para abrir el proyecto en la computadora.
* En la segunda terminal para correrlo ejecutamos "node index.js"

## Contacto

**Agustin Brodsky** - 

Gmail: agusbrodsky2006@gmail.com 

Instagram: agusbrod_

GitHub: https://github.com/agusBrodsky 

**Santino Arana** - 

Gmail: santinoarana46@gmail.com 

Instagram: sanntiarana

GitHub: https://github.com/santiarana

**Luka Moscovich** -

Gmail: lukamosco3@gmail.com

Instagram: lukamosco_

Github: https://github.com/lukamosco3




