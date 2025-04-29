import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [time, setTime] = useState(0);
	const [personalBest, setPersonalBest] = useState(0);

	const stopTimer = useCallback(() => {
		setIsTimerRunning(false);
		setPersonalBest(Math.max(personalBest, time));
	}, [time, personalBest]);

	const startTimer = useCallback(() => {
		setIsTimerRunning(true);
	}, []);

	useEffect(
		() => {
			const interval = setInterval(() => {
				if (isTimerRunning)
					setTime((time) => time + 1);
			}, 1000);

			return () => clearInterval(interval);
		},
		[isTimerRunning]
	)

	const getTimeString = function (time: number) {
		const hours = Math.floor(time / 3600);
		const minutes = Math.floor((time % 3600) / 60);
		const seconds = time % 60;

		let hourString = "";
		if (hours > 0) {
			hourString = hours.toString() + ":";
		}

		let minuteString = "";
		if (minutes > 0 || hours > 0) {
			minuteString = minutes.toString()

			if (hours > 0)
				minuteString = minuteString.padStart(2, "0");

			minuteString += ":";
		}

		let secondString = seconds.toString()
		if (minutes > 0 || hours > 0)
			secondString = secondString.padStart(2, "0");

		return `${hourString}${minuteString}${secondString}`;
	}

  return (
    <>
			<h1 className="timer">{getTimeString(time)}</h1>
			<button
				className="start-stop-button"
				onClick={() => {
					if (isTimerRunning)
						stopTimer();
					else
						startTimer();
				}}
			>
				{isTimerRunning ? "Stop" : "Start"}
			</button>
			<button
				className="reset-button"
				onClick={() => {
					setTime(0);
					stopTimer();
				}}
			>
				Reset
			</button>
			<p className="personal-best">
				<strong>Personal Best</strong>: {getTimeString(personalBest)}
			</p>
    </>
  )
}

export default App
