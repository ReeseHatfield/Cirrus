REM take down any current services
docker-compose down

REM rebuild all 
docker-compose build

REM start docker services
docker-compose up
