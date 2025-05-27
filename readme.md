Market place backend API codebase

## Project Structure

```
src/
├── config/        # Configuration files (e.g., database, environment)
├── controllers/   # Route controllers for handling requests
├── docs/          # API documentation
├── middlewares/   # Express middlewares
├── models/        # Database models and schemas
├── routes/        # API route definitions
├── services/      # Business logic and service layer
├── utils/         # Utility/helper functions
├── validations/   # Request validation logic
├── app.ts
├── index.ts
```

## Run Command

- copy and replace value in .env.example to .env file
- install: `npm i`
- Dev: `npm run dev`
- Build: `npm run build`
- Prod: `npm run start`
