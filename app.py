from flask import Flask, render_template, send_file, make_response, jsonify
from flask.ext.mongokit import MongoKit
from flask_environments import Environments
import codecs
import random
import glob
import json
import os

app = Flask(__name__, static_url_path='')

env = Environments(app, default_env='DEVELOPMENT')
env.from_yaml('config.yml')

db = MongoKit(app)
from flashcards.models import *
from flashcards.routes import *


if __name__ == '__main__':
    app.run(
        host=app.config['HOST'], 
        port=app.config['PORT'], 
        debug=app.config['DEBUG']
    )
