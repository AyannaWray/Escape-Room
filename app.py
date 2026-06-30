from flask import Flask

app =  Flask(__name__)

@app.route("/")
def home():
    return " Over the Garden Fence!"

if__name__ == "__main__": # type: ignore
app.run(debug = True)