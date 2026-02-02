// =============================================================================
// VERISURE - Compilador de Relatórios - JavaScript
// =============================================================================

// Elementos DOM
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const progressSection = document.getElementById('progressSection');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');
const uploadSection = document.querySelector('.upload-section');

// Estado da aplicação
let resultado = null;
let eventSource = null;

// =============================================================================
// EVENTOS DE UPLOAD
// =============================================================================

// Click para abrir seletor de arquivo
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        processarArquivo();
    }
});

// Seleção de arquivo
fileInput.addEventListener('change', processarArquivo);

// =============================================================================
// PROCESSAMENTO DO ARQUIVO
// =============================================================================

async function processarArquivo() {
    const file = fileInput.files[0];
    
    if (!file) return;
    
    // Validação
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
        mostrarErro('❌ Apenas arquivos Excel (.xlsx ou .xls) são aceitos!');
        return;
    }
    
    if (file.size > 500 * 1024 * 1024) {
        mostrarErro('❌ Arquivo muito grande (máximo 500MB)');
        return;
    }
    
    // Mostrar progresso
    uploadSection.style.display = 'none';
    progressSection.style.display = 'block';
    resultSection.style.display = 'none';
    errorSection.style.display = 'none';
    
    // Mostrar barra de carregamento
    mostrarProgressBar();
    
    // Conectar ao SSE para receber progresso em tempo real
    conectarSSE();
    
    // Simular progresso dos passos
    ativarPasso(1);
    
    try {
        // Criar FormData
        const formData = new FormData();
        formData.append('file', file);
        
        // Enviar para servidor com tracking de progresso
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultado = data;
            atualizarProgressBar(100);
            desconectarSSE();
            setTimeout(() => mostrarResultado(data), 500);
        } else {
            desconectarSSE();
            esconderProgressBar();
            mostrarErro(data.erro || 'Erro desconhecido no servidor');
        }
    } catch (error) {
        desconectarSSE();
        esconderProgressBar();
        mostrarErro(`Erro ao enviar arquivo: ${error.message}`);
    }
}

// =============================================================================
// SERVER-SENT EVENTS (SSE) - RECEBER PROGRESSO REAL
// =============================================================================

function conectarSSE() {
    eventSource = new EventSource('/progresso');
    
    eventSource.onmessage = function(event) {
        try {
            const data = JSON.parse(event.data);
            console.log('[SSE] Progresso:', data);
            atualizarProgressBar(data.percentual);
            
            // Atualizar etapa visual
            if (data.etapa > 0 && data.etapa <= 3) {
                ativarPasso(data.etapa);
            }
        } catch (error) {
            console.error('[SSE] Erro ao processar:', error);
        }
    };
    
    eventSource.onerror = function(error) {
        console.log('[SSE] Conexão finalizada');
        // Desconectar automaticamente ao erro
        desconectarSSE();
    };
}

function desconectarSSE() {
    if (eventSource) {
        eventSource.close();
        eventSource = null;
    }
}

// =============================================================================
// BARRA DE CARREGAMENTO
// =============================================================================

function mostrarProgressBar() {
    const progressContainer = document.getElementById('progressContainer');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    console.log('[PROGRESS] mostrarProgressBar() chamado');
    console.log('[PROGRESS] progressContainer:', progressContainer);
    console.log('[PROGRESS] progressFill:', progressFill);
    console.log('[PROGRESS] progressText:', progressText);
    
    if (progressContainer) {
        progressContainer.style.display = 'block';
        console.log('[PROGRESS] ✅ progressContainer display: block');
    } else {
        console.error('[PROGRESS] ❌ progressContainer não encontrado!');
    }
    
    if (progressFill) {
        progressFill.style.width = '0%';
    }
    
    if (progressText) {
        progressText.textContent = 'Processando... 0%';
    }
}

function atualizarProgressBar(percentual) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    percentual = Math.min(percentual, 100);
    percentual = Math.max(percentual, 0);
    
    progressFill.style.width = percentual + '%';
    progressText.textContent = `Processando... ${Math.round(percentual)}%`;
}

function esconderProgressBar() {
    const progressContainer = document.getElementById('progressContainer');
    progressContainer.style.display = 'none';
}

// =============================================================================
// INTERFACE DE PROGRESSO
// =============================================================================

function ativarPasso(numero) {
    // Desativa todos os passos
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Ativa o passo atual
    const stepAtual = document.getElementById(`step${numero}`);
    if (stepAtual) {
        stepAtual.classList.add('active');
        
        // Atualizar status
        const statusSpan = stepAtual.querySelector('.step-status');
        if (statusSpan) {
            statusSpan.textContent = '⏳';
        }
    }
    
    // Marcar passos anteriores como completos
    for (let i = 1; i < numero; i++) {
        const stepAnterior = document.getElementById(`step${i}`);
        if (stepAnterior) {
            stepAnterior.classList.add('completed');
            const statusSpan = stepAnterior.querySelector('.step-status');
            if (statusSpan) {
                statusSpan.textContent = '✅';
            }
        }
    }
}

function finalizarPasso(numero, sucesso = true) {
    const step = document.getElementById(`step${numero}`);
    if (step) {
        step.classList.remove('active');
        if (sucesso) {
            step.classList.add('completed');
            const statusSpan = step.querySelector('.step-status');
            if (statusSpan) {
                statusSpan.textContent = '';
            }
        }
    }
}

// =============================================================================
// MODAL DE SUCESSO
// =============================================================================

function abrirModalSucesso(mensagemTabela) {
    const modal = document.getElementById('successModal');
    
    // Se houver mensagem da tabela, adiciona ela no modal
    if (mensagemTabela) {
        const mensagemDiv = document.getElementById('mensagemTabela');
        if (mensagemDiv) {
            // Mapeia cores
            const cores = {
                'verde': '#4CAF50',
                'azul': '#2196F3',
                'laranja': '#FF9800',
                'vermelho': '#F44336',
                'cinza': '#9E9E9E'
            };
            
            const cor = cores[mensagemTabela.cor] || '#2196F3';
            
            console.log('[MODAL] Exibindo mensagem:', mensagemTabela);
            
            let detalhesHTML = '';
            if (mensagemTabela.detalhes) {
                detalhesHTML = `<div style="font-size: 12px; margin-top: 8px; opacity: 0.9;">${mensagemTabela.detalhes}</div>`;
            }
            
            mensagemDiv.innerHTML = `
                <div style="
                    background-color: ${cor}; 
                    color: white; 
                    padding: 15px; 
                    border-radius: 5px; 
                    margin-top: 15px;
                    font-size: 16px;
                    font-weight: 500;
                    text-align: center;
                ">
                    ${mensagemTabela.mensagem}
                    ${detalhesHTML}
                </div>
            `;
        } else {
            console.warn('[MODAL] Elemento mensagemTabela não encontrado');
        }
    } else {
        console.log('[MODAL] Nenhuma mensagem da tabela para exibir');
    }
    
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function fecharModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// =============================================================================
// MOSTRAR RESULTADO
// =============================================================================

function mostrarResultado(data) {
    // Esconder barra de progresso
    esconderProgressBar();
    
    // Simular progresso dos passos
    setTimeout(() => {
        finalizarPasso(1);
        ativarPasso(2);
    }, 500);
    
    setTimeout(() => {
        finalizarPasso(2);
        ativarPasso(3);
    }, 1500);
    
    setTimeout(() => {
        finalizarPasso(3);
        
        // Atualizar interface
        document.getElementById('compiladoInfo').textContent = `${data.compilado.linhas} registros`;
        
        document.getElementById('mensalInfo').textContent = data.mensal.gerado 
            ? `${data.mensal.linhas} registros` 
            : 'Não gerado';
        
        document.getElementById('semanalInfo').textContent = data.semanal.gerado 
            ? `${data.semanal.linhas} registros` 
            : 'Não gerado';
        
        // Habilitar/desabilitar botões de download
        document.getElementById('downloadMensalBtn').disabled = !data.mensal.gerado;
        document.getElementById('downloadSemanalBtn').disabled = !data.semanal.gerado;
        
        // Mostrar seção de resultado
        progressSection.style.display = 'none';
        resultSection.style.display = 'block';
        
        // Abrir modal de sucesso com mensagem da tabela
        abrirModalSucesso(data.mensagem_tabela);
        
    }, 2500);
}

// =============================================================================
// MOSTRAR ERRO
// =============================================================================

function mostrarErro(mensagem) {
    uploadSection.style.display = 'none';
    progressSection.style.display = 'none';
    resultSection.style.display = 'none';
    errorSection.style.display = 'block';
    
    document.getElementById('errorMessage').textContent = mensagem;
}

// =============================================================================
// DOWNLOAD DE ARQUIVOS
// =============================================================================

async function downloadArquivo(tipo) {
    try {
        const response = await fetch(`/download/${tipo}`);
        
        if (!response.ok) {
            alert('❌ Erro ao baixar arquivo');
            return;
        }
        
        // Obter nome do arquivo do header
        const contentDisposition = response.headers.get('content-disposition');
        let filename = `${tipo}.xlsx`;
        
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^"]+)"?/);
            if (match) filename = match[1];
        }
        
        // Download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
    } catch (error) {
        alert(`❌ Erro ao baixar: ${error.message}`);
    }
}

// =============================================================================
// RESETAR FORMULÁRIO
// =============================================================================

function resetarFormulario() {
    // Limpar input
    fileInput.value = '';
    resultado = null;
    
    // Mostrar upload section novamente
    uploadSection.style.display = 'block';
    progressSection.style.display = 'none';
    resultSection.style.display = 'none';
    errorSection.style.display = 'none';
    
    // Resetar passos
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
        const statusSpan = step.querySelector('.step-status');
        if (statusSpan) {
            statusSpan.textContent = '⏳';
        }
    });
}

// =============================================================================
// INICIALIZAÇÃO
// =============================================================================

console.log('🚀 VERISURE Compilador de Relatórios - Pronto!');
