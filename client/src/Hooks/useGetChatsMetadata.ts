import { useQuery } from '@tanstack/react-query'
import { type iBaseChat } from '../../../entities'
import { getChatsMetadata } from '../API/chats'

export const useGetChatsMetadata = (userId: string): iBaseChat[] => {

	const { data } = useQuery({
		queryKey: ['chats'],
		queryFn: () => getChatsMetadata(userId),
	})

	return data ?? []
}