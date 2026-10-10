from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/room")
def room():
    return render_template("room.html")

@app.route("/victory")
def victory():
    return render_template("victory.html")

@app.route("/cardindex")
def cardindex():
    return render_template("cardindex.html")

@app.route("/paclady")
def paclady():
    return render_template("paclady.html")

@app.route("/info")
def info():
    return render_template("info.html")

if __name__ == "__main__":
    app.run(debug=True)