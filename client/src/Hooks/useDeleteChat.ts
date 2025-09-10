import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { iChat } from '../../../entities'
import { deleteChat, type iDeleteChatVars } from '../API/chats'
import { CACHE_CHAT_QUERY_KEY } from '../consts'

export const useDeleteChat = () => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (vars: iDeleteChatVars) => deleteChat(vars),
		onSuccess: () => {
			// queryClient.cancelQueries([`${CACHE_CHAT_QUERY_KEY}${data.id}`])
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

	return { deleteChat: mutate}
}