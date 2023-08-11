USE [master]
GO
/****** Object:  Database [ProyectoFinal-HelPark]    Script Date: 3/7/2023 08:35:28 ******/
CREATE DATABASE [ProyectoFinal-HelPark]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProyectoFinal-HelPark', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ProyectoFinal-HelPark.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProyectoFinal-HelPark_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ProyectoFinal-HelPark_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProyectoFinal-HelPark].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET RECOVERY FULL 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET  MULTI_USER 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'ProyectoFinal-HelPark', N'ON'
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET QUERY_STORE = OFF
GO
USE [ProyectoFinal-HelPark]
GO
/****** Object:  User [Proyecto]    Script Date: 3/7/2023 08:35:28 ******/
CREATE USER [Proyecto] FOR LOGIN [Proyecto] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 3/7/2023 08:35:28 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Proyecto]
GO
/****** Object:  Table [dbo].[Formulario]    Script Date: 3/7/2023 08:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Formulario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[Dia] [date] NOT NULL,
 CONSTRAINT [PK_Formulario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParteCuerpo]    Script Date: 3/7/2023 08:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ParteCuerpo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ParteCuerpo] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pregunta]    Script Date: 3/7/2023 08:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pregunta](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Texto] [varchar](max) NOT NULL,
	[OpcionParteCuerpo] [bit] NOT NULL,
	[IdForm] [int] NOT NULL,
 CONSTRAINT [PK_Pregunta] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Respuesta]    Script Date: 3/7/2023 08:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Respuesta](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TextoPregunta] [varchar](max) NOT NULL,
	[Opcion] [bit] NOT NULL,
	[Texto] [varchar](max) NULL,
	[IdParteCuerpo] [int] NULL,
	[IdForm] [int] NOT NULL,
	[Orden] [int] NULL,
 CONSTRAINT [PK_Respuesta] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 3/7/2023 08:35:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NOT NULL,
	[Sexo] [varchar](50) NOT NULL,
	[FechaNacimiento] [date] NOT NULL,
	[Mail] [varchar](max) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Formulario] ON 

INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (1, 1, CAST(N'2022-03-20' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (2, 1, CAST(N'2022-03-21' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (3, 1, CAST(N'2022-03-22' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (4, 2, CAST(N'2022-04-01' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (5, 2, CAST(N'2022-04-02' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (6, 3, CAST(N'2023-12-30' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (7, 3, CAST(N'2023-12-31' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (9, 4, CAST(N'2023-11-20' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (10, 4, CAST(N'2023-11-21' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (11, 5, CAST(N'2023-10-20' AS Date))
INSERT [dbo].[Formulario] ([Id], [IdUsuario], [Dia]) VALUES (12, 5, CAST(N'2023-10-21' AS Date))
SET IDENTITY_INSERT [dbo].[Formulario] OFF
GO
SET IDENTITY_INSERT [dbo].[ParteCuerpo] ON 

INSERT [dbo].[ParteCuerpo] ([Id], [Nombre]) VALUES (1, N'Extremidades')
INSERT [dbo].[ParteCuerpo] ([Id], [Nombre]) VALUES (2, N'Mandibula')
INSERT [dbo].[ParteCuerpo] ([Id], [Nombre]) VALUES (3, N'Espalda')
INSERT [dbo].[ParteCuerpo] ([Id], [Nombre]) VALUES (4, N'Cuello')
SET IDENTITY_INSERT [dbo].[ParteCuerpo] OFF
GO
SET IDENTITY_INSERT [dbo].[Pregunta] ON 

INSERT [dbo].[Pregunta] ([Id], [Texto], [OpcionParteCuerpo], [IdForm]) VALUES (1, N'¿Ha experimentado temblores en las últimas 24 horas?', 1, 1)
INSERT [dbo].[Pregunta] ([Id], [Texto], [OpcionParteCuerpo], [IdForm]) VALUES (2, N'¿Ha experimentado rigidez muscular en las últimas 24 horas?', 1, 1)
INSERT [dbo].[Pregunta] ([Id], [Texto], [OpcionParteCuerpo], [IdForm]) VALUES (3, N'¿Ha experimentado lentitud de movimientos en las últimas 24 horas?', 1, 1)
INSERT [dbo].[Pregunta] ([Id], [Texto], [OpcionParteCuerpo], [IdForm]) VALUES (4, N'
¿Ha experimentado cambios en el estado de ánimo en las últimas 24 horas?
', 0, 1)
INSERT [dbo].[Pregunta] ([Id], [Texto], [OpcionParteCuerpo], [IdForm]) VALUES (5, N'¿Ha experimentado cambios en el sueño en las últimas 24 horas?', 0, 1)
INSERT [dbo].[Pregunta] ([Id], [Texto], [OpcionParteCuerpo], [IdForm]) VALUES (6, N'¿Ha experimentado problemas cognitivos en las últimas 24 horas? ', 0, 1)
SET IDENTITY_INSERT [dbo].[Pregunta] OFF
GO
SET IDENTITY_INSERT [dbo].[Respuesta] ON 

INSERT [dbo].[Respuesta] ([Id], [TextoPregunta], [Opcion], [Texto], [IdParteCuerpo], [IdForm], [Orden]) VALUES (1, N'¿Ha experimentado cambios en el estado de ánimo en las últimas 24 horas? ', 1, N'Dormi mucho', NULL, 1, NULL)
INSERT [dbo].[Respuesta] ([Id], [TextoPregunta], [Opcion], [Texto], [IdParteCuerpo], [IdForm], [Orden]) VALUES (3, N'¿Ha experimentado rigidez muscular en las últimas 24 horas?', 1, NULL, 2, 1, NULL)
INSERT [dbo].[Respuesta] ([Id], [TextoPregunta], [Opcion], [Texto], [IdParteCuerpo], [IdForm], [Orden]) VALUES (4, N'¿Ha experimentado lentitud de movimientos en las últimas 24 horas? ', 1, NULL, 3, 1, NULL)
INSERT [dbo].[Respuesta] ([Id], [TextoPregunta], [Opcion], [Texto], [IdParteCuerpo], [IdForm], [Orden]) VALUES (5, N'¿Ha experimentado rigidez muscular en las últimas 24 horas?', 0, NULL, NULL, 1, NULL)
INSERT [dbo].[Respuesta] ([Id], [TextoPregunta], [Opcion], [Texto], [IdParteCuerpo], [IdForm], [Orden]) VALUES (6, N'¿Ha experimentado cambios en el estado de ánimo en las últimas 24 horas? ', 1, N'Dormi como un gilipollas', NULL, 1, 1)
INSERT [dbo].[Respuesta] ([Id], [TextoPregunta], [Opcion], [Texto], [IdParteCuerpo], [IdForm], [Orden]) VALUES (7, N'¿Ha experimentado rigidez muscular en las últimas 24 horas?', 1, NULL, 2, 1, 1)
SET IDENTITY_INSERT [dbo].[Respuesta] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([Id], [Nombre], [Apellido], [Sexo], [FechaNacimiento], [Mail], [Contraseña]) VALUES (1, N'Santino', N'Arana', N'M', CAST(N'1973-12-06' AS Date), N'santinoarana46@gmail.com', N'1234')
INSERT [dbo].[Usuario] ([Id], [Nombre], [Apellido], [Sexo], [FechaNacimiento], [Mail], [Contraseña]) VALUES (2, N'Luka', N'Moscovich', N'M', CAST(N'1974-06-11' AS Date), N'Lukamosco@gmail.com', N'3456')
INSERT [dbo].[Usuario] ([Id], [Nombre], [Apellido], [Sexo], [FechaNacimiento], [Mail], [Contraseña]) VALUES (3, N'Paula', N'Prisant', N'F', CAST(N'1950-08-12' AS Date), N'Pau@gmail.com', N'9876')
INSERT [dbo].[Usuario] ([Id], [Nombre], [Apellido], [Sexo], [FechaNacimiento], [Mail], [Contraseña]) VALUES (4, N'Agustin', N'Brodsky', N'M', CAST(N'1987-02-20' AS Date), N'Agustin@gmail.com', N'9999')
INSERT [dbo].[Usuario] ([Id], [Nombre], [Apellido], [Sexo], [FechaNacimiento], [Mail], [Contraseña]) VALUES (5, N'Adri', N'Turek', N'M', CAST(N'1976-12-22' AS Date), N'AdriTurek@gmail.com', N'8888')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Formulario]  WITH CHECK ADD  CONSTRAINT [FK_Formulario_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Formulario] CHECK CONSTRAINT [FK_Formulario_Usuario]
GO
ALTER TABLE [dbo].[Pregunta]  WITH CHECK ADD  CONSTRAINT [FK_Pregunta_Formulario] FOREIGN KEY([IdForm])
REFERENCES [dbo].[Formulario] ([Id])
GO
ALTER TABLE [dbo].[Pregunta] CHECK CONSTRAINT [FK_Pregunta_Formulario]
GO
ALTER TABLE [dbo].[Respuesta]  WITH CHECK ADD  CONSTRAINT [FK_Respuesta_Formulario] FOREIGN KEY([IdForm])
REFERENCES [dbo].[Formulario] ([Id])
GO
ALTER TABLE [dbo].[Respuesta] CHECK CONSTRAINT [FK_Respuesta_Formulario]
GO
ALTER TABLE [dbo].[Respuesta]  WITH CHECK ADD  CONSTRAINT [FK_Respuesta_ParteCuerpo] FOREIGN KEY([IdParteCuerpo])
REFERENCES [dbo].[ParteCuerpo] ([Id])
GO
ALTER TABLE [dbo].[Respuesta] CHECK CONSTRAINT [FK_Respuesta_ParteCuerpo]
GO
USE [master]
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET  READ_WRITE 
GO
