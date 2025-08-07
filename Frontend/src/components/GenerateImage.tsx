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
        <p>
          {" "}
          Be specific about features, design style, and target users for best
          results
        </p>
        <textarea
          id="prompt"
          className="input-box"
          rows={4}
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
      </div>

      <div className="card">
        <h2 className="section-title">Generated Mockup</h2>
        {error && <p className="error-text"> {error}</p>}
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

      <div className="card">
        <h3 className="example-title"> Example Prompts</h3>
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
    </div>
  );
}
