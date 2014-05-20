from flashcards.dictionary import Dictionary
from flask import Flask, render_template
from config import HOST, PORT
import random

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("index.html")

@app.route("/dict/random/<dictname>")
def dictionary(dictname):
    d = Dictionary(dictname)
    random_key = random.choice(d.table.keys())

    front = random_key
    back = d.table[random_key]['english']
    return render_template("echo.html", front=front, back=back)

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)
