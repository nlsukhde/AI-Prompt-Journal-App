from flask import Flask, request, jsonify
from config import Config
import mysql.connector


def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host=Config.MYSQL_DATABASE_HOST,
            user=Config.MYSQL_DATABASE_USER,
            password=Config.MYSQL_DATABASE_PASSWORD,
            database=Config.MYSQL_DATABASE_DB,
            port=Config.MYSQL_DATABASE_PORT
        )

        if connection.is_connected():
            print("successfully connected to the database")
    except Exception as err:
        print(f"Error: {err}")
    return connection


def add_journal_entry(date, title, content, prompt):
    connection = create_connection()
    cursor = connection.cursor()

    insert_query = ("INSERT INTO journal_entries (date, title, content, prompt) "
                    "VALUES (%s, %s, %s, %s)")

    data = (date, title, content, prompt)

    cursor.execute(insert_query, data)
    connection.commit()

    cursor.close()
    connection.close()


def delete_journal_entry(id):
    connection = create_connection()
    cursor = connection.cursor()

    delete_query = ("DELETE FROM journal_entries WHERE id = %s")
    cursor.execute(delete_query, (id,))

    connection.commit()
    cursor.close()
    connection.close()


def get_single_entry(id):
    connection = create_connection()
    cursor = connection.cursor()

    search_query = ("SELECT * FROM journal_entries WHERE id = %s")
    cursor.execute(search_query, (id,))

    result = cursor.fetchone()

    cursor.close()
    connection.close()

    return result


def edit_single_entry(title, content, date, prompt, id):
    connection = create_connection()
    cursor = connection.cursor()

    update_query = """
    UPDATE journal_entries 
    SET title = %s, content = %s, date = %s , prompt = %s,
    WHERE id = %s
    """

    cursor.execute(update_query, (title, content, date, prompt, id))

    connection.commit()
    cursor.close()
    connection.close()


def get_all_entries():
    connection = create_connection()
    cursor = connection.cursor()

    search_query = ("SELECT * FROM journal_entries")
    cursor.execute(search_query)

    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return results
