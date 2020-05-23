import React, { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export function FavouritesProvider(props) {
	const [FavouritesItems, setFavouritesItems] = useState([]);

	return (
		<FavouritesContext.Provider value={[FavouritesItems, setFavouritesItems]}>
			{props.children}
		</FavouritesContext.Provider>
	);
}
