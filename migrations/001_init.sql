-- 001_init: users, customers, offers

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  mobile       VARCHAR(10) UNIQUE NOT NULL,
  dob          DATE NOT NULL,
  wedding_date DATE,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offers (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  type       VARCHAR(50) NOT NULL,
  value      NUMERIC(10,2),
  detail     TEXT DEFAULT '',
  date_from  DATE,
  date_to    DATE,
  days       TEXT[] NOT NULL DEFAULT '{}',
  time_from  TIME,
  time_to    TIME,
  status     VARCHAR(10) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
