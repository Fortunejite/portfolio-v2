'use client'

import {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from "react";

type HasLoadedContextValue = {
	isLoaded: boolean;
	setIsLoaded: (value: boolean) => void;
};

const HasLoadedContext = createContext<HasLoadedContextValue | undefined>(
	undefined,
);

export function HasLoadedProvider({ children }: { children: ReactNode }) {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<HasLoadedContext.Provider value={{ isLoaded, setIsLoaded }}>
			{children}
		</HasLoadedContext.Provider>
	);
}

export function useHasLoaded() {
	const context = useContext(HasLoadedContext);

	if (!context) {
		throw new Error("useHasLoaded must be used within HasLoadedProvider");
	}

	return context;
}

