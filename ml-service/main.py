import random
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

class YieldRequest(BaseModel):
    cropName: str
    areaHectares: float

@app.post("/predict/yield")
async def predict_yield(req: YieldRequest):
    time.sleep(1) # simulate model inference
    
    # Base yields per hectare (mock data)
    base_yields = {
        "Wheat": 3500,
        "Rice": 4000,
        "Sugarcane": 70000,
        "Tomato": 25000,
        "Potato": 22000
    }
    
    # Default to 3000 if not found
    base = base_yields.get(req.cropName, 3000)
    
    # Scale by area
    total_base = base * req.areaHectares
    
    # Add random variance for min/max
    min_kg = round(total_base * random.uniform(0.85, 0.95))
    max_kg = round(total_base * random.uniform(1.05, 1.15))
    
    return {
        "success": True,
        "predicted_min_kg": min_kg,
        "predicted_max_kg": max_kg,
        "model_version": "mock-v1"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
