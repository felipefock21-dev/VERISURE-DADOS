# 🎯 VERISURE - Compilador de Relatórios (Web)

Versão web em **Flask** do compilador de relatórios VERISURE. Processa arquivos Audiência em 3 passos:
1. ✅ **Compilação** - Limpeza e compilação dos dados
2. ✅ **Mensal** - Agrupamento por período comercial
3. ✅ **Semanal** - Agrupamento por semana

---

## 📋 Pré-requisitos

- **Python 3.8+**
- **pip** (gerenciador de pacotes Python)
- Sistema operacional: Windows, Mac ou Linux

---

## 🚀 Instalação

### 1. Clonar/Baixar o Projeto

```bash
cd flask_app
```

### 2. Criar Ambiente Virtual (Recomendado)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar Dependências

```bash
pip install -r requirements.txt
```

---

## 🏃 Como Executar

### Modo Local (seu computador)

```bash
python app.py
```

Acesse em: **http://localhost:5000**

---

## 🌐 Implantação em Produção

### Opção 1: Render.com (Recomendado)

1. Crie conta em https://render.com
2. Conecte seu repositório GitHub
3. Crie novo "Web Service"
4. Configure:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `gunicorn app:app`
5. Deploy automático

### Opção 2: Cloudflare Tunnel + Local

```bash
# Instalar Cloudflare Tunnel
# Windows: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Depois de instalado, executar:
cloudflare-tunnel run --url http://localhost:5000
```

---

## 📁 Estrutura do Projeto

```
flask_app/
├── app.py                 # Backend Flask (lógica dos 3 passos)
├── requirements.txt       # Dependências Python
├── templates/
│   └── index.html        # Interface HTML
├── static/
│   ├── style.css         # Estilos
│   └── script.js         # Interatividade JavaScript
└── temp_uploads/         # Arquivos temporários (auto-criado)
```

---

## 🔧 Como Funciona

### PASSO 1: Compilação
- Lê arquivo Excel (.xlsx ou .xls)
- Remove segunda linha vazia
- Limpa dados:
  - ✅ Formata datas em DD/MM/YYYY
  - ✅ Normaliza horas em HH:MM:SS
  - ✅ Converte preços (formato brasileiro)
  - ✅ Remove linhas vazias e com "TOTAL"
- Remove duplicatas por (Identificador + Data + Hora)
- Retorna: **COMPILADO.xlsx**

### PASSO 2: Mensal
- Carrega dados compilados
- Mapeia **período comercial** (períodos fixos de 2025)
- Mapeia **praças** (cidades para regiões)
- Agrupa por período + praça
- Calcula:
  - Impacto (soma de PMM)
  - Investimento (soma de preços)
- Retorna: **RELATORIO_MENSAL.xlsx**

### PASSO 3: Semanal
- Carrega dados compilados
- Calcula **semana ISO** (segunda-domingo)
- Agrupa por rádio + semana
- Calcula:
  - Inserções (contagem)
  - Investimento (soma)
  - Impactos (soma de PMM)
  - TRP (soma de PMM no Target)
  - PMM (soma única por ID)
- Retorna: **RELATORIO_SEMANAL.xlsx**

---

## 💾 Google Drive (Futuro)

Para integrar upload automático para Google Drive:

1. Obtenha credenciais JSON do Google Cloud:
   - https://console.cloud.google.com
   - Crie "Service Account"
   - Baixe JSON com credenciais

2. Adicione ao `app.py`:
```python
import gspread
from google.oauth2.service_account import Credentials

creds = Credentials.from_service_account_file('credentials.json')
gc = gspread.authorize(creds)
# ... código para fazer upload
```

---

## 🛠️ Troubleshooting

### "ModuleNotFoundError: No module named 'flask'"
```bash
pip install -r requirements.txt
```

### "Port 5000 já em uso"
```bash
python app.py --port 5001
```

### Arquivo muito grande
Máximo: 500MB (configurável em `app.config['MAX_CONTENT_LENGTH']`)

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique o console do navegador (F12)
- Verifique o terminal onde Flask está rodando
- Procure por mensagens de erro

---

## 📄 Licença

Desenvolvido para VERISURE © 2025

---

## 🎉 Pronto!

Seu compilador de relatórios está funcionando! 🚀

Acesse: **http://localhost:5000**
