# Perenual API Proxy Express

## Environment variables

The following are some of the Environment variables that are required to be in a `.env` file at the root of the project 
**for local development** or specified in the docker run command:

| Name             | Description                                                                                     |
|------------------|-------------------------------------------------------------------------------------------------|
| PERENUAL_API_KEY | A key to access the Perenual API (Can be accessed [here](https://perenual.com/user/developer)). |

## Swagger Documentation **TODO**

Swagger documentation can be accessed at `/docs`

## Docker

Access the Docker hub repository [here](https://hub.docker.com/).

Create a docker container using a command like the following:

```bash
docker run \
  -e PERENUAL_API_KEY=<your perenual api key> \
  -p 3000:8080 \
  --name <conatiner name> \
  rykerocooke/perenual-api-proxy-express:1.0.0
```