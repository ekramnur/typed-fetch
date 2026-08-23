# typed-fetch

A small, type-safe wrapper around the Fetch API using TypeScript.

## Features

- Type-safe responses with `request<T>()`
- Supports GET, POST, PUT, and DELETE
- Typed query parameters
- JSON request bodies
- Custom headers
- Discriminated `Result<T>` union
- Errors are returned instead of thrown
- No `any` types

## Installation

```bash
npm install typed-fetch