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

# Endpoint to create an order
@app.post("/orders/", response_model=Order)
def create_order(order: Order):
    try:
        with pool.acquire() as connection:
            connection.autocommit = True
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO fapi_orders (order_id, product_name, quantity) VALUES (:1, :2, :3)",
                    (order.order_id, order.product_name, order.quantity,))
                return order
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# Endpoint to retrieve an order by ID
@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: int):
    try:
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT order_id, product_name, quantity FROM fapi_orders WHERE order_id = :1", (order_id,))
                result = cursor.fetchone()
                if result:
                    order = {
                        "order_id": result[0],
                        "product_name": result[1],
                        "quantity": result[2],
                    }
                    return order
                else:
                    raise HTTPException(status_code=404, detail="Order not found")
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

# Endpoint to delete an order by ID
@app.delete("/orders/{order_id}")
def delete_order(order_id: int):
    try:
        with pool.acquire() as connection:
            connection.autocommit = True
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM fapi_orders WHERE order_id = :1", (order_id,))
        return {"message": "Order deleted successfully"}
    except oracledb.Error as e:
        logging.error(f"Database error while deleting order: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Endpoint to update an order by ID
@app.put("/orders/{order_id}", response_model=Order)
def update_order(order_id: int, updated_order: Order):
    try:
        with pool.acquire() as connection:
            connection.autocommit = True
            with connection.cursor() as cursor:
                cursor.execute(
                    "UPDATE fapi_orders SET product_name = :1, quantity = :2 WHERE order_id = :3",
                    (updated_order.product_name, updated_order.quantity, order_id),
                )
        return updated_order
    except oracledb.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fapi:app", host="0.0.0.0", port=PORT, reload=True)