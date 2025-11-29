import { Connection, Keypair } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import bs58 from "bs58";

export const buildToken = async (name, symbol, supply, payerPrivateKey) => {

  const connection = new Connection("https://api.mainnet-beta.solana.com");

  const payer = Keypair.fromSecretKey(bs58.decode(payerPrivateKey));

  const mint = await createMint(connection, payer, payer.publicKey, null, 9);

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, payer, mint, payer.publicKey
  );

  const mintAmount = BigInt(supply) * BigInt(1_000_000_000);

  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer.publicKey,
    mintAmount
  );

  return {
    status: "success",
    mintAddress: mint.toBase58(),
    supply,
    name,
    symbol
  };
};
