import { Inter } from "next/font/google";
import GaugeMeter from "@/components/GaugeMeter";
import ThemeButton from "@/components/ChangeTheme";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [value, setValue] = useState(0);
	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(8);

	const cardClass =
		"p-6 ring-1 shadow-lg rounded-lg dark:bg-gray-900 bg-gray-50 ring-gray-100 dark:ring-gray-700";

	return (
		<main className='min-h-screen bg-white dark:bg-gray-950 grid place-content-center'>
			<div className='fixed top-6 right-6'>
				<ThemeButton />
			</div>
			<div className='flex flex-col space-y-16 items-center'>
				<h1 className='text-4xl h-14 md:text-5xl md:leading-10 font-semibold dark:text-gray-50 text-transparent bg-clip-text bg-gradient-to-r w-fit from-sky-950 via-sky-800 to-sky-950'>
					Gauge Meter
				</h1>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div
						className={`flex flex-col gap-4 items-center ${cardClass}`}
					>
						<span>Valor mínimo</span>
						<div>
							<input
								type='text'
								id='min'
								value={minValue}
								onChange={(e: any) =>
									setMinValue(e.target.value)
								}
								className='w-fit appearance-none bg-transparent text-lg font-bold text-gray-800 dark:text-white outline-none'
							/>
						</div>
					</div>

					<div
						className={`flex flex-col gap-4 items-center ${cardClass}`}
					>
						<span>Valor máximo</span>
						<div>
							<input
								type='text'
								id='min'
								value={maxValue}
								onChange={(e: any) =>
									setMaxValue(e.target.value)
								}
								className='w-fit appearance-none bg-transparent text-lg font-bold text-gray-800 dark:text-white outline-none'
							/>
						</div>
					</div>

					<div
						className={`flex flex-col gap-4 items-center ${cardClass}`}
					>
						<span>Valor</span>
						<div>
							<input
								type='text'
								id='min'
								value={value}
								onChange={(e: any) => setValue(e.target.value)}
								className='w-fit appearance-none bg-transparent text-lg font-bold text-gray-800 dark:text-white outline-none'
							/>
						</div>
					</div>
				</div>

				<div className={`w-fit ${cardClass}`}>
					<GaugeMeter
						className='w-96 h-96'
						value={value}
						maxValue={maxValue}
						minValue={minValue}
						suffix='RPM'
						subtitle='x1000'
					/>
				</div>
			</div>
		</main>
	);
}
