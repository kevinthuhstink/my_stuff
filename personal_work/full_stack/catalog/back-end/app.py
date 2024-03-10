from flask import Flask, jsonify, request
from flask_cors import CORS
from time import time
from Database import Database

app = Flask(__name__)
CORS(app, resources=r'/*', supports_credentials=True)
db = Database(keys=['id', 'owner', 'price', 'name', 'description', 'time', 'status'])
users = Database(keys=['id', 'name', 'username', 'password'], fname="users.csv")


@app.route("/heartbeat")
def heartbeat():
    return jsonify({"status": "healthy"}), 200


# A request to add items to the catalog (use the request body to store data)
@app.route("/catalog/item", methods=["POST"])
def add_item():
    entry = request.get_json()
    res = jsonify({"body": db.add(entry)})
    res.status_code = 200
    return res


# A request to remove items from the catalog using an item id
# Responds with the deleted item
@app.route("/catalog/item/<item_id>", methods=["DELETE"])
def remove_item(item_id):
    return jsonify({"body": db.remove(item_id)}), 200


# A request to get all items in the catalog
@app.route("/catalog", methods=["GET"])
def get_items():
    res = jsonify({"body": db.data})
    res.status_code = 200
    return res


# A request to get one item, specified by its item id
@app.route("/catalog/<item_id>", methods=["GET"])
def get_item(item_id):
    item = db.get_item(item_id)
    res = jsonify({"body": item})
    res.status_code = 200
    return res


# A request to put an item on sale, modifying its price
@app.route("/item/", methods=["PUT"])
def set_item():
    entry = request.get_json()

    new_item = db.set_fields(
            entry['id'],
            {'price': entry['sale'], 'status': 'sale'})
    res = jsonify({"body": new_item})
    res.status_code = 200
    return res


# A request to create a new user
# Fails if the username exists in the database already
@app.route("/signup", methods=["POST"])
def make_user():
    user = request.get_json()
    username = user['username']

    if users.match_values({'username': username}):
        return jsonify({"body": None}), 200

    res = jsonify({"body": users.add(user)})
    res.status_code = 200
    return res


# A request to login to a preexisting user account
# Sends user information back to the client
@app.route("/login", methods=["PUT"])
def check_login():
    user = request.get_json()
    res = jsonify({"body": users.match_values(user)})
    res.status_code = 200
    return res


# Fills the database with random information
# Only callable with the root user account
@app.route("/filldb", methods=["PUT"])
def fill_db():
    def gen_db_entries(entries=8):
        ''' Generates some random data entries to mess around with.

            entries: The number of entries to generate.
            '''

        def gen_rand_str(len_bounds=(8,16)):
            ''' Creates a random string of lowercase letters with random length.
                len_bounds: The min/max length of generated strings.
                '''
            rand_str = ""
            for i in range(randint(len_bounds[0], len_bounds[1])):
                rand_str += chr(randint(97, 122))
            return rand_str

        for i in range(entries):
            entry = {
                    "owner": "root",
                    "price": randint(1, 500),
                    "name": gen_rand_str(),
                    "description": "root randomly generated catalog item",
                    "status": ""
            }
            db.add(entry)

    res = jsonify({"body": None})
    res.status_code = 200
    return res


if __name__ == '__main__':
    app.run(debug=True)
