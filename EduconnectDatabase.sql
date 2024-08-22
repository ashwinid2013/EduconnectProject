CREATE DATABASE  IF NOT EXISTS `educonnectdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `educonnectdb`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: educonnectdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic_year`
--

DROP TABLE IF EXISTS `academic_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_year` (
  `yid` int NOT NULL AUTO_INCREMENT,
  `year_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`yid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_year`
--

LOCK TABLES `academic_year` WRITE;
/*!40000 ALTER TABLE `academic_year` DISABLE KEYS */;
INSERT INTO `academic_year` VALUES (1,'2024-25');
/*!40000 ALTER TABLE `academic_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `areaid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `cityid` int DEFAULT NULL,
  PRIMARY KEY (`areaid`),
  KEY `cityid_fk_idx` (`cityid`),
  CONSTRAINT `cityid_fk` FOREIGN KEY (`cityid`) REFERENCES `city` (`cityid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,'kothrud','411038',1),(2,'Viman nagar','411014',1),(3,'Deccan','411004',1),(4,'pimpri-chichwad','411012',1),(5,'karve nagar','411052',1),(6,'hadapsar','411028',1),(7,'kharadi','411014',1);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `cityid` int NOT NULL AUTO_INCREMENT,
  `cityname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cityid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Pune');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_student`
--

DROP TABLE IF EXISTS `class_student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_student` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `sid` int DEFAULT NULL,
  `yid` int DEFAULT NULL,
  `std_id` int DEFAULT NULL,
  PRIMARY KEY (`cid`),
  KEY `yid_fk_idx` (`yid`),
  KEY `std_id_fk_idx` (`std_id`),
  KEY `sid_fk_idx` (`sid`),
  CONSTRAINT `sid_fk` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`),
  CONSTRAINT `std_id_fk` FOREIGN KEY (`std_id`) REFERENCES `standard` (`std_id`),
  CONSTRAINT `yid_fk` FOREIGN KEY (`yid`) REFERENCES `academic_year` (`yid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_student`
--

LOCK TABLES `class_student` WRITE;
/*!40000 ALTER TABLE `class_student` DISABLE KEYS */;
INSERT INTO `class_student` VALUES (1,1,1,7),(2,2,1,8),(3,3,1,2),(4,4,1,4),(5,5,1,3),(6,6,1,6),(7,7,1,9),(8,8,1,1),(9,9,1,3),(10,10,1,5),(11,7,1,4),(14,18,1,7);
/*!40000 ALTER TABLE `class_student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_sub_teacher`
--

DROP TABLE IF EXISTS `class_sub_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_sub_teacher` (
  `cst_id` int NOT NULL AUTO_INCREMENT,
  `std_id` int DEFAULT NULL,
  `sub_id` int DEFAULT NULL,
  `tid` int DEFAULT NULL,
  `yid` int DEFAULT NULL,
  PRIMARY KEY (`cst_id`),
  KEY `stdid_fk_index` (`std_id`),
  KEY `subid_fk_index` (`sub_id`),
  KEY `tid_fk_index` (`tid`),
  KEY `yid_fk_index` (`yid`),
  KEY `stdid_idx` (`std_id`),
  KEY `subid_idx` (`sub_id`),
  KEY `tid_idx` (`tid`),
  KEY `yid_idx` (`yid`),
  CONSTRAINT `stdid_fk` FOREIGN KEY (`std_id`) REFERENCES `standard` (`std_id`),
  CONSTRAINT `subid_fk` FOREIGN KEY (`sub_id`) REFERENCES `subject` (`sub_id`),
  CONSTRAINT `tid_fk` FOREIGN KEY (`tid`) REFERENCES `user` (`uid`),
  CONSTRAINT `yearid_fk` FOREIGN KEY (`yid`) REFERENCES `academic_year` (`yid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_sub_teacher`
--

LOCK TABLES `class_sub_teacher` WRITE;
/*!40000 ALTER TABLE `class_sub_teacher` DISABLE KEYS */;
INSERT INTO `class_sub_teacher` VALUES (1,8,5,4,1),(2,2,2,2,1),(4,8,4,3,1),(5,2,1,2,1),(6,4,1,2,1),(7,6,2,12,1),(8,7,2,12,1),(9,3,2,12,1),(10,1,3,15,1),(11,5,4,2,1),(12,9,7,14,1),(13,10,7,14,1),(16,10,2,4,1),(17,4,5,15,1);
/*!40000 ALTER TABLE `class_sub_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homework`
--

DROP TABLE IF EXISTS `homework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homework` (
  `hid` int NOT NULL AUTO_INCREMENT,
  `std_id` int DEFAULT NULL,
  `tid` int DEFAULT NULL,
  `sub_id` int DEFAULT NULL,
  `assign_date` datetime(6) DEFAULT NULL,
  `submission_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hid`),
  KEY `std_id_idx` (`std_id`),
  KEY `home_tid_idx` (`tid`),
  KEY `sub_id_idx` (`sub_id`),
  KEY `home_std_id_fk_idx` (`std_id`),
  KEY `home_tid_fk_index` (`tid`),
  KEY `home_sub_id_fk_idx` (`sub_id`),
  CONSTRAINT `home_studid_fk` FOREIGN KEY (`std_id`) REFERENCES `standard` (`std_id`),
  CONSTRAINT `home_subid_fk` FOREIGN KEY (`sub_id`) REFERENCES `subject` (`sub_id`),
  CONSTRAINT `home_tid_fk` FOREIGN KEY (`tid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homework`
--

LOCK TABLES `homework` WRITE;
/*!40000 ALTER TABLE `homework` DISABLE KEYS */;
INSERT INTO `homework` VALUES (1,7,12,2,'2024-08-17 05:30:00.000000','2024-08-20 05:30:00.000000','Description'),(5,5,2,4,'2024-08-19 05:30:00.000000','2024-08-21 05:30:00.000000','Write 5 sentences for all tenses'),(6,2,2,1,'2024-08-16 05:30:00.000000','2024-08-19 05:30:00.000000','Complete  Assignment 1'),(7,4,2,1,'2024-08-15 05:30:00.000000','2024-08-20 05:30:00.000000','List prime numbers'),(8,5,2,4,'2024-08-22 05:30:00.000000','2024-08-23 05:30:00.000000','Complete assignment 2'),(9,2,2,2,'2024-08-17 05:30:00.000000','2024-08-19 05:30:00.000000','complete chapter 3'),(10,2,2,2,'2024-08-17 05:30:00.000000','2024-08-19 05:30:00.000000','complete chapter1 questions');
/*!40000 ALTER TABLE `homework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marks` (
  `mark_id` int NOT NULL AUTO_INCREMENT,
  `stud_id` int DEFAULT NULL,
  `sub_id` int DEFAULT NULL,
  `yid` int DEFAULT NULL,
  `tid` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `obtainedmarks` float NOT NULL,
  `std_id` int DEFAULT NULL,
  PRIMARY KEY (`mark_id`),
  KEY `marks_studid_idx` (`stud_id`),
  KEY `marks_tid_idx` (`tid`),
  KEY `marks_subid_idx` (`sub_id`),
  KEY `marks_yearid_idx` (`yid`),
  KEY `marks_studid_fk_index` (`stud_id`),
  KEY `marks_tid_fk_index` (`tid`),
  KEY `marks_subid_fk_index` (`sub_id`),
  KEY `marks_yearid_fk_index` (`yid`),
  KEY `marks_typeid_fk_idx` (`type_id`),
  KEY `FKhp93fl7xk0s92f0nc2h0ar9f9` (`std_id`),
  CONSTRAINT `FKhp93fl7xk0s92f0nc2h0ar9f9` FOREIGN KEY (`std_id`) REFERENCES `standard` (`std_id`),
  CONSTRAINT `marks_studid_fk` FOREIGN KEY (`stud_id`) REFERENCES `student` (`sid`),
  CONSTRAINT `marks_subid_fk` FOREIGN KEY (`sub_id`) REFERENCES `subject` (`sub_id`),
  CONSTRAINT `marks_tid_fk` FOREIGN KEY (`tid`) REFERENCES `user` (`uid`),
  CONSTRAINT `marks_typeid_fk` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`),
  CONSTRAINT `marks_yearid_fk` FOREIGN KEY (`yid`) REFERENCES `academic_year` (`yid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES (1,3,2,1,2,'Good',1,18,2),(2,4,1,1,2,'Very Good',2,19,4),(3,3,3,1,2,'Very Good',1,20,2),(4,4,3,1,2,'good',1,15,2),(5,10,4,1,2,'good',3,80,5),(6,3,2,1,2,'',1,13,2),(7,3,2,1,2,'Good',1,15,2);
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Teacher'),(3,'Parent');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standard`
--

DROP TABLE IF EXISTS `standard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standard` (
  `std_id` int NOT NULL AUTO_INCREMENT,
  `std_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`std_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standard`
--

LOCK TABLES `standard` WRITE;
/*!40000 ALTER TABLE `standard` DISABLE KEYS */;
INSERT INTO `standard` VALUES (1,'1st'),(2,'2nd'),(3,'3rd'),(4,'4th'),(5,'5th'),(6,'6th'),(7,'7th'),(8,'8th'),(9,'9th'),(10,'10th');
/*!40000 ALTER TABLE `standard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `mname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `pid_fk_idx` (`pid`),
  CONSTRAINT `pid_fk` FOREIGN KEY (`pid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Anita','Saroj','Kabra',5,'2012-04-04','Female','A+'),(2,'Suraj','Atul','Patil',6,'2011-09-14','Male','B-'),(3,'Minal','Ashish','Sonar',7,'2017-10-09','Female','O+'),(4,'meena','Ashish','Jadhav',12,'2015-11-07','Female','AB+'),(5,'Nikhil','Kunal','Chaudhari',9,'2016-07-19','Male','A+'),(6,'Manoj','Sainath','Mahajan',11,'2013-05-11','Male','AB+'),(7,'Kajal','Paresh','Mote',17,'2010-03-27','Female','B+'),(8,'Prema','Shankar','Shinde',10,'2018-01-23','Female','O-'),(9,'Mrunal','Atul','Patil',6,'2016-03-15','Female','AB+'),(10,'Prajakta','Paresh','Mote',NULL,'2014-04-12','Female','B+'),(11,'Nihal','Vishal','Thale',NULL,'2012-04-04','Male','O+'),(12,'Sarvesh','Ashish','Sonar',7,'2011-09-14','Male','B+'),(13,'Saloni','Mahesh','Sing',NULL,'2016-07-19','Female','AB+'),(14,'Aashlesh','Vaibhav','Kale',NULL,'2017-10-09','Female','A+'),(15,'Prabhath','Mahesh','Sing',NULL,'2015-11-07','Male','A+'),(16,'Nupur','Rajesh','Kadam',NULL,'2011-09-14','Female','AB+'),(17,'Megha','Suresh','Sagavkar',NULL,'2013-05-11','Female','A+'),(18,'Suraj','Ajit','Patil',21,'2014-04-12','Male','AB+'),(19,'Suraksha','Ram','Warge',NULL,'2013-05-11','Female','O+'),(20,'Kiran','vaibhav','Kale',NULL,'2018-01-23','Male','B+');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'Social Science'),(2,'Maths'),(3,'Hindi'),(4,'English'),(5,'Science'),(7,'Marathi'),(9,'Drawing'),(10,'craft');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) DEFAULT NULL,
  `marks` int DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Unit Test 1',20),(2,'Unit Test 2',20),(3,'Semester -1',100),(4,'Semester -2',100);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `rid` int DEFAULT NULL,
  `areaid` int DEFAULT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `areaid_fk_idx` (`areaid`),
  KEY `rid_fk_idx` (`rid`),
  CONSTRAINT `areaid_fk` FOREIGN KEY (`areaid`) REFERENCES `area` (`areaid`),
  CONSTRAINT `FK8079530ngl61ed971pmagese0` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `rid_fk` FOREIGN KEY (`rid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','admin@123','Ashok','Jadhav','Plot no-15,mina sadhan ','ashokjadhav17@gmail.com','9237569976',1,3,_binary ''),(2,'Seema30','Seema@30','Seema','Mehra','Plot no-10,Kautul niwas','seemamehra29@gmail.com','9876593890',2,4,_binary ''),(3,'Mital18','mital@18','Mital','Puranik','yashlakshmi apartment','mitalpuranik18@gmail.com','8976977543',2,6,_binary ''),(4,'Manish','manish@123','Manish','khede','tulsi sadan,lane no3','manish14@gmail.com','9678273986',2,5,_binary ''),(5,'Saroj19','saroj@19','Saroj','kabra','3rd floor,mitali apartment','sarojkabra19@gmail.com','8796050324',3,6,_binary ''),(6,'atul09','atul@09','Atul','Patil','5th floor,tulsiram apartment','atulpatil09@gmail.com','9867298310',3,3,_binary ''),(7,'Ashish11','Ashish@11','Ashish','Sonar','8th floor,paresh apartment','nishant12@gmail.com','8956492011',3,4,_binary ''),(8,'paresh07','paresh@07','Paresh','Mote','2nd floor,isha sadan','pareshmote07@gmail.com','9634892345',3,2,_binary ''),(9,'kunal19','kunal@19','Kunal','Chaudhari','7th floor,mohan apartment','kunalchaudhari19@gmail.com','9337902105',3,1,_binary ''),(10,'sakshi21','sakshi@21','Sakshi','Shinde','3rd floor,minal apartment','sakshishinde21@gmail.com','9238291582',3,4,_binary ''),(11,'geeta19','geeta@19','Geeta','Mahajan','lane no.2,2nd floor,minakshi sadan','geetamahajan@gmail.com','9877602918',3,1,_binary ''),(12,'Sania23','Sania@2333','Sania','jadhav','plot no-12,Meera road','saniajadhav@gmail.com','9823771982',3,3,_binary ''),(14,'Kiran14','Kiran@14','Kiran','patel','plot no-7,fc road','kiranpatel14@gmail.com','8704329198',2,3,_binary ''),(15,'Nikita123','Nikita@123','Nikita','Shinde','DecccanGymkhana','Nikita@gmail.com','9876785645',2,3,_binary ''),(17,'Sayali23','sayali23','sayali','Mane','Room no34','Sayali@gmail.com','9878567845',3,6,_binary ''),(19,'Kajal90','Kajal90','Kajal','Mishra','Rohinjan,Tapal,naka','kajal123@gmail.com','9876456734',2,1,_binary ''),(21,'Ajit15','ajit@15','Ajit','Patil','plot no-15,meera sadan','ajitpatil@gmail.com','8976589321',3,1,_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-19 12:35:36
