# -*- coding: utf-8 -*-
"""
Gerenciamento de autenticação OAuth 2.0 para Google Drive
"""

import os
import json
import pickle
from google_auth_oauthlib.flow import Flow
from google.auth.transport.requests import Request
from oauth_config import OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REDIRECT_URI, OAUTH_SCOPES, TOKEN_FILE

def get_oauth_flow():
    """Cria um novo flow OAuth 2.0"""
    client_config = {
        "installed": {
            "client_id": OAUTH_CLIENT_ID,
            "client_secret": OAUTH_CLIENT_SECRET,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": [OAUTH_REDIRECT_URI],
        }
    }
    
    flow = Flow.from_client_config(
        client_config,
        scopes=OAUTH_SCOPES,
        redirect_uri=OAUTH_REDIRECT_URI
    )
    
    return flow

def save_credentials(creds):
    """Salva credenciais (inclusive refresh token) em arquivo local"""
    with open(TOKEN_FILE, 'w') as f:
        # Usar credentials do google.auth
        token_data = {
            'token': creds.token,
            'refresh_token': creds.refresh_token,
            'token_uri': creds.token_uri,
            'client_id': creds.client_id,
            'client_secret': creds.client_secret,
            'scopes': creds.scopes,
        }
        json.dump(token_data, f)
    print(f"[OAUTH] ✅ Credenciais salvas em {TOKEN_FILE}")

def load_credentials():
    """Carrega credenciais (refresh token) do arquivo"""
    if not os.path.exists(TOKEN_FILE):
        return None
    
    try:
        with open(TOKEN_FILE, 'r') as f:
            token_data = json.load(f)
        
        # Criar credenciais do refresh token
        from google.oauth2.credentials import Credentials
        
        creds = Credentials(
            token=token_data.get('token'),
            refresh_token=token_data.get('refresh_token'),
            token_uri=token_data.get('token_uri'),
            client_id=OAUTH_CLIENT_ID,
            client_secret=OAUTH_CLIENT_SECRET,
            scopes=OAUTH_SCOPES
        )
        
        # Se token expirou, refresh automaticamente
        if creds.expired and creds.refresh_token:
            request = Request()
            creds.refresh(request)
            save_credentials(creds)
            print("[OAUTH] ✅ Token refreshado automaticamente")
        
        return creds
    
    except Exception as e:
        print(f"[OAUTH] ❌ Erro ao carregar credenciais: {str(e)}")
        return None

def authorize_url():
    """Gera URL para autorização do usuário"""
    flow = get_oauth_flow()
    auth_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    return auth_url, state

def exchange_code_for_token(code):
    """Troca o código de autorização por token"""
    flow = get_oauth_flow()
    flow.fetch_token(code=code)
    creds = flow.credentials
    save_credentials(creds)
    return creds

def get_authenticated_drive_service():
    """Retorna um serviço Google Drive autenticado via OAuth"""
    from googleapiclient.discovery import build
    
    creds = load_credentials()
    if not creds:
        return None
    
    service = build('drive', 'v3', credentials=creds)
    return service

def get_authenticated_sheets_service():
    """Retorna um serviço Google Sheets autenticado via OAuth"""
    from googleapiclient.discovery import build
    
    creds = load_credentials()
    if not creds:
        return None
    
    service = build('sheets', 'v4', credentials=creds)
    return service
