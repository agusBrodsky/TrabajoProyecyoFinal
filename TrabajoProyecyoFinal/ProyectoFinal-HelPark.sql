USE [master]
GO
/****** Object:  Database [ProyectoFinal-HelPark]    Script Date: 9/11/2023 13:27:35 ******/
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
/****** Object:  User [Proyecto2]    Script Date: 9/11/2023 13:27:35 ******/
CREATE USER [Proyecto2] FOR LOGIN [Proyecto2] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 9/11/2023 13:27:35 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Proyecto2]
GO
/****** Object:  Table [dbo].[Medicacion]    Script Date: 9/11/2023 13:27:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicacion](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](max) NULL,
	[Cuando] [int] NULL,
	[Hora] [date] NULL,
	[Descripcion] [varchar](max) NULL,
	[IdUsuario] [int] NULL,
 CONSTRAINT [PK_Medicacion] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ParteCuerpo]    Script Date: 9/11/2023 13:27:35 ******/
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
/****** Object:  Table [dbo].[Pregunta]    Script Date: 9/11/2023 13:27:35 ******/
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
/****** Object:  Table [dbo].[Respuesta]    Script Date: 9/11/2023 13:27:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Respuesta](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TextoPregunta] [varchar](max) NULL,
	[Opcion] [bit] NULL,
	[Texto] [varchar](max) NULL,
	[IdParteCuerpo] [int] NULL,
	[Orden] [int] NULL,
	[IdUsuario] [int] NULL,
	[Fecha] [date] NULL,
 CONSTRAINT [PK_Respuesta] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 9/11/2023 13:27:35 ******/
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
ALTER TABLE [dbo].[Respuesta]  WITH CHECK ADD  CONSTRAINT [FK_Respuesta_ParteCuerpo] FOREIGN KEY([IdParteCuerpo])
REFERENCES [dbo].[ParteCuerpo] ([Id])
GO
ALTER TABLE [dbo].[Respuesta] CHECK CONSTRAINT [FK_Respuesta_ParteCuerpo]
GO
ALTER TABLE [dbo].[Respuesta]  WITH CHECK ADD  CONSTRAINT [FK_Respuesta_Pregunta] FOREIGN KEY([Orden])
REFERENCES [dbo].[Pregunta] ([Id])
GO
ALTER TABLE [dbo].[Respuesta] CHECK CONSTRAINT [FK_Respuesta_Pregunta]
GO
USE [master]
GO
ALTER DATABASE [ProyectoFinal-HelPark] SET  READ_WRITE 
GO
