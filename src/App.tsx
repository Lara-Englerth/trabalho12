import { useState } from 'react';
import { filmes } from './data/filmes';
import Card from './components/Card';
import './App.css';

function App() {
  const [modo, setModo] = useState<'galeria' | 'duelo'>('galeria');
  const [cartasDuelo, setCartasDuelo] = useState(() => {
    const shuffled = [...filmes].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  });

  const [pontosJogador1, setPontosJogador1] = useState(0);
  const [pontosJogador2, setPontosJogador2] = useState(0);
  const [resultado, setResultado] = useState('');

  const compararCartas = (carta1: typeof filmes[0], carta2: typeof filmes[0]) => {
    if (!carta1 || !carta2) return 'empate';
    if (carta1.bilheteria > carta2.bilheteria) return 'jogador1';
    if (carta2.bilheteria > carta1.bilheteria) return 'jogador2';
    return 'empate';
  };

  const sortearCartas = () => {
    if (!filmes || filmes.length < 2) return;

    const shuffled = [...filmes].sort(() => Math.random() - 0.5);
    const carta1 = shuffled[0];
    let carta2 = shuffled[1];

    if (carta1.nome === carta2.nome) {
      const diferentes = shuffled.filter(c => c.nome !== carta1.nome);
      if (diferentes.length > 0) carta2 = diferentes[0];
    }

    setCartasDuelo([carta1, carta2]);

    const vencedor = compararCartas(carta1, carta2);
    if (vencedor === 'jogador1') {
      setPontosJogador1(prev => prev + 1);
      setResultado(` ${carta1.nome} vence! (${carta1.bilheteria} mi x ${carta2.bilheteria} mi)`);
    } else if (vencedor === 'jogador2') {
      setPontosJogador2(prev => prev + 1);
      setResultado(` ${carta2.nome} vence! (${carta2.bilheteria} mi x ${carta1.bilheteria} mi)`);
    } else {
      setResultado(` Empate! Ambas faturaram ${carta1.bilheteria} mi`);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Super Trunfo: Princesas Disney</h1>
        <div className="placar">
          <span>Jogador 1: {pontosJogador1}</span>
          <span>Jogador 2: {pontosJogador2}</span>
        </div>
      </header>

      <div className="controles">
        <button 
          onClick={() => setModo('galeria')}
          className={modo === 'galeria' ? 'ativo' : ''}
        >
           Modo Galeria
        </button>
        <button 
          onClick={() => setModo('duelo')}
          className={modo === 'duelo' ? 'ativo' : ''}
        >
           Modo Duelo
        </button>
      </div>

      <main className="arena">
        {modo === 'galeria' ? (
          <div className="galeria">
            {filmes.map((filme, index) => (
              <Card
                key={index}
                nome={filme.nome}
                imagem={filme.imagem}
                ano={filme.ano}
                indicacoes={filme.indicacoes}
                bilheteria={filme.bilheteria}
                duracao={filme.duracao}
              />
            ))}
          </div>
        ) : (
          <div className="duelo">
            {cartasDuelo.map((filme, index) => (
              <Card
                key={index}
                nome={filme.nome}
                imagem={filme.imagem}
                ano={filme.ano}
                indicacoes={filme.indicacoes}
                bilheteria={filme.bilheteria}
                duracao={filme.duracao}
              />
            ))}
          </div>
        )}
      </main>

      {modo === 'duelo' && (
        <div className="painel-acoes">
          <button onClick={sortearCartas} className="botao-sortear">
             Sortear Novas Cartas
          </button>
          {resultado && <div className="resultado-duelo">{resultado}</div>}
        </div>
      )}
    </div>
  );
}

export default App;