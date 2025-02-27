from oracledb import DatabaseError

def createTableIfNotExist(cursor, sentence):
    try:
        cursor.execute(sentence)
    except DatabaseError as e:
        pass
