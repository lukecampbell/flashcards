from flask import render_template, send_file, make_response, jsonify, request
from bson import ObjectId
from app import app, db
from werkzeug.exceptions import NotFound

@app.route("/")
def root():
    return render_template("index.html")

@app.route('/dictionary/<string:dictname>/')
def dictionary_view(dictname):
    dictionary = db.Dictionary.find_one({"name": dictname})
    if dictionary is None:
        raise NotFound()
    return render_template('dictionary_view.html', title=dictname, dictionary_id=str(dictionary._id))

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

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
