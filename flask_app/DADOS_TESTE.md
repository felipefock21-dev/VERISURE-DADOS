# 🧪 DADOS DE TESTE

## Como Criar Arquivo de Teste

### Opção 1: Manualmente (Excel)

1. Abra Excel
2. Crie uma planilha com estas colunas:

```
Identificador | Data | Hora | Rádio | Cidade / UF | Peça | Comercial | Status | PMM | Preço
```

3. Adicione estes dados:

```
ID001 | 01/01/2025 | 09:00:00 | Rádio A | São Paulo / SP | Peça X | Com001 | Ativo | 100 | 500,00
ID002 | 01/01/2025 | 10:00:00 | Rádio B | Rio de Janeiro / RJ | Peça Y | Com002 | Ativo | 150 | 750,00
ID003 | 02/01/2025 | 11:00:00 | Rádio A | São Paulo / SP | Peça Z | Com003 | Ativo | 200 | 1000,00
ID004 | 05/01/2025 | 14:30:00 | Rádio C | Belo Horizonte / MG | Peça W | Com004 | Ativo | 120 | 600,00
ID005 | 05/01/2025 | 15:00:00 | Rádio A | São Paulo / SP | Peça X | Com005 | Ativo | 100 | 500,00
ID006 | 08/01/2025 | 09:00:00 | Rádio B | Rio de Janeiro / RJ | Peça Y | Com006 | Ativo | 150 | 750,00
ID007 | 12/01/2025 | 10:00:00 | Rádio A | Campinas / SP | Peça Z | Com007 | Ativo | 200 | 1000,00
ID008 | 15/01/2025 | 16:00:00 | Rádio C | Curitiba / PR | Peça W | Com008 | Ativo | 120 | 600,00
```

4. Salve como `teste.xlsx`

### Opção 2: Usar Python (Criar Excel Programaticamente)

```python
import pandas as pd
from datetime import datetime, timedelta

# Dados
dados = {
    'Identificador': ['ID001', 'ID002', 'ID003', 'ID004', 'ID005'],
    'Data': ['01/01/2025', '01/01/2025', '02/01/2025', '05/01/2025', '05/01/2025'],
    'Hora': ['09:00:00', '10:00:00', '11:00:00', '14:30:00', '15:00:00'],
    'Rádio': ['Rádio A', 'Rádio B', 'Rádio A', 'Rádio C', 'Rádio A'],
    'Cidade / UF': ['São Paulo / SP', 'Rio de Janeiro / RJ', 'São Paulo / SP', 'Belo Horizonte / MG', 'São Paulo / SP'],
    'Peça': ['Peça X', 'Peça Y', 'Peça Z', 'Peça W', 'Peça X'],
    'Comercial': ['Com001', 'Com002', 'Com003', 'Com004', 'Com005'],
    'Status': ['Ativo', 'Ativo', 'Ativo', 'Ativo', 'Ativo'],
    'PMM': [100, 150, 200, 120, 100],
    'Preço': [500.00, 750.00, 1000.00, 600.00, 500.00]
}

df = pd.DataFrame(dados)
df.to_excel('teste.xlsx', index=False)
print("✅ Arquivo teste.xlsx criado!")
```

## Cidades Válidas para Teste

As seguintes cidades funcionam com o mapa de praças:

```
São Paulo / SP
Rio de Janeiro / RJ
Belo Horizonte / MG
Campinas / SP
Santos / SP
Ribeirão Preto / SP
Sorocaba / SP
São José dos Campos / SP
Vitória / ES
Petrópolis / RJ
Volta Redonda / RJ
Curitiba / PR
Porto Alegre / RS
Florianópolis / SC
Joinville / SC
Brasília / DF
Goiânia / GO
Uberlândia / MG
Campo Grande / MS
Recife / PE
Salvador / BA
Fortaleza / CE
João Pessoa / PB
Bauru / SP
```

## O Que Esperar nos Resultados

### COMPILADO.xlsx
- Mesmos dados de entrada, mas limpos
- Sem segunda linha vazia
- Sem duplicatas
- Dados formatados corretamente

### RELATORIO_MENSAL.xlsx
- Agregado por: Periodo_Comercial + Praca_Mapeada
- Colunas: Periodo_Comercial, Praca_Mapeada, Impacto, Investimento

### RELATORIO_SEMANAL.xlsx
- Agregado por: Rádio + Semana
- Colunas: Rádio, Semana, Inserções, Investimento, Impactos

## Teste de Validação

Após fazer upload, você deve ver:

```
✅ COMPILADO
   📊 5 registros

✅ MENSAL
   📊 4 registros

✅ SEMANAL
   📊 5 registros
```

(Os números exatos dependem dos seus dados)

## Cenários de Teste

### Teste 1: Dados Válidos
- Upload de arquivo correto
- Espera: 3 passos completam sem erros

### Teste 2: Arquivo Vazio
- Upload de arquivo sem dados (só cabeçalho)
- Espera: Erro ou 0 registros

### Teste 3: Colunas Faltando
- Upload de arquivo sem coluna "PMM"
- Espera: Aviso e continuação com dados disponíveis

### Teste 4: Formato Inválido
- Upload de arquivo .pdf ou .txt
- Espera: Erro de formato

### Teste 5: Arquivo Grande
- Upload de arquivo > 500MB
- Espera: Erro de tamanho

## Dicas

- 🎯 Use dados de teste simples para começar
- 📅 Use datas dentro dos períodos comerciais (2025)
- 🏙️ Use cidades que estão no mapa (veja lista acima)
- 💰 Use preços em formato brasileiro (1.234,56 ou 1234.56)
- 📊 Adicione alguns dados duplicados para testar remoção

Pronto para testar! 🚀
