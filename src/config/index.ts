import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  port: process.env.PORT || 5000,
  dbUri: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BYCRYPT_SALT_ROUNDS,
}
