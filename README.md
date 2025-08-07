# 🧠 AI Mockup Generator (Take-Home Design Assignment — Conception)

This is a simple web application that generates professional mobile or web app UI mockups from natural language prompts using the Hugging Face FLUX.1-schnell model.

---

## 🚀 Features

- 🧾 Describe your app idea using natural language
- 🖼️ Generate UI mockups automatically
- 📥 Download generated images
- 💡 Try example prompts to explore functionality

---

## 🛠️ Technologies Used

- ⚛️ React + TypeScript
- ⚡ Vite
- 🧠 Hugging Face Inference API
- 🎨 Custom CSS styling

---

## 🔐 Environment Setup

Before running the app, create a `.env` file in the project root:

```bash
touch .env
```

add this to .env
VITE_HUGGINGFACE_API_KEY=hf_your_huggingface_token_here ( you can get your api key from this link:https://huggingface.co/settings/tokens )

how to start project localy:

cd Frontend
npm install
npm run dev
