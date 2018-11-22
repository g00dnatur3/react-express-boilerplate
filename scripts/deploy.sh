#!/bin/bash
node scripts/bump-version

## !! MUST BE RUN FROM ROOT OF FOLDER !!

##
## READ CURRENT VERSION FROM PACKAGE.JSON
##
version=$(grep version package.json)
beginTag="\"version\": \""
endTag="\","
version="${version//$beginTag}"
version="${version//$endTag}"
version="${version// /}"
echo $version

## NAME
name="my-name"

rm -rf node_modules
rm -rf build
npm install
#npm i --target_arch=x64 --target_platform=linux
#npm run build
npm run build-zip
bundle="./$name-$version.zip"
mv ./$name.zip $bundle

## HOST
host="myhost.com"

## USER
user="my-user"

# ssh -i zfserver.pem ec2-user@174.129.65.65

## SSH COMMAND
ssh="ssh -i .server.pem $user@$host"

## COPY BUNDLE TO SERVER
fullcmd="scp -i zfserver.pem $bundle $user@$host:/home/$user"
echo $fullcmd
eval $fullcmd

## DELETE LOCAL BUNDLE
rm -rf $bundle

## STOP SERVICE
sshcmd="sudo pm2 stop $name || sleep 0"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

## STOP SERVICE
sshcmd="sudo pm2 delete $name || sleep 0"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

## DELETE FOLDER
sshcmd="rm -rf ./$name"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

## UNZIP BUNDLE TO FOLDER
sshcmd="unzip $bundle -d ./$name"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

## SEED MONGODB
#sshcmd="cd ./$name && ./scripts/init-db.sh"
#fullcmd="$ssh '$sshcmd'"
#echo $fullcmd
#eval $fullcmd

## INSTALL
sshcmd="cd ./$name && rm -rf node_modules && npm install"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

## BUILD
sshcmd="cd ./$name && npm run build"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

## START SERVICE
sshcmd="cd ./$name && sudo pm2 kill && sudo NODE_ENV=production pm2 start node build/src/server/express/index.js --name $name"
fullcmd="$ssh '$sshcmd'"
echo $fullcmd
eval $fullcmd

#rm -rf node_modules
#npm i
