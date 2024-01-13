from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json
    print(data)  # This will print the data to the console
    return jsonify({'message': 'Data received successfully!'})


if __name__ == '__main__':
    app.run(debug=True)
