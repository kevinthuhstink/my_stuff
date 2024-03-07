from flask import Flask, jsonify, request
from flask_cors import CORS
import Database

app = Flask(__name__)
CORS(app, resources=r'/*', supports_credentials=True)
db = Database.Database(keys=['id', 'owner', 'price', 'name', 'time', 'status'])
users = Database.Database(keys=['id', 'name', 'username', 'password'], fname="users.csv")


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
    res = jsonify({"body": db.get_item(item_id)})
    res.status_code = 200
    return res


# A request to create a new user
# Fails if the username exists in the database already
@app.route("/signup", methods=["POST"])
def make_user():
    user = request.get_json()
    username = user['username']

    if users.match_values([('username', username)]):
        return jsonify({"body": None}), 200

    res = jsonify({"body": users.add(user)})
    res.status_code = 200
    return res


# A request to login to a preexisting user account
# Sends user information back to the client
@app.route("/login", methods=["GET"])
def check_login():
    user = request.get_json()
    res = jsonify({"body": users.match_values(user)})
    res.status_code = 200
    return res


if __name__ == '__main__':
    app.run(debug=True)
