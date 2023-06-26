import React from "react";

type HexColor = string & { _isHexColor: true };

function isHexColor(value: string): value is HexColor {
	const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
	return hexColorRegex.test(value);
}

function formatNumber(number: number) {
	if (number < 1000) return number;

	const suffixes = ["", " k", "mi", "bi", "tri", "quadri", "quinti"]; // Adicione mais sufixos se necessário

	// Encontra o índice da grandeza do número
	const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);

	// Divide o número pelo valor da grandeza para obter a parte inteira
	const formattedNumber = (number / Math.pow(10, magnitude * 3)).toFixed(1);

	// Concatena o número formatado com o sufixo da grandeza correspondente
	return formattedNumber + suffixes[magnitude];
}

interface GaugeMeterProps {
	value: number;
	minValue?: number;
	maxValue: number;
	className?: string;
	suffix?: string;
	subtitle?: string;
	pointColor?:
		| HexColor
		| "orange"
		| "green"
		| "yellow"
		| "purple"
		| "blue"
		| "red";
}

const GaugeMeter: React.FC<GaugeMeterProps> = ({
	value,
	minValue = 0,
	maxValue,
	suffix,
	subtitle,
	className,
	pointColor,
}) => {
	const data =
		+(value <= +minValue ? +minValue : value >= +maxValue ? +maxValue : value);
	const percentage = ((data - +minValue) / (+maxValue - +minValue)) * 180;
	const rotation = percentage - 180;

	const markerAngles = [-180, -135, -90, -45, 0]; // Adjust the marker angles as per your requirement
	const semiMarkerAngles = [
		-168.75, -157.5, -146.25, -135, -123.75, -112.5, -101.25, -78.75, -67.5,
		-56.25, -33.75, -22.5, -11.25,
	]; // Adjust the marker angles as per your requirement

	const getPointer = (value: GaugeMeterProps["pointColor"]) => {
		switch (value) {
			case "green":
				return "#10b981";
			case "yellow":
				return "#eab308";
			case "purple":
				return "#a855f7";
			case "blue":
				return "#0ea5e9";
			case "red":
				return "#ef4444";
			case undefined:
				return "#f97316";
			default:
				return value;
		}
	};

	const showMarkValues = (index: number): number =>
		+(+minValue + ((+maxValue - +minValue) / 4) * index);

	return (
		<svg
			width='200'
			height='200'
			viewBox='0 0 200 200'
			className={className}
		>
			<defs>
				<linearGradient id='gradient' gradientTransform='rotate(90)'>
					<stop offset='0%' stopColor='#ffffff20' />
					<stop offset='100%' stopColor='#ffffff00' />
				</linearGradient>
			</defs>

			<g>
				{/* Meter */}
				<g>
					<path
						d='M20,100 A80,80 0 0,1 180,100'
						fill='url(#gradient)'
						strokeWidth='4'
						stroke='none'
						strokeLinecap='round'
					/>

					{/* Markers */}
					<g>
						{markerAngles.map((angle) => (
							<line
								key={angle}
								x1={
									100 + Math.cos((angle * Math.PI) / 180) * 80
								}
								y1={
									100 + Math.sin((angle * Math.PI) / 180) * 80
								}
								x2={
									100 + Math.cos((angle * Math.PI) / 180) * 70
								}
								y2={
									100 + Math.sin((angle * Math.PI) / 180) * 70
								}
								strokeWidth='2'
								strokeLinecap='round'
								className='stroke-black dark:stroke-white'
							/>
						))}
						{semiMarkerAngles.map((angle) => (
							<line
								key={angle}
								x1={
									100 + Math.cos((angle * Math.PI) / 180) * 80
								}
								y1={
									100 + Math.sin((angle * Math.PI) / 180) * 80
								}
								x2={
									100 + Math.cos((angle * Math.PI) / 180) * 75
								}
								y2={
									100 + Math.sin((angle * Math.PI) / 180) * 75
								}
								strokeWidth='1'
								strokeLinecap='round'
								className='stroke-black/40 dark:stroke-white/40'
							/>
						))}
					</g>

					<path
						d='M20,100 A80,80 0 0,1 180,100'
						fill='none'
						strokeWidth='4'
						className='stroke-gray-600'
						strokeLinecap='round'
					/>
				</g>

				{/* Text Meter */}
				<g className='select-none fill-gray-500 text-xs font-thin'>
					<text x='35' y='104' textAnchor='start'>
						{formatNumber(showMarkValues(0))}
					</text>

					<text x='53' y='65' textAnchor='start'>
						{formatNumber(showMarkValues(1))}
					</text>

					<text x='100' y='45' textAnchor='middle'>
						{formatNumber(showMarkValues(2))}
					</text>

					<text x='148' y='65' textAnchor='end'>
						{formatNumber(showMarkValues(3))}
					</text>

					<text x='165' y='104' textAnchor='end'>
						{formatNumber(showMarkValues(4))}
					</text>
				</g>
			</g>

			<g>
				<line
					x1='100'
					y1='100'
					x2={100 + Math.cos((rotation * Math.PI) / 180) * 75}
					y2={100 + Math.sin((rotation * Math.PI) / 180) * 75}
					stroke={getPointer(pointColor)}
					strokeWidth='4'
					strokeLinecap='round'
				/>
				<circle cx='100' cy='100' r='6' fill={getPointer(pointColor)} />
			</g>

			<text
				x='100'
				y='150'
				textAnchor='middle'
				className='select-none fill-gray-600 text-lg font-bold dark:fill-gray-200'
			>
				{data} {suffix}
			</text>

			<text
				x='100'
				y='170'
				textAnchor='middle'
				className='select-none fill-gray-400 text-base font-medium dark:fill-gray-600'
			>
				{subtitle}
			</text>
		</svg>
	);
};

export default GaugeMeter;
