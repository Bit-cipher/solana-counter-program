import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchFirstproject,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('firstproject', () => {
  let payer: KeyPairSigner
  let firstproject: KeyPairSigner

  beforeAll(async () => {
    firstproject = await generateKeyPairSigner()
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('Initialize Firstproject', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getInitializeInstruction({ payer: payer, firstproject: firstproject })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentFirstproject = await fetchFirstproject(rpc, firstproject.address)
    expect(currentFirstproject.data.count).toEqual(0)
  })

  it('Increment Firstproject', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({
      firstproject: firstproject.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchFirstproject(rpc, firstproject.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Increment Firstproject Again', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({ firstproject: firstproject.address })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchFirstproject(rpc, firstproject.address)
    expect(currentCount.data.count).toEqual(2)
  })

  it('Decrement Firstproject', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getDecrementInstruction({
      firstproject: firstproject.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchFirstproject(rpc, firstproject.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Set firstproject value', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getSetInstruction({ firstproject: firstproject.address, value: 42 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchFirstproject(rpc, firstproject.address)
    expect(currentCount.data.count).toEqual(42)
  })

  it('Set close the firstproject account', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getCloseInstruction({
      payer: payer,
      firstproject: firstproject.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchFirstproject(rpc, firstproject.address)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      expect(e.message).toEqual(`Account not found at address: ${firstproject.address}`)
    }
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
