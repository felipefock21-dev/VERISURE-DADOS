# -*- coding: utf-8 -*-
"""
Configuração OAuth 2.0 para Google Drive
Obtenha o Client ID e Client Secret em: https://console.cloud.google.com/
"""
import os

# Lê de variáveis de ambiente (para deploy) ou usa valores locais
OAUTH_CLIENT_ID = os.getenv("OAUTH_CLIENT_ID", "COLOQUE_SEU_CLIENT_ID_AQUI")
OAUTH_CLIENT_SECRET = os.getenv("OAUTH_CLIENT_SECRET", "COLOQUE_SEU_CLIENT_SECRET_AQUI")

# URL do deploy (garante que nao termina com / para evitar // no callback)
DEPLOY_URL = os.getenv("DEPLOY_URL", "https://verisure-dados.up.railway.app").rstrip("/")
OAUTH_REDIRECT_URI = f"{DEPLOY_URL}/oauth2callback"

# Pasta para upload (ID que você já tem)
DRIVE_FOLDER_ID = os.getenv("DRIVE_FOLDER_ID", "1fSLimz_7vqF4T-gotvZaux0W7QLcqpRa")

# Scopes necessários para OAuth
OAUTH_SCOPES = [
    'https://www.googleapis.com/auth/drive',  # Acesso completo ao Drive
    'https://www.googleapis.com/auth/spreadsheets.readonly',  # Ler sheets
]

# Arquivo para armazenar o refresh token (deve ser criado na primeira autenticação)
TOKEN_FILE = 'token.json'
