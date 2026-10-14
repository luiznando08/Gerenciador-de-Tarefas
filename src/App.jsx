
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  // Estados para gerenciar as tarefas e os campos do formulário
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const urlAPI = 'http://localhost:8080/api/tarefas';

  // 1. Função para carregar as tarefas da API (equivalente ao GET)
  const carregarTarefas = async () => {
    try {
      const resposta = await fetch(urlAPI);
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
    }
  };

  // useEffect executa assim que a tela abre
  useEffect(() => {
    carregarTarefas();
  }, []);

  // 2. Função para criar uma nova tarefa (equivalente ao POST)
  const adicionarTarefa = async (e) => {
    e.preventDefault(); // Evita recarregar a página

    const novaTarefa = { titulo, descricao, concluida: false };

    try {
      await fetch(urlAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaTarefa),
      });

      // Limpa os campos e recarrega a lista
      setTitulo('');
      setDescricao('');
      carregarTarefas();
    } catch (erro) {
      console.error('Erro ao salvar tarefa:', erro);
    }
  };

  // 3. Função para deletar uma tarefa (equivalente ao DELETE)
  const deletarTarefa = async (id) => {
    try {
      await fetch(`${urlAPI}/${id}`, {
        method: 'DELETE',
      });
      carregarTarefas();
    } catch (erro) {
      console.error('Erro ao deletar tarefa:', erro);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            
            {/* Título */}
            <h2 className="text-center mb-4">Gerenciador de Tarefas</h2>

            {/* Formulário */}
            <div className="card shadow p-4 mb-4 bg-white rounded">
              <h5 className="mb-3">Nova Tarefa</h5>
              <form onSubmit={adicionarTarefa}>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea 
                    className="form-control" 
                    rows="2" 
                    value={descricao} 
                    onChange={(e) => setDescricao(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Adicionar Tarefa</button>
              </form>
            </div>

            {/* Lista de Tarefas */}
            <div className="card shadow p-4 bg-white rounded">
              <h5 className="mb-3">Tarefas Cadastradas</h5>
              <ul className="list-group">
                {tarefas.length === 0 ? (
                  <li className="list-group-item text-muted text-center">Nenhuma tarefa cadastrada ainda.</li>
                ) : (
                  tarefas.map((tarefa) => (
                    <li key={tarefa.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{tarefa.titulo}</strong>
                        <p className="mb-0 text-muted small">{tarefa.descricao}</p>
                      </div>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => deletarTarefa(tarefa.id)}
                      >
                        Excluir
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

