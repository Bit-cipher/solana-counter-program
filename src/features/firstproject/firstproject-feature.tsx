import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { FirstprojectUiButtonInitialize } from './ui/firstproject-ui-button-initialize'
import { FirstprojectUiList } from './ui/firstproject-ui-list'
import { FirstprojectUiProgramExplorerLink } from './ui/firstproject-ui-program-explorer-link'
import { FirstprojectUiProgramGuard } from './ui/firstproject-ui-program-guard'

export default function FirstprojectFeature() {
  const { account } = useSolana()

  return (
    <FirstprojectUiProgramGuard>
      <AppHero
        title="Firstproject"
        subtitle={
          account
            ? "Initialize a new firstproject onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <FirstprojectUiProgramExplorerLink />
        </p>
        {account ? (
          <FirstprojectUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <FirstprojectUiList account={account} /> : null}
    </FirstprojectUiProgramGuard>
  )
}
