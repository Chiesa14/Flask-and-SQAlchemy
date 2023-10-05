import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import redirect
from flask_cors import CORS
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

project_dir = os.path.dirname(os.path.abspath(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(project_dir, 'bookdatabase.db')

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'secret string'

db = SQLAlchemy(app)

migrate = Migrate(app, db)
class Book(db.Model):
    __tablename__ = 'book'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    author = db.Column(db.Integer, db.ForeignKey('author.id'))

    def __repr__(self):
        return "<Title: {}>".format(self.title)


class Author(db.Model):
    __tablename__ = 'author'
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(255))

with app.app_context():
    db.create_all()



@app.route("/", methods=["GET"])


@app.route("/library", methods=["GET"])
def home():
    books = Book.query.all()
    book_titles = [book.title for book in books]
    return jsonify({
        "books": book_titles
    })

@app.route("/add", methods=["POST"])
def add():
    answer = request.json.get('name')
    all_author = Author.query.all()
    book_author = {author.author: author.id for author in all_author}
    author_id = book_author.get(request.json.get("name"))
    print(answer)
    print(book_author)
    if answer in book_author:
        print(answer + " Exists in the database")

    db.session.commit()
    return redirect('/')

@app.route("/update", methods=["POST"])
def update():
    try:
        newtitle = request.json.get('newtitle')
        oldtitle = request.json.get('oldtitle')
        book = Book.query.filter_by(title=oldtitle).first()
        book.title = newtitle
        db.session.commit()
    except Exception as e:
        print("Couldn't update book title")
        print(e)
    return redirect("/library")


@app.route("/delete", methods=["POST"])
def delete():
    title = request.json.get("title")
    book = Book.query.filter_by(title=title).first()
    db.session.delete(book)
    db.session.commit()
    return redirect("/library")


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
