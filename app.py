from flashcards.dictionary import Dictionary
from flask import Flask, render_template
from config import HOST, PORT

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("index.html")

@app.route("/dict/<dictname>")
def dictionary(dictname):
    d = Dictionary(dictname)
    return render_template("echo.html", echo=d.table.keys()[0])

if __name__ == '__main__':
    app.run(host=HOST, port=PORT, debug=True)
