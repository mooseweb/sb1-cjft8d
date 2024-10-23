import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { INCINERATOR_ADDRESS, SHIT_TOKEN_MINT } from '../config/constants';

export async function createBurnTransaction(
  publicKey: PublicKey,
): Promise<Transaction> {
  const burnInstruction = new TransactionInstruction({
    keys: [
      { pubkey: publicKey, isSigner: true, isWritable: true },
      { pubkey: SHIT_TOKEN_MINT, isSigner: false, isWritable: true },
      { pubkey: INCINERATOR_ADDRESS, isSigner: false, isWritable: true },
    ],
    programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    data: Buffer.from([]), // Burn instruction data
  });

  return new Transaction().add(burnInstruction);
}