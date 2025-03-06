-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: social_chat
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'public',
  `partner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chats_user_id_fkey` (`user_id`),
  KEY `chats_partner_id_fkey` (`partner_id`),
  CONSTRAINT `chats_partner_id_fkey` FOREIGN KEY (`partner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chats_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
INSERT INTO `chats` VALUES (1,'test',1,'2025-03-06 11:15:26.457','2025-03-06 11:15:26.457','public',NULL),(2,'qqq',1,'2025-03-06 11:18:20.666','2025-03-06 11:18:20.666','public',NULL),(3,'aaa',1,'2025-03-06 11:22:17.235','2025-03-06 11:22:17.235','public',NULL),(4,'ttt',3,'2025-03-06 11:22:55.949','2025-03-06 11:22:55.949','public',NULL),(5,'aaa',1,'2025-03-06 11:28:10.673','2025-03-06 11:28:10.673','public',NULL),(6,'ddd',3,'2025-03-06 11:28:13.522','2025-03-06 11:28:13.522','public',NULL),(7,'fff',1,'2025-03-06 11:29:28.424','2025-03-06 11:29:28.424','public',NULL),(8,'ccc',1,'2025-03-06 11:34:40.166','2025-03-06 11:34:40.166','public',NULL),(9,'zzz',1,'2025-03-06 11:38:48.561','2025-03-06 11:38:48.561','public',NULL),(10,'ggg',3,'2025-03-06 11:38:57.750','2025-03-06 11:38:57.750','public',NULL),(11,'aaaa',1,'2025-03-06 12:05:08.063','2025-03-06 12:05:08.063','public',NULL),(12,'zxczxczxc',1,'2025-03-06 12:05:11.689','2025-03-06 12:05:11.689','public',NULL),(13,'bbbbbb',3,'2025-03-06 12:05:19.228','2025-03-06 12:05:19.228','public',NULL),(14,'qqqasdzxc',3,'2025-03-06 12:05:26.853','2025-03-06 12:05:26.853','public',NULL),(15,'cfhfghewe',3,'2025-03-06 12:05:28.687','2025-03-06 12:05:28.687','public',NULL),(16,'qqq',1,'2025-03-06 12:35:58.093','2025-03-06 12:35:58.093','public',NULL),(17,'hell',3,'2025-03-06 17:10:22.947','2025-03-06 17:10:22.947','private',1),(18,'hello',1,'2025-03-06 17:10:36.697','2025-03-06 17:10:36.697','private',3),(19,'aaaa',3,'2025-03-06 18:26:13.955','2025-03-06 18:26:13.955','private',4),(20,'???',4,'2025-03-06 18:26:17.830','2025-03-06 18:26:17.830','private',3),(21,'jjkljkl',3,'2025-03-06 18:28:30.976','2025-03-06 18:28:30.976','public',NULL),(22,'bbbb',3,'2025-03-06 18:54:21.610','2025-03-06 18:54:21.610','public',NULL),(23,'kkkkkkkk',1,'2025-03-06 18:54:25.734','2025-03-06 18:54:25.734','public',NULL),(24,'kkkk',3,'2025-03-06 18:54:38.334','2025-03-06 18:54:38.334','private',1),(25,'tyutyu',1,'2025-03-06 18:54:42.477','2025-03-06 18:54:42.477','private',3),(26,'안녕하세요',3,'2025-03-06 21:14:10.444','2025-03-06 21:14:10.444','public',NULL),(27,'네네',1,'2025-03-06 21:14:16.179','2025-03-06 21:14:16.179','public',NULL),(28,'안녕하세요',3,'2025-03-06 21:14:37.958','2025-03-06 21:14:37.958','private',1),(29,'네넵',1,'2025-03-06 21:14:42.390','2025-03-06 21:14:42.390','private',3);
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@test.com','test','$2b$10$Il4phXI.NPlDvEXHgULfUOFUYWrmTqU4y6wSWzj0Z.uP5OF5FeTMK','2025-03-05 10:47:55.669','2025-03-05 10:47:55.669'),(2,'test12@test.com','test12','$2b$10$ygRCX4B4OsyEibAlpG7S8.4HZrg3zRnbGfh3rjpPzzInmoYPLqY5q','2025-03-05 11:17:56.991','2025-03-05 11:17:56.991'),(3,'test@naver.com','김정찬','$2b$10$N8XtjMy0XsPofoozesilRus8ra0p3s6uWjxXkjJGBKTHhZhknnteG','2025-03-06 08:19:22.203','2025-03-06 08:19:22.203'),(4,'qwe@qwe.com','qwe','$2b$10$Jx313Zi5kB6SCZK3aeWB8eq1RGVFgpTNxYiCIJqyiee39REL3P2sa','2025-03-06 18:14:24.895','2025-03-06 18:14:24.895'),(5,'admin@test.com','테스트','$2a$10$G/6Vp2ilidGRalrg8nxR3uJruAz6zGoH0IgUu4HZkjHruViIV1e9W','2025-03-06 21:15:20.658','2025-03-06 21:15:20.658');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-06 21:26:07
