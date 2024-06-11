# Salary App Api

## Description

Server for salary app

## Prerequisites

- [NodeJS](https://nodejs.org/en/download/) version 16 or above
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) version 6 or above
- [Redis](https://redis.io/downloads/) version 6 or above

## Installation

1. Clone the repository.

```sh
git clone https://github.com/SonlamBKIC/salary-app-api.git
```

2. Install the dependencies for the project.

```sh
cd salary-api-api
npm install
```

3. Configure the project by creating an **.env** file in the salary-app-api folder then add your necessary configuration to the .env file.

Description for each variables are in the [.env.example](.env.example) file. Below is an example **.env** file for the project.

```env
NODE_ENV=development
PORT=3000
MONGO_CONNECTION_STRING="mongodb://localhost:27017/salary-app"
REDIS_HOST="localhost"
REDIS_PORT=6379
UPDATE_JOB_BATCH_SIZE=1000
JOB_PROCESSOR_CONCURRENCY=5
```

## Database initialization

Do this if you want to have initial data before starting the app for the first time.
This script will create **100000** new employee documents in the database each time it runs.

```sh
cd salary-app-api
npm run build
npm run init-data
```

## Running application in development environment

Running the api project in development environment.

```sh
cd salary-app-api
npm run start:dev
```

## Testing

- Unit test

```sh
cd salary-app-api
npm run test
```

- End to End test

```sh
cd salary-app-api
npm run test:e2e
```

- Manual test \
In the [employee-job.service.ts](/src/modules/cron-jobs/employee-job.service.ts) file, change the **CronExpression** from **EVERY_DAY_AT_MIDNIGHT** to something smaller (for example **EVERY_30_SECONDS**) then start the app in development mode to test.
```sh
cd salary-app-api
npm run start:dev
```

## Database design 
- Design of the employee collection

![Employee Context](/designs/EmployeeContext.png)

## Solution design

- The solution is a cron job run at midnight to trigger the recalculate employee account balance process. The cron job will create all the batch jobs needed and send it to the **Job Queue**. The **Job Queue** will have multiple **Processor** to process the batch job and update the new data to the **Database**.
- One thing to note here is that the Job's **Processor** can be distributed so we can scale the number of **Processors** indefinitely when the employees number growth. The only bottleneck here is the write capacity of the Database itself.

![Cron Job Solution](/designs/CronJobSolution.png)