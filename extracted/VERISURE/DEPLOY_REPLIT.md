# 🚀 Guia de Deploy no Replit

Seu projeto Verisure agora está **100% pronto para deploy online**!

## ✅ O Que Está Configurado

- ✅ `.replit` - Arquivo de configuração do Replit
- ✅ `Procfile` - Para outros serviços (Railway, Heroku, etc)
- ✅ `oauth_config.py` - Lê variáveis de ambiente
- ✅ `run_app.py` - Detecta PORT dinamicamente

## 📋 Passo a Passo - Replit

### 1. Criar Conta (grátis, sem cartão)
- Acessa https://replit.com
- Sign Up com email
- ✅ Pronto

### 2. Fazer Upload do Projeto
No Replit clica em **"Create"** → **"Import from folder/file"**
- Opção A: Arrasta a pasta VERISURE
- Opção B: Faz ZIP → Upload

### 3. Replit Faz Tudo Sozinho
```
✅ Detecta run_app.py (no arquivo .replit)
✅ Instala requirements.txt (python -m pip install -r...)
✅ Roda a aplicação (python run_app.py)
✅ Gera URL automática
```

### 4. Resultado Final

**URL que você recebe:**
```
https://seu-nome-replit.replit.dev
```

**Aparência:**
- Exatamente igual ao localhost:5000
- Mesmos botões (PASSO 1, 2, 3)
- Mesmo funcionamento

## 🔑 Variáveis de Ambiente (Para depois)

Depois que estiver online, você coloca as variáveis no Replit:

1. Vai em **"Secrets"** (ícone de chave 🔑)
2. Clica **"New Secret"** e adiciona:

```
OAUTH_CLIENT_ID = 264311763921-d0kmd339k01jgtkbvjlqvrfn29d9h0am.apps.googleusercontent.com
OAUTH_CLIENT_SECRET = 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
DEPLOY_URL = https://seu-nome-replit.replit.dev
DRIVE_FOLDER_ID = 1fSLimz_7vqF4T-gotvZaux0W7QLcqpRa
```

## 🎯 Atualizar Google Cloud

Depois que tiver a URL, você vai em **Google Cloud Console → Credentials**:

1. Abre seu OAuth Client ID
2. Em **"Authorized redirect URIs"** adiciona:
```
https://seu-nome-replit.replit.dev/oauth2callback
```
3. Clica Save

## ✅ Resultado Final

Sua colega:
1. Acessa a URL do Replit
2. Clica "Login com Google"
3. Faz upload do arquivo
4. Clica PASSO 1 → 2 → 3
5. Tudo sobe automaticamente no Google Drive

**Sem precisar ter Python instalado!**

---

## 📞 Próximos Passos

1. ✅ Você cria conta Replit
2. ✅ Faz upload do projeto
3. ✅ Me passa a URL que Replit gera
4. ✅ Eu atualizo as configs
5. ✅ Pronto!

Qualquer dúvida, me avisa! 🎉
