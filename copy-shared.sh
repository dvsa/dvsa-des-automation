rm -rf ./shared
mkdir ./shared
cp -R ./node_modules/@dvsa/app-dev-automation/src/ ./shared
rm -rf ./creds/credentials.json
cp ./node_modules/@dvsa/app-dev-automation/src/credentials/des/credentials.json ./creds
