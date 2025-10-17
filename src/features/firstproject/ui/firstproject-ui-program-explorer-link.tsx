import { FIRSTPROJECT_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function FirstprojectUiProgramExplorerLink() {
  return <AppExplorerLink address={FIRSTPROJECT_PROGRAM_ADDRESS} label={ellipsify(FIRSTPROJECT_PROGRAM_ADDRESS)} />
}
