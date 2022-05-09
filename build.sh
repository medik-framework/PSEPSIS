rm -r backend/static

cd frontend
yarn
yarn build
cd ../backend
cp -r ../frontend/build/static .
cp -r ../frontend/build/index.html ./static/

cd ..
cd mockpatient
yarn
yarn build
cd ../backend
cp -r ../mockpatient/build/static .
cp -r ../mockpatient/build/index.html ./static/index2.html
