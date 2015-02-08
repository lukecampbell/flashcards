from flask import render_template, send_file, make_response, jsonify, request
from bson import ObjectId
from app import app, db

@app.route("/")
def root():
    return render_template("index.html")

@app.route('/api/dictionary', methods=['GET'])
def get_dictionaries():
    records = []
    for dictionary in db.Dictionary.find():
        records.append(dictionary.serialize())
    if not records:
        return jsonify(), 204
    return jsonify(dictionaries=records, length=len(records))

@app.route('/api/entry', methods=['GET'])
def get_entries():
    records = []
    if 'dictionary_id' in request.args:
        for entry in db.Entry.find({'dictionary_id': ObjectId(request.args['dictionary_id'])}):
            records.append(entry.serialize())
    else:
        for entry in db.Entry.find():
            records.append(entry.serialize())

    if not records:
        return jsonify(), 204

    return jsonify(entries=records, length=len(records))
