#!/bin/bash
set -e
echo "🚀 [parking.giupplus.com] 배포 시작..."

echo "📦 백엔드 모듈 설치 및 재시작..."
cd /home/blue/blue/my_project/parking/backend
npm install
npx pm2 restart parking-backend || npx pm2 start server.js --name parking-backend

echo "📦 프론트엔드 빌드..."
cd /home/blue/blue/my_project/parking/frontend
npm install --legacy-peer-deps
npm run build

echo "blueeye0037!" | sudo -S systemctl restart nginx
echo "✅ 배포 완료: http://parking.giupplus.com:9101"
