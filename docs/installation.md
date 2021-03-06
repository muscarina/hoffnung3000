---
layout: default
title: Installation
order: 2
---

* Table of contents
{:toc}

There are different ways on how to install HOFFNUNG 3000. We tried to keep the technical steps required as small as possible, with some patience you will be able to run HOFFNUNG 3000, even if you have never dealt with these things before.

## Simple setup via Heroku

1. Register a new account on [Heroku](https://www.heroku.com) if you don't already have one

2. Click the following link to automatically deploy HOFFNUNG 3000 and a database on your Heroku server:

    [https://heroku.com/deploy?template=https://github.com/adzialocha/hoffnung3000](https://heroku.com/deploy?template=https://github.com/adzialocha/hoffnung3000)

3. Choose a name and region, then click `Deploy app`. Wait until the installation finished on your server

4. Now the platform is ready and can be visited: `https://<your-app-name>.herokuapp.com`. Read the [Usage guide](/usage-guide.html) to learn how to use HOFFNUNG 3000

Please note that **this simple setup is not recommended for official festival settings**. Read further to learn how to prepare HOFFNUNG 3000 for production.

---

## Install manually

For this setup we assume you already have a running [NodeJS server environment](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04), SMTP mail server and a [PostgreSQL database](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-16-04) installed.

You can find the source code of HOFFNUNG 3000 in a git repository hosted on: [github.com/adzialocha/hoffnung3000](https://github.com/adzialocha/hoffnung3000).

### Requirements

* Server with [NodeJS](https://nodejs.org/en/) environment (tested with v10.12.0)
* [PostgreSQL](https://www.postgresql.org/) Database (tested with v11.2)
* Mail server (SMTP)
* [PayPal](https://www.paypal.com) business account for payment (optional)
* [AWS S3](https://aws.amazon.com/s3/) Cloud Storage (optional)
* [gif-stream-server](https://github.com/adzialocha/gif-stream-server) (optional)

### 1. Configuration

Crucial settings of HOFFNUNG 3000 are configured via environment variables, further configuration can be handled via the [Admin panel](/usage-guide.html) after setup.

* Learn [here](https://devcenter.heroku.com/articles/config-vars) how to set Config Vars on Heroku
* For other servers check out the [.env.example](https://github.com/adzialocha/hoffnung3000/blob/master/.env.example) file and copy it to `.env` (via `cp .env.example .env`)

Make sure you've set `NPM_CONFIG_PRODUCTION` to `false` when installing HOFFNUNG 3000 via Heroku, otherwise the build process will fail. Read more about it [here](https://devcenter.heroku.com/articles/nodejs-support#skip-pruning).

#### Required variables

* `DATABASE_URL` pointing at your PostgreSQL database (for example *postgres://username:password@123.123.123.123:5432/dbname*)
* `DATABASE_DIALECT` describing the type of database we want to use (pick *postgres*)
* `JWT_SECRET` choose or [generate](https://www.grc.com/passwords.htm) a strong, long random sequence of symbols, characters and numbers for password validation. Never expose this key to the public!
* `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS` to send notification and confirmation emails from your mail address

#### Optional: AWS S3

By default HOFFNUNG 3000 stores all user uploads (images) in a folder named *uploads* on your server which is not recommended. Use AWS S3 Cloud Storage to externally host images and separate user content from the application server.

1. Create an AWS S3 Bucket and assign the right permissions (public readable, writeable by authenticated AWS user)

2. Define the needed AWS environment variables: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_BUCKET_NAME`

Please note: It is not possible to change to S3 after using the local storage setup without loosing user data.

#### Optional: PayPal

This is an *optional* step and only required if you want to sell tickets to visitors and/or participants via PayPal.

1. Create a PayPal [Developer Account](https://developer.paypal.com/docs/api/overview/#) and get an access token for testing and live setup

2. Store the access token and id as environment variables `PAYPAL_ID` and `PAYPAL_SECRET`

3. Define the `PAYPAL_RETURN_URL` (*https://**your-domain.com**/api/auth/signup/paypal/success*) and `PAYPAL_CANCEL_URL` (*https://**your-domain.com**/api/auth/signup/paypal/cancel*)

#### Optional: gif-stream-server

The gif-stream-server is an independent server written in Go, requiring AWS S3. It has to run independently of HOFFNUNG 3000. You can read more about the [setup here](https://github.com/adzialocha/gif-stream-server).

After setup, you can add the gif-stream-server URL (without trailing slash!) in the HOFFNUNG 3000 admin panel configuration to connect the platform to the gif-stream-server.

### 2. Install dependencies

Install all JavaScript dependencies via npm, this command will also automatically build all assets (`npm run build`) for production use:

```
npm install
```

### 3. Database migration and setup

To create all required tables in the given database, you issue the following commands:

```
npm run db:migrate
npm run db:seed
```

The seed will create a default admin user with email: `admin@domain.com` and passwort: `adminadmin`. Please [change the credentials](/usage-guide.html#change-the-default-admin-user) after first login in the admin panel.

### 4. Start server

Run the following command to run the server (make sure the build and migration process was successful before):

```
npm start
```
