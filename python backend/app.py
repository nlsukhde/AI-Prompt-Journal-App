from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
import mysql.connector
from operations import create_connection, add_journal_entry, delete_journal_entry, get_single_entry, get_all_entries, edit_single_entry
from openai import OpenAI


app = Flask(__name__)
CORS(app)


client = OpenAI()


@app.route("/api/get-prompt", methods=['POST'])
def get_prompt():
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an insightful journaling coach skilled in creating unique prompts that will help someone explore their most cherished memories."},
                {"role": "user", "content": "Generate a creative and reflective journal prompt that encourages deep thinking about personal growth and daily experiences."}
            ]
        )

        # Extract the message content from the first choice in the response
        prompt_message = completion.choices[0].message.content

        # Send back the prompt to the frontend in the desired format
        return jsonify(prompt=prompt_message), 200

    except Exception as e:
        # It's a good practice to log the exception here
        print(e)
        return jsonify({'error': str(e)}), 500


@app.route("/api/posts", methods=['POST', 'GET'])
def handle_all():
    if request.method == 'POST':
        return add_entry()
    elif request.method == 'GET':
        return get_entries()


def add_entry():
    data = request.get_json()

    journalDate = data.get('date')
    journalTitle = data.get('title')
    journalEntry = data.get('content')
    journalPrompt = data.get('prompt')

    add_journal_entry(journalDate, journalTitle, journalEntry, journalPrompt)

    # process data and save to database

    return jsonify(message="Entry added successfully"), 201


def get_entries():
    entries = get_all_entries()

    entries_list = [{"id": entry[0], "title": entry[1],
                     "content": entry[2], "date": entry[3], "prompt": entry[4]} for entry in entries]

    return jsonify(entries_list), 201


# handles single post operations, getting sinlge post, deleting single post, and editing single post
@app.route("/api/posts/<int:id>", methods=['DELETE', 'GET', 'PUT'])
def handle_entry(id):
    if request.method == 'DELETE':
        return delete_entry(id)
    elif request.method == 'GET':
        return get_entry(id)
    elif request.method == 'PUT':
        return edit_entry(id)


def delete_entry(id):  # id is passed as a parameter to the function

    # use entryID to find in database and delete it

    delete_journal_entry(id)

    return jsonify(message="Entry deleted successfuly"), 201


def get_entry(id):

    entry = get_single_entry(id)

    if entry:
        return jsonify(entry), 200
    else:
        return jsonify({"message:": "Entry not found"}), 404


def edit_entry(id):
    data = request.get_json()

    journalDate = data.get('date')
    journalTitle = data.get('title')
    journalEntry = data.get('content')
    journalPrompt = data.get('prompt')

    edit_single_entry(journalTitle, journalEntry,
                      journalDate, journalPrompt, id)

    return jsonify({"message": "Entry updated successfully!"})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
