from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend to communicate with the backend

@app.route('/search', methods=['POST'])
def handle_search():
    data = request.json  # Get JSON data from frontend
    query = data.get("query", "")

    if query:
        print(f"Received search query: {query}")
        return jsonify({"message": f"Server received: {query}"})
    else:
        return jsonify({"error": "No query received"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
