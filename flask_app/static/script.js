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
// VERIFICAÇÃO DE AUTENTICAÇÃO OAUTH
// =============================================================================

// Verificar status OAuth ao carregar a página
window.addEventListener('DOMContentLoaded', async () => {
    // 1. Mostrar modal IMEDIATAMENTE em estado de loading
    mostrarModalOAuth({ loading: true });

    try {
        const response = await fetch('/oauth-status');
        const data = await response.json();

        if (data.autenticado) {
            // ESTADO: JÁ LOGADO - Botão apenas libera o acesso
            mostrarModalOAuth({
                autenticado: true,
                titulo: "Bem-vindo de volta!",
                descricao: "Sua conexão com o Google Drive está ativa e segura.",
                btnTexto: "Acessar Sistema",
                btnAcao: () => fecharModalOAuth()
            });
            atualizarStatusAuthUI(true);
        } else {
            // ESTADO: NÃO LOGADO - Botão leva ao login
            mostrarModalOAuth({
                autenticado: false,
                titulo: "Conectar Google Drive",
                descricao: "Autorize a aplicação VERISURE a acessar sua conta Google Drive para sincronizar e salvar relatórios automaticamente.",
                btnTexto: "Conectar ao Google Drive",
                btnAcao: () => window.location.href = '/authorize'
            });
            atualizarStatusAuthUI(false);
        }
    } catch (error) {
        console.error('Erro ao verificar OAuth:', error);
        mostrarErro('Erro de conexão ao verificar segurança.');
    }
});

function mostrarModalOAuth({ loading, autenticado, titulo, descricao, btnTexto, btnAcao } = {}) {
    let modal = document.getElementById('oauthModal');

    // Criar estrutura se não existir
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'oauthModal';
        modal.className = 'oauth-modal';
        document.body.appendChild(modal);
    }

    // Conteúdo HTML dinâmico
    let contentHTML = '';

    // Background SVG (Veias Eletrônicas Assimétricas)
    // Coordenadas baseadas em 100x100
    const backgroundSVG = `
        <div class="circuit-bg-container">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <!-- Caminhos complexos e assimétricos "Veias" -->
                
                <!-- Ramo Esquerdo Superior - Longo e Tortuoso -->
                <path class="circuit-path" d="M50 50 L20 50 L20 10 L5 10" style="animation-delay: 0s" />
                
                <!-- Ramo Direito Inferior - Ziguezague -->
                <path class="circuit-path" d="M50 50 L80 50 L80 90 L60 90 L60 95" style="animation-delay: 0.5s" />
                
                <!-- Ramo Direito Superior - Curto -->
                <path class="circuit-path" d="M50 50 L50 30 L90 30 L90 10" style="animation-delay: 1.2s" />
                
                <!-- Ramo Esquerdo Inferior - Extenso -->
                <path class="circuit-path" d="M50 50 L40 50 L40 80 L10 80 L10 60" style="animation-delay: 2s" />
                
                <!-- Ramo Central Vertical -->
                <path class="circuit-path" d="M50 50 L50 90" style="animation-delay: 3s" />
                
                <!-- Ramo Superior Cruzado -->
                <path class="circuit-path" d="M50 50 L50 40 L70 40 L70 60 L95 60" style="animation-delay: 1.8s" />
                
                <!-- Ramo Solto Aleatório 1 -->
                <path class="circuit-path" d="M10 20 L30 20 L30 40" style="animation-delay: 4s; opacity: 0.3" />
                
                <!-- Ramo Solto Aleatório 2 -->
                <path class="circuit-path" d="M90 80 L70 80 L70 60" style="animation-delay: 5s; opacity: 0.3" />
            </svg>
        </div>
    `;

    if (loading) {
        contentHTML = `
            ${backgroundSVG}
            <div style="z-index: 2; margin-bottom: 30px;"></div>
            <div class="oauth-modal-content">
                <div class="oauth-body" style="padding-top: 20px;">
                    <div class="loading-spinner" style="
                        width: 48px; height: 48px; 
                        border: 4px solid #f1f3f4; 
                        border-top: 4px solid #1a73e8; 
                        border-radius: 50%; 
                        animation: spin 1s linear infinite;
                        margin: 0 auto 24px auto;"></div>
                    <h2 style="font-size: 1.1rem; color: #5f6368; font-weight: 400; font-family: 'Google Sans', Roboto, sans-serif;">Verificando Acesso...</h2>
                </div>
            </div>
        `;
    } else {
        // Ícone Google SVG
        const googleIcon = `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" style="margin-right: 12px;">
                <g>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </g>
            </svg>
        `;

        contentHTML = `
            ${backgroundSVG}
            <!-- Logo Fora da Caixa e Maior (140px) -->
            <img src="/static/logo-emidias-v2.png" alt="E-MIDIAS" style="height: 140px; margin-bottom: 40px; position: relative; z-index: 3;">
            
            <div class="oauth-modal-content">
                <div class="oauth-body">
                    <h2 style="font-family: 'Google Sans', Roboto, sans-serif; font-size: 1.5rem; margin-bottom: 10px;">${titulo}</h2>
                    <p style="font-family: Roboto, sans-serif; margin-bottom: 40px;">${descricao}</p>
                    
                    <div class="google-btn-container">
                        <button class="oauth-btn" id="oauthActionBtn" style="
                            background: white; 
                            color: #3c4043; 
                            border: 1px solid #dadce0; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            padding: 10px 24px; 
                            font-family: 'Google Sans', Roboto, arial, sans-serif;
                            font-weight: 500;
                            border-radius: 4px;
                            transition: background-color .3s, box-shadow .3s, border-color .3s;
                        " onmouseover="this.style.backgroundColor='#f7f8f8'; this.style.borderColor='#d2e3fc'" onmouseout="this.style.backgroundColor='white'; this.style.borderColor='#dadce0'">
                            ${googleIcon}
                            <span style="font-size: 14px; letter-spacing: 0.2px;">${btnTexto}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    modal.innerHTML = contentHTML;

    // Adicionar listener ao botão após renderizar
    if (!loading) {
        const btn = document.getElementById('oauthActionBtn');
        if (btn && btnAcao) {
            btn.onclick = btnAcao;
        }
    }

    modal.style.display = 'flex';
}

function fecharModalOAuth() {
    const modal = document.getElementById('oauthModal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }
}

function atualizarStatusAuthUI(isAuth) {
    const statusDot = document.querySelector('.status-dot');
    const authText = document.getElementById('authText');

    if (statusDot && authText) {
        statusDot.className = isAuth ? 'status-dot authenticated' : 'status-dot loading';
        authText.textContent = isAuth ? 'Conectado' : 'Desconectado';
    }
}



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

    eventSource.onmessage = function (event) {
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

    eventSource.onerror = function (error) {
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
