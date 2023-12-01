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

 
interface WinningTextProps {
    winner: string | null;
  }
  
  const LargeWinningText = styled.h1<WinningTextProps>`
    font-size: 36px;
    text-align: center;
    color: ${({ winner }) => (winner === 'X' ? 'Green' : 'Green')}; // Customize colors as needed
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
   
   const [gameStatus,setGameStatus]=useState<GameStart>({start:false,symbol:"x"});
   const [winner,setWinner]=useState<string|null>(null);

   useEffect(()=>{

    if(!gameStatus.start)return;

    if(checkGameState()){
        
        setWinner(gameStatus.symbol)
    }

   },[matrix]);

  function onClick(rowIndex: number, colIndex: number){

     //get the row 
     matrix[rowIndex][colIndex]=gameStatus.symbol;
    
     setMatrix([...matrix])
    
     setGameStatus({start:true,symbol:gameStatus.symbol=="o"?"x":"o"})

  }

  function doesArrayHasAllSameElement(arr:[]){
      
 
            
             for(let i=0;i<arr.length-1;i++){
                 
              if(arr[i]!=arr[i+1] || arr[i]==null) return false; 
             }

             return true;

  }

  function checkGameState(){

       //Check in FirstLine

    
       const firstLine  =matrix[0];
       const secondLine =matrix[1];
       const thirdLine  =matrix[2];

        
       if(doesArrayHasAllSameElement(firstLine))return true;

       console.log("arr",firstLine,doesArrayHasAllSameElement(firstLine));

       if(doesArrayHasAllSameElement(secondLine))return true;

       if(doesArrayHasAllSameElement(thirdLine))return true;

       //check in RightLine
       const lastColumn  =[matrix[0][2],matrix[1][2],matrix[2][2]]

       if(doesArrayHasAllSameElement(lastColumn))return true;


       //Check Diagonally

       const diagonal  =[matrix[0][2],matrix[1][1],matrix[2][0]]

       if(doesArrayHasAllSameElement(diagonal))return true;

       const diagonal2  =[matrix[0][0],matrix[1][1],matrix[2][2]]
       
       if(doesArrayHasAllSameElement(diagonal2))return true;

       return false;

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
      <LargeWinningText winner={winner}>{winner ? `${winner} Wins!` : 'Playing..'}</LargeWinningText>;

    </div>
  );
};

export default Game;
