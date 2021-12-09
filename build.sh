rm -r backend/static

cd frontend
yarn build
cd ../backend
cp -r ../frontend/build/static .
cp -r ../frontend/build/index.html ./static/

cd ..
cd sepsisform
yarn build
cd ../backend
cp -r ../sepsisform/build/static .
cp -r ../sepsisform/build/index.html ./static/index2.html
