import { useSolana } from '@/components/solana/use-solana'

export function useFirstprojectAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['firstproject', 'accounts', { cluster }]
}
