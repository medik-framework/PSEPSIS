rm -r backend/static

cd frontend
yarn
yarn build
cd ../backend
cp -r ../frontend/build/static .
cp -r ../frontend/build/index.html ./static/

cd ..
cd sepsisform
yarn
yarn build
cd ../backend
cp -r ../sepsisform/build/static .
cp -r ../sepsisform/build/index.html ./static/index2.html
