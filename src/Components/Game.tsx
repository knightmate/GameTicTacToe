import React, { useEffect, useState } from 'react';
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

 

// Game component
const GameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  max-width: 300px;
  margin: auto;
`;
export interface GameStart {
    start: boolean;
    symbol: "x" | "o";
  } 
const Game: React.FC = () => {

  const [matrix, setMatrix] = useState<any>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
   
   const [gameStatus,setGameStatus]=useState<GameStart>({start:true,symbol:"x"});
 

  function onClick(rowIndex: number, colIndex: number){

     //get the row 
     matrix[rowIndex][colIndex]=gameStatus.symbol;
    
     setMatrix([...matrix])
    
     setGameStatus({start:true,symbol:gameStatus.symbol=="o"?"x":"o"})

  }
    
  const renderCell = (rowIndex: number, colIndex: number) => (
    <CellContainer onClick={()=>onClick(rowIndex,colIndex)}>
      {matrix[rowIndex][colIndex]}
    </CellContainer>
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
