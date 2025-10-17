// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Firstproject, FIRSTPROJECT_DISCRIMINATOR, FIRSTPROJECT_PROGRAM_ADDRESS, getFirstprojectDecoder } from './client/js'
import FirstprojectIDL from '../target/idl/firstproject.json'

export type FirstprojectAccount = Account<Firstproject, string>

// Re-export the generated IDL and type
export { FirstprojectIDL }

export * from './client/js'

export function getFirstprojectProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getFirstprojectDecoder(),
    filter: getBase58Decoder().decode(FIRSTPROJECT_DISCRIMINATOR),
    programAddress: FIRSTPROJECT_PROGRAM_ADDRESS,
  })
}
