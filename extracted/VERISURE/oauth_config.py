# -*- coding: utf-8 -*-
"""
Configuração OAuth 2.0 para Google Drive
Obtenha o Client ID e Client Secret em: https://console.cloud.google.com/
"""
import os

# Lê de variáveis de ambiente (para deploy) ou usa valores locais
OAUTH_CLIENT_ID = os.getenv("OAUTH_CLIENT_ID", "264311763921-d0kmd339k01jgtkbvjlqvrfn29d9h0am.apps.googleusercontent.com")
OAUTH_CLIENT_SECRET = os.getenv("OAUTH_CLIENT_SECRET", "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")

# URL dinâmica baseada no ambiente
import os
DEPLOY_URL = os.getenv("DEPLOY_URL", "http://localhost:5000")
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
