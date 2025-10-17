import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useFirstprojectInitializeMutation } from '@/features/firstproject/data-access/use-firstproject-initialize-mutation'

export function FirstprojectUiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useFirstprojectInitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Firstproject {mutationInitialize.isPending && '...'}
    </Button>
  )
}
