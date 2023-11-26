import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { IDL, decentralisedElection } from './idl';

const connection = new Connection(clusterApiUrl("devnet"));
const { SystemProgram } = web3;
const programID = new PublicKey(IDL.metadata.address);

// getElectionCount //////////////////////////////////////////////////////////////////////////////////

export async function getElectionCount(wallet: AnchorWallet) {
  const provider = new AnchorProvider(connection, wallet as unknown as AnchorWallet, { commitment: "finalized" });
  const program = new Program(IDL as decentralisedElection, programID, provider);

  let electionCount: number = 0;
  if (provider) {

    const [userAccount] = PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode('account'),
      provider.wallet.publicKey.toBuffer(),
    ], program.programId)

    try {
      let account = await program.account.userAccountPda.fetch(userAccount);
      electionCount = account.electionCount as number;
      console.log('from getElectionCount | election Count (S) : ', account.electionCount);
    } catch (err) {
      console.log('from getElectionCount | election Count (F) : ', electionCount);
    }
  }
  return electionCount
}

// getAllElections  //////////////////////////////////////////////////////////////////////////////////

export async function getAllElections(wallet: AnchorWallet, option: number = 0) {
  // console.log("called getAllElections");
  const provider = new AnchorProvider(connection, wallet as unknown as AnchorWallet, { commitment: "finalized" });
  const program = new Program(IDL as decentralisedElection, programID, provider);

  let allElections;
  if (provider) {
    try {
      allElections = await program.account.electionPda.all();
      if (option == 1) allElections = allElections.filter(e => e.account.signer.toString() === provider.wallet.publicKey.toString())
      allElections.forEach(e => {
        console.log("title :", e.account.title, "\ndescription :", e.account.description, "\nsigner: ", e.account.signer.toString(), "\ncandidates : ", e.account.candidates);
      })
      // console.log('from getAllElections (S) : ', allElections);
    } catch (err) {
      console.log('from getAllElections (F) : ', err);
    }
  }

  return allElections
}

// getAllUserElections  //////////////////////////////////////////////////////////////////////////////////

export async function getAllUserElections(wallet: AnchorWallet) {
  return await getAllElections(wallet, 1);
}

// Initialise //////////////////////////////////////////////////////////////////////////////////

export async function Initialise(wallet: AnchorWallet) {

  const provider = new AnchorProvider(connection, wallet as unknown as AnchorWallet, { commitment: "finalized" });
  const program = new Program(IDL as decentralisedElection, programID, provider);

  let account;
  if (provider) {

    const [newacc] = PublicKey.findProgramAddressSync([
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

  if (account)
    return account.electionCount;
  else
    return 0
}

// CreateElection   //////////////////////////////////////////////////////////////////////////////////

export async function CreateElection(wallet: AnchorWallet, electionCount: number, title: string, description: string) {

  const provider = new AnchorProvider(
    connection,
    wallet as unknown as AnchorWallet,
    { commitment: "finalized" }
  );

  const program = new Program(IDL as decentralisedElection, programID, provider);

  let myelections;
  let newElectionCount = electionCount;

  if (provider) {

    const [election_account] = PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode('election'),
      provider.wallet.publicKey.toBuffer(),
      Uint8Array.from([electionCount])
    ], program.programId)

    const [user_account] = PublicKey.findProgramAddressSync([
      anchor.utils.bytes.utf8.encode('account'),
      provider.wallet.publicKey.toBuffer(),
    ], program.programId)

    try {
      await program.methods.newElection(title, description).accounts({
        electionAccount: election_account,
        userAccount: user_account,
        signer: wallet?.publicKey,
        systemProgram: SystemProgram.programId,
      }).rpc().then(
        async () => {
          myelections = await program.account.electionPda.all();
          newElectionCount = await getElectionCount(wallet);
          console.log("election : ", myelections);
        }
      )
    } catch (err) {
      console.log("error happend", err);
    }
  }

  return newElectionCount;
}
