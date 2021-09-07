CREATE TABLE `transaction` (
  `transaction_id` varchar(200) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `amount` decimal(19,2) NOT NULL,
  `transaction_type` ENUM('recieved','paid') NOT NULL,
  `party_name` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`transaction_id`),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
