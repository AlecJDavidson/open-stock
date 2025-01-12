cd ./packages/server/

yarn generate
yarn migrate -n "init"
yarn seed:db

