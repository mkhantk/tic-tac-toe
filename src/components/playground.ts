import { useState } from "react";

const gameboard = (() => {
	const board: string[] = [];

	function placeMark(coordinate: number, player: string) {
		// check if the coordinate is occupied by another player
		if (board[coordinate] === undefined) {
			board[coordinate] = player;
		} else {
			throw new Error("unvalid mode");
		}
	}
	function logBoard() {
		return board;
	}
	function resetBoard() {
		board.length = 0;
	}

	return { placeMark, logBoard, resetBoard };
})();

const player = (() => {
	const player1 = {
		name: "player 1",
		mark: "x",
		score: 0,
	};
	const player2 = {
		name: "player 2",
		mark: "o",
		score: 0,
	};

	return { player1, player2 };
})();

const gameControl = (() => {
	let turn = true;
	let currentPlayer = turn ? player.player1 : player.player2;
	let turnCount = 1;
	let endGame = false;
	let winningLine: number[] = [];
	function checkWin(mark: string) {
		// chec.zsk win condition
		const winCondition = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		const board = gameboard.logBoard();
		for (const array of winCondition) {
			if (array.every((item) => board[item] === mark)) {
				winningLine = array;
				return true;
			}
		}
		return false;
	}

	function checkDraw() {
		// check draw function
		if (turnCount === 9) {
			return true;
		}
		return false;
	}

	function resetGame() {
		turnCount = 1;
		endGame = false;
		turn = true;
		winningLine = [];
		gameboard.resetBoard();
		player.player1.score = 0;
		player.player2.score = 0;
	}
	function startNextRound() {
		gameboard.resetBoard();
		winningLine = [];
		turnCount = 1;
		winningLine = [];
		endGame = false;
		turn = !turn;
		currentPlayer = turn ? player.player1 : player.player2;
	}

	function getBoard() {
		return gameboard.logBoard();
	}
	function getWinningLine() {
		return winningLine;
	}
	function getScore() {
		const player1Score = player.player1.score;
		const Player2Score = player.player2.score;
		return { player1Score, Player2Score };
	}

	function getTurn() {
		return turn;
	}

	function playATurn() {
		turn = !turn;
		turnCount++;
		if (turn) {
			currentPlayer = player.player1;
		} else {
			currentPlayer = player.player2;
		}
	}
	function tic(input: number) {
		if (endGame) return null;
		try {
			gameboard.placeMark(input, currentPlayer.mark);

			if (checkWin(currentPlayer.mark)) {
				currentPlayer.score++;
				endGame = true;
				return `${currentPlayer.name} wins`;
			}
			if (checkDraw()) {
				endGame = true;

				return `It is a draw`;
			}

			playATurn();
			return null;
		} catch {
			return null;
		}
	}

	return {
		tic,
		getBoard,
		getWinningLine,
		getTurn,
		resetGame,
		getScore,
		startNextRound,
	};
})();

export default function usePlayground() {
	const [board, setBoard] = useState<string[]>(gameControl.getBoard());
	const [turn, setTurn] = useState(gameControl.getTurn());
	const [status, setStatus] = useState<string | null>(null);
	const [score, setScore] = useState(gameControl.getScore());
	const [winningLine, setWinningLine] = useState(gameControl.getWinningLine());
	function handleTic(index: number) {
		const result = gameControl.tic(index);
		setBoard([...gameControl.getBoard()]);
		setTurn(gameControl.getTurn());
		setWinningLine(gameControl.getWinningLine());
		if (result) {
			setScore(gameControl.getScore());
			setStatus(result);
		}
	}
	function handleReset() {
		gameControl.resetGame();
		setBoard(gameControl.getBoard());
		setTurn(gameControl.getTurn());
		setStatus(null);
	}

	function handleNext() {
		gameControl.startNextRound();
		setBoard([]);
		setTurn(gameControl.getTurn());
		setStatus(null);
	}

	return {
		board,
		turn,
		handleTic,
		status,
		score,
		winningLine,
		handleReset,
		handleNext,
	};
}
