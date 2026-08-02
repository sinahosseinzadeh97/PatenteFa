-- Migration: Add is_approved column to users table
ALTER TABLE users ADD COLUMN is_approved INTEGER DEFAULT 0;
