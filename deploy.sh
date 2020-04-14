#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m 'deploy'

# # if you are deploying to https://<USERNAME>.github.io
# # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# # if you are deploying to https://<USERNAME>.github.io/<REPO>
#  git push -f git@github.com:shobhit1997/cform.git master:gh-pages

cp index.html 404.html
cp index.html 200.html
echo "http://convform.surge.sh" >> CNAME
 surge 
cd -