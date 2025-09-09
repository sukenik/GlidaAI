import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { iChat } from '../../../entities'
import { updateChat, type iUpdateChatVars } from '../API/chats'
import { CACHE_CHAT_QUERY_KEY } from '../consts'

export const useUpdateChat = () => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (vars: iUpdateChatVars) => updateChat(vars.chatId, vars.message),
		onSuccess: (data: iChat) => {
			queryClient.setQueryData([`${CACHE_CHAT_QUERY_KEY}${data.id}`], data)
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				const data = error.response?.data as { detail: string }

				console.error(data.detail)
			} else {
				console.error('Failed to create chat:', error)
			}
		}
	})

	return { updateChat: mutate}
}