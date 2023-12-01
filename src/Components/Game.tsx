import React, { useState } from 'react';
import styled from 'styled-components';

// Cell component
interface CellProps {
  value: string | null;
  onClick: () => void;
}

const CellContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
  return (
    <CellContainer onClick={onClick}>
      {value}
    </CellContainer>
  );
};

// Game component
const GameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  max-width: 300px;
  margin: auto;
`;

const Game: React.FC = () => {

  const [matrix, setMatrix] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const renderCell = (rowIndex: number, colIndex: number) => (
    <Cell key={`${rowIndex}-${colIndex}`} value={matrix[rowIndex][colIndex]} onClick={() => {}} />
  );

  return (
    <div>
      <GameContainer>
        {matrix.map((row, rowIndex) => row.map((_, colIndex) => renderCell(rowIndex, colIndex)))}
      </GameContainer>
    </div>
  );
};

export default Game;
