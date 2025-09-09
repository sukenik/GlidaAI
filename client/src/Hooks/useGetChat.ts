import { useQuery } from '@tanstack/react-query'
import { type iChat } from '../../../entities'
import { getChat } from '../API/chats'

export const useGetChat = (chatId: string): iChat | undefined => {

	const { data } = useQuery({
		queryKey: ['chat', chatId],
		queryFn: () => getChat(chatId),
		enabled: !!chatId
	})

	return data
}