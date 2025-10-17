import { useQueryClient } from '@tanstack/react-query'
import { useFirstprojectAccountsQueryKey } from './use-firstproject-accounts-query-key'

export function useFirstprojectAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useFirstprojectAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
