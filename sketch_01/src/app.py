from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, DataRequired
from datetime import datetime

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "thisisasecretkey"
db = SQLAlchemy(app)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)


# class RegisterForm(FlaskForm):
#     username = StringField(
#         validators=[InputRequired(), Length(min=4, max=20)],
#         render_kw={"placeholder": "Username"},
#     )
#     password = PasswordField(
#         validators=[InputRequired(), Length(min=8, max=20)],
#         render_kw={"placeholder", "Password"},
#     )
#     submit = SubmitField("Register")

#     def validate_username(self, username):
#         existing_user_username = User.query.filter_by(username=username.data).first()
#         if existing_user_username:
#             raise ValidationError("Please choose a different username!")


# class LoginForm(FlaskForm):
#     username = StringField(
#         validators=[InputRequired(), Length(min=4, max=20)],
#         render_kw={"placeholder": "Username"},
#     )
#     password = PasswordField(
#         validators=[InputRequired(), Length(min=8, max=20)],
#         render_kw={"placeholder", "Password"},
#     )
#     submit = SubmitField("Login")


# create a Note table, with automatic id, text as todo task
# boolean holding the done value,
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text)
    done = db.Column(db.Boolean)
    dateAdded = db.Column(db.DateTime, default=datetime.now())


# TODO: Bug fix
class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Sign In")


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    return render_template("login.html", form=form)


@app.route("/register", methods=["GET", "POST"])
def register():
    # form = RegisterForm()
    # return render_template("register.html", form=form)
    return render_template("register.html")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
