use anchor_lang::prelude::*;

declare_id!("5m2LX8M4aww7WPxiHHziFZBFwT4gujmgDzBrBEwADE3c");

// CONSTANTS ////////////////////////////////////////////////////////////////////////////////////

#[constant]
pub const ACCOUNT_SEED: &[u8] = b"account";

#[constant]
pub const ELECTION_SEED: &[u8] = b"election";

#[constant]
pub const VOTE_SEED: &[u8] = b"vote";

#[program]
mod decentralised_election {
    use super::*;

    // INSTRUCTIONS ////////////////////////////////////////////////////////////////////////////////////

    pub fn new_account(ctx: Context<Initialize>) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let signer = &mut ctx.accounts.signer;

        user_account.election_count = 0;
        user_account.signer = signer.key();

        Ok(())
    }

    pub fn new_election(
        ctx: Context<NewElection>,
        title: String,
        description: String,
    ) -> Result<()> {
        let election_account = &mut ctx.accounts.election_account;
        let user_account = &mut ctx.accounts.user_account;
        let signer = &mut ctx.accounts.signer;

        election_account.title = title;
        election_account.description = description;
        election_account.total_votes = 0;
        election_account.election_status = 0;
        election_account.signer = signer.key();

        user_account.election_count = user_account.election_count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn add_candidate(ctx: Context<Election>, name: String) -> Result<()> {
        let election_account = &mut ctx.accounts.election_account;
        let signer = &mut ctx.accounts.signer;

        if eelection_account.signer == signer.key() && election_account.election_status == 0 {
            let candidate = Candidate { name, votes: 0 };
            election_account.candidates.push(candidate);
        }

        Ok(())
    }

    pub fn change_status_of_election(ctx: Context<Election>, status: u8) -> Result<()> {
        let election_account = &mut ctx.accounts.election_account;
        let signer = &mut ctx.accounts.signer;

        if election_account.signer == signer.key() {
            if status == 1 {
                election_account.election_status = 1;
            } else if status == 2 {
                election_account.election_status = 2;
            }
        }

        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, index: u32) -> Result<()> {
        let election_account = &mut ctx.accounts.election_account;
        let vote_account = &mut ctx.accounts.vote_account;
        let signer = &mut ctx.accounts.signer;

        if election_account.election_status == 1 {
            let candidate = election_account
                .candidates
                .get_mut(index as usize)
                .ok_or(ErrorCode::InvalidCandidate)?;
            candidate.votes += 1;

            vote_account.election = election_account.key();
            vote_account.signer = signer.key();
        }

        Ok(())
    }
}

// CONTEXTS ////////////////////////////////////////////////////////////////////////////////////

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [ACCOUNT_SEED, signer.key().as_ref()],
        bump,
        payer = signer,
        space = std::mem::size_of::<UserAccountPda>() + 8
    )]
    pub user_account: Account<'info, UserAccountPda>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct NewElection<'info> {
    #[account(
        init,
        seeds = [ELECTION_SEED, signer.key().as_ref(),&[user_account.election_count as u8].as_ref()],
        bump,
        payer = signer,
        space = std::mem::size_of::<ElectionPda>() + 8
    )]
    pub election_account: Account<'info, ElectionPda>,

    #[account(
        mut,
        seeds = [ACCOUNT_SEED, signer.key().as_ref()],
        bump,
        has_one = signer
    )]
    pub user_account: Account<'info, UserAccountPda>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Election<'info> {
    #[account(mut)]
    pub election_account: Account<'info, ElectionPda>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(
        init,
        seeds = [VOTE_SEED, signer.key().as_ref(), election_account.key().as_ref()],
        bump,
        payer = signer,
        space = std::mem::size_of::<VotePda>() + 8
    )]
    pub vote_account: Account<'info, VotePda>,

    #[account(mut)]
    pub election_account: Account<'info, ElectionPda>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// PDAs //////////////////////////////////////////////////////////////////////////////////////////////

#[account]
#[derive(Default)]
pub struct UserAccountPda {
    pub election_count: u8,
    pub signer: Pubkey,
}

#[account]
pub struct ElectionPda {
    pub title: String,
    pub description: String,
    pub total_votes: u16,
    pub candidates: Vec<Candidate>,
    pub election_status: u8,
    pub signer: Pubkey,
}

#[derive(Default, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Candidate {
    pub name: String,
    pub votes: u32,
}

#[account]
#[derive(Default)]
pub struct VotePda {
    pub election: Pubkey,
    pub signer: Pubkey,
}

// ERRORS //////////////////////////////////////////////////////////////////////////////////////////////

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid candidate index")]
    InvalidCandidate,
}
