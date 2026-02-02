# 🚀 VERISURE - Compilador de Relatórios

Sistema automático de compilação de relatórios com integração Google Drive e Sheets.

## 📋 Configuração

### 1. Clonar o repositório
```bash
git clone <seu-repo>
cd VERISURE
```

### 2. Instalar dependências
```bash
pip install -r flask_app/requirements.txt
```

### 3. Configurar variáveis de ambiente

Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o `.env` e preencha com seus dados:
```
DADOS_IDENTIFICADOR_SHEET_ID=seu_sheet_id_aqui
SEMANAL_OFICIAL_FILE_ID=seu_file_id_aqui
```

### 4. Configurar OAuth
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative as APIs: Drive API, Sheets API
4. Crie as credenciais OAuth 2.0
5. Salve como `credentials.json` na raiz do projeto

### 5. Rodar localmente
```bash
python run_app.py
```

Acesse: http://localhost:5000

## 🚂 Deploy no Railway

1. Conecte seu GitHub
2. Railway detectará Python automaticamente
3. Configure as variáveis de ambiente no Railway
4. Deploy automático ✅

## 📁 Estrutura

```
VERISURE/
├── flask_app/
│   ├── app.py          # Aplicação principal
│   ├── static/         # CSS, JS
│   ├── templates/      # HTML
│   └── requirements.txt
├── run_app.py         # Entry point
├── oauth_config.py    # Config OAuth
├── oauth_manager.py   # Gerenciador OAuth
├── Procfile           # Config Railway/Heroku
└── .env.example       # Template variáveis
```

## 🔐 Segurança

- Nunca commitou `token.json` ou `.env`
- Use `.env` para variáveis sensíveis
- O `.gitignore` previne commits acidentais

## 📞 Suporte

Para dúvidas, consulte a documentação no projeto.
