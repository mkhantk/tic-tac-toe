import "./App.css";
import usePlayground from "./components/playground";
import { Button } from "./components/ui/button";
function App() {
	const {
		board,
		turn,
		status,
		handleTic,
		handleNext,
		handleReset,
		score,
		winningLine,
	} = usePlayground();
	return (
		<main className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
			<div className="grid grid-cols-3 p-10  text-white mb-5">
				{/* first row */}
				<button
					type="button"
					id="1"
					className={`w-20 h-20 md:w-28 md:h-28 flex justify-center items-center text-4xl border-r border-b  hover:bg-gray-100/20 `}
					onClick={() => handleTic(0)}
				>
					<div className={`  ${winningLine.includes(0) && "text-green-500"}`}>
						{board?.[0]}
					</div>
				</button>
				<button
					type="button"
					id="2"
					className={`flex justify-center items-center text-4xl border-r border-b hover:bg-gray-100/20 `}
					onClick={() => handleTic(1)}
				>
					<div className={`  ${winningLine.includes(1) && "text-green-500"}`}>
						{board?.[1]}
					</div>
				</button>
				<button
					type="button"
					id="3"
					className={`flex justify-center items-center text-4xl border-b  hover:bg-gray-100/20 `}
					onClick={() => handleTic(2)}
				>
					<div className={`  ${winningLine.includes(2) && "text-green-500"}`}>
						{board?.[2]}
					</div>
				</button>

				{/* second row */}
				<button
					type="button"
					id="4"
					className={` w-20 h-20 md:w-28 md:h-28 flex justify-center items-center text-4xl border-r border-b hover:bg-gray-100/20 `}
					onClick={() => handleTic(3)}
				>
					<div className={`  ${winningLine.includes(3) && "text-green-500"}`}>
						{board?.[3]}
					</div>
				</button>
				<button
					type="button"
					id="5"
					className={`flex justify-center items-center text-4xl border-r border-b hover:bg-gray-100/20 `}
					onClick={() => handleTic(4)}
				>
					<div className={`  ${winningLine.includes(4) && "text-green-500"}`}>
						{board?.[4]}
					</div>
				</button>
				<button
					type="button"
					id="6"
					className={`flex justify-center items-center text-4xl border-b  hover:bg-gray-100/20 `}
					onClick={() => handleTic(5)}
				>
					<div className={`  ${winningLine.includes(5) && "text-green-500"}`}>
						{board?.[5]}
					</div>
				</button>

				{/* third row */}
				<button
					type="button"
					id="7"
					className={`w-20 h-20 md:w-28 md:h-28 flex justify-center items-center text-4xl border-r  hover:bg-gray-100/20 `}
					onClick={() => handleTic(6)}
				>
					<div className={` ${winningLine.includes(6) && "text-green-500"} `}>
						{board?.[6]}
					</div>
				</button>
				<button
					type="button"
					id="8"
					className={`flex justify-center items-center text-4xl border-r  hover:bg-gray-100/20 `}
					onClick={() => handleTic(7)}
				>
					<div className={` ${winningLine.includes(7) && "text-green-500"}`}>
						{board?.[7]}
					</div>
				</button>
				<button
					type="button"
					id="9"
					className={`flex justify-center items-center text-4xl hover:bg-gray-100/20 `}
					onClick={() => handleTic(8)}
				>
					<div className={`  ${winningLine.includes(8) && "text-green-500"}`}>
						{board?.[8]}
					</div>
				</button>
			</div>
			<section className="flex justify-between items-center w-5/6 md:w-1/2 lg:w-1/3 text-xl">
				<div>
					<div className={`${turn ? "text-white" : "text-gray-400"}`}>
						Player 1 (X)
					</div>
					<div className="text-gray-400 text-center my-2">
						{score.player1Score}
					</div>
				</div>
				<p className="text-white">VS</p>
				<div>
					<div className={`${!turn ? "text-white" : "text-gray-400"}`}>
						Player 2 (O)
					</div>
					<div className="text-gray-400 text-center my-2">
						{score.Player2Score}
					</div>
				</div>
			</section>
			<div className="text-white text-xl my-5">{status && status}</div>
			{status && (
				<div className="flex justify-center items-center gap-5">
					<Button
						variant="outline"
						className="text-white"
						onClick={handleReset}
					>
						Reset
					</Button>
					<Button variant="outline" className="text-white" onClick={handleNext}>
						Next Round
					</Button>
				</div>
			)}
		</main>
	);
}

export default App;
