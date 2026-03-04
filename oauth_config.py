# -*- coding: utf-8 -*-
"""
Configuração OAuth 2.0 para Google Drive
Obtenha o Client ID e Client Secret em: https://console.cloud.google.com/
"""
import os
import re

# Lê de variáveis de ambiente (para deploy) ou usa valores locais
OAUTH_CLIENT_ID = os.getenv("OAUTH_CLIENT_ID", "COLOQUE_SEU_CLIENT_ID_AQUI")
OAUTH_CLIENT_SECRET = os.getenv("OAUTH_CLIENT_SECRET", "COLOQUE_SEU_CLIENT_SECRET_AQUI")

# URL do deploy (garante que nao termina com / para evitar // no callback)
# Padrão: localhost. No Render, defina DEPLOY_URL nas variáveis de ambiente (ex: https://seu-app.onrender.com)
DEPLOY_URL = (os.getenv("DEPLOY_URL") or "http://localhost:5000").strip().rstrip("/")
OAUTH_REDIRECT_URI = f"{DEPLOY_URL}/oauth2callback"

def _normalize_drive_folder_id(value):
    """Aceita ID da pasta ou URL do Drive; retorna só o ID (ex.: .../folders/ABC123?usp=... -> ABC123)."""
    if not value or not value.strip():
        return None
    s = value.strip()
    # URL: https://drive.google.com/drive/folders/1fSLimz_7vqF4T-gotvZaux0W7QLcqpRa?usp=sharing
    m = re.search(r"/folders/([a-zA-Z0-9_-]+)", s)
    if m:
        return m.group(1)
    # Já é um ID (apenas letras, números, _ e -)
    if re.match(r"^[a-zA-Z0-9_-]+$", s):
        return s
    return s

# Pasta para upload: aceita ID ou URL. Se env vazio, usa o default.
_drive_folder_raw = (os.getenv("DRIVE_FOLDER_ID") or "").strip()
_drive_folder = _normalize_drive_folder_id(_drive_folder_raw) if _drive_folder_raw else None
DRIVE_FOLDER_ID = _drive_folder if _drive_folder else "1fSLimz_7vqF4T-gotvZaux0W7QLcqpRa"

# Scopes necessários para OAuth
OAUTH_SCOPES = [
    'https://www.googleapis.com/auth/drive',  # Acesso completo ao Drive
    'https://www.googleapis.com/auth/spreadsheets.readonly',  # Ler sheets
]

# Arquivo para armazenar o refresh token (deve ser criado na primeira autenticação)
TOKEN_FILE = 'token.json'
