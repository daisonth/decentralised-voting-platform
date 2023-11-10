import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { IDL, decentralisedElection } from './idl';

const connection = new Connection(clusterApiUrl("devnet"));
const { SystemProgram, Keypair } = web3;
const programID = new PublicKey(IDL.metadata.address);

export async function Initialise(wallet: AnchorWallet) {

  const provider = new AnchorProvider(
    connection,
    wallet as unknown as AnchorWallet,
    { commitment: "finalized" }
  );

  const program = new Program(IDL as decentralisedElection, programID, provider);

  let account;
  if (provider) {

    const [newacc, _] = PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode('account'),
      provider.wallet.publicKey.toBuffer(),
    ], program.programId)

    try {
      account = await program.account.userAccountPda.fetch(newacc);
      console.log('user accounts has ', account.electionCount, 'Elections');
    } catch (err) {

      console.log("No Account Initialised\nInitialising new account");

      await program.methods.newAccount().accounts({
        userAccount: newacc,
        signer: wallet?.publicKey,
        systemProgram: SystemProgram.programId
      }).rpc().then(
        async () => {
          account = await program.account.userAccountPda.fetch(newacc);
          console.log('user accounts has ', account.electionCount, 'Elections');
        }
      )
    }
  }

  return account.electionCount;
}

export async function CreateElection(wallet: AnchorWallet, electionCount: number) {

  const provider = new AnchorProvider(
    connection,
    wallet as unknown as AnchorWallet,
    { commitment: "finalized" }
  );

  const program = new Program(IDL as decentralisedElection, programID, provider);

  let account;
  if (provider) {

    let num: uint8 = electionCount;
    const [newacc, _] = PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode('election'),
      provider.wallet.publicKey.toBuffer(),
      num
    ], program.programId)

    try {
      account = await program.account.userAccountPda.fetch(newacc);
      console.log('user accounts has ', account.electionCount, 'Elections');
    } catch (err) {

      console.log("No Account Initialised\nInitialising new account");

      await program.methods.newAccount().accounts({
        userAccount: newacc,
        signer: wallet?.publicKey,
        systemProgram: SystemProgram.programId
      }).rpc().then(
        async () => {
          account = await program.account.userAccountPda.fetch(newacc);
          console.log('user accounts has ', account.electionCount, 'Elections');
        }
      )
    }
  }

  return account.electionCount;
}
