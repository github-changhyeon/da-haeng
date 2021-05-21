-- MySQL dump 10.16  Distrib 10.2.36-MariaDB, for Win64 (AMD64)
--
-- Host: dev-da-haeng.caad9ivrc0f7.ap-northeast-2.rds.amazonaws.com    Database: dahaeng
-- ------------------------------------------------------
-- Server version	10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_result`
--

DROP TABLE IF EXISTS `category_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_result` (
  `result_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `max_stage` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`result_id`),
  KEY `FK9kd0sicnkus6fn8injlv1aoua` (`category_id`),
  KEY `FKkakcdup0da3c1kaja3qfbtm63` (`user_id`),
  CONSTRAINT `FK9kd0sicnkus6fn8injlv1aoua` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKkakcdup0da3c1kaja3qfbtm63` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_result`
--

LOCK TABLES `category_result` WRITE;
/*!40000 ALTER TABLE `category_result` DISABLE KEYS */;
INSERT INTO `category_result` VALUES (1,0,1,18),(2,0,2,18),(3,3,1,19),(4,0,2,19),(5,0,1,20),(6,0,2,20),(7,1,1,21),(8,2,2,21),(9,0,1,22),(10,0,2,22),(11,0,1,23),(12,3,2,23),(13,0,1,24),(14,0,2,24),(15,5,1,25),(16,3,2,25),(17,1,1,26),(18,1,2,26),(19,5,1,27),(20,3,2,27),(21,4,1,28),(22,1,2,28),(23,2,1,29),(24,0,2,29),(25,0,1,30),(26,0,2,30),(27,0,1,31),(28,0,2,31),(29,0,1,32),(30,0,2,32),(31,1,1,33),(32,1,2,33),(33,0,1,34),(34,0,2,34),(49,1,1,42),(50,0,2,42),(51,0,1,43),(52,0,2,43),(53,2,1,44),(54,0,2,44),(55,0,1,45),(56,0,2,45),(57,5,1,46),(58,0,2,46),(59,5,1,47),(60,0,2,47),(61,0,1,48),(62,0,2,48),(63,0,1,49),(64,0,2,49),(65,0,1,50),(66,0,2,50),(67,1,1,51),(68,0,2,51),(71,0,1,53),(72,0,2,53),(73,4,1,54),(74,0,2,54);
/*!40000 ALTER TABLE `category_result` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-21  6:39:02
