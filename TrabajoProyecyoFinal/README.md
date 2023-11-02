# TrabajoProyecyoFinal

HAY QUE HACER EL NAVBAR FUNCIONAL
LOS SCREENS QUE FALTAN!!

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

SELECT
    R.Orden AS OrdenPregunta,
    COUNT(*) AS CantidadRespuestasOpcion1
FROM
    Respuesta AS R
WHERE
    R.Opcion = 1
GROUP BY
    R.Orden
ORDER BY
    R.Orden;



SELECT Orden,TextoPregunta, COUNT(*) AS Cantidad_Opcion_1
FROM Respuesta
WHERE Opcion = 1
GROUP BY Orden;