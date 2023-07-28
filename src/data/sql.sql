CREATE DATABASE SantiagoGo_DB;

USE SantiagoGo_DB;

create table
    Marca (idMarca int not null, descripcion varchar(50));

create table
    Cliente (
        idCliente int not null,
        nombre varchar(50),
        apellido varchar(50),
        fechaNacimiento datetime,
        fechaRegistro datetime
    );

create table
    Chofer (
        idChofer int not null,
        nombre varchar(50),
        apellido varchar(50),
        fechaNacimiento datetime,
        fechaRegistro datetime
    );

create table
    Vehiculo (
        idVehiculo int not null,
        fkMarca int,
        fkchofer int,
        modelo varchar(50),
        limPasajeros int,
        fechaRegistro datetime
    );

create table
    Viaje (
        idViaje int not null,
        fkVehiculo int,
        cantPasajeros int,
        ruta int,
        fechaRegistro datetime
    );

create table
    Tarjeta (
        idTarjeta int not null,
        fkCliente int,
        alias varchar(25),
        codigo varchar(50)
        balance float,
        fechaRegistro datetime
    );

create table
    Evento (
        idEvento int not null,
        fkTarjeta int,
        fkViaje int,
        lat int,
        lgn int,
        fechaRegistro datetime
    );