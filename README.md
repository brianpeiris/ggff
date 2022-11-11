# ggff

ggff.io is an ephemeral URL shortener. It produces short links are easy to type, easy to remember, and last for 5 minutes.

## development

```
npm install
docker run --name ggff-mongo --rm -p 27017:27017 -d mongo:6
npm run start
```
