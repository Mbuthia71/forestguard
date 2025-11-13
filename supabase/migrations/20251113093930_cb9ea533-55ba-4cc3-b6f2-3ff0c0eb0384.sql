-- Add blockchain fields to contact_messages
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS blockchain_tx_hash TEXT,
ADD COLUMN IF NOT EXISTS ipfs_hash TEXT;