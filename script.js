function Cell() {

  let value = 0;

  const addToken = (playerToken) => {
    value = playerToken;
  }

  const getValue = () => value ;

  return {addToken,getValue}

}

function GameBoard() {

  const rows = 3;
  const columns = 3;
  const board = [];

  // Create a 2d array that will represent the state of the game board
  // For this 2d array, row 0 will represent the top row and
  // column 0 will represent the left-most column.
  for(let i = 0; i < rows; i++){
    board[i] = [] //A single row of the gameboard
    for(let j = 0; j < columns; j++){
      board[i].push(Cell())
    }
  }

  const getBoard = () => board;

  const dropToken = (playerT,row,column) => {

     // Check valid coordinates
    if (row < 0 || column < 0 || row > board.length || column > board[0].length) {
      console.log("Please choose valid coordinates")
      return 1;
    }

    let cell = board[row][column];

    //Se la cella è già stata occupata, la mossa non è valida
    if(cell.getValue()) {
      console.log("This cell is already occupied, choose another");
      return 1;
    }

    cell.addToken(playerT)

    return 0;
  }

  const printBoard = () => {
    const values = board.map(row => row.map(cell => cell.getValue()));
    values.forEach(row => console.log(row));
    console.log('\n');
  }

  return {getBoard,dropToken,printBoard}

}

function GameController() {

  const players = [
    {
      name: 'PlayerOne',
      token: 1
    },
    {
      name: 'PlayerTwo',
      token: 2
    }
  ]

  const board = GameBoard();

  let activePlayer = players[0];  //All'inizio parte player1
  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const printNewRound = () => {
    board.printBoard()
    console.log(`${activePlayer.name} turn`)
  }

  const playRound = (row,column) => {

    console.log(`The ${activePlayer.name} choose row: ${row} and column: ${column}`);
    const error = board.dropToken(activePlayer.token,row,column);
    if (error) return ;

    /*  This is where we would check for a winner and handle that logic,
        such as a win message. */

    switchPlayerTurn();
    printNewRound();

  }

  // Initial play game message
  console.log("Welcome! This is Tic Tac Toe game!")
  printNewRound();

  return {playRound,getActivePlayer}

}

const game = GameController();

game.playRound(1,2);
game.playRound(1,1);
game.playRound(2,2);
game.playRound(0,0);
game.playRound(5,5);
game.playRound(2,1);
game.playRound(2,1);
game.playRound(2,0);