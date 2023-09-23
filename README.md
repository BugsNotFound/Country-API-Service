
# Country API Service

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v4.17.1-blue.svg)

This is a Node.js backend API service that provides information about countries using the REST Countries API. It includes authentication, country details retrieval, and country list filtering and sorting with pagination.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Country Details](#country-details)
  - [Filtered Country List](#filtered-country-list)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js (v14.17.0 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/yourusername/country-api.git
    cd country-api
    npm install
    node server.js
	 ```

The server should now be running on http://localhost:3000.

## Usage

### Authentication

To access the protected endpoints, you need to obtain an authentication token by making a POST request to `/auth` with your username and password.

Example:

```bash
curl -X POST http://localhost:3000/auth -d '{"username": "yourusername", "password": "yourpassword"}'
```

### Country Details
Retrieve detailed information about a specific country by providing its name as a parameter in a GET request to /country/{countryname}.

Example:

```bash
curl http://localhost:3000/country/Canada -H "Authorization: Bearer yourtoken"
```

### Filtered Country List
Retrieve a list of countries based on filters (population, area, language) and sorting (asc/desc) with support for pagination.

Example:

```bash
curl "http://localhost:3000/countries?population=1000000&area=100000&language=english&sort=asc&page=1&limit=10" -H "Authorization: Bearer yourtoken"
```


## API Endpoints

- `POST /auth`: Generates an authentication token based on username and password.
- `GET /country/{countryname}`: Retrieves detailed information about a specific country.
- `GET /countries`: Retrieves a list of countries based on filters and sorting with pagination.

## Error Handling

The API includes error handling for cases where the REST Countries API request fails or returns an error. Additionally, it provides authentication error handling.

## Contributing

Contributions are welcome! If you have any improvements or bug fixes, feel free to open a pull request.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

