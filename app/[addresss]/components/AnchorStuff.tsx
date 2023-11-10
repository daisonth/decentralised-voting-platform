import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor'
import { Program, AnchorProvider, web3, setProvider } from '@coral-xyz/anchor';
// import idl from '';
import { IDL, decentralisedElection } from './idl';
//
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useAnchorWallet, WalletProvider, ConnectionProvider, useWallet } from '@solana/wallet-adapter-react';
// import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

// const wallets = [new SolflareWalletAdapter()]

const { SystemProgram, Keypair } = web3;
// const baseAccount = Keypair.generate();
const programID = new PublicKey(IDL.metadata.address);

async function AnchorStuff() {
  const wallet = useAnchorWallet();
  // const wallet = useWallet();

  async function getProvider() {
    const connection = new Connection(clusterApiUrl("devnet"));

    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
      return provider;
    }
  }


  async function initialize() {
    const provider = await getProvider();
    const program = new Program(IDL as decentralisedElection, programID, provider);
    if (provider)
      try {
        /* interact with the program via rpc */
        const [newacc, _] = PublicKey.findProgramAddressSync([
          anchor.utils.bytes.utf8.encode('account'),
          provider.wallet.publicKey.toBuffer(),
        ], program.programId)

        program.methods.newAccount().accounts({
          userAccount: newacc,
          signer: wallet?.publicKey,
          systemProgram: SystemProgram.programId
        }).rpc()

        const account = await program.account.UserAccountPda.all();
        console.log('account: ', account);
        // setValue(account.data.toString());
        // setDataList(account.dataList);
      } catch (err) {
        console.log("Transaction error: ", err);
      }
  }
}

export default async function getidl() {
  return IDL
}
