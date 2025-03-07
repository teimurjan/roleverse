#!/bin/sh
echo "Starting Hardhat..."
yarn workspace @roleverse/contract-roleverse dev &

echo "Waiting for Hardhat node to be ready..."
until curl -s http://localhost:8545 >/dev/null; do
  sleep 2
done

echo "Deploying contracts..."
yarn workspace @roleverse/contract-roleverse hardhat run scripts/deploy-local.ts --network localhost

echo "Contracts deployed!"
tail -f /dev/null
