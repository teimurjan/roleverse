import { ChildProcess, spawn } from 'child_process'
import { hardhat } from 'viem/chains'
import waitOn from 'wait-on'

const main = async () => {
  console.log('Starting Hardhat node programmatically...')

  const devProcess: ChildProcess = spawn('yarn', ['dev'], {
    cwd: process.cwd(), // or adjust if needed
    stdio: 'inherit',
    shell: true,
  })

  await waitOn({ resources: [hardhat.rpcUrls.default.http[0]], timeout: 30000 })
  console.log('Hardhat node is up and running.')

  const testProcess: ChildProcess = spawn('yarn', ['jest'], {
    cwd: process.cwd(), // or adjust if needed
    stdio: 'inherit',
    shell: true,
  })

  testProcess.on('exit', () => {
    try {
      console.log('Stopping Hardhat node...')
      devProcess.kill()
      console.log('Hardhat node and its child processes have been killed.')
    } catch (e) {
      console.error('Error killing Hardhat node process:', e)
    }
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
