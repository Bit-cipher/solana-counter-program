#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod firstproject {
    use super::*;

    pub fn close(_ctx: Context<CloseFirstproject>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.firstproject.count = ctx.accounts.firstproject.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.firstproject.count = ctx.accounts.firstproject.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeFirstproject>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.firstproject.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeFirstproject<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Firstproject::INIT_SPACE,
  payer = payer
    )]
    pub firstproject: Account<'info, Firstproject>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseFirstproject<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub firstproject: Account<'info, Firstproject>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub firstproject: Account<'info, Firstproject>,
}

#[account]
#[derive(InitSpace)]
pub struct Firstproject {
    count: u8,
}
