const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js')

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

const getWalletBalance = async () => {
  try {
    const walletBalance = await connection.getBalance(publicKey)
    console.log(`Wallet balance is ${walletBalance}`)
  } catch (err) {
    console.error(err)
  }
}

const main = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

const airDropSol = async () => {
  try {
    const fromAirDropSignature = await connection.requestAirdrop(
      publicKey,
      2 * LAMPORTS_PER_SOL
    )
    await connection.confirmTransaction(fromAirDropSignature)
  } catch (err) {
    console.error(err)
  }
}
main()
