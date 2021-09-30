rm -r static

cd frontend
yarn build
cd ../backend
cp -r ../frontend/build/static .
cp -r ../frontend/build/index.html ./static/