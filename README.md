Containerized react front end application
# Development
Start development server with live updating feature for test.
## Option 1: with interactive console
```
terminal-1> docker-compose -f docker-compose-1.yml up
terminal-2> docker ps # note <id> of running container
terminal-2> docker exec -it <id> npm run test
``` 
## Option 2: without interactive console (seocond service defined in docker-compose file)
```
> docker-compose -f docker-compose-2.yml up
```

Now after editing [App.test.js](./src/App.test.js), the test suite will automatically restart. Depeding on which option you shose, It also possible to use the interactive console features of jest (e.g type `p` to filter by a filename)

# Production
```
docker build . # note <id>
docker run -p <port>:80 <id>
```

Production app served now on [localhost:8080](http:localhost:8080)