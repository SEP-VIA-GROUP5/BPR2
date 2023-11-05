INSERT INTO `users` (`email`, `f_name`, `l_name`, `location`, `phone_no`, `password`, `salt`) VALUES ('sigfred10@example.net', 'eaque', 'fugit', 'Nørgaard Allé 8, 1. sal. th.\n8', '+4538698799', 'a9304d69dfa099802c1a16e4e1e1424abcae3778', 'gzlr');
INSERT INTO `users` (`email`, `f_name`, `l_name`, `location`, `phone_no`, `password`, `salt`) VALUES ('orla74@example.net', 'dicta', 'quo', 'Riisskov 3, 6.\n7317 Hillerød', '+4581468584', 'a4a301ef65194bfd7c27a19263f71cce1ac396e3', 'sgps');
INSERT INTO `users` (`email`, `f_name`, `l_name`, `location`, `phone_no`, `password`, `salt`) VALUES ('vbertelsen@example.org', 'ut', 'molestiae', 'Klitgaard Allé 1 R, 8.\n8817 Ta', '+45 4166 4279', 'eae6453b087b8be735f7fe9ce2a4c08e19e22f9f', 'veuc');
INSERT INTO `users` (`email`, `f_name`, `l_name`, `location`, `phone_no`, `password`, `salt`) VALUES ('thøgersen.helmuth@example.com', 'beatae', 'quisquam', 'Vestergaardshaven 1, 4. sal.\n7', '+4593831440', '4952ac34e9a90efa2d2e843a90173a3942621412', 'dszb');
INSERT INTO `users` (`email`, `f_name`, `l_name`, `location`, `phone_no`, `password`, `salt`) VALUES ('daniel.grøn@example.com', 'dolores', 'deleniti', 'Kofodvej 4, st.\n2491 Bjergby', '52 29 21 72', '8a5debbaa9651202070e2eb351cad9bec1b88628', 'wnqv');

INSERT INTO `products` (`name`, `description`, `day_price`, `week_price`, `month_price`, `deposit`, `city`, `product_value`, `min_lease_period`, `category`, `product_status`, `rented_until`, `user_id`) VALUES ('reiciendis', 'Omnis eveniet animi temporibus a consequatur. Quia soluta vitae aspernatur consequatur aut aut. Eligendi velit nihil et temporibus.', '7.01644', '0.701001', '119318000', '101', 'Jystrup', '5', 2, '2', 'AVAILABLE', '1976-04-07', 1);
INSERT INTO `products` (`name`, `description`, `day_price`, `week_price`, `month_price`, `deposit`, `city`, `product_value`, `min_lease_period`, `category`, `product_status`, `rented_until`, `user_id`) VALUES ('vitae', 'Sit accusamus modi doloremque doloremque aperiam vitae. Iste enim earum aspernatur. Dolor enim commodi est et ut aut non quia.', '62576', '0', '2.95921', '102', 'Hurup', '0', 6, '1', 'AVAILABLE', '1999-05-27', 2);
INSERT INTO `products` (`name`, `description`, `day_price`, `week_price`, `month_price`, `deposit`, `city`, `product_value`, `min_lease_period`, `category`, `product_status`, `rented_until`, `user_id`) VALUES ('deleniti', 'Est recusandae illo et reiciendis eum minima recusandae. Quidem commodi et beatae veritatis ex dolores. Harum eligendi id quasi.', '2.3081', '196999', '0', '6', 'Vemb', '4', 7, '2', 'AVAILABLE', '2011-09-07', 3);
INSERT INTO `products` (`name`, `description`, `day_price`, `week_price`, `month_price`, `deposit`, `city`, `product_value`, `min_lease_period`, `category`, `product_status`, `rented_until`, `user_id`) VALUES ('magni', 'Rerum nostrum quibusdam magnam similique nostrum aspernatur vitae qui. Est debitis beatae sed soluta eos.', '148186000', '1.47', '0', '6', 'Rødekro', '1', 8, '9', 'AVAILABLE', '1987-04-29', 4);
INSERT INTO `products` (`name`, `description`, `day_price`, `week_price`, `month_price`, `deposit`, `city`, `product_value`, `min_lease_period`, `category`, `product_status`, `rented_until`, `user_id`) VALUES ('quo', 'Et voluptatibus quisquam qui reiciendis. Nostrum autem necessitatibus nemo a vel maxime aliquam sapiente.', '9642.98', '4.34763', '29821.8', '4', 'Trige', '6', 8, '1', 'AVAILABLE', '1987-01-11', 5);
INSERT INTO `products` (`name`, `description`, `day_price`, `week_price`, `month_price`, `deposit`, `city`, `product_value`, `min_lease_period`, `category`, `product_status`, `rented_until`, `user_id`) VALUES ('quo', 'Et voluptatibus quisquam qui reiciendis. Nostrum autem necessitatibus nemo a vel maxime aliquam sapiente.', '9642.98', '4.34763', '29821.8', '4', 'Trige', '6', 8, '1', 'RENTED', '1987-01-11', 5);

INSERT INTO `images` (`image_url`, `product_id`) VALUES ('http://kihn.net/', 1);
INSERT INTO `images` (`image_url`, `product_id`) VALUES ('http://runolfsdottirmacejkovic.com/', 1);
INSERT INTO `images` (`image_url`, `product_id`) VALUES ('http://smithamhoppe.biz/', 3);
INSERT INTO `images` (`image_url`, `product_id`) VALUES ('http://www.hansen.com/', 3);
INSERT INTO `images` (`image_url`, `product_id`) VALUES ('http://www.corwin.org/', 5);

INSERT INTO `tags` (`name`, `product_id`) VALUES ('nesciunt', 1);
INSERT INTO `tags` (`name`, `product_id`) VALUES ('perferendis', 2);
INSERT INTO `tags` (`name`, `product_id`) VALUES ('est', 3);
INSERT INTO `tags` (`name`, `product_id`) VALUES ('ut', 4);
INSERT INTO `tags` (`name`, `product_id`) VALUES ('ea', 5);

INSERT INTO `products_review` (`product_id`, `rating`, `message`, `reviewer_id`) VALUES (1, 5, 'Perfect', 1);
INSERT INTO `products_review` (`product_id`, `rating`, `message`, `reviewer_id`) VALUES (2, 4, 'Good', 2);
INSERT INTO `products_review` (`product_id`, `rating`, `message`, `reviewer_id`) VALUES (3, 3, 'Alright', 3);
INSERT INTO `products_review` (`product_id`, `rating`, `message`, `reviewer_id`) VALUES (4, 2, 'Bad', 4);
INSERT INTO `products_review` (`product_id`, `rating`, `message`, `reviewer_id`) VALUES (4, 3, 'Alright', 4);

INSERT INTO `users_review` (`user_id`, `rating`, `message`, `reviewer_id`) VALUES (1, 5, 'Perfect', 4);
INSERT INTO `users_review` (`user_id`, `rating`, `message`, `reviewer_id`) VALUES (2, 4, 'Good', 4);
INSERT INTO `users_review` (`user_id`, `rating`, `message`, `reviewer_id`) VALUES (3, 3, 'Alright', 3);
INSERT INTO `users_review` (`user_id`, `rating`, `message`, `reviewer_id`) VALUES (4, 2, 'Bad', 2);
INSERT INTO `users_review` (`user_id`, `rating`, `message`, `reviewer_id`) VALUES (4, 3, 'Alright', 1);

INSERT INTO `reported_users` (`reported_user_id`, `reporter_id`, `message`) VALUES (1, 4, 'Scammer');
INSERT INTO `reported_users` (`reported_user_id`, `reporter_id`, `message`) VALUES (2, 4, 'Disrespectful');
INSERT INTO `reported_users` (`reported_user_id`, `reporter_id`, `message`) VALUES (3, 3, 'Did not pay');
INSERT INTO `reported_users` (`reported_user_id`, `reporter_id`, `message`) VALUES (4, 2, 'Did not return item');
INSERT INTO `reported_users` (`reported_user_id`, `reporter_id`, `message`) VALUES (4, 1, 'Returned broken item');

INSERT INTO `reported_products` (`reported_product_id`, `reporter_id`, `message`) VALUES (1, 4, 'Did not look like pictures');
INSERT INTO `reported_products` (`reported_product_id`, `reporter_id`, `message`) VALUES (2, 4, 'Broken');
INSERT INTO `reported_products` (`reported_product_id`, `reporter_id`, `message`) VALUES (3, 3, 'Did not look like pictures');
INSERT INTO `reported_products` (`reported_product_id`, `reporter_id`, `message`) VALUES (4, 2, 'Did not look like pictures');
INSERT INTO `reported_products` (`reported_product_id`, `reporter_id`, `message`) VALUES (4, 1, 'Broken');