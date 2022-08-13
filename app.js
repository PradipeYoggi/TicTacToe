// Class that represents the game of Tic Tac Toe
// Contains code to initialize game and determine winner
class TicTacToe {
    constructor() {
        this.turns = [];
        this.turn = 0;
        this.gameOver = false;
        this.moves = []; // stores the moves
        this.moveCount = 0;

        for (let i=0;i<9;i++) {
            this.moves.push(`${i}`); //dummy values that are each different
        }

        this.turns.push('X');
        this.turns.push('O');
    }

    // determine winner by checking against possible move combinations that are a win
    // in tic tac toe
    hasWon() {
        let winner = '';
        if (this.moves[0] === this.moves[1] && this.moves[1] === this.moves[2]) {
            winner = this.moves[0];
        }
    
        if (this.moves[3] === this.moves[4] && this.moves[4] === this.moves[5]) {
            winner = this.moves[3];
        }
    
        if (this.moves[6] === this.moves[7] && this.moves[7] === this.moves[8]) {
            winner = this.moves[6];
        }
    
        if (this.moves[0] === this.moves[3] && this.moves[3] === this.moves[6]) {
            winner = this.moves[0];
        }
    
        if (this.moves[1] === this.moves[4] && this.moves[4] === this.moves[7]) {
            winner = this.moves[1];
        }
    
        if (this.moves[2] === this.moves[5] && this.moves[5] === this.moves[8]) {
            winner = this.moves[2];
        }
       
        if (this.moves[0] === this.moves[4] && this.moves[4] === this.moves[8]) {
            winner = this.moves[0];
        }
    
        if (this.moves[2] === this.moves[4] && this.moves[4] === this.moves[6]) {
            winner = this.moves[2];
        }
    
        // return object noting if game was won and who the winner was
        return {
            won: (winner === this.turns[0] || winner === this.turns[1]),
            whoWon: winner
        }
    }
};

// Handles the clicks from the tabel cells (tic tac toe cells)
function clickHandler(e) {
    let cell = $(e.target);
    let cellText = cell.text();

    if (game.gameOver) { //nothing to do
        return;
    }

    // if target cell is empty (hasn't been played)
    if (!(cellText === game.turns[0] || cellText === game.turns[1])) {
        // count this move and update the cell to reflect this play
        game.moveCount++;
        cell.text(game.turns[game.turn]);
        // keep track of moves
        game.moves[parseInt(cell.attr('id'))]=game.turns[game.turn];

        // determine if game has been won
        let winningMove = game.hasWon();

        if (!winningMove.won) { //more to play

            // change whose turn it is
            if (game.turn === 0) {
                game.turn = 1;
            }
            else {
                game.turn = 0;
            }

            if (game.moveCount < 9) { // moves left to play
                $('#turn').text(`${game.turns[game.turn]}'s turn`);
            }
            else { // no more moves left
                $('#turn').text('Game over!');
                $('#restart').show();
                game.gameOver = true;
            }
        }
        else { //publish winner
            let banner = $('#winner-banner span');
            banner.text(`${winningMove.whoWon} WON!!!`);
            banner.parent().show();
            $('#restart').show();
            $('#turn').hide();
            game.gameOver = true;
        }
    }
}

let game = null;

// set up things when document is loaded
$(document).ready(() =>{

    // start game and update page to reflect it
    game = new TicTacToe();
    $('#turn').text(`Start game! ${game.turns[game.turn]}'s turn`);    

    $('#winner-banner').hide();
    $('#restart').hide();

    // set up click handlers for the tabel cells
    $('td#0').click(clickHandler);
    $('td#1').click(clickHandler);
    $('td#2').click(clickHandler);
    $('td#3').click(clickHandler);
    $('td#4').click(clickHandler);
    $('td#5').click(clickHandler);
    $('td#6').click(clickHandler);
    $('td#7').click(clickHandler);
    $('td#8').click(clickHandler);

    // set up click handler for the restart button
    $('#restart').click(()=>{
        // restart game and clear page elements
        game = new TicTacToe();
        $('#winner-banner').hide();
        $('#restart').hide();
        $('#turn').text(`Start game! ${game.turns[game.turn]}'s turn`);
        $('#turn').show();
        for (let i=0; i < 9;i++) {
            $(`td#${i}`).text('');
        }    
    });    
});
