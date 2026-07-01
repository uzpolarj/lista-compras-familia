// ============================================
// SISTEMA DE COMPRAS DA FAMÍLIA
// ============================================

const MEMBROS = {
    'voce': { id: 'voce', nome: 'Você', cor: '#3b82f6' },
    'esposa': { id: 'esposa', nome: 'Esposa', cor: '#ec4899' },
    'irmao': { id: 'irmao', nome: 'Irmão', cor: '#8b5cf6' },
    'cunhada': { id: 'cunhada', nome: 'Cunhada', cor: '#f59e0b' }
};

let USUARIO_ATUAL = 'voce';

let dados = {
    itens: [],
    membros: [
        { id: 'voce', nome: 'Você', ativo: true },
        { id: 'esposa', nome: 'Esposa', ativo: true },
        { id: 'irmao', nome: 'Irmão', ativo: false },
        { id: 'cunhada', nome: 'Cunhada', ativo: false }
    ]
};

function carregarDados() {
    const salvos = localStorage.getItem('dadosFamilia');
    if (salvos) {
        try {
            dados = JSON.parse(salvos);
        } catch (e) {
            console.error('Erro ao carregar:', e);
        }
    }
    renderizarTudo();
}

function salvarDados() {
    try {
        localStorage.setItem('dadosFamilia', JSON.stringify(dados));
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

function abrirModal() {
    document.getElementById('modalAdicionar').classList.add('active');
    document.getElementById('modalNome').focus();
}

function fecharModal() {
    document.getElementById('modalAdicionar').classList.remove('active');
    document.getElementById('modalNome').value = '';
    document.getElementById('modalQtd').value = '1';
    document.getElementById('modalTamanho').value = '';
    document.getElementById('modalMarca').value = '';
    document.getElementById('modalPreco').value = '';
    document.getElementById('modalMercado').value = '';
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

    const item = {
        id: Date.now(),
        nome: nome,
        quantidade: qtd,
        tamanho: tamanho,
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

function buscar() {
    const termo = document.getElementById('pesquisaInput').value.trim().toLowerCase();
    const container = document.getElementById('resultadosPesquisa');
    const sugestoesContainer = document.getElementById('sugestoesPesquisa');

    if (!termo) {
        container.innerHTML = '<div class="vazio"><p>Digite algo para pesquisar</p></div>';
        sugestoesContainer.innerHTML = '';
        return;
    }

    const resultados = dados.itens.filter(item => 
        item.nome.toLowerCase().includes(termo) ||
        (item.marca && item.marca.toLowerCase().includes(termo))
    );

    if (resultados.length === 0) {
        container.innerHTML = `<div class="vazio"><p>Nenhum item encontrado para "${termo}"</p></div>`;
    } else {
        container.innerHTML = resultados.map(item => `
            <div class="item ${item.comprado ? 'completado' : ''}">
                <div class="info">
                    <div class="nome">${item.nome}</div>
                    <div class="detalhes">
                        ${item.quantidade}x ${item.tamanho || '--'}
                        ${item.marca ? `• ${item.marca}` : ''}
                        ${item.preco ? `• R$ ${item.preco.toFixed(2)}` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    const sugestoes = gerarSugestoes(termo);
    if (sugestoes.length > 0) {
        sugestoesContainer.innerHTML = `
            <h3 style="font-size:14px;color:#475569;margin:12px 0 8px;">💡 Sugestões</h3>
            ${sugestoes.map(s => `
                <div class="sugestao" onclick="adicionarSugestao('${s.nome}')">
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

    const comuns = ['Leite', 'Arroz', 'Feijão', 'Café', 'Açúcar', 'Óleo', 'Macarrão', 'Molho', 'Carne', 'Frango'];
    const encontrado = comuns.find(c => c.toLowerCase().includes(termoLower));
    
    if (encontrado) {
        sugestoes.push({
            icone: '🛒',
            nome: encontrado,
            titulo: `Adicionar "${encontrado}"`,
            descricao: 'Item comum em compras'
        });
    }

    return sugestoes;
}

function adicionarSugestao(nome) {
    document.getElementById('modalNome').value = nome;
    abrirModal();
    document.getElementById('pesquisaInput').value = '';
    document.getElementById('resultadosPesquisa').innerHTML = '';
    document.getElementById('sugestoesPesquisa').innerHTML = '';
}

document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        
        document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

function renderizarTudo() {
    renderizarMembros();
    renderizarLista();
    renderizarMembrosLista();
    renderizarAtividades();
}

function renderizarMembros() {
    const container = document.getElementById('membrosHeader');
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

    if (dados.itens.length === 0) {
        container.innerHTML = `
            <div class="vazio">
                <div class="icone">📋</div>
                <p>Nenhum item na lista</p>
                <p style="font-size:13px;color:#94a3b8;">Clique em "Adicionar Item" para começar</p>
            </div>
        `;
        resumo.innerHTML = `
            <span>0 itens (0 comprados)</span>
            <span class="total">R$ 0,00</span>
        `;
        return;
    }

    const ordenados = [...dados.itens].sort((a, b) => a.comprado - b.comprado);
    const total = dados.itens.reduce((s, i) => s + (i.preco || 0), 0);
    const comprados = dados.itens.filter(i => i.comprado).length;

    container.innerHTML = ordenados.map(item => {
        const usuario = MEMBROS[item.adicionado_por] || { nome: 'Desconhecido' };
        return `
            <div class="item ${item.comprado ? 'completado' : ''}">
                <div class="info">
                    <div class="nome">${item.nome}</div>
                    <div class="detalhes">
                        ${item.quantidade}x ${item.tamanho || '--'}
                        ${item.marca ? `• ${item.marca}` : ''}
                        ${item.preco ? `• R$ ${item.preco.toFixed(2)}` : ''}
                        ${item.supermercado ? `• ${item.supermercado}` : ''}
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

    resumo.innerHTML = `
        <span>${dados.itens.length} itens (${comprados} comprados)</span>
        <span class="total">R$ ${total.toFixed(2)}</span>
    `;
}

function renderizarMembrosLista() {
    const container = document.getElementById('listaMembros');
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
    if (dados.itens.length === 0) {
        container.innerHTML = '<div class="atividade">Nenhuma atividade recente</div>';
        return;
    }

    const ultimos = [...dados.itens].slice(-5).reverse();
    container.innerHTML = ultimos.map(item => {
        const usuario = MEMBROS[item.adicionado_por] || { nome: 'Desconhecido' };
        return `
            <div class="atividade">
                ${usuario.nome} adicionou "${item.nome}" (${item.quantidade}x)
            </div>
        `;
    }).join('');
}

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

carregarDados();

console.log('🛒 Sistema de Compras da Família carregado!');
console.log('👤 Usuário atual:', MEMBROS[USUARIO_ATUAL].nome);
console.log('📦 Itens na lista:', dados.itens.length);
