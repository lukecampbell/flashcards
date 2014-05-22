from flashcards.dictionary import Dictionary
from flask import Flask, render_template, send_file, make_response
from config import HOST, PORT, DICTIONARY_PATH
import codecs
import random
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
    print path
    with codecs.open(path, 'r', encoding='utf-8') as f:
        buf = f.read()
    response = make_response(buf)
    response.headers['Content-Type'] = 'application/json;charset=utf-8'
    return response

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)
