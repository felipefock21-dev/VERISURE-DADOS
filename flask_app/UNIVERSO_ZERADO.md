# Universo zerado na última semana adicionada ao arquivo final

Quando a **última semana** que aparece no relatório semanal oficial vem com **Universo = 0**, a causa está em **uma** destas duas situações.

---

## 1. Problema na **fonte** (DadosIdentificador)

**O que é:** Os **Identificadores** que aparecem nos dados dessa semana **não estão** na tabela DadosIdentificador (ou estão escritos de forma diferente).

**Onde fica o DadosIdentificador:**
- **Google Sheets** (prioridade): planilha com ID `1UmWzuIpF1nEh1YUJH4pu9jJL7PJHvlQvHE4Pnrw6xhA`, primeira aba.
- **Excel enviado:** aba cujo nome contenha "DadosIdentificador" (ou "Dados Identificador", etc.).

**O que fazer:**
1. Rode um processamento e olhe o **log do Passo 1**. Se aparecer:
   - `⚠️ AVISO: X registros não encontraram correspondência em DadosIdentificador (Universo será 0)`
   - e a lista **Exemplos de IDs sem match**
2. Abra o Google Sheet (ou a aba) DadosIdentificador e confira:
   - Se esses **Identificadores** existem na coluna **Identificador**.
   - Se o texto está **igual** ao do relatório de audiência (espaços, maiúsculas/minúsculas). O processo normaliza com strip + UPPER; se no Sheet tiver "ABC 123" e no relatório "ABC123", não dá match.
3. Inclua os Identificadores que faltam (e a coluna **Universo** e, se usar, **porc**) e processe de novo.

---

## 2. Problema no **processo** (raro)

**O que é:** O processo deveria ter trazido Universo do DadosIdentificador, mas algo falha (ex.: coluna com nome diferente, erro na leitura do Sheet).

**Como conferir:**
1. Confirme que no **DadosIdentificador** existem linhas para **todos** os Identificadores da última semana (e que o texto da coluna Identificador está igual ao do arquivo de audiência).
2. Se mesmo assim a última semana sair com Universo 0:
   - Veja no log do **Passo 1** se ainda aparece "registros não encontraram correspondência" e quais IDs.
   - Se **não** aparecer nenhum aviso de “sem match” e mesmo assim a última semana tiver Universo 0, aí sim pode ser bug no processo (ex.: coluna "Universo" com nome diferente no Sheet, ou outra aba sendo lida).

**Log útil:** Ao adicionar linhas novas ao arquivo oficial, o processo agora imprime quais dessas linhas têm Universo = 0 (Rádio e Semana). Use isso para saber exatamente qual “última semana” está zerada e cruzar com o DadosIdentificador.

---

## 3. Debug: ver o que o app recebe do Google Sheet

Se Universo e porc (TRP) continuam zerados mesmo com DadosIdentificador preenchido:

1. **Abra no navegador:** `http://localhost:5000/debug-dados-id` (com o app rodando e já autenticado no Google).
2. A página mostra em JSON: a primeira linha (cabeçalho), nomes das colunas com índice (0 = A, 11 = L), e linhas 2 e 3.
3. Se os nomes não forem "Identificador", "Universo", "porc", o app usa **fallback por posição**: **A (0)** = Identificador, **K (10)** = porc, **L (11)** = Universo. A planilha precisa ter pelo menos 12 colunas até L.

---

## Resumo

| Situação | Onde ver | Ação |
|---------|----------|------|
| **Fonte** | Log Passo 1: "Exemplos de IDs sem match" | Incluir/corrigir esses Identificadores (e Universo) no DadosIdentificador |
| **Processo** | DadosIdentificador já tem os IDs e mesmo assim Universo 0 na última semana | Verificar nome da coluna, aba lida e logs do Passo 1 e do “linhas novas com Universo = 0” |

Na grande maioria dos casos, Universo zerado na última semana é **falta ou diferença de Identificador no DadosIdentificador** (fonte), não falha do processo.
