'use strict';

// Array para armazenar as tarefas
let banco = [];

// Função para obter o array de tarefas do localStorage
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) || [];

// Função para definir o array de tarefas no localStorage
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

// Função para criar um item da lista de tarefas
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>`;

    document.getElementById('todoList').appendChild(item);
};

// Função para limpar as tarefas da tela
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
};

// Função para atualizar a tela com as tarefas do banco
const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
};

// Função para inserir uma nova tarefa
const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter' && texto.trim() !== '') { // Verifica se o texto não está vazio ou contém apenas espaços em branco
        const banco = getBanco();
        banco.push({ 'tarefa': texto, 'status': '' });
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
};

// Função para remover uma tarefa
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
};

// Função para atualizar o status de uma tarefa (concluída ou não)
const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
};

// Função para tratar o clique em um item (botão ou checkbox)
const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
};

// Adicionando o evento de inserir uma nova tarefa ao pressionar Enter
document.getElementById('newItem').addEventListener('keypress', inserirItem);

// Adicionando o evento de clique em um item da lista
document.getElementById('todoList').addEventListener('click', clickItem);

// Atualizando a tela com as tarefas do banco
atualizarTela();
