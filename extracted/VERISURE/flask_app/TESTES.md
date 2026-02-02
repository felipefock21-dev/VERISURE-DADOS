# 🧪 GUIA DE TESTES - VERISURE Flask App

## ✅ Checklist de Testes

### 1. Instalação Inicial
- [ ] Python 3.8+ instalado (`python --version`)
- [ ] pip atualizado (`pip --upgrade pip`)
- [ ] Pasta `flask_app` criada com todos os arquivos
- [ ] `requirements.txt` presente e completo

### 2. Setup do Ambiente
- [ ] Ambiente virtual criado (`venv/`)
- [ ] Ambiente virtual ativado (prompt mostra `(venv)`)
- [ ] Dependências instaladas (`pip install -r requirements.txt`)
- [ ] Sem erros de importação

### 3. Teste Local
- [ ] App inicia sem erros (`python app.py`)
- [ ] Mensagem: "🚀 Aplicação Flask iniciada!"
- [ ] Acesso a http://localhost:5000
- [ ] Página carrega corretamente
- [ ] Interface HTML visível

### 4. Teste de Upload
- [ ] Campo de upload visível
- [ ] Drag & drop funciona
- [ ] Clique no upload abre seletor de arquivo
- [ ] Validação: apenas .xlsx/.xls aceitos
- [ ] Validação: máximo 500MB

### 5. Teste de Processamento (Com Arquivo Teste)
- [ ] Arquivo enviado com sucesso
- [ ] Passo 1 (Compilação) completa
- [ ] Passo 2 (Mensal) processa
- [ ] Passo 3 (Semanal) processa
- [ ] Resultado exibido corretamente

### 6. Teste de Download
- [ ] Botão "Baixar COMPILADO" funciona
- [ ] Botão "Baixar MENSAL" funciona (se gerado)
- [ ] Botão "Baixar SEMANAL" funciona (se gerado)
- [ ] Arquivos baixam com nomes corretos
- [ ] Arquivos Excel abrem normalmente

### 7. Teste de Reinício
- [ ] Botão "Processar Novo Arquivo" funciona
- [ ] Formulário reseta corretamente
- [ ] Pode fazer novo upload

### 8. Teste de Erros
- [ ] Upload sem arquivo mostra erro
- [ ] Arquivo inválido mostra erro
- [ ] Mensagem de erro é clara
- [ ] Pode tentar novamente

---

## 🧪 Teste Prático (Passo a Passo)

### Pré-requisito: Arquivo de Teste

1. Crie um arquivo Excel (`teste.xlsx`) com estas colunas:
   ```
   | Identificador | Data | Hora | Rádio | Cidade / UF | Peça | Comercial | Status | PMM | Preço |
   |---|---|---|---|---|---|---|---|---|---|
   | ID001 | 01/01/2025 | 09:00:00 | Rádio A | São Paulo / SP | Peça X | Com001 | Ativo | 100 | 500,00 |
   | ID002 | 01/01/2025 | 10:00:00 | Rádio B | Rio de Janeiro / RJ | Peça Y | Com002 | Ativo | 150 | 750,00 |
   | ID003 | 02/01/2025 | 11:00:00 | Rádio A | São Paulo / SP | Peça Z | Com003 | Ativo | 200 | 1000,00 |
   ```

2. Salve como `teste.xlsx` na sua área de trabalho

### Executar Teste

```powershell
# 1. Ir para pasta
cd c:\Users\tatic\Desktop\VERISURE\flask_app

# 2. Ativar ambiente
.\venv\Scripts\Activate.ps1

# 3. Rodar app
python app.py

# 4. Abrir navegador
# http://localhost:5000

# 5. Fazer upload de teste.xlsx

# 6. Aguardar processamento

# 7. Baixar os 3 arquivos

# 8. Abrir no Excel e verificar:
#    - COMPILADO: dados limpos
#    - MENSAL: agregado por período
#    - SEMANAL: agregado por semana
```

---

## 📋 Testes de Validação

### Dados de Entrada
- [ ] Arquivo com colunas esperadas
- [ ] Arquivo com colunas faltando
- [ ] Arquivo com dados vazios
- [ ] Arquivo com valores inválidos
- [ ] Arquivo muito grande (> 500MB)

### Processamento
- [ ] Limpeza funciona corretamente
- [ ] Duplicatas são removidas
- [ ] Datas formatadas corretamente
- [ ] Horas formatadas corretamente
- [ ] Preços convertidos corretamente

### Resultado
- [ ] COMPILADO tem registros corretos
- [ ] MENSAL agrupa corretamente
- [ ] SEMANAL agrupa corretamente
- [ ] Números são precisos
- [ ] Sem erros visuais no Excel

---

## 🐛 Se Algo Não Funcionar

### Erro: "ModuleNotFoundError"
```powershell
pip install -r requirements.txt
```

### Erro: "Port 5000 in use"
```powershell
# Encontre o processo
netstat -ano | findstr :5000

# Mude a porta em app.py:
# app.run(debug=True, host='0.0.0.0', port=5001)
```

### Erro: "Template not found"
```powershell
# Verifique a estrutura:
# flask_app/templates/index.html (deve existir)
# flask_app/static/script.js (deve existir)
# flask_app/static/style.css (deve existir)
```

### Erro no upload
```
Verifique:
- Arquivo é .xlsx ou .xls?
- Arquivo menor que 500MB?
- Arquivo não corrompido?
```

---

## 📊 Métricas de Sucesso

| Teste | Esperado | Status |
|---|---|---|
| App inicia | ✅ Sem erros | [ ] |
| Página carrega | ✅ HTML renderizado | [ ] |
| Upload aceita arquivo | ✅ Arquivo selecionado | [ ] |
| Passo 1 completa | ✅ Dados compilados | [ ] |
| Passo 2 completa | ✅ Dados agrupados | [ ] |
| Passo 3 completa | ✅ Dados semanais | [ ] |
| Download funciona | ✅ Arquivo recebido | [ ] |
| Excel abre | ✅ Sem corrupção | [ ] |
| Reinício funciona | ✅ Novo upload possível | [ ] |

---

## 🎯 Conclusão

Quando todos os testes passarem ✅, a aplicação está **pronta para uso em produção**!

Próximos passos:
1. Adicione credenciais Google Drive (config_example.py)
2. Faça deploy no Render.com
3. Configure Cloudflare Tunnel para acesso remoto

---

**Data do Teste:** ___/___/_____  
**Testador:** _________________  
**Status Geral:** [ ] Passou [ ] Falhou
