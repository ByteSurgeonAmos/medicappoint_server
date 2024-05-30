-- Active: 1717079681446@@127.0.0.1@5432@medicappoint
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (
        role IN ('patient', 'provider')
    )
);

ALTER TABLE users ADD COLUMN date_enrolled DATE;

SELECT * FROM users;