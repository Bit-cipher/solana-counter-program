import { FirstprojectAccount, getCloseInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useFirstprojectAccountsInvalidate } from './use-firstproject-accounts-invalidate'

export function useFirstprojectCloseMutation({ account, firstproject }: { account: UiWalletAccount; firstproject: FirstprojectAccount }) {
  const invalidateAccounts = useFirstprojectAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async () => {
      return await signAndSend(getCloseInstruction({ payer: signer, firstproject: firstproject.address }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
