import React, { Component } from 'react';
import './TicTacToe.css'

class TicTacToe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: Array(9).fill(null), // Represents the 3x3 grid
			currentPlayer: 'X',
			winner: null,
		};
	}

	// Handle a click on a cell
	handleClick(index) {
		const { board, currentPlayer, winner } = this.state;

		if (winner || board[index]) return; // Ignore clicks if the game is over or the cell is already taken

		const newBoard = [...board];
		newBoard[index] = currentPlayer;

		this.setState({
			board: newBoard,
			currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
		});

		this.checkWinner(newBoard);
	}

	// Check for a winner
	checkWinner(board) {
		const winPatterns = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
			[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
			[0, 4, 8], [2, 4, 6], // Diagonals
		];

		for (const pattern of winPatterns) {
			const [a, b, c] = pattern;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				this.setState({ winner: board[a] });
				if (board[a] === "X"){
					alert('You won ^^!')
				}else{
					alert("You lose T_T");
				}
				return;
			}
		}
	}

	// Bot makes a random move
	makeRandomMove() {
		const { board, currentPlayer, winner } = this.state;

		if (winner || currentPlayer !== 'O') return; // Ignore if the game is over or it's not the bot's turn

		const availableCells = board
			.map((cell, index) => (cell === null ? index : null))
			.filter((index) => index !== null);

		if (availableCells.length === 0) {
			alert("Draw hehe");
			// No available moves
			return;
		}


		const randomIndex = Math.floor(Math.random() * availableCells.length);
		const selectedCell = availableCells[randomIndex];

		setTimeout(() => {
			this.handleClick(selectedCell); // Add a slight delay to the bot's move for a better user experience
		}, 500);
	}

	componentDidMount() {
		// Start the bot's turn when the component mounts
		this.makeRandomMove();
	}

	componentDidUpdate() {
		// After each player's move, let the bot make a move
		this.makeRandomMove();
	}

	renderCell(index) {
		const { board } = this.state;
		return (
			<div className="cell" onClick={() => this.handleClick(index)}>
				{board[index]}
			</div>
		);
	}

	resetGame = () => {
		this.setState({
			board: Array(9).fill(null),
			currentPlayer: 'X',
			winner: null,
		});

		// Start the game with the bot's turn
		this.makeRandomMove();
	};

	render() {
		const { currentPlayer, winner } = this.state;

		return (
			<div className="tic-tac-toe">
				<h1>Tic Tac Toe</h1>
				<div className="board">
					{this.state.board.map((value, index) => this.renderCell(index))}
				</div>
				<div className="status">
					{winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
				</div>
				<button className="reset-button btn-reset" onClick={this.resetGame}>Reset Game</button>
			</div>
		);
	}
}

export default TicTacToe;
