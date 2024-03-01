from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/heartbeat")
def heartbeat():
    return jsonify({"status": "healthy"})


# A request to add items to the catalog (use the request body to store data)
@app.route("/catalog/item", methods=["POST"])
def add_item():
    return "TODO: Implement me!"


# A request to remove items from the catalog using an item id
@app.route("/catalog/item/<item_id>", methods=["DELETE"])
def remove_item(item_id):
    return "TODO: Implement me!"


# A request to get all items in the catalog
@app.route("/catalog", methods=["GET"])
def get_items():
    return "TODO: Implement me!"


# ... implement any other routes you need or want to use below ... #


if __name__ == '__main__':
    app.run()
