import React, { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';

export const HomePage = () => {
	const [search, setSearch] = useState('');
	const [dropdown, setDropdown] = useState(false);
	
	const debounced = useDebounce(search);

	const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
		skip: debounced.length < 3,
		refetchOnFocus: true,
	});

	const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery();

	useEffect(() => {
		setDropdown(debounced?.length > 3 && data?.length! > 0);
	}, [debounced, data]);

	const clickHandler = (username: string) => {
		setDropdown(false);
		fetchRepos(username);
	}

	return (
		<div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
			<div className='relative w-[560px]'>
				<input
					className='border py-2 px-4 w-full h-[42px] mb-2'
					type='text'
					placeholder='Найти пользователя на GitHub...'
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				{isError && <p className='text-center text-red-600'>Ошибка. Данные не загружены...</p>}
				{dropdown && <ul
					className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'
				>
					{isLoading && <p className='text-center'>Данные загружаются...</p>}
					{data?.map(user => (
						<li
							key={user.id}
							className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
							onClick={() => clickHandler(user.login)}
						>
							{user.login}
						</li>
					))}
				</ul>}
				<div className='container'>
					{areReposLoading && <p className='center'>Репозиторий загружается...</p>}
					{repos?.map(repo => <RepoCard key={repo.id} repo={repo} />)}
				</div>
			</div>
		</div>
	)
}
