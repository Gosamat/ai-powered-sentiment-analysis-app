from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

@app.route('/sentiment', methods=['POST'])
def get_sentiment():
    data = request.get_json()
    message = data['message']
    
    classifier = pipeline('sentiment-analysis')
    result = classifier(message)
    
    return jsonify({"sentiment": result[0]['label']})

if __name__ == '__main__':
    app.run(debug=True)
