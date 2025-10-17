import { FirstprojectAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useFirstprojectSetMutation } from '@/features/firstproject/data-access/use-firstproject-set-mutation'

export function FirstprojectUiButtonSet({ account, firstproject }: { account: UiWalletAccount; firstproject: FirstprojectAccount }) {
  const setMutation = useFirstprojectSetMutation({ account, firstproject })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', firstproject.data.count.toString() ?? '0')
        if (!value || parseInt(value) === firstproject.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
