import { useState } from "react";
import "./GeneratedImage.css";

const API_URL =
  "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

const EXAMPLES = [
  "Finance dashboard UI with charts and recent transactions",
  "Travel booking app with flight and hotel search",
  "Educational app for learning languages with progress tracker",
];

export default function HuggingFaceImageGenerator() {
  const [prompt, setPrompt] = useState(
    "Modern cooking app with recipe discovery, meal planning, and grocery shopping integration for busy professionals"
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setImageUrl(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            num_inference_steps: 4,
            guidance_scale: 3.5,
            width: 768,
            height: 1024,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to generate image");
      }

      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mockup-generator-container">
      <h1 className="title">Take-Home Design Assignment - Conception Mockup</h1>
      <p className="subtitle">Generate professional app mockups</p>

      <div className="card">
        <label htmlFor="prompt" className="section-title">
          Describe Your App Vision
        </label>

        <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "4px" }}>
          Be specific about features, design style, and target users for best
          results
        </p>

        <textarea
          id="prompt"
          className="input-box"
          rows={4}
          placeholder="e.g., Create a modern cooking app with a clean, minimalist design. Include recipe cards, meal planning, shopping list, and cooking timer..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "⚙️ Generate Mockup"}
        </button>

        <hr style={{ margin: "24px 0", borderTop: "1px solid #e5e7eb" }} />

        <h3 className="example-title">Example Prompts</h3>
        <div className="example-list">
          {EXAMPLES.map((text, i) => (
            <button
              key={i}
              className="example-btn"
              onClick={() => setPrompt(text)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="section-title">Generated Mockup</h2>
        {error && <p className="error-text">{error}</p>}

        {loading ? (
          <div className="placeholder-wrapper">
            <div className="spinner" />
            <p
              className="placeholder-text"
              style={{
                textAlign: "center",
                color: "#6b7280",
                marginTop: "12px",
              }}
            >
              Generating your mockup, please wait...
            </p>
          </div>
        ) : (
          !imageUrl && (
            <div className="placeholder-wrapper">
              <div className="placeholder-icon">
                <img
                  src="../../public/turntable-svgrepo-com.svg"
                  alt="Mockup Icon"
                  style={{ width: "48px", marginBottom: "10px" }}
                />
              </div>
              <p
                className="placeholder-text"
                style={{ textAlign: "center", color: "#6b7280" }}
              >
                Enter a detailed description of your app idea and let's create a
                professional, photorealistic mockup for you.
              </p>
            </div>
          )
        )}

        {imageUrl && (
          <div className="image-wrapper">
            <img src={imageUrl} alt="Generated UI" className="preview" />
            <a
              href={imageUrl}
              download="ai-mockup.png"
              className="download-btn"
            >
              📥 Download Mockup
            </a>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>© 2025 Anas Ben Abdallah</p>
      </footer>
    </div>
  );
}
