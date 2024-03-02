from flask import Flask, jsonify, request
from flask_cors import CORS
import Table

app = Flask(__name__)
CORS(app, resources=r'/*')
db = Table.Table()


@app.route("/heartbeat")
def heartbeat():
    result = jsonify({"body": db.data})
    result.status_code = 200
    return result


# A request to add items to the catalog (use the request body to store data)
@app.route("/catalog/item", methods=["POST"])
def add_item():
    new_task = request.get_json()
    print(new_task)
    result = jsonify({"body": db.add(new_task)})
    result.status_code = 200
    return result


# A request to remove items from the catalog using an item id
@app.route("/catalog/item/<item_id>", methods=["DELETE"])
def remove_item(item_id):
    return "TODO: Implement me!"


# A request to get all items in the catalog
@app.route("/catalog", methods=["GET"])
def get_items():
    res = jsonify({"body": db.data})
    res.status_code = 200
    return res


def cors_preflight():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run(debug=True)
