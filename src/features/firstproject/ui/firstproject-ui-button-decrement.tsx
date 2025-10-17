import { FirstprojectAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useFirstprojectDecrementMutation } from '../data-access/use-firstproject-decrement-mutation'

export function FirstprojectUiButtonDecrement({ account, firstproject }: { account: UiWalletAccount; firstproject: FirstprojectAccount }) {
  const decrementMutation = useFirstprojectDecrementMutation({ account, firstproject })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
