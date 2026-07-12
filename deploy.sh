#!/usr/bin/env bash
# Run this after every Git pull on the Hostinger server (manually via the hPanel
# Terminal, or pasted into hPanel's "deploy script" field if it offers one).
set -e
cd "$(dirname "$0")"

echo "==> Building client"
cd client
npm install
npm run build
cd ..

echo "==> Installing server dependencies"
cd server
npm install

echo "==> Signalling app restart (Passenger convention - harmless if unused)"
mkdir -p tmp
touch tmp/restart.txt

echo "==> Done. If the site doesn't pick up the change, restart the Node.js app from hPanel."
