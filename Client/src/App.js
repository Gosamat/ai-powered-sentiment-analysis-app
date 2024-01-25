import './App.css';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleClick = async () => {
    try {
      setLoading(true); // Set loading to true when starting the request

      const response = await fetch('http://localhost:5000/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setSentiment(data.sentiment);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2> Sentiment Analysis Application</h2>
        <div className="input">
          <p> Enter the message to classify </p>
          <textarea
            className="textArea"
            type="text"
            placeholder="Type your message..."
            cols={50}
            rows={10}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="Response">
          <button onClick={handleClick} disabled={loading}>
            Get Message sentiment
          </button>
          
          {loading && <p>Loading...</p>}

          {sentiment !== "" && !loading ? (
            <p>The sentiment is {sentiment}</p>
          ) : null}
        </div>
      </header>
    </div>
  );
}

export default App;
