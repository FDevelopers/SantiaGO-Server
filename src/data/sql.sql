CREATE DATABASE santiago_db;
USE santiago_db;

CREATE TABLE Chofer (
    id int NOT NULL AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    fechaNacimiento DateTime,
    userName varchar(50) NOT NULL,
    userPassword varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Usuario (
    id int NOT NULL AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    apellido varchar(50) NOT NULL,
    fechaNacimiento DateTime,
    userName varchar(50) NOT NULL,
    userPassword varchar(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Ruta (
    id int NOT NULL AUTO_INCREMENT,
    descripcion varchar(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Tarjeta (
    id int NOT NULL AUTO_INCREMENT,
    cod varchar(30) NOT NULL,
    fkUsuario int NOT NULL,
    balance float NOT NULL,
    fechaRegistro DateTime NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(id)
);

CREATE TABLE Polygon (
    id int NOT NULL AUTO_INCREMENT,
    fkRuta int NOT NULL,
    lat float NOT NULL,
    lgn float NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fkRuta) REFERENCES Ruta(id)
);

CREATE TABLE Paradas (
    id int NOT NULL AUTO_INCREMENT,
    fkRuta int NOT NULL,
    nombre varchar(50) NOT NULL,
    descripcion varchar(100),
    lat float NOT NULL,
    lgn float NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fkRuta) REFERENCES Ruta(id)
);

CREATE TABLE Vehiculo (
    id int NOT NULL AUTO_INCREMENT,
    ficha varchar(10) NOT NULL,
    placa varchar(15),
    fkChofer int NOT NULL,
    fkRuta int NOT NULL,
    lastLat float,
    lastLgn float,
    PRIMARY KEY (id),
    FOREIGN KEY (fkRuta) REFERENCES Ruta(id),
    FOREIGN KEY (fkChofer) REFERENCES Chofer(id)
);

CREATE TABLE Evento (
    id int NOT NULL AUTO_INCREMENT,
    fkVehiculo int NOT NULL,
    fkTarjeta int NOT NULL,
    lat float NOT NULL,
    lgn float NOT NULL,
    fechaRegistro Datetime NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fkVehiculo) REFERENCES Vehiculo(id),
    FOREIGN KEY (fkTarjeta) REFERENCES Tarjeta(id)
);

--Valores Pruebas

--Chofer
INSERT INTO Chofer VALUES (0,'ARTURO','ESPINAL','1998-10-16','aespinal','r1234');

--Usuario
INSERT INTO Usuario VALUES (0,'FERNANDO','DISLA','1998-10-16','fdisla','r1234');

--Ruta
INSERT INTO Ruta VALUES (0,'Ruta A');
INSERT INTO Ruta VALUES (0,'Ruta B');

--Vehiculo
INSERT INTO Vehiculo VALUES (0,'F-100','A8823',1,1,0,0);

--Tarjeta
INSERT INTO Tarjeta VALUES (0,'00Z',1,0,'2023-12-29');

--Paradas
INSERT INTO Paradas VALUES (0,1,'KIOSKO', '',0,0);