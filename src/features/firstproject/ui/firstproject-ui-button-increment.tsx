import { FirstprojectAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useFirstprojectIncrementMutation } from '../data-access/use-firstproject-increment-mutation'

export function FirstprojectUiButtonIncrement({ account, firstproject }: { account: UiWalletAccount; firstproject: FirstprojectAccount }) {
  const incrementMutation = useFirstprojectIncrementMutation({ account, firstproject })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
