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
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);

CREATE TABLE images
(
    image_id   INT          NOT NULL AUTO_INCREMENT,
    image_url  VARCHAR(100) NOT NULL,
    product_id INT          NOT NULL,
    PRIMARY KEY (image_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE
);

CREATE TABLE products_review
(
    product_review_id INT AUTO_INCREMENT NOT NULL,
    product_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    rating INT,
    message VARCHAR(500),
    PRIMARY KEY (product_review_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE users_review
(
    user_review_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    rating INT,
    message VARCHAR(500),
    PRIMARY KEY (user_review_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE reported_users
(
    user_report_id INT AUTO_INCREMENT NOT NULL,
    reported_user_id INT NOT NULL,
    reporter_id INT NOT NULL,
    message VARCHAR(500),
    PRIMARY KEY (user_report_id),
    FOREIGN KEY (reported_user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE reported_products
(
    product_report_id INT AUTO_INCREMENT NOT NULL,
    reported_product_id INT NOT NULL,
    reporter_id INT NOT NULL,
    message VARCHAR(500),
    PRIMARY KEY (product_report_id),
    FOREIGN KEY (reported_product_id) REFERENCES products (product_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE inquiries
(
    inquiry_id INT AUTO_INCREMENT NOT NULL,
    product_id INT NOT NULL,
    message VARCHAR(500),
    time_stamp DATE NOT NULL,
    sender_id INT NOT NULL,
    sender_email VARCHAR(40),
    sender_phone_no VARCHAR(20),
    receiver_id INT NOT NULL,
    viewed BOOLEAN NOT NULL,
    viewed_at DATE,
    rent_start DATE NOT NULL,
    rent_end DATE NOT NULL,
    PRIMARY KEY (inquiry_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users (user_id) ON DELETE CASCADE
);