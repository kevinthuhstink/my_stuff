from flask import Flask, jsonify
from random import randint

app = Flask(__name__)

def tableRows():
    ''' Generates 40 random rows to mess around with. '''

    def gen_rand_str():
        ''' Creates a random string between length 8 and 16. '''
        rand_str = ""
        for i in range(randint(8, 16)):
            rand_str += chr(randint(97, 122))
        return rand_str

    rows = []
    for i in range(40):
        row = {
                "time": randint(0, 999),
                "task": gen_rand_str(),
                "status": "good!",
                "key": i,
                }
        rows.append(row)
    return rows



@app.route("/heartbeat")
def heartbeat():
    result = jsonify({"body": tableRows()})
    result.status_code = 200
    return result


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
    res = jsonify({"body": tableRows()})
    res.status_code = 200
    return res


# ... implement any other routes you need or want to use below ... #


if __name__ == '__main__':
    app.run(debug=True)
