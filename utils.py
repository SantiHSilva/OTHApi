from oracledb import DatabaseError

def createTableIfNotExist(cursor, sentence):
    try:
        cursor.execute(sentence)
    except DatabaseError as e:
        error, = e.args
        if error.code == 955:
            pass
        else:
            raise
