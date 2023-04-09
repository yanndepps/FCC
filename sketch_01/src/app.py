from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SECRET_KEY"] = "thisisasecretkey"
db = SQLAlchemy(app)


# define a db model :
# create a Note table, with automatic id, text as todo task
# boolean holding the done value,
# class Note(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     text = db.Column(db.Text)
#     done = db.Column(db.Boolean)
#     dateAdded = db.Column(db.DateTime, default=datetime.now())


with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/register")
def register():
    return render_template("register.html")


if __name__ == "__main__":
    app.run(debug=True)
