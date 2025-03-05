import oracledb
from datetime import datetime

from dotenv import load_dotenv
from os import getenv 

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from crearTablas import crear_tablas

PORT = 3000
load_dotenv()

un = getenv('ORACLE_USERNAME')
cs = getenv('ORACLE_CONNECTSTRING')
pw = getenv('ORACLE_PASSWORD')

class Roles(BaseModel):
    nombre: str

class Permisos(BaseModel):
    id_rol: int
    leer: int
    escribir: int
    eliminar: int
    modificar: int

class Usuarios(BaseModel):
    id_rol: int
    nombre: str
    email: str
    contrasena: str

class HorariosUsuarios(BaseModel):
    id_usuario: int
    nombre: str

class Materias(BaseModel):
    id_horario: int
    nombre: str
    color: str
    
class DetallesMaterias(BaseModel):
    id_materia: int
    descripcion: str
    mostrar: int

class CompartirHorario(BaseModel):
    url_accesso: str
    id_horario: int


class ComentariosHorario(BaseModel):
    id_horario: int
    comentario: str
    id_usuario: int
    publicado: datetime

# Pydantic model for order data
class Order(BaseModel):
    order_id: int
    product_name: str
    quantity: int

# Define the FastAPI app
app = FastAPI()

# Create a connection pool
pool = oracledb.create_pool(user=un, password=pw, dsn=cs, min=1, max=4, increment=1)

# Set up the schema
with pool.acquire() as connection:
    with connection.cursor() as cursor:
        crear_tablas(cursor)

def template_create(table, data):
    try:
        keys = ', '.join(data.keys())
        values = ', '.join([f":{i + 1}" for i in range(len(data))])
        with pool.acquire() as connection:
            connection.autocommit = True
            with connection.cursor() as cursor:
                cursor.execute(f"INSERT INTO {table} ({keys}) VALUES ({values})", tuple(data.values()))
                return data
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# Endpoint to retrieve all
def template_select(table, campos = []):
    try:
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM {table}")
                data = cursor.fetchall()
                return [{k: v for k, v in zip(campos, row)} if campos else row for row in data]
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

def template_select_where(table, where, campos = []):
    try:
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                print(f'SELECT * FROM {table} WHERE {where}')
                cursor.execute(f"SELECT * FROM {table} WHERE {where}")
                data = cursor.fetchone()
                if(data is None):
                    raise HTTPException(status_code=404, detail=f"{table} {where} not found")
                return {k: v for k, v in zip(campos, data)} if campos else data
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    
def template_update(table, data, where):
    try:
        set = ', '.join([f"{k} = :{i + 1}" for i, k in enumerate(data.keys())])
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                cursor.execute(f"UPDATE {table} SET {set} WHERE {where}", tuple(data.values()))
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    
def template_delete(table, where):
    try:
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                cursor.execute(f"DELETE FROM {table} WHERE {where}")
            return {"message": "Record deleted"}
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")


#
# ROLES
#

@app.post('/roles/', response_model=Roles, tags=["Roles"])
def create_rol(rol: Roles):
    return template_create('ROLES', rol.dict())

@app.get('/roles/', tags=["Roles"])
def get_roles():
    return template_select('ROLES', ['id', 'nombre'])

@app.get('/roles/{rol_id}', response_model=Roles, tags=["Roles"])
def get_rol(rol_id: int):
    return template_select_where('ROLES', f'id = {rol_id}', ['id', 'nombre'])

@app.put('/roles/{rol_id}', response_model=Roles, tags=["Roles"])
def update_rol(rol_id: int, rol: Roles):
    return template_update('ROLES', rol.dict(), f'id = {rol_id}')

@app.delete('/roles/{rol_id}', tags=["Roles"])
def delete_rol(rol_id: int):
    return template_delete('ROLES', f'id = {rol_id}')

#
# PERMISOS
#

@app.post('/permisos/', response_model=Permisos, tags=["Permisos"])
def create_permiso(permiso: Permisos):
    return template_create('PERMISOS', permiso.dict())

@app.get('/permisos/', tags=["Permisos"])
def get_permisos():
    return template_select('PERMISOS', ['id', 'id_rol', 'leer', 'escribir', 'eliminar', 'modificar', 'tabla'])

@app.get('/permisos/{permiso_id}', response_model=Permisos, tags=["Permisos"])
def get_permiso(permiso_id: int):
    return template_select_where('PERMISOS', f'id = {permiso_id}', ['id', 'id_rol', 'leer', 'escribir', 'eliminar', 'modificar', 'tabla'])

@app.put('/permisos/{permiso_id}', response_model=Permisos, tags=["Permisos"])
def update_permiso(permiso_id: int, permiso: Permisos):
    return template_update('PERMISOS', permiso.dict(), f'id = {permiso_id}')

@app.delete('/permisos/{permiso_id}', tags=["Permisos"])
def delete_permiso(permiso_id: int):
    return template_delete('PERMISOS', f'id = {permiso_id}')

#
# USUARIOS
#

@app.post('/usuarios/', response_model=Usuarios, tags=["Usuarios"])
def create_usuario(usuario: Usuarios):
    return template_create('USUARIOS', usuario.dict())

@app.get('/usuarios/', tags=["Usuarios"])
def get_usuarios():
    return template_select('USUARIOS', ['id', 'id_rol', 'nombre', 'email', 'contrasena'])

@app.get('/usuarios/{usuario_id}', response_model=Usuarios, tags=["Usuarios"])
def get_usuario(usuario_id: int):
    return template_select_where('USUARIOS', f'id = {usuario_id}', ['id', 'id_rol', 'nombre', 'email', 'contrasena'])

@app.put('/usuarios/{usuario_id}', response_model=Usuarios, tags=["Usuarios"])
def update_usuario(usuario_id: int, usuario: Usuarios):
    return template_update('USUARIOS', usuario.dict(), f'id = {usuario_id}')

@app.delete('/usuarios/{usuario_id}', tags=["Usuarios"])
def delete_usuario(usuario_id: int):
    return template_delete('USUARIOS', f'id = {usuario_id}')

#
# HORARIOS USUARIOS
#

@app.post('/horarios_usuarios/', response_model=HorariosUsuarios, tags=["HorariosUsuarios"])
def create_horario_usuario(horario_usuario: HorariosUsuarios):
    return template_create('HORARIOS_USUARIOS', horario_usuario.dict())

@app.get('/horarios_usuarios/', tags=["HorariosUsuarios"])
def get_horarios_usuarios():
    return template_select('HORARIOS_USUARIOS', ['id', 'id_usuario', 'nombre'])

@app.get('/horarios_usuarios/{horario_usuario_id}', response_model=HorariosUsuarios, tags=["HorariosUsuarios"])
def get_horario_usuario(horario_usuario_id: int):
    return template_select_where('HORARIOS_USUARIOS', f'id = {horario_usuario_id}', ['id', 'id_usuario', 'nombre'])

@app.put('/horarios_usuarios/{horario_usuario_id}', response_model=HorariosUsuarios, tags=["HorariosUsuarios"])
def update_horario_usuario(horario_usuario_id: int, horario_usuario: HorariosUsuarios):
    return template_update('HORARIOS_USUARIOS', horario_usuario.dict(), f'id = {horario_usuario_id}')

@app.delete('/horarios_usuarios/{horario_usuario_id}', tags=["HorariosUsuarios"])
def delete_horario_usuario(horario_usuario_id: int):
    return template_delete('HORARIOS_USUARIOS', f'id = {horario_usuario_id}')

#
# MATERIAS
#

@app.post('/materias/', response_model=Materias, tags=["Materias"])
def create_materia(materia: Materias):
    return template_create('MATERIAS', materia.dict())

@app.get('/materias/', tags=["Materias"])
def get_materias():
    return template_select('MATERIAS', ['id', 'id_horario', 'nombre', 'color'])

@app.get('/materias/{materia_id}', response_model=Materias, tags=["Materias"])
def get_materia(materia_id: int):
    return template_select_where('MATERIAS', f'id = {materia_id}', ['id', 'id_horario', 'nombre', 'color'])

@app.put('/materias/{materia_id}', response_model=Materias, tags=["Materias"])
def update_materia(materia_id: int, materia: Materias):
    return template_update('MATERIAS', materia.dict(), f'id = {materia_id}')

@app.delete('/materias/{materia_id}', tags=["Materias"])
def delete_materia(materia_id: int):
    return template_delete('MATERIAS', f'id = {materia_id}')

#
# DETALLES MATERIAS
#

@app.post('/detalles_materias/', response_model=DetallesMaterias, tags=["DetallesMaterias"])
def create_detalle_materia(detalle_materia: DetallesMaterias):
    return template_create('DETALLES_MATERIAS', detalle_materia.dict())

@app.get('/detalles_materias/', tags=["DetallesMaterias"])
def get_detalles_materias():
    return template_select('DETALLES_MATERIAS', ['id', 'id_materia', 'descripcion', 'mostrar'])

@app.get('/detalles_materias/{detalle_materia_id}', response_model=DetallesMaterias, tags=["DetallesMaterias"])
def get_detalle_materia(detalle_materia_id: int):
    return template_select_where('DETALLES_MATERIAS', f'id = {detalle_materia_id}', ['id', 'id_materia', 'descripcion', 'mostrar'])

@app.put('/detalles_materias/{detalle_materia_id}', response_model=DetallesMaterias, tags=["DetallesMaterias"])
def update_detalle_materia(detalle_materia_id: int, detalle_materia: DetallesMaterias):
    return template_update('DETALLES_MATERIAS', detalle_materia.dict(), f'id = {detalle_materia_id}')

@app.delete('/detalles_materias/{detalle_materia_id}', tags=["DetallesMaterias"])
def delete_detalle_materia(detalle_materia_id: int):
    return template_delete('DETALLES_MATERIAS', f'id = {detalle_materia_id}')

#
# COMPARTIR HORARIO
#

@app.post('/compartir_horario/', response_model=CompartirHorario, tags=["CompartirHorario"])
def create_compartir_horario(compartir_horario: CompartirHorario):
    return template_create('COMPARTIR_HORARIO', compartir_horario.dict())

@app.get('/compartir_horario/', tags=["CompartirHorario"])
def get_compartir_horarios():
    return template_select('COMPARTIR_HORARIO', ['id', 'url_acesso', 'id_horario'])

@app.get('/compartir_horario/{compartir_horario_id}', response_model=CompartirHorario, tags=["CompartirHorario"])
def get_compartir_horario(compartir_horario_id: int):
    return template_select_where('COMPARTIR_HORARIO', f'id = {compartir_horario_id}', ['id', 'url_acesso', 'id_horario'])

@app.put('/compartir_horario/{compartir_horario_id}', response_model=CompartirHorario, tags=["CompartirHorario"])
def update_compartir_horario(compartir_horario_id: int, compartir_horario: CompartirHorario):
    return template_update('COMPARTIR_HORARIO', compartir_horario.dict(), f'id = {compartir_horario_id}')

@app.delete('/compartir_horario/{compartir_horario_id}', tags=["CompartirHorario"])
def delete_compartir_horario(compartir_horario_id: int):
    return template_delete('COMPARTIR_HORARIO', f'id = {compartir_horario_id}')

#
# COMENTARIOS HORARIO
#

@app.post('/comentarios_horario/', response_model=ComentariosHorario, tags=["ComentariosHorario"])
def create_comentario_horario(comentario_horario: ComentariosHorario):
    return template_create('COMENTARIOS_HORARIO', comentario_horario.dict())

@app.get('/comentarios_horario/', tags=["ComentariosHorario"])
def get_comentarios_horarios():
    return template_select('COMENTARIOS_HORARIO', ['id', 'id_horario', 'comentario', 'id_usuario', 'publicado'])

@app.get('/comentarios_horario/{comentario_horario_id}', response_model=ComentariosHorario, tags=["ComentariosHorario"])
def get_comentario_horario(comentario_horario_id: int):
    return template_select_where('COMENTARIOS_HORARIO', f'id = {comentario_horario_id}', ['id', 'id_horario', 'comentario', 'id_usuario', 'publicado'])

@app.put('/comentarios_horario/{comentario_horario_id}', response_model=ComentariosHorario, tags=["ComentariosHorario"])
def update_comentario_horario(comentario_horario_id: int, comentario_horario: ComentariosHorario):
    return template_update('COMENTARIOS_HORARIO', comentario_horario.dict(), f'id = {comentario_horario_id}')

@app.delete('/comentarios_horario/{comentario_horario_id}', tags=["ComentariosHorario"])
def delete_comentario_horario(comentario_horario_id: int):
    return template_delete('COMENTARIOS_HORARIO', f'id = {comentario_horario_id}')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fapi:app", host="0.0.0.0", port=PORT, reload=True)
