function Cell() {

  let value = '-';

  const addToken = (playerToken) => {
    value = playerToken;
  }

  const getValue = () => value ;

  return {addToken,getValue}

}

const GameBoard =(() => {

  const rows = 3;
  const columns = 3;
  const board = [];

  const initBoard = () => {
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    for(let i = 0; i < rows; i++){
      board[i] = [] //A single row of the gameboard
      for(let j = 0; j < columns; j++){
        board[i].push(Cell())
      }
    }
  }

  initBoard();

  const getValues = () => board.map(row => row.map(cell => cell.getValue()));

  const getBoard = () => board;

  const dropToken = (playerT,row,column) => {

     // Check valid coordinates
    if (row < 0 || column < 0 || row >= board.length || column >= board[0].length) {
      console.log("Please choose valid coordinates")
      return true;
    }

    let cell = board[row][column];

    //Se la cella è già stata occupata, la mossa non è valida
    if(cell.getValue() !== '-') {
      console.log("This cell is already occupied, choose another");
      return true;
    }

    cell.addToken(playerT)

    return false;
  }

  const printBoard = () => {
    const values = getValues();
    values.forEach(row => console.log(row));
    console.log('\n');
  }

  return {getBoard,dropToken,printBoard,initBoard,getValues}

})()

const GameController = (() => {

  const players = [
    {
      name: 'PlayerOne',
      token: 'X'
    },
    {
      name: 'PlayerTwo',
      token: 'O'
    }
  ]

  let isDraw = false;

  let activePlayer = players[0];  //All'inizio parte player1

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () => {
    GameBoard.printBoard()
    console.log(`${activePlayer.name} turn`)
  }

  const checkRows = (values) => {
   for(let i = 0; i < 3; i++)
      if(values[i][0] !== '-' &&
        values[i][0] === values[i][1] 
        && values[i][1] === values[i][2])
        return true;
    
    return false;
   
  }

  const checkColumns = (values) => {
    for(let j = 0; j < 3; j++)
      if(values[0][j] !== '-' &&
        values[0][j] === values[1][j] 
        && values[1][j] === values[2][j])
        return true;

      return false;
    
  }

  const checkDiagonal1 = (values) => {
    if(values[0][0] !== '-' && values[0][0] === values[1][1] && values[1][1] === values[2][2])
      return true;

    return false;
  }

  const checkDiagonal2 = (values) => {
    if(values[2][0] !== '-' && values[2][0] === values[1][1] && values[1][1] === values[0][2])
      return true;

    return false;
  }

  const isBoardFull = (values) => {
    return values.every(row => row.every(cell => cell !== '-'));
  }

  const checkWinner = () => {

    const values = GameBoard.getValues();

    const checks = [
      checkRows,
      checkColumns,
      checkDiagonal1,
      checkDiagonal2
    ];

    for(const check of checks) {
      const isWinner = check(values);
      if(isWinner) 
        return activePlayer;
    }

    if(isBoardFull(values)){
      isDraw = true;
      return isDraw;
    }

    return null
 }

  const playRound = (row,column) => {

    console.log(`The ${activePlayer.name} choose row: ${row + 1} and column: ${column + 1}`);
    const error = GameBoard.dropToken(activePlayer.token,row,column);
    if (error) return ;

    let winner = checkWinner()
    if(winner != null){
      if(winner === activePlayer) {
        console.log(`The winner is ${activePlayer.name}\n`);
        } else if(isDraw) {
        console.log(`The Game is a draw`);
        isDraw = false;
        }
      GameBoard.printBoard();
      GameBoard.initBoard();
      activePlayer = players[0];
      return
    }


    switchPlayerTurn();
    printNewRound();

  }

  // Initial play game message
  console.log("Welcome! This is Tic Tac Toe game!")

  return {playRound}

})()

GameController.playRound(1,2);
GameController.playRound(1,1);
GameController.playRound(2,2);
GameController.playRound(0,0);
GameController.playRound(5,5);
GameController.playRound(2,1);
GameController.playRound(2,1);
GameController.playRound(2,0);
GameController.playRound(0,2);

//New Game
GameController.playRound(1,2);
GameController.playRound(0,2);
