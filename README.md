# Hooligan Backend Assessment

## Assessment Requirements:
- Node.js service
- API that can be consumed from any client

## Development Setup

### Run Locally
#### Requirements:
- Node Installation

Navigate to the root of the repository and run: `npm run dev`

### Run Docker Containers
- Docker Installation

Navigate to the root of the repository and run: `docker-compose up -d --build`

## Design Comment

## API Design:
- Client sends request to add stream
- Request received
- Database checked for client's # of current streams
- Compare with max streams and return result

- Connect stream: event-based

- Disconnect stream: event-based.

### Scalability and Integration with Amazon Services
- SQS and SNS
