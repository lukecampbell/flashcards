from flashcards.dictionary import Dictionary
from flask import Flask, render_template, send_file, make_response
from config import HOST, PORT, DICTIONARY_PATH
import codecs
import random
import glob
import cjson as json
import os

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("index.html")

@app.route("/dict/random/<dictname>")
def dictionary(dictname):
    return render_template("random.html")

@app.route("/dict/json/<dictname>.json")
@app.route("/dict/json/<dictname>")
def json_dictionary(dictname):
    path = os.path.join(DICTIONARY_PATH, dictname+'.json')
    with codecs.open(path, 'r', encoding='utf-8') as f:
        buf = f.read()
    response = make_response(buf)
    response.headers['Content-Type'] = 'application/json;charset=utf-8'
    return response

@app.route("/dict/list")
def list_dictionaries():
    listings = []
    for dictionary in glob.glob(DICTIONARY_PATH + '/*.json'):
        filename = os.path.basename(dictionary)
        filename = filename.replace('.json','')
        with codecs.open(dictionary, 'r', encoding='utf-8') as f:
            buf = f.read()
        try:
            pydict = json.decode(buf)
        except:
            continue
        display_name = pydict["display"]
        listings.append([filename, display_name])
    response_body = json.encode(listings)
    response = make_response(response_body)
    response.headers['Content-Type'] = 'application/json;charset=utf-8'
    return response


if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)
