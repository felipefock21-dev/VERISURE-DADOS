# 🔐 Configuração OAuth 2.0 para Google Drive

## Passo 1: Criar OAuth 2.0 Credentials no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para **APIs & Services** → **Credentials**
4. Clique em **+ Create Credentials** → **OAuth 2.0 Client ID**
5. Selecione **Application type: Desktop application**
6. Clique em **Create**
7. Copie o **Client ID** e **Client Secret** que aparecerão

## Passo 2: Adicionar URIs de Redirecionamento

1. Edite as credenciais OAuth criadas
2. Adicione o seguinte URI em **Authorized redirect URIs**:
   ```
   http://localhost:5000/oauth2callback
   ```
3. Salve as mudanças

## Passo 3: Configurar o Arquivo `oauth_config.py`

1. Abra o arquivo `oauth_config.py` na raiz do projeto
2. Substitua os placeholders:

```python
OAUTH_CLIENT_ID = "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com"
OAUTH_CLIENT_SECRET = "SEU_CLIENT_SECRET_AQUI"
```

**Exemplo:**
```python
OAUTH_CLIENT_ID = "123456789-abc...xyz.apps.googleusercontent.com"
OAUTH_CLIENT_SECRET = "GOCSPX-abc...xyz"
```

## Passo 4: Ativar Google Drive API

1. No Google Cloud Console, vá para **APIs & Services** → **Library**
2. Procure por **Google Drive API**
3. Clique e selecione **Enable**
4. Procure também por **Google Sheets API** e ative-a

## Passo 5: Fazer Login (Primeira Vez)

1. Inicie o servidor:
   ```bash
   python run_app.py
   ```

2. Acesse no navegador:
   ```
   http://localhost:5000/authorize
   ```

3. Você será redirecionado para fazer login no Google
4. Autorize o acesso à sua conta
5. Um arquivo `token.json` será criado automaticamente com suas credenciais

## Passo 6: Usar a Aplicação

Depois de fazer login:

1. Acesse http://localhost:5000
2. Faça upload do arquivo como usual
3. Os arquivos serão automaticamente salvos em:
   - **Pasta local**: `flask_app/saidas/`
   - **Google Drive**: Pasta `1fSLimz_7vqF4T-gotvZaux0W7QLcqpRa` (sua pasta compartilhada)

## Endpoints OAuth Disponíveis

- **GET `/authorize`** - Inicia o processo de login
- **GET `/oauth2callback`** - Callback após autorização (automático)
- **GET `/oauth-status`** - Verifica se está autenticado

## Verificar Status de Autenticação

```bash
curl http://localhost:5000/oauth-status
```

Resposta se autenticado:
```json
{
  "autenticado": true,
  "mensagem": "✅ Autenticado! Pronto para fazer upload."
}
```

Resposta se não autenticado:
```json
{
  "autenticado": false,
  "mensagem": "⚠️ Não autenticado. Acesse /authorize para fazer login.",
  "link_authorize": "/authorize"
}
```

## Troubleshooting

### "Arquivo credentials.json não encontrado"
Isso é normal! Com OAuth, não precisamos de `credentials.json`. O arquivo `token.json` será criado após fazer login.

### "Erro 403: Forbidden"
Verifique se:
1. Google Drive API está ativada
2. Google Sheets API está ativada (se usar sheets)
3. As credenciais OAuth estão corretas em `oauth_config.py`

### "Invalid Client ID"
Copie exatamente o valor do Google Cloud Console, incluindo `.apps.googleusercontent.com`

### Token Expirado
O arquivo `token.json` contém um refresh token que mantém você autenticado. Se expirar, será renovado automaticamente.

## Segurança

- ⚠️ **NÃO compartilhe** o `oauth_config.py` com o `OAUTH_CLIENT_SECRET` incluído
- ⚠️ **NÃO faça commit** do arquivo `token.json` no Git
- ✅ Use variáveis de ambiente em produção

## Exemplo em Produção

Para produção, use variáveis de ambiente:

```python
import os

OAUTH_CLIENT_ID = os.getenv('GOOGLE_OAUTH_CLIENT_ID')
OAUTH_CLIENT_SECRET = os.getenv('GOOGLE_OAUTH_CLIENT_SECRET')
OAUTH_REDIRECT_URI = os.getenv('GOOGLE_OAUTH_REDIRECT_URI', 'http://localhost:5000/oauth2callback')
```

---

✅ Pronto! Agora você pode fazer upload de arquivos para Google Drive automaticamente!
