import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { addChat, type iAddChatVars } from '../API/chats'

// TODO: test & add optimistic update

export const useCreateChat = () => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (vars: iAddChatVars) => addChat(vars),
		onSuccess: () => {
			queryClient.clear()
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