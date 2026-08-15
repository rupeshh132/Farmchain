import random
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI(title="FarmChain ML Service", version="1.0.0")

# Allow CORS for dev (if frontend calls directly, but we will call via backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock outcomes
OUTCOMES = [
    {
        "disease": "Healthy",
        "action": "Crop is healthy. Continue standard nutrient plan."
    },
    {
        "disease": "Wheat Rust",
        "action": "High fungal infection. Apply fungicide (e.g., Tebuconazole) immediately."
    },
    {
        "disease": "Leaf Blight",
        "action": "Moderate infection. Improve drainage and apply appropriate copper-based fungicide."
    },
    {
        "disease": "Pest Infestation (Aphids)",
        "action": "Apply Neem oil or appropriate insecticide. Monitor closely."
    }
]

@app.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    # Simulate model loading and inference time
    time.sleep(2)
    
    # Randomly select a mock outcome for MVP demonstration
    outcome = random.choice(OUTCOMES)
    confidence = round(random.uniform(0.75, 0.98), 2)
    
    # If healthy, confidence is usually very high
    if outcome["disease"] == "Healthy":
        confidence = round(random.uniform(0.90, 0.99), 2)

    return {
        "success": True,
        "filename": file.filename,
        "prediction": outcome["disease"],
        "confidence": confidence,
        "recommended_action": outcome["action"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
