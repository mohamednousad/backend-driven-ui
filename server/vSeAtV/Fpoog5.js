import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import dotenv from "dotenv";

dotenv.config();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const DATA_PATHS = {
  DASHBOARD: process.env.DASHBOARD_PATH,
  ANALYTICS: process.env.ANALYTICS_PATH,
  USERS: process.env.USERS_PATH,
  SETTINGS: process.env.SETTINGS_PATH
}

function encryptData(data) {
  const iv = crypto.randomBytes(16)
  const key = Buffer.from(ENCRYPTION_KEY, 'utf-8')

  if (key.length !== 32) {
    throw new Error('Key must be 32 bytes')
  }

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), 'utf-8'),
    cipher.final()
  ])

  return {
    iv: iv.toString('hex'),
    data: encrypted.toString('hex')
  }
}

export const getDashboard = async (_, res) => {
  const data = JSON.parse(await fs.readFile(path.resolve(DATA_PATHS.DASHBOARD), 'utf-8'))
  res.json(encryptData(data))
}

export const getAnalytics = async (_, res) => {
  const data = JSON.parse(await fs.readFile(path.resolve(DATA_PATHS.ANALYTICS), 'utf-8'))
  res.json(encryptData(data))
}

export const getUsers = async (_, res) => {
  const data = JSON.parse(await fs.readFile(path.resolve(DATA_PATHS.USERS), 'utf-8'))
  res.json(encryptData(data))
}

export const getSettings = async (_, res) => {
  const data = JSON.parse(await fs.readFile(path.resolve(DATA_PATHS.SETTINGS), 'utf-8'))
  res.json(encryptData(data))
}