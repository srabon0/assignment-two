// getting-started.js
import mongoose from 'mongoose'
import config from './config'
import app from './app'

async function main() {
  try {
    await mongoose.connect(config.dbUri as string)
    app.listen(config.port, () => {
      console.log(config.dbUri)
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
