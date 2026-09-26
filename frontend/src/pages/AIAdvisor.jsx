 import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../services/api";

function AIAdvisor() {

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const askQuestion = async (e) => {

    e.preventDefault();

    if (!question.trim()) return;

    try {

      setLoading(true);

      const response = await API.post(
        "/ai/ask",
        {
          question
        }
      );

      setAnswer(response.data.answer);

    } catch (error) {

      setAnswer(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <section className="page-content">

          <div className="ai-header">

            <h1>AI Finance Advisor</h1>

            <p>
              Ask questions about your spending
            </p>

          </div>

          <form
            className="ai-form"
            onSubmit={askQuestion}
          >

            <textarea
              placeholder="Example: Where am I spending the most money?"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />

            <button type="submit">

              {loading
                ? "Analyzing..."
                : "Ask AI"}

            </button>

          </form>

          {answer && (

            <div className="ai-answer">

              <h3>AI Advisor</h3>

              <p>{answer}</p>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default AIAdvisor;