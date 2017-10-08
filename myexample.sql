CREATE DATABASE  IF NOT EXISTS `myexample` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `myexample`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto incrementing user_id of each user, unique index',
  `user_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s name, unique',
  `user_password_hash` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'user''s password in salted and hashed format',
  `user_email` varchar(254) COLLATE utf8_unicode_ci NOT NULL COMMENT 'user''s email, unique',
  `user_active` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'user''s activation status',
  `user_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'user''s deletion status',
  `user_account_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'user''s account type (basic, premium, etc)',
  `user_has_avatar` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 if user has a local avatar, 0 if not',
  `user_creation_timestamp` bigint(20) DEFAULT NULL COMMENT 'timestamp of the creation of user''s account',
  `user_suspension_timestamp` bigint(20) DEFAULT NULL COMMENT 'Timestamp till the end of a user suspension',
  `user_last_login_timestamp` bigint(20) DEFAULT NULL COMMENT 'timestamp of user''s last login',
  `user_failed_logins` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'user''s failed login attempts',
  `user_last_failed_login` int(10) DEFAULT NULL COMMENT 'unix timestamp of last failed login attempt',
  `user_password_reset_hash` char(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'user''s password reset code',
  `user_password_reset_timestamp` bigint(20) DEFAULT NULL COMMENT 'timestamp of the password reset request',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='user data';

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (25,'demo','eyJhbGciOiJIUzI1NiJ9.YWRtaW5kZW1v.cg0tdDCsMDmaM96-Q3HMGSj115n-ebe_G1omYsAkQfI','demo@demo.com',1,0,1,0,1504643704,NULL,NULL,0,NULL,NULL,NULL),(26,'demo2','eyJhbGciOiJIUzI1NiJ9.c3VwZXJ1c2VyZGVtbw.kX5kefoDVpvbRxlJBsKVsl6dneTpRh2w_FbPaEwi5K0','demo2@demo.com',1,0,2,0,1504643746,NULL,1507055404,0,NULL,NULL,NULL),(27,'demo3','eyJhbGciOiJIUzI1NiJ9.dXNlcmRlbW8.-xwYYztbTm1icmUN87dTD1OOwmIxTqTfPvKUvFYOEw8','demo3@demo.com',1,0,3,0,1504643780,NULL,NULL,0,NULL,NULL,NULL);
UNLOCK TABLES;

