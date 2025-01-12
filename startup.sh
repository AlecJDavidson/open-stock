echo "Starting to build and deploy!"
docker compose up database -d
docker compose build
docker compose up -d
echo "Done!"
