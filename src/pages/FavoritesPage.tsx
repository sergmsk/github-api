import React from 'react';
import { useAppSelector } from '../hooks/redux';

export const FavoritesPage = () => {
	const { favorites } = useAppSelector(state => state.github);

	if (favorites.length === 0) return <p className='text-center'>Ничего не добавленно...</p>

	return (
		<div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
			<ul className='list-none'> 
				{ favorites.map(favorite => (
					<li key={favorite}>
						<a href={favorite} target='_blank' rel="noreferrer">{favorite}</a>
					</li>
				))}
			</ul>
		</div>
	)
}
