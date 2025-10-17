import { FirstprojectAccount, getIncrementInstruction } from '@project/anchor'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { useMutation } from '@tanstack/react-query'
import { toastTx } from '@/components/toast-tx'
import { useFirstprojectAccountsInvalidate } from './use-firstproject-accounts-invalidate'

export function useFirstprojectIncrementMutation({
  account,
  firstproject,
}: {
  account: UiWalletAccount
  firstproject: FirstprojectAccount
}) {
  const invalidateAccounts = useFirstprojectAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ firstproject: firstproject.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
