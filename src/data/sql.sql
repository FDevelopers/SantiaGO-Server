CREATE DATABASE santiago_db_v2;

USE santiago_db_v2;

CREATE TABLE
    Chofer (
        id int NOT NULL AUTO_INCREMENT,
        nombre varchar(50) NOT NULL,
        apellido varchar(50) NOT NULL,
        fechaNacimiento DateTime,
        userName varchar(50) NOT NULL,
        userPassword varchar(100) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    Usuario (
        id int NOT NULL AUTO_INCREMENT,
        nombre varchar(50) NOT NULL,
        apellido varchar(50) NOT NULL,
        fechaNacimiento DateTime,
        userName varchar(50) NOT NULL,
        userPassword varchar(200) NOT NULL,
        UserEnable boolean not null,
        PRIMARY KEY (id)
    );

CREATE TABLE
    Ruta (
        id int NOT NULL AUTO_INCREMENT,
        descripcion varchar(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    TipoTransaccion (
        id int NOT NULL AUTO_INCREMENT,
        descripcion varchar(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    Tarjeta (
        id int NOT NULL AUTO_INCREMENT,
        cod varchar(30) NOT NULL,
        alias varchar(50),
        fkUsuario int NOT NULL,
        fechaRegistro DateTime NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (fkUsuario) REFERENCES Usuario (id)
    );

CREATE TABLE
    Polygon (
        id int NOT NULL AUTO_INCREMENT,
        fkRuta int NOT NULL,
        lat float NOT NULL,
        lgn float NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (fkRuta) REFERENCES Ruta (id)
    );

CREATE TABLE
    Paradas (
        id int NOT NULL AUTO_INCREMENT,
        fkRuta int NOT NULL,
        nombre varchar(50) NOT NULL,
        descripcion varchar(100),
        lat float NOT NULL,
        lgn float NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (fkRuta) REFERENCES Ruta (id)
    );

CREATE TABLE
    Vehiculo (
        id int NOT NULL AUTO_INCREMENT,
        ficha varchar(10) NOT NULL,
        placa varchar(15),
        fkChofer int NOT NULL,
        fkRuta int NOT NULL,
        lastLat float,
        lastLgn float,
        PRIMARY KEY (id),
        FOREIGN KEY (fkRuta) REFERENCES Ruta (id),
        FOREIGN KEY (fkChofer) REFERENCES Chofer (id)
    );

CREATE TABLE
    TransaccionCard (
        id int NOT NULL AUTO_INCREMENT,
        fkTarjeta int NOT NULL,
        fkTipoTransaccion int not null,
        montoCredito float NOT NULL,
        montoDebito float NOT NULL,
        fechaRegistro Datetime NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (fkTarjeta) REFERENCES Tarjeta (id),
        FOREIGN KEY (fkTipoTransaccion) REFERENCES TipoTransaccion (id)
    );

CREATE TABLE
    Evento (
        id int NOT NULL AUTO_INCREMENT,
        fkVehiculo int NOT NULL,
        fkTarjeta int NOT NULL,
        lat float NOT NULL,
        lgn float NOT NULL,
        fechaRegistro Datetime NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (fkVehiculo) REFERENCES Vehiculo (id),
        FOREIGN KEY (fkTarjeta) REFERENCES Tarjeta (id)
    );

SELECT
    id,
    nombre,
    fechaNacimiento,
    userName
FROM
    santiago_db_v2.Usuario
WHERE
    UserEnable = 1
    AND (
        nombre LIKE '%'
        OR userName LIKE '%'
    );