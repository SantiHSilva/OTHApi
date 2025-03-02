import oracledb
import logging

from dotenv import load_dotenv
from os import getenv 

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from crearTablas import crear_tablas

PORT = 8000
load_dotenv()

un = getenv('ORACLE_USERNAME')
cs = getenv('ORACLE_CONNECTSTRING')
pw = getenv('ORACLE_PASSWORD')

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
                print(f'Executing: INSERT INTO {table} ({keys}) VALUES ({values}) {data.keys()}')
                cursor.execute(f"INSERT INTO {table} ({keys}) VALUES ({values})", tuple(data.values()))
                return data
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# Endpoint to retrieve all
def template_select(table):
    try:
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT * FROM {table}")
                data = cursor.fetchall()
                return data
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

# Endpoint to create an order
@app.post("/orders/", response_model=Order)
def create_order(order: Order):
    return template_create('fapi_orders', order.dict())

# Endpoint to retrieve an order by ID
@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: int):
    return template_select_where('fapi_orders', f'order_id = {order_id}', ['order_id', 'product_name', 'quantity'])

# Endpoint to delete an order by ID
@app.delete("/orders/{order_id}")
def delete_order(order_id: int):
    return template_delete('fapi_orders', f'order_id = {order_id}')

# Endpoint to update an order by ID
@app.put("/orders/{order_id}", response_model=Order)
def update_order(order_id: int, updated_order: Order):
    return template_update('fapi_orders', updated_order.dict(), f'order_id = {order_id}')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fapi:app", host="0.0.0.0", port=PORT, reload=True)
