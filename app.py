from flask import Flask, render_template, send_file, make_response, jsonify
from config import HOST, PORT, DICTIONARY_PATH
from flask.ext.mongokit import MongoKit
import codecs
import random
import glob
import json
import os

app = Flask(__name__)
app.config['MONGODB_DATABASE'] = 'flashcards'

db = MongoKit(app)
from flashcards.models import *
from flashcards.routes import *


if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)
