import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { addUser } from '../API/users'

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (userId: string) => addUser(userId),
		onSuccess: () => {
			queryClient.clear()
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				const data = error.response?.data as { detail: string }

				console.error(data.detail)
			} else {
				console.error('Failed to create user:', error)
			}
		}
	})

	return { createUser: mutate }
}