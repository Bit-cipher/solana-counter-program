import { FirstprojectUiCard } from './firstproject-ui-card'
import { useFirstprojectAccountsQuery } from '@/features/firstproject/data-access/use-firstproject-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function FirstprojectUiList({ account }: { account: UiWalletAccount }) {
  const firstprojectAccountsQuery = useFirstprojectAccountsQuery()

  if (firstprojectAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!firstprojectAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {firstprojectAccountsQuery.data?.map((firstproject) => (
        <FirstprojectUiCard account={account} key={firstproject.address} firstproject={firstproject} />
      ))}
    </div>
  )
}
