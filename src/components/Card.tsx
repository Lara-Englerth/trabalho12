
import './Card.css';

interface CardProps {
  nome: string;
  imagem: string;
  ano: number;
  indicacoes: number;
  bilheteria: number;
  duracao: number;
}

function Card({ nome, imagem, ano, indicacoes, bilheteria, duracao }: CardProps) {
  return (
    <div className="card">
      <img src={imagem} alt={nome} className="card-imagem" />
      <h3 className="card-titulo">{nome}</h3>
      <ul className="card-atributos">
        <li><span>Ano:</span> {ano}</li>
        <li><span>Indicações:</span> {indicacoes}</li>
        <li><span>Bilheteria:</span> {bilheteria} mi</li>
        <li><span>Duração:</span> {duracao} min</li>
      </ul>
    </div>
  );
}

export default Card;