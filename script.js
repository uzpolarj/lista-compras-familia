// ============================================
// SISTEMA DE COMPRAS DA FAMÍLIA - VERSÃO COMPLETA
// ============================================

// ----- MEMBROS -----
const MEMBROS = {
    'voce': { id: 'voce', nome: 'Você', cor: '#3b82f6' },
    'esposa': { id: 'esposa', nome: 'Esposa', cor: '#ec4899' },
    'irmao': { id: 'irmao', nome: 'Irmão', cor: '#8b5cf6' },
    'cunhada': { id: 'cunhada', nome: 'Cunhada', cor: '#f59e0b' }
};

let USUARIO_ATUAL = 'voce';

// ============================================
// LISTA COMPLETA DE ITENS COM TAMANHOS
// ============================================
const ITENS_PADRAO = [
    // ===== GRÃOS E CEREAIS =====
    { id: 1001, nome: "Arroz", tamanhos: ["1kg", "2kg", "5kg", "10kg"], quantidade: 2, tamanhoPadrao: "5kg" },
    { id: 1002, nome: "Feijão", tamanhos: ["500g", "1kg"], quantidade: 2, tamanhoPadrao: "1kg" },
    { id: 1003, nome: "Açúcar", tamanhos: ["1kg", "2kg", "5kg"], quantidade: 2, tamanhoPadrao: "5kg" },
    { id: 1004, nome: "Sal", tamanhos: ["500g", "1kg"], quantidade: 1, tamanhoPadrao: "1kg" },
    { id: 1005, nome: "Café", tamanhos: ["250g", "500g", "1kg"], quantidade: 1, tamanhoPadrao: "500g" },
    
    // ===== LATICÍNIOS =====
    { id: 2001, nome: "Leite UHT", tamanhos: ["1L"], quantidade: 4, tamanhoPadrao: "1L" },
    { id: 2002, nome: "Leite em pó", tamanhos: ["200g", "380g", "400g", "750g", "800g"], quantidade: 1, tamanhoPadrao: "400g" },
    { id: 2003, nome: "Manteiga", tamanhos: ["200g", "500g"], quantidade: 2, tamanhoPadrao: "200g" },
    { id: 2004, nome: "Margarina", tamanhos: ["250g", "500g", "1kg"], quantidade: 1, tamanhoPadrao: "500g" },
    { id: 2005, nome: "Requeijão", tamanhos: ["180g", "200g", "400g"], quantidade: 1, tamanhoPadrao: "200g" },
    { id: 2006, nome: "Creme de leite", tamanhos: ["200g", "300g"], quantidade: 2, tamanhoPadrao: "200g" },
    { id: 2007, nome: "Leite condensado", tamanhos: ["395g"], quantidade: 1, tamanhoPadrao: "395g" },
    
    // ===== ÓLEOS E AZEITES =====
    { id: 3001, nome: "Óleo de soja", tamanhos: ["900ml"], quantidade: 1, tamanhoPadrao: "900ml" },
    { id: 3002, nome: "Azeite", tamanhos: ["250ml", "500ml", "750ml"], quantidade: 1, tamanhoPadrao: "500ml" },
    { id: 3003, nome: "Vinagre", tamanhos: ["500ml", "750ml"], quantidade: 1, tamanhoPadrao: "500ml" },
    
    // ===== FARINHAS E MASSAS =====
    { id: 4001, nome: "Farinha de trigo", tamanhos: ["1kg", "5kg"], quantidade: 1, tamanhoPadrao: "1kg" },
    { id: 4002, nome: "Farinha de mandioca", tamanhos: ["500g", "1kg"], quantidade: 1, tamanhoPadrao: "500g" },
    { id: 4003, nome: "Tapioca", tamanhos: ["500g", "1kg"], quantidade: 1, tamanhoPadrao: "500g" },
    { id: 4004, nome: "Flocão de milho", tamanhos: ["500g", "1kg"], quantidade: 1, tamanhoPadrao: "500g" },
    { id: 4005, nome: "Macarrão", tamanhos: ["400g", "500g", "1kg"], quantidade: 3, tamanhoPadrao: "500g" },
    { id: 4006, nome: "Achocolatado", tamanhos: ["370g", "400g", "750g", "1kg"], quantidade: 1, tamanhoPadrao: "400g" },
    
    // ===== MOLHOS E TEMPEROS =====
    { id: 5001, nome: "Molho de tomate", tamanhos: ["300g", "340g"], quantidade: 4, tamanhoPadrao: "340g" },
    { id: 5002, nome: "Extrato de tomate", tamanhos: ["130g", "300g", "340g"], quantidade: 2, tamanhoPadrao: "300g" },
    { id: 5003, nome: "Maionese", tamanhos: ["250g", "500g", "1kg"], quantidade: 1, tamanhoPadrao: "500g" },
    { id: 5004, nome: "Ketchup", tamanhos: ["200g", "397g", "1kg"], quantidade: 1, tamanhoPadrao: "397g" },
    { id: 5005, nome: "Mostarda", tamanhos: ["190g", "200g", "500g"], quantidade: 1, tamanhoPadrao: "200g" },
    
    // ===== LIMPEZA =====
    { id: 6001, nome: "Sabão em pó", tamanhos: ["800g", "1.6kg", "2.2kg", "4kg"], quantidade: 1, tamanhoPadrao: "1.6kg" },
    { id: 6002, nome: "Amaciante", tamanhos: ["500ml", "1L", "2L"], quantidade: 1, tamanhoPadrao: "1L" },
    { id: 6003, nome: "Desinfetante", tamanhos: ["500ml", "1L", "2L"], quantidade: 1, tamanhoPadrao: "1L" },
    { id: 6004, nome: "Água sanitária", tamanhos: ["1L", "2L", "5L"], quantidade: 1, tamanhoPadrao: "2L" },
    { id: 6005, nome: "Detergente", tamanhos: ["500ml"], quantidade: 2, tamanhoPadrao: "500ml" },
    { id: 6006, nome: "Álcool 70%", tamanhos: ["500ml", "1L"], quantidade: 1, tamanhoPadrao: "1L" },
    { id: 6007, nome: "Papel higiênico", tamanhos: ["4", "8", "12", "16", "24"], quantidade: 4, tamanhoPadrao: "12" }
];

// ============================================
// MERCADOS E MARCAS
// ============================================
const MERCADOS_PADRAO = [
    { id: 1, nome: "Elieu Martins", ativo: true },
    { id: 2, nome: "Acai", ativo: true },
    { id: 3, nome: "Mix Mateus", ativo: true },
    { id: 4, nome: "Toureiro", ativo: true },
    { id: 5, nome: "Carvalho Super", ativo: true },
    { id: 6, nome: "Vera", ativo: true },
    { id: 7, nome: "Mega", ativo: true }
];

const MARCAS_PADRAO = [
    // Marcas Gerais
    { id: 1, nome: "Italac", exclusiva: false, mercado: null },
    { id: 2, nome: "Piracanjuba", exclusiva: false, mercado: null },
    { id: 3, nome: "Tio João", exclusiva: false, mercado: null },
    { id: 4, nome: "Camil", exclusiva: false, mercado: null },
    { id: 5, nome: "Melitta", exclusiva: false, mercado: null },
    { id: 6, nome: "União", exclusiva: false, mercado: null },
    { id: 7, nome: "Liza", exclusiva: false, mercado: null },
    { id: 8, nome: "Adria", exclusiva: false, mercado: null },
    { id: 9, nome: "Pomarola", exclusiva: false, mercado: null },
    { id: 10, nome: "Fugini", exclusiva: false, mercado: null },
    { id: 11, nome: "Heinz", exclusiva: false, mercado: null },
    { id: 12, nome: "Hellmann's", exclusiva: false, mercado: null },
    { id: 13, nome: "Tirolez", exclusiva: false, mercado: null },
    { id: 14, nome: "Seara", exclusiva: false, mercado: null },
    { id: 15, nome: "Omo", exclusiva: false, mercado: null },
    { id: 16, nome: "Ype", exclusiva: false, mercado: null },
    { id: 17, nome: "Nestlé", exclusiva: false, mercado: null },
    { id: 18, nome: "Danone", exclusiva: false, mercado: null },
    { id: 19, nome: "Qualitá", exclusiva: false, mercado: null },
    { id: 20, nome: "Arisco", exclusiva: false, mercado: null },
    // Marcas Exclusivas
    { id: 21, nome: "Elieu", exclusiva: true, mercado: "Elieu Martins" },
    { id: 22, nome: "Mix", exclusiva: true, mercado: "Mix Mateus" },
    { id: 23, nome: "Mega", exclusiva: true, mercado: "Mega" },
    { id: 24, nome: "Toureiro", exclusiva: true, mercado: "Toureiro" },
    { id: 25, nome: "Carvalho", exclusiva: true, mercado: "Carvalho Super" },
    { id: 26, nome: "Vera", exclusiva: true, mercado: "Vera" },
    { id: 27, nome: "Acai", exclusiva: true, mercado: "Acai" }
];

// ============================================
// DADOS PRINCIPAIS
// ============================================
let dados = {
    itens: [],
    membros: [
        { id: 'voce', nome: 'Você', ativo: true },
        { id: 'esposa', nome: 'Esposa', ativo: true },
        { id: 'irmao', nome: 'Irmão', ativo: false },
        { id: 'cunhada', nome: 'Cunhada', ativo: false }
    ],
    mercados: MERCADOS_PADRAO,
    marcas: MARCAS_PADRAO
};

// ----- FUNÇÕES DE INICIALIZAÇÃO -----
function inicializarItens() {
    // Só adiciona se não houver itens salvos
    if (dados.itens.length === 0) {
        dados.itens = ITENS_PADRAO.map(item => ({
            ...item,
            marca: "",
            preco: 0,
            supermercado: "",
            comprado: false,
            adicionado_por: "sistema",
            adicionado_por_nome: "Sistema",
            data: new Date().toLocaleString(),
            tamanhoSelecionado: item.tamanhoPadrao || item.tamanhos[0]
        }));
    }
}

function carregarDados() {
    const salvos = localStorage.getItem('dadosFamilia');
    if (salvos) {
        try {
            const dadosSalvos = JSON.parse(salvos);
            dados.itens = dadosSalvos.itens || [];
            dados.membros = dadosSalvos.membros || dados.membros;
            dados.mercados = dadosSalvos.mercados || MERCADOS_PADRAO;
            dados.marcas = dadosSalvos.marcas || MARCAS_PADRAO;
        } catch (e) {
            console.error('Erro ao carregar:', e);
        }
    }
    inicializarItens();
    renderizarTudo();
}

function salvarDados() {
    try {
        localStorage.setItem('dadosFamilia', JSON.stringify(dados));
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

// ============================================
// FUNÇÕES DE MERCADOS E MARCAS
// ============================================
function getMercados() {
    return dados.mercados || [];
}

function getMarcas() {
    return dados.marcas || [];
}

function getMarcasExclusivas() {
    return dados.marcas.filter(m => m.exclusiva);
}

function getMarcasGerais() {
    return dados.marcas.filter(m => !m.exclusiva);
}

function getMarcasPorMercado(mercadoNome) {
    return dados.marcas.filter(m => m.exclusiva && m.mercado === mercadoNome);
}

function isMarcaExclusiva(marcaNome) {
    const marca = dados.marcas.find(m => m.nome === marcaNome);
    return marca ? marca.exclusiva : false;
}

function getMercadoDaMarca(marcaNome) {
    const marca = dados.marcas.find(m => m.nome === marcaNome);
    return marca && marca.exclusiva ? marca.mercado : null;
}

function getTamanhosDoItem(itemNome) {
    const item = ITENS_PADRAO.find(i => i.nome === itemNome);
    return item ? item.tamanhos : [];
}

// ============================================
// FUNÇÕES DE ITENS
// ============================================
function abrirModal() {
    const modal = document.getElementById('modalAdicionar');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('modalNome').focus();
        // Preencher tamanhos se disponíveis
        atualizarTamanhosDisponiveis();
    }
}

function fecharModal() {
    document.getElementById('modalAdicionar').classList.remove('active');
    document.getElementById('modalNome').value = '';
    document.getElementById('modalQtd').value = '1';
    document.getElementById('modalTamanho').value = '';
    document.getElementById('modalMarca').value = '';
    document.getElementById('modalPreco').value = '';
    document.getElementById('modalMercado').value = '';
    document.getElementById('sugestoesTamanhos').innerHTML = '';
}

function atualizarTamanhosDisponiveis() {
    const nome = document.getElementById('modalNome').value.trim();
    const container = document.getElementById('sugestoesTamanhos');
    if (!container) return;
    
    if (nome) {
        const item = ITENS_PADRAO.find(i => i.nome.toLowerCase() === nome.toLowerCase());
        if (item) {
            container.innerHTML = `
                <div style="font-size:12px;color:#64748b;margin:4px 0;">
                    📏 Tamanhos disponíveis: ${item.tamanhos.join(', ')}
                </div>
            `;
        } else {
            container.innerHTML = '';
        }
    } else {
        container.innerHTML = '';
    }
}

function adicionarItem() {
    const nome = document.getElementById('modalNome').value.trim();
    const qtd = parseInt(document.getElementById('modalQtd').value) || 1;
    const tamanho = document.getElementById('modalTamanho').value.trim();
    const marca = document.getElementById('modalMarca').value.trim();
    const preco = parseFloat(document.getElementById('modalPreco').value) || 0;
    const mercado = document.getElementById('modalMercado').value.trim();

    if (!nome) {
        alert('Digite o nome do item!');
        return;
    }

    // Verifica se já existe
    const existe = dados.itens.find(i => 
        i.nome === nome && 
        i.tamanhoSelecionado === tamanho && 
        i.marca === marca && 
        i.supermercado === mercado &&
        !i.comprado
    );

    if (existe) {
        alert('Este item já está na lista com as mesmas características!');
        return;
    }

    const item = {
        id: Date.now(),
        nome: nome,
        quantidade: qtd,
        tamanho: tamanho,
        tamanhoSelecionado: tamanho,
        marca: marca,
        preco: preco,
        supermercado: mercado,
        comprado: false,
        adicionado_por: USUARIO_ATUAL,
        adicionado_por_nome: MEMBROS[USUARIO_ATUAL].nome,
        data: new Date().toLocaleString()
    };

    dados.itens.push(item);
    salvarDados();
    renderizarTudo();
    fecharModal();
}

function marcarComprado(id) {
    const item = dados.itens.find(i => i.id === id);
    if (item) {
        item.comprado = !item.comprado;
        salvarDados();
        renderizarTudo();
    }
}

function removerItem(id) {
    const item = dados.itens.find(i => i.id === id);
    if (!item) return;

    if (USUARIO_ATUAL !== 'voce' && USUARIO_ATUAL !== 'esposa') {
        alert('Apenas você e sua esposa podem remover itens!');
        return;
    }

    if (confirm(`Remover "${item.nome}" da lista?`)) {
        dados.itens = dados.itens.filter(i => i.id !== id);
        salvarDados();
        renderizarTudo();
    }
}

function adicionarItemPadrao(nome) {
    const itemPadrao = ITENS_PADRAO.find(i => i.nome === nome);
    if (!itemPadrao) return;
    
    document.getElementById('modalNome').value = nome;
    document.getElementById('modalQtd').value = itemPadrao.quantidade || 1;
    document.getElementById('modalTamanho').value = itemPadrao.tamanhoPadrao || itemPadrao.tamanhos[0];
    atualizarTamanhosDisponiveis();
    abrirModal();
}

// ============================================
// PESQUISA E SUGESTÕES
// ============================================
function buscar() {
    const termo = document.getElementById('pesquisaInput').value.trim().toLowerCase();
    const container = document.getElementById('resultadosPesquisa');
    const sugestoesContainer = document.getElementById('sugestoesPesquisa');

    if (!termo) {
        container.innerHTML = '<div class="vazio"><p>Digite algo para pesquisar</p></div>';
        sugestoesContainer.innerHTML = '';
        return;
    }

    // Busca nos itens
    const resultados = dados.itens.filter(item => 
        item.nome.toLowerCase().includes(termo) ||
        (item.marca && item.marca.toLowerCase().includes(termo)) ||
        (item.supermercado && item.supermercado.toLowerCase().includes(termo)) ||
        (item.tamanho && item.tamanho.toLowerCase().includes(termo))
    );

    if (resultados.length === 0) {
        container.innerHTML = `<div class="vazio"><p>Nenhum item encontrado para "${termo}"</p></div>`;
    } else {
        container.innerHTML = resultados.map(item => {
            const isExclusiva = isMarcaExclusiva(item.marca);
            const mercadoExclusivo = getMercadoDaMarca(item.marca);
            return `
                <div class="item ${item.comprado ? 'completado' : ''}">
                    <div class="info">
                        <div class="nome">${item.nome}</div>
                        <div class="detalhes">
                            ${item.quantidade}x ${item.tamanho || '--'}
                            ${item.marca ? `• 🏷️ ${item.marca}` : ''}
                            ${isExclusiva ? ` ⚠️ Exclusiva do ${mercadoExclusivo}` : ''}
                            ${item.preco ? `• 💰 R$ ${item.preco.toFixed(2)}` : ''}
                            ${item.supermercado ? `• 🏪 ${item.supermercado}` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Sugestões baseadas na pesquisa
    const sugestoes = gerarSugestoes(termo);
    if (sugestoes.length > 0) {
        sugestoesContainer.innerHTML = `
            <h3 style="font-size:14px;color:#475569;margin:12px 0 8px;">💡 Sugestões</h3>
            ${sugestoes.map(s => `
                <div class="sugestao" onclick="adicionarItemPadrao('${s.nome}')">
                    <span class="icone">${s.icone}</span>
                    <div class="conteudo">
                        <div class="titulo">${s.titulo}</div>
                        <div class="desc">${s.descricao}</div>
                    </div>
                </div>
            `).join('')}
        `;
    } else {
        sugestoesContainer.innerHTML = '';
    }
}

function gerarSugestoes(termo) {
    const sugestoes = [];
    const termoLower = termo.toLowerCase();

    // Busca nos itens padrão
    const encontrados = ITENS_PADRAO.filter(item => 
        item.nome.toLowerCase().includes(termoLower)
    );

    encontrados.forEach(item => {
        sugestoes.push({
            icone: '🛒',
            nome: item.nome,
            titulo: `Adicionar "${item.nome}"`,
            descricao: `Tamanhos: ${item.tamanhos.join(', ')}`
        });
    });

    // Se não encontrou, busca por termo parcial
    if (sugestoes.length === 0) {
        const comuns = ['Leite', 'Arroz', 'Feijão', 'Café', 'Açúcar', 'Óleo', 'Macarrão', 'Molho', 'Carne', 'Frango', 'Ovos', 'Pão'];
        const encontrado = comuns.find(c => c.toLowerCase().includes(termoLower));
        if (encontrado) {
            sugestoes.push({
                icone: '🛒',
                nome: encontrado,
                titulo: `Adicionar "${encontrado}"`,
                descricao: 'Item comum em compras'
            });
        }
    }

    return sugestoes;
}

// ============================================
// TABS
// ============================================
document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        
        document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

// ============================================
// RENDERIZAÇÃO
// ============================================
function renderizarTudo() {
    renderizarMembros();
    renderizarLista();
    renderizarMembrosLista();
    renderizarAtividades();
    renderizarMercados();
    renderizarMarcas();
}

function renderizarMembros() {
    const container = document.getElementById('membrosHeader');
    if (!container) return;
    
    container.innerHTML = dados.membros.map(m => {
        const info = MEMBROS[m.id];
        const status = m.ativo ? 'online' : 'offline';
        return `
            <div class="membro">
                <span class="status ${status}"></span>
                ${info.nome}
            </div>
        `;
    }).join('');
}

function renderizarLista() {
    const container = document.getElementById('listaItens');
    const resumo = document.getElementById('resumo');

    if (!container) return;

    if (dados.itens.length === 0) {
        container.innerHTML = `
            <div class="vazio">
                <div class="icone">📋</div>
                <p>Nenhum item na lista</p>
                <p style="font-size:13px;color:#94a3b8;">Clique em "Adicionar Item" para começar</p>
                <p style="font-size:13px;color:#94a3b8;margin-top:4px;">ou use a pesquisa para adicionar itens rapidamente</p>
            </div>
        `;
        if (resumo) {
            resumo.innerHTML = `
                <span>0 itens (0 comprados)</span>
                <span class="total">R$ 0,00</span>
            `;
        }
        return;
    }

    const ordenados = [...dados.itens].sort((a, b) => a.comprado - b.comprado);
    const total = dados.itens.reduce((s, i) => s + (i.preco || 0), 0);
    const comprados = dados.itens.filter(i => i.comprado).length;

    container.innerHTML = ordenados.map(item => {
        const usuario = MEMBROS[item.adicionado_por] || { nome: 'Desconhecido' };
        const isExclusiva = isMarcaExclusiva(item.marca);
        const mercadoExclusivo = getMercadoDaMarca(item.marca);
        const exclusivaBadge = isExclusiva ? ` ⚠️ Exclusiva ${mercadoExclusivo}` : '';
        
        return `
            <div class="item ${item.comprado ? 'completado' : ''}">
                <div class="info">
                    <div class="nome">${item.nome}</div>
                    <div class="detalhes">
                        ${item.quantidade}x ${item.tamanho || '--'}
                        ${item.marca ? `• 🏷️ ${item.marca}${exclusivaBadge}` : ''}
                        ${item.preco ? `• 💰 R$ ${item.preco.toFixed(2)}` : ''}
                        ${item.supermercado ? `• 🏪 ${item.supermercado}` : ''}
                    </div>
                    <div class="quem">👤 ${usuario.nome} • ${item.data}</div>
                </div>
                <div class="acoes">
                    <button class="btn-comprar" onclick="marcarComprado(${item.id})">
                        ${item.comprado ? '⏪' : '✅'}
                    </button>
                    <button class="btn-remover" onclick="removerItem(${item.id})">✕</button>
                </div>
            </div>
        `;
    }).join('');

    if (resumo) {
        resumo.innerHTML = `
            <span>${dados.itens.length} itens (${comprados} comprados)</span>
            <span class="total">R$ ${total.toFixed(2)}</span>
        `;
    }
}

function renderizarMembrosLista() {
    const container = document.getElementById('listaMembros');
    if (!container) return;
    
    container.innerHTML = dados.membros.map(m => {
        const info = MEMBROS[m.id];
        return `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f1f5f9;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="color:${info.cor};font-size:18px;">●</span>
                    <span style="font-weight:600;">${info.nome}</span>
                    <span style="font-size:12px;background:#f1f5f9;padding:2px 10px;border-radius:12px;color:#64748b;">
                        ${m.ativo ? '🟢 Ativo' : '⚪ Inativo'}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function renderizarAtividades() {
    const container = document.getElementById('atividades');
    if (!container) return;
    
    if (dados.itens.length === 0) {
        container.innerHTML = '<div class="atividade">Nenhuma atividade recente</div>';
        return;
    }

    const ultimos = [...dados.itens].slice(-5).reverse();
    container.innerHTML = ultimos.map(item => {
        const usuario = MEMBROS[item.adicionado_por] || { nome: 'Desconhecido' };
        return `
            <div class="atividade">
                ${usuario.nome} adicionou "${item.nome}" (${item.quantidade}x ${item.tamanho || ''})
                ${item.marca ? ` - ${item.marca}` : ''}
            </div>
        `;
    }).join('');
}

function renderizarMercados() {
    const container = document.getElementById('listaMercados');
    if (!container) return;
    
    container.innerHTML = dados.mercados.map(m => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f1f5f9;">
            <span>🏪 ${m.nome}</span>
            <span style="font-size:12px;color:#22c55e;">✅ Ativo</span>
        </div>
    `).join('');
}

function renderizarMarcas() {
    const container = document.getElementById('listaMarcas');
    if (!container) return;
    
    const gerais = dados.marcas.filter(m => !m.exclusiva);
    const exclusivas = dados.marcas.filter(m => m.exclusiva);
    
    container.innerHTML = `
        <h4 style="margin:12px 0 8px;color:#475569;">📌 Marcas Gerais</h4>
        ${gerais.map(m => `
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:14px;">
                <span>${m.nome}</span>
                <span style="color:#94a3b8;font-size:12px;">Disponível em todos</span>
            </div>
        `).join('')}
        
        <h4 style="margin:16px 0 8px;color:#475569;">⭐ Marcas Exclusivas</h4>
        ${exclusivas.map(m => `
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #fef3c7;font-size:14px;background:#fffbeb;padding:6px 10px;border-radius:4px;margin-bottom:4px;">
                <span>${m.nome}</span>
                <span style="color:#92400e;font-size:12px;">⚠️ Exclusiva ${m.mercado}</span>
            </div>
        `).join('')}
    `;
}

// ============================================
// EVENTOS
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharModal();
    }
});

document.getElementById('modalAdicionar').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharModal();
    }
});

// Auto-complete no campo de nome
document.getElementById('modalNome').addEventListener('input', function() {
    const valor = this.value.trim();
    const sugestoes = document.getElementById('sugestoesNomes');
    if (!sugestoes) return;
    
    if (valor.length > 1) {
        const encontrados = ITENS_PADRAO.filter(item => 
            item.nome.toLowerCase().includes(valor.toLowerCase())
        );
        
        if (encontrados.length > 0) {
            sugestoes.innerHTML = encontrados.map(item => `
                <div style="padding:6px 10px;cursor:pointer;border-bottom:1px solid #f1f5f9;font-size:14px;"
                     onmouseover="this.style.background='#f1f5f9'"
                     onmouseout="this.style.background='white'"
                     onclick="document.getElementById('modalNome').value='${item.nome}';this.parentElement.innerHTML='';atualizarTamanhosDisponiveis();">
                    📦 ${item.nome} - ${item.tamanhos.join(', ')}
                </div>
            `).join('');
            sugestoes.style.display = 'block';
        } else {
            sugestoes.innerHTML = '';
            sugestoes.style.display = 'none';
        }
    } else {
        sugestoes.innerHTML = '';
        sugestoes.style.display = 'none';
    }
});

// ============================================
// INICIAR
// ============================================
carregarDados();

console.log('🛒 Sistema de Compras da Família - Versão Completa!');
console.log('📦 Itens disponíveis:', ITENS_PADRAO.length);
console.log('🏪 Mercados:', dados.mercados.length);
console.log('🏷️ Marcas:', dados.marcas.length);
console.log('📋 Itens na lista:', dados.itens.length);
