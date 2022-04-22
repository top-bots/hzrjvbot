
Run mongodb on docker
`sudo docker run --name mongo -p27017:27017 -v /data/mongodb:/data/db -d mongo`

Create `hzrjvb` database
`docker exec mongo sh -c 'exec mongodump -d hzrjvb --archive' > /data/mongodb/all-collections.archive`
