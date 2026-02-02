# 🚀 GUIA RÁPIDO - Iniciar Flask App

## ⚡ 3 Passos Rápidos

### 1️⃣ Abrir Terminal/PowerShell

```powershell
cd c:\Users\tatic\Desktop\VERISURE\flask_app
```

### 2️⃣ Criar Ambiente Virtual

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Importante:** Se receber erro sobre policies, execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 3️⃣ Instalar e Rodar

```powershell
pip install -r requirements.txt
python app.py
```

### ✅ Sucesso!

Acesse: **http://localhost:5000**

---

## 🎯 Como Usar

1. **Faça upload** do arquivo Audiência (.xlsx)
2. **Veja o progresso** dos 3 passos
3. **Baixe os 3 arquivos** gerados:
   - 📊 COMPILADO
   - 📈 MENSAL
   - 📅 SEMANAL

---

## 🔧 Se Algo Não Funcionar

### Erro: "python: command not found"
```powershell
python3 -m venv venv
.\venv\Scripts\Activate.ps1
python3 app.py
```

### Erro: "Port 5000 already in use"
Mude a porta no final do `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Erro: "Module not found"
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 💡 Dicas

- Deixe o terminal aberto enquanto usa a app
- Para parar: Pressione `Ctrl + C`
- Para reiniciar: Fecha e executa `python app.py` novamente

---

## 🌐 Próximos Passos

- [ ] Integrar com Google Drive (adicionar credentials.json)
- [ ] Fazer deploy no Render.com
- [ ] Configurar Cloudflare Tunnel para acesso remoto

---

**Tudo pronto? 🚀 Acesse: http://localhost:5000**
