"use client";
import React, { useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { MoonStars, Sun } from "@phosphor-icons/react";

export default function ThemeButton() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark")
	};

	useEffect(
		() =>
			setTheme(
				theme === "dark" ||
					(!theme &&
						window.matchMedia("(prefers-color-scheme: dark)")
							.matches)
					? "dark"
					: "light"
			),
		[setTheme, theme]
	);

	const icon = useMemo(() => {
		if (theme === "dark")
			return <MoonStars size={24} weight='fill' color='current' />;
		return <Sun size={24} weight='fill' color='current' />;
	}, [theme]);

	return (
		<button
			onClick={() => toggleTheme()}
			className='group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full p-1.5 hover:bg-slate-100 dark:hover:bg-slate-900 fill-gray-950 hover:fill-sky-500 dark:hover:fill-sky-500 dark:fill-gray-50'
		>
			{icon}
		</button>
	);
}
