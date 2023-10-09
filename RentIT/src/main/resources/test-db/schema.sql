DROP TABLE IF EXISTS images, tags, products, users;

CREATE TABLE users
(
    user_id  INT AUTO_INCREMENT NOT NULL,
    email    VARCHAR(40) NOT NULL,
    f_name   VARCHAR(20) NOT NULL,
    l_name   VARCHAR(20) NOT NULL,
    location VARCHAR(40),
    phone_no VARCHAR(20),
    password BLOB        NOT NULL,
    salt     BLOB        NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE products
(
    product_id       INT AUTO_INCREMENT NOT NULL,
    name             VARCHAR(30) NOT NULL,
    description      VARCHAR(2000),
    day_price        FLOAT       NOT NULL,
    week_price       FLOAT       NOT NULL,
    month_price      FLOAT       NOT NULL,
    deposit          FLOAT,
    city             VARCHAR(30) NOT NULL,
    product_value    FLOAT,
    min_lease_period INT,
    category         VARCHAR(30) NOT NULL,
    product_status   VARCHAR(11) NOT NULL,
    rented_until     DATE,
    user_id          INT         NOT NULL,
    PRIMARY KEY (product_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE tags
(
    tag_id     INT AUTO_INCREMENT NOT NULL,
    name       VARCHAR(30) NOT NULL,
    product_id INT         NOT NULL,
    PRIMARY KEY (tag_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE images
(
    image_id   INT          NOT NULL AUTO_INCREMENT,
    image_url  VARCHAR(100) NOT NULL,
    product_id INT          NOT NULL,
    PRIMARY KEY (image_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id)
);