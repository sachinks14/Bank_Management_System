# Bank Management System

A full-stack bank management system with separate customer and admin experiences,
built as a learning/portfolio project.

- **Backend:** Spring Boot (Java 17), MySQL (JPA/Hibernate) for accounts/users, MongoDB for
  notifications, PINs, and transaction history.
- **Frontend:** React (Vite) with React Router, Tailwind CSS.

## Features

- Customer signup and login. All self-registered accounts are plain customers by default.
- Admin dashboard: create/update/delete accounts, view an account's transaction history.
- Customer dashboard: check balance, send money (PIN-protected), create/update a PIN.
- **Approval-based permission flow.** Three actions are never applied instantly - a customer
  submits a request, and it appears in the admin's Notifications page for approval or
  rejection:
  1. Requesting admin access
  2. Requesting online banking be enabled (required before creating a PIN or sending money)
  3. Requesting an account details update (name, email, mobile number, date of birth)

  The admin can **Approve** a request (applies the change) or **Delete** it (rejects it,
  no change applied).

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Spring Boot 3, Spring Data JPA, Spring Data MongoDB |
| Relational DB | MySQL |
| Document DB | MongoDB |
| Frontend | React 19, Vite, React Router, Tailwind CSS v4 |

## Prerequisites

- Java 17+
- Maven (or use the included `mvnw`/`mvnw.cmd` wrapper)
- Node.js 18+ and npm
- A running MySQL server
- A running MongoDB server

## Setup

### 1. Configure environment variables

The backend reads its database configuration from environment variables (see
`src/main/resources/application.properties`), so no real credentials are committed to
this repo. Set these before running the app:

```bash
export DB_URL=jdbc:mysql://localhost:3306/BankManagementSystem
export DB_USERNAME=root
export DB_PASSWORD=your_mysql_password
export MONGO_URI=mongodb://localhost:27017/bankmanagement
```

On Windows PowerShell, use `$env:DB_PASSWORD="your_mysql_password"` instead.

A seed admin account is created automatically on first run (see `src/main/resources/static/data.sql`).
**Change the seeded password before deploying anywhere beyond your own machine.**

### 2. Run the backend

```bash
./mvnw spring-boot:run
```

The API runs on `http://localhost:5000/api` (see `server.port` and
`server.servlet.context-path` in `application.properties`).

### 3. Run the frontend

```bash
cd bankmanagementsystem
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default. If it starts on a different port,
update the allowed CORS origin in `src/main/java/com/student/bms/Configs/WebConfig.java`
to match.

## Project structure

```
Bank Management System/
├── pom.xml
├── src/main/java/com/student/bms/
│   ├── Controllers/       # REST controllers
│   ├── Services/          # Business logic
│   ├── Repos/             # Spring Data repositories (JPA + Mongo)
│   ├── Entity/            # JPA entities, Mongo documents, DTOs, enums
│   ├── Configs/           # CORS and Mongo auditing config
│   └── Exceptions/        # Custom exceptions
├── src/main/resources/
│   ├── application.properties
│   └── static/data.sql    # Seed admin account
└── bankmanagementsystem/  # React frontend (Vite)
    └── src/
        ├── api.js
        ├── authContext/
        └── components/
```

## Known limitations

- **There is no real authentication token yet.** Login returns basic user info, but no
  JWT (or any other token) is actually issued or verified on the backend. Every
  `Authorization` header the frontend sends is currently ignored server-side.
  This means any API endpoint can be called directly without being logged in.
  **Do not deploy this publicly without adding real authentication first** (e.g. Spring
  Security with JWT).
- Money transfers and PIN checks are enforced server-side, but there's no rate-limiting
  or lockout after repeated failed PIN attempts.

## License

Add your preferred license here (e.g. MIT) before making the repository public.
