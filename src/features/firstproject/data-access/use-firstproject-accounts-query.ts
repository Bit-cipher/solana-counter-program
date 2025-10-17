import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getFirstprojectProgramAccounts } from '@project/anchor'
import { useFirstprojectAccountsQueryKey } from './use-firstproject-accounts-query-key'

export function useFirstprojectAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useFirstprojectAccountsQueryKey(),
    queryFn: async () => await getFirstprojectProgramAccounts(client.rpc),
  })
}
