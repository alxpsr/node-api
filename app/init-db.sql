CREATE TABLE Users (
    id SERIAL,
    _id varchar(255),
    login varchar(255),
    password varchar(255),
    age varchar(255),
    "isDeleted" boolean
);

INSERT INTO public.Users
    (_id, login, password, age, "isDeleted")
VALUES
    ('252b42b2-0866-4f6e-8866-55c30fc2d15d', 'Bobby', 'qwety12sd34', 23, FALSE),
    ('b89c479c-6cf5-4a54-bdff-3676f1ddb7f3', 'John', 'qwety12sd34', 32, FALSE),
    ('07a14915-cbf8-4762-97f2-9417296dc929', 'Barry', 'qwety12sd34', 45, FALSE),
    ('ffc48537-d0a1-4094-b7e9-ecf167b28687', 'Tom', 'qwety12sd34', 22, FALSE),
    ('dd549343-65e3-4b1b-add4-0705f31acb11', 'Sivakumar', 'qwety12sd34', 51, FALSE);