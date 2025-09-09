import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router'
import type { iChat } from '../../../entities'
import { addChat, type iAddChatVars } from '../API/chats'
import { CACHE_CHAT_QUERY_KEY } from '../consts'

export const useCreateChat = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate } = useMutation({
		mutationFn: (vars: iAddChatVars) => addChat(vars),
		onSuccess: (data: iChat) => {
			queryClient.setQueryData([`${CACHE_CHAT_QUERY_KEY}${data.id}`], data)
			navigate(`/chat/${data.id}`)
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

	return { createChat: mutate }
}