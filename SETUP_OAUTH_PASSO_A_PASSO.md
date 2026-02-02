# 🔐 Setup OAuth 2.0 - Guia Passo a Passo (DETALHADO)

## PASSO 1: Acessar Google Cloud Console

1. Abra seu navegador e vá para: **https://console.cloud.google.com/**
2. Faça login com sua conta Google
3. No topo esquerdo, você vai ver um **seletor de projeto**

## PASSO 2: Criar um Novo Projeto (OU selecione existente)

Se não tiver um projeto:
1. Clique no **seletor de projeto** (canto superior esquerdo)
2. Clique em **NEW PROJECT**
3. Digite um nome (ex: "VERISURE")
4. Clique em **CREATE**
5. **Aguarde alguns segundos** enquanto o projeto é criado
6. Quando aparecer uma notificação "Projeto criado", clique nela

## PASSO 3: Ativar APIs Necessárias

1. No menu esquerdo, clique em **APIs & Services**
2. Clique em **Enabled APIs & services** (ou Library)

### Ativar Google Drive API:
1. Clique no campo de **search** (lupa)
2. Digite: `google drive api`
3. Clique no resultado que aparece: **Google Drive API**
4. Clique no botão azul **ENABLE**
5. Aguarde ativar

### Ativar Google Sheets API:
1. Volte clicando em **APIs & Services** no menu esquerdo
2. Clique em **Enabled APIs & services**
3. Clique no campo de **search** (lupa)
4. Digite: `google sheets api`
5. Clique no resultado: **Google Sheets API**
6. Clique no botão azul **ENABLE**
7. Aguarde ativar

## PASSO 4: Criar OAuth 2.0 Credentials (AQUI ESTÁ A PARTE IMPORTANTE!)

1. No menu esquerdo, clique em **APIs & Services**
2. Clique em **Credentials** (está no menu esquerdo, abaixo de Library)

### Você deve ver uma página que diz "Credentials"

3. No topo dessa página, clique no botão azul **+ CREATE CREDENTIALS**
4. Um menu dropdown aparece com 3 opções:
   - API Key
   - OAuth 2.0 Client ID ← **CLIQUE NESTA**
   - Service Account

5. Ao clicar em **OAuth 2.0 Client ID**, aparece uma mensagem:
   > "To create an OAuth client ID, you must first set a user consent screen"

6. Clique em **CONFIGURE CONSENT SCREEN**

### Configure o Consent Screen:

1. Você verá duas opções: **Internal** e **External**
2. Selecione **External** (para uso pessoal)
3. Clique em **CREATE**

### Preencha o formulário:

**Seção 1: OAuth consent screen**
- **App name**: Digite "VERISURE" ou um nome qualquer
- **User support email**: Coloque seu email
- **Developer contact**: Coloque seu email também

4. Clique em **SAVE AND CONTINUE**

**Seção 2: Scopes**
- Não precisa adicionar nada, clique em **SAVE AND CONTINUE**

**Seção 3: Test Users**
- Clique em **ADD USERS**
- Digite seu email Google
- Clique em **ADD**

5. Clique em **SAVE AND CONTINUE**

6. Clique em **BACK TO DASHBOARD**

## PASSO 5: Criar as Credenciais OAuth (FINALMENTE!)

1. De volta na página de **Credentials**
2. Clique no botão azul **+ CREATE CREDENTIALS** novamente
3. Selecione **OAuth 2.0 Client ID**
4. Uma página aparece perguntando o **Application type**:
   - Selecione: **Desktop application** ← **IMPORTANTE!**
5. Clique em **CREATE**

### AGORA APARECE UMA POPUP COM SEU CLIENT ID E SECRET!

```
Client ID: [COPIE ESTE VALOR]
Client secret: [COPIE ESTE VALOR TAMBÉM]
```

**GUARDE ESSES VALORES**, você vai precisar!

6. Clique em **OK** ou fechefeche a popup

## PASSO 6: ADICIONAR AUTHORIZED REDIRECT URIs

**Depois de criar as credenciais:**

1. Na página de **Credentials**, você verá uma tabela com suas credenciais OAuth
2. Clique **NO NOME DA CREDENCIAL** (Desktop application) para abrir
3. Uma página abre com os detalhes

### PROCURE POR: "Authorized redirect URIs"

Essa seção fica **NA METADE DA PÁGINA**, após alguns campos:
- Application name
- Client ID
- Client secret
- **Authorized JavaScript origins** (pode estar acima)
- **Authorized redirect URIs** ← **AQUI ESTÁ!**

4. Clique no botão **+ ADD URI** (à direita de Authorized redirect URIs)
5. Digite:
   ```
   http://localhost:5000/oauth2callback
   ```
6. Clique em **SAVE**

## PASSO 7: Editar oauth_config.py

Agora que você tem o Client ID e Client Secret:

1. Abra o arquivo `oauth_config.py` na raiz do VERISURE
2. Substitua:
   ```python
   OAUTH_CLIENT_ID = "SEU_CLIENT_ID_AQUI.apps.googleusercontent.com"
   OAUTH_CLIENT_SECRET = "SEU_CLIENT_SECRET_AQUI"
   ```

   Por seus valores reais (copie do Google Cloud Console):
   ```python
   OAUTH_CLIENT_ID = "123456789-abc...xyz.apps.googleusercontent.com"
   OAUTH_CLIENT_SECRET = "GOCSPX-abc...xyz"
   ```

3. Salve o arquivo

## PASSO 8: Fazer Login (Primeira Vez)

1. Abra um terminal na pasta VERISURE:
   ```bash
   cd c:\Users\tatic\Desktop\VERISURE
   ```

2. Inicie o servidor:
   ```bash
   python run_app.py
   ```

3. Você verá:
   ```
   🚀 COMPILADOR VERISURE - Iniciando aplicação
   📍 Acesse: http://localhost:5000
   * Running on http://127.0.0.1:5000
   ```

4. Abra seu navegador e acesse:
   ```
   http://localhost:5000/authorize
   ```

5. Você será **REDIRECIONADO PARA O GOOGLE**
6. Clique em sua conta Google
7. Apareça uma tela dizendo: **"VERISURE wants access to your Google account"**
8. Clique em **ALLOW**
9. Você voltará para a aplicação com uma mensagem: **"Autenticado com sucesso!"**
10. Um arquivo `token.json` será criado automaticamente

## ✅ PRONTO!

Agora você pode:
- Acessar http://localhost:5000
- Fazer upload de arquivos
- Os arquivos serão salvos em Google Drive automaticamente!

---

## ⚠️ Se ainda tiver dúvida sobre "Authorized redirect URIs"

Envie uma **screenshot** da página do Google Cloud Console que você está vendo, que ajudo a localizar!

Procure por esta seção (em INGLÊS, mesmo que seu navegador esteja em PT):
```
Authorized redirect URIs
[Texto vazio ou com URLs existentes]
[+ ADD URI]
```
