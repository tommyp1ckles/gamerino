from flask import Flask, render_template

app = Flask(__name__)

@app.route("/game")
def game():
    return render_template("index.html")

app.run()
