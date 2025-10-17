import { FirstprojectAccount } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { FirstprojectUiButtonClose } from './firstproject-ui-button-close'
import { FirstprojectUiButtonDecrement } from './firstproject-ui-button-decrement'
import { FirstprojectUiButtonIncrement } from './firstproject-ui-button-increment'
import { FirstprojectUiButtonSet } from './firstproject-ui-button-set'

export function FirstprojectUiCard({ account, firstproject }: { account: UiWalletAccount; firstproject: FirstprojectAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Firstproject: {firstproject.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={firstproject.address} label={ellipsify(firstproject.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <FirstprojectUiButtonIncrement account={account} firstproject={firstproject} />
          <FirstprojectUiButtonSet account={account} firstproject={firstproject} />
          <FirstprojectUiButtonDecrement account={account} firstproject={firstproject} />
          <FirstprojectUiButtonClose account={account} firstproject={firstproject} />
        </div>
      </CardContent>
    </Card>
  )
}
