CREATE TABLE ROLES (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    nombre VARCHAR2(50) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE PERMISOS (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY,
    id_rol NUMBER NOT NULL,
    leer NUMBER NOT NULL,
    escribir NUMBER NOT NULL,
    eliminar NUMBER NOT NULL,
    modificar NUMBER NOT NULL,
    tabla VARCHAR2(50),
    PRIMARY KEY(id),
    CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES ROLES(id)
)

CREATE TABLE USUARIOS (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_rol NUMBER NOT NULL,
  nombre VARCHAR2(50) NOT NULL,
  email VARCHAR2(50) NOT NULL,
  contrasena VARCHAR2(50) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_rol_user FOREIGN KEY (id_rol) REFERENCES ROLES(id)
)

CREATE TABLE HORARIOS_USUARIOS (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_usuario NUMBER NOT NULL,
  nombre VARCHAR2(50) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_usuario_HORARIOS_USUARIOS FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id)
)

CREATE TABLE MATERIAS (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_horario NUMBER NOT NULL,
  nombre VARCHAR2(50) NOT NULL,
  color VARCHAR2(50) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_horario_materia FOREIGN KEY (id_horario) REFERENCES HORARIOS_USUARIOS(id)
)

CREATE TABLE DETALLES_MATERIAS (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_materia NUMBER NOT NULL,
  descripcion VARCHAR2(50) NOT NULL,
  mostrar NUMBER NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_materia_detalles FOREIGN KEY (id_materia) REFERENCES MATERIAS(id)
)

CREATE TABLE HORARIOS (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_materia NUMBER NOT NULL,
  dia VARCHAR2(1) NOT NULL,
  hora_incio VARCHAR2(5) NOT NULL,
  hora_fin VARCHAR2(5) NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_materia_horarios FOREIGN KEY (id_materia) REFERENCES MATERIAS(id)
)
  
CREATE TABLE DETALLES_HORARIOS (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_horario NUMBER NOT NULL,
  descripcion VARCHAR2(50) NOT NULL,
  mostrar NUMBER NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_horario_detalles FOREIGN KEY (id_horario) REFERENCES HORARIOS(id)
)

CREATE TABLE COMPARTIR_HORARIO (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  url_acesso VARCHAR2(50) NOT NULL, 
  id_horario NUMBER NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_horario_compartir FOREIGN KEY (id_horario) REFERENCES HORARIOS_USUARIOS(id)
)

CREATE TABLE COMENTARIOS_HORARIO (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY,
  id_horario NUMBER NOT NULL,
  id_usuario NUMBER NOT NULL,
  comentario VARCHAR2(255) NOT NULL,
  publicado DATE NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_horario_comentarios FOREIGN KEY (id_horario) REFERENCES HORARIOS_USUARIOS(id)
)