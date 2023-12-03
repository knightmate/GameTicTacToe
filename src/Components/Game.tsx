import React, { startTransition, useEffect, useState, useTransition } from 'react';
import styled from 'styled-components';
import Modal from './Modal.tsx';

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

  const defaultMatrix=[
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [matrix, setMatrix] = useState<any>(defaultMatrix);
   
  const defaultState:GameStart={start:false,symbol:"x"}
   const [gameStatus,setGameStatus]=useState<GameStart>(defaultState);
   const [winner,setWinner]=useState<string|null>(null);

   const [isPending,setTransition]=useTransition();

 

  function onClick(rowIndex: number, colIndex: number){

     //get the row 
     let target= matrix[rowIndex][colIndex]

     if(target!=null)return;

     matrix[rowIndex][colIndex] =gameStatus.symbol;
    
     setTimeout(()=>{

      if(checkHasWinnerFound(matrix)){
        setWinner(gameStatus.symbol+"Win's!")
      }
      console.log("checkIfDraw(matrix)",checkIfDraw(matrix),matrix);

      if(checkIfDraw(matrix)){
        setWinner("Game Draw")
      }

     },0)
     setMatrix([...matrix])
     setGameStatus({start:true,symbol:gameStatus.symbol=="o"?"x":"o"})


  }

   

  function doesArrayHasAllSameElement(arr:[]){
      
 
            
             for(let i=0;i<arr.length-1;i++){
                 
              if(arr[i]!=arr[i+1] || arr[i]==null) return false; 
             }

             return true;

  }

  function checkHasWinnerFound(matix:[]){

 
       for(let i=0;i<matrix.length;i++){

         const targetRow  =[matrix[i][0],matrix[i][1],matrix[i][2]];
          if(doesArrayHasAllSameElement(targetRow))return true;

          const tsrgetColumn  =[matrix[0][i],matrix[1][i],matrix[2][i]];
          if(doesArrayHasAllSameElement(tsrgetColumn))return true;

       }
        
        
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
  function checkIfDraw(matrix: (string | null)[][]): boolean {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === null) {
          return false; // If any element is null, it's not a draw
        }
      }
    }
    return true; // If no element is null, it's a draw
  }
  
  
    
  const renderCell = (rowIndex: number, colIndex: number) => (
    <CellContainer onClick={()=>onClick(rowIndex,colIndex)}>
      {matrix[rowIndex][colIndex]}
    </CellContainer>
  );

  const resetGame=()=>{

    setMatrix(defaultMatrix);
    setGameStatus(defaultState);
    setWinner(null);

  }
  

  return (
    <div>
      <Modal isOpen={winner?true:false} title='' buttonTwoTitle='Reset' onClose={function (): void {
      
      resetGame();

      } } buttononetitle={''}>
        <h1 style={{color:'green'}}>{winner}</h1>
        </Modal>
      <GameContainer>
        {matrix.map((row, rowIndex) => row.map((_, colIndex) => renderCell(rowIndex, colIndex)))}
      </GameContainer>
      <LargeWinningText winner={winner}>{winner ? `${winner} Wins!` : 'Playing..'}</LargeWinningText>;

    </div>
  );
};

export default Game;
