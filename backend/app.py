from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/submit", methods=["POST"])
def submit_data():
    try:
        data = request.get_json() if request.is_json else request.form.to_dict()
        
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email:
            return jsonify({"status": "error", "message": "Name and Email are required!"}), 400

        # Return processed response
        return jsonify({
            "status": "success",
            "message": "Data processed successfully by Flask backend!",
            "received_data": {
                "name": name,
                "email": email,
                "message": message
            }
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    # Must listen on 0.0.0.0 inside a container
    app.run(host="0.0.0.0", port=5000)