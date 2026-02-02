# -*- coding: utf-8 -*-
"""
Configuração do Google Drive (opcional)

INSTRUÇÕES:
1. Vá para: https://console.cloud.google.com
2. Crie um novo projeto
3. Ative a API do Google Drive
4. Crie uma "Service Account"
5. Baixe o JSON com as credenciais
6. Coloque o arquivo JSON nesta pasta
7. Nomeie como: credentials.json
8. Descomente as linhas abaixo no app.py
"""

# Exemplo de como usar (adicionar ao app.py):
"""
import gspread
from google.oauth2.service_account import Credentials

# Autenticação
SCOPES = ['https://www.googleapis.com/auth/drive']
creds = Credentials.from_service_account_file(
    'credentials.json',
    scopes=SCOPES
)
gc = gspread.authorize(creds)

# Upload para Google Drive
def upload_para_drive(arquivo_path, pasta_drive_id):
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload
    
    service = build('drive', 'v3', credentials=creds)
    
    file_metadata = {
        'name': os.path.basename(arquivo_path),
        'parents': [pasta_drive_id]
    }
    
    media = MediaFileUpload(arquivo_path, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()
    
    return file.get('id')
"""

# Coloque seu credentials.json aqui ⬇️
# Não compartilhe esse arquivo! Ele contém suas credenciais do Google
