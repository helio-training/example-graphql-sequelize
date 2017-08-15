<img src="http://i.imgur.com/UzC7XPe.png" alt="Helio Training" width="226" align="center"/> v1.0

---------------

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# GraphQL Sequelize Example

A short example using Sequelize for Migrations, Models, and Seeds

## Instructions

This is an all in one example when using docker.

Follow these instructions:

```sh
# Clone the repo
git clone git@github.com:helio-training/example-graphql-sequelize.git && cd example-graphql-sequelize

# Run docker-compose
docker-compose up

# Open a new terminal tab while docker-compose up is running
# Migrate the database
docker-compose run web yarn run sequelize db:migrate

# Generate a couple users from seeds
docker-compose run web yarn run sequelize db:seed:all
```

Jump on over to [localhost:3000](http://localhost:3000)
