from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="My App API", version="1.0.0")

# CORS設定（本番環境対応）
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # ローカル開発用
        "https://*.azurestaticapps.net",  # Azure Static Web Apps
        "*"  # 一時的に全許可（後で制限）
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI on Azure Container Instances!"}

@app.get("/api/users")
def get_users():
    return {
        "users": [
            {"id": 1, "name": "太郎", "email": "taro@example.com"},
            {"id": 2, "name": "花子", "email": "hanako@example.com"}
        ]
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "environment": "azure-container-instance"}