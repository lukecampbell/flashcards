from flask import render_template, send_file, make_response, jsonify, request
from bson import ObjectId
from bson.errors import InvalidId
from app import app, db
from werkzeug.exceptions import NotFound
import json

@app.route("/")
def root():
    return render_template("index.html")

@app.route('/dictionary/<string:dictname>/')
def dictionary_view(dictname):
    dictionary = db.Dictionary.find_one({"name": dictname})
    if dictionary is None:
        raise NotFound()
    return render_template('dictionary_view.html', title=dictname, dictionary_id=str(dictionary._id))

@app.route('/entries/<string:dictname>/')
def entry_view(dictname):
    dictionary = db.Dictionary.find_one({"name": dictname})
    if dictionary is None:
        raise NotFound()
    return render_template('entry_view.html', title=dictname, dictionary_id=str(dictionary._id))

@app.route('/api/dictionary', methods=['GET'])
def get_dictionaries():
    records = []
    for dictionary in db.Dictionary.find():
        records.append(dictionary.serialize())
    if not records:
        return jsonify(), 204
    return jsonify(dictionaries=records, length=len(records))

@app.route('/api/dictionary/<string:id>', methods=['GET'])
def get_dictionary(id):
    dictionary = db.Dictionary.find_one({'_id' : ObjectId(id)})
    if dictionary is None:
        return jsonify(), 204
    return jsonify(**dictionary.serialize()), 200

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

@app.route('/api/entry', methods=['POST'])
def post_entry():
    data = json.loads(request.data)
    entry = db.Entry()
    if not 'dictionary_id' in data:
        return jsonify(error="Invalid Entry: dictionary_id is required"), 400
    try:
        dictionary_id = ObjectId(data['dictionary_id'])
    except InvalidId as e:
        return jsonify(error="Invalid ObjectId"), 400
    dictionary = db.Dictionary.find_one({'_id':dictionary_id})
    if dictionary is None:
        return jsonfiy(error="Parent dictionary was not found"), 400
    entry.dictionary_id = ObjectId(data['dictionary_id'])
    entry.title = data.get('title', entry.title)
    entry.yomi = data.get('yomi', entry.yomi)
    entry.english = data.get('english', entry.english)
    entry.save()
    return jsonify(**entry.serialize()), 200



@app.route('/api/entry/<string:id>', methods=['PUT'])
def put_entry(id):
    data = json.loads(request.data)
    entry = db.Entry.find_one({'_id' : ObjectId(id)})
    if entry is None:
        return jsonify(error="Entry not found"), 404
    entry.title = data.get('title', entry.title)
    entry.yomi = data.get('yomi', entry.yomi)
    entry.english = data.get('english', entry.english)
    entry.save()
    return jsonify(**entry.serialize()), 200

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
