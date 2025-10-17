import { FirstprojectAccount } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useFirstprojectCloseMutation } from '@/features/firstproject/data-access/use-firstproject-close-mutation'

export function FirstprojectUiButtonClose({ account, firstproject }: { account: UiWalletAccount; firstproject: FirstprojectAccount }) {
  const closeMutation = useFirstprojectCloseMutation({ account, firstproject })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
