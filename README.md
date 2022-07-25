# Node Server API Challenge

## Assessment Requirements:
- Node.js service
- API that can be consumed from any client
- The service must check how many streams a user is watching and prevent them from watching more than 3 concurrently

## Development Setup
After cloning the repository:
- Copy the 'env-template' file into a '.env' file and fill/edit the parameters where necessary.

### Run Server Locally
#### Requirements:
- Node.js

#### Setup:
1. Navigate to the root of the repository and run: `npm install`
2. Run: `npm run dev`

You should now be able to access the API at the port specified in the .env file.

### Run Tests
1. Ensure there is a node server running on the port specified in the .env 
2. Navigate to the root of the repository and run: `npm test`

There are 3 tests in the pack as well as an initial step to add test data to the database*.
1. A user that can add a stream
2. A user that is at capacity and cannot add a stream
3. A user that is not found in the system

*Functionality has not been added to remove this test data. Additionally, more unit tests such as an initial API health check should be included.

### Run Docker Containers
#### Requirements:
- Docker
#### Build:
1. Navigate to the root of the repository and run: `docker-compose up -d --build`

You should be able to access the API from 'localhost' and the Mongo database as per the specification in the .env file.
Eg. test:
```
# GET Request at 'http://localhost/add-stream/user/user-2/
```

## Design Comment

### API Design:
- Client sends request to add stream
- Request received
- Database checked for client's # of current streams
- Compare with max streams and return result

A REST API was created as it is a generic type of API that can be used by many device types. Only one endpoint was created:
```
<baseURL>/add-stream/user/<user-id>
# Eg.:
127.0.0.1:3000/add-stream/user/user-2/
```
This endpoint checks the MongoDB for the user's current number of streams and returns a true/false response based on whether they are allowed to add an additional stream.

## Scalability and Integration with Amazon Services
There are many AWS services that can be used to host and manage the functionality created in this repository. API Gateway or an Application Load balancer can expose the endpoint and either run the request directly as a Lambda function or connect to the node server run in a container managed by ECS. Either can implement auto scaling to allow for increased demand at peak hours. As this endpoint is just a simple read and validate request, it can be completely separated from other functionality such as the actual video streaming. 

In this example, a Mongo Database was used as it is a noSQL database and allows for good horizontal scaling. Noting the functionality required in this example, no indication of aggregations or other such database functionality is shown so a SQL database would not be required. This could easily be implemented using DynamoDB. However, a RDS/Aurora database in AWS could also be used with read replicas to improve read requests with auto scaling. There are a number of security options, including encryption at rest using KMS (as well as for all the backups and replicas) and encryption in flight using SSL.
