import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';

export const RepoCard = ({ repo } : { repo: IRepo }) => {
	const { addFavorite, removeFavorite } = useActions();
	const { favorites } = useAppSelector(state => state.github);
	const [isFavorite, setIsFavorite] = useState(favorites?.includes(repo.html_url));

	const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		addFavorite(repo.html_url);
		setIsFavorite(true);
	};

	const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		removeFavorite(repo.html_url)
		setIsFavorite(false);
	}

	return (
		<div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
			<a href={repo.html_url} target='_blank' rel="noreferrer">
				<h2 className='text-large font-bold'>{repo.full_name}</h2>
				<p className='text-sm'>
					Forks: <span className='text-bold mr-2'>{repo.forks}</span>
					Watchers: <span className='text-bold'>{repo.watchers}</span>
				</p>
				<p className='text-sm font-thin'>{repo?.description}</p>

				{!isFavorite && <button
					className='py-2 px-4 mr-2 bg-yellow-400 text-white rounded hover:shadow-md transition'
					onClick={addToFavorite}
				>
					Add
				</button>}
				{isFavorite && <button
					className='py-2 px-4 bg-red-400 text-white rounded hover:shadow-md transition'
					onClick={removeFromFavorite}
				>
					Remove
				</button>}
			</a>
		</div>
	)
}