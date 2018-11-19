# ************************************************************
# Sequel Pro SQL dump
# Version 5224
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.12)
# Database: college-event
# Generation Time: 2018-11-19 05:24:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Admins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Admins`;

CREATE TABLE `Admins` (
  `admin_id` varchar(100) NOT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Admins` WRITE;
/*!40000 ALTER TABLE `Admins` DISABLE KEYS */;

INSERT INTO `Admins` (`admin_id`)
VALUES
	('7mhLP4qLivXuEITghdOFsaD01TJ3'),
	('8YtIMU7iPIQufY7Zvr2K0HyvuaG2'),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3'),
	('bGJuN5e4ymSbeQFv9wnVmztXOaR2'),
	('eOwLxiK3YWdRO2szLelHLbFVsAG3'),
	('gi8gfsXzIZUeKnWCYlrWKZLYZTQ2'),
	('Z2xL96VfByRDlwpHsdUcatlH1Mj2');

/*!40000 ALTER TABLE `Admins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table RSO_membership
# ------------------------------------------------------------

DROP TABLE IF EXISTS `RSO_membership`;

CREATE TABLE `RSO_membership` (
  `student_id` varchar(100) NOT NULL,
  `rso_id` int(11) NOT NULL,
  PRIMARY KEY (`student_id`,`rso_id`),
  KEY `rso_id` (`rso_id`),
  CONSTRAINT `rso_membership_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`uid`),
  CONSTRAINT `rso_membership_ibfk_2` FOREIGN KEY (`rso_id`) REFERENCES `rsos` (`rso_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `RSO_membership` WRITE;
/*!40000 ALTER TABLE `RSO_membership` DISABLE KEYS */;

INSERT INTO `RSO_membership` (`student_id`, `rso_id`)
VALUES
	('7YD1mnxLbtUR0T9Ojjfh1hRCDLH2',1),
	('CUlONgjDAacdXSi1JpDXQ0NX1aF2',1),
	('dg6zBstoP0gRtk2ExPj49NXgZ3X2',1),
	('Lf1CFtM4FqZznwA7RuILKGT8W5w2',1),
	('SEmNWK0FxzfVzLESZl572Tnlrkq2',1),
	('7mhLP4qLivXuEITghdOFsaD01TJ3',9),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3',9),
	('FjD6z5qH5XejIGnKSuwEqWXXISE3',9),
	('Lz06QvpZyhfjqpLgyGDV1E51Ety2',9),
	('qp5w2FlPUdMQUiqfewiUx7Tnnpv2',9),
	('7mhLP4qLivXuEITghdOFsaD01TJ3',10),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3',10),
	('FjD6z5qH5XejIGnKSuwEqWXXISE3',10),
	('Lz06QvpZyhfjqpLgyGDV1E51Ety2',10),
	('qp5w2FlPUdMQUiqfewiUx7Tnnpv2',10),
	('Z2xL96VfByRDlwpHsdUcatlH1Mj2',10),
	('8YtIMU7iPIQufY7Zvr2K0HyvuaG2',11),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3',11),
	('dGfz6j9lsGNuo50zvSTx0RTiA6a2',11),
	('eOwLxiK3YWdRO2szLelHLbFVsAG3',11),
	('FjD6z5qH5XejIGnKSuwEqWXXISE3',11),
	('Lz06QvpZyhfjqpLgyGDV1E51Ety2',11),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3',12),
	('dGfz6j9lsGNuo50zvSTx0RTiA6a2',12),
	('eOwLxiK3YWdRO2szLelHLbFVsAG3',12),
	('FjD6z5qH5XejIGnKSuwEqWXXISE3',12),
	('qp5w2FlPUdMQUiqfewiUx7Tnnpv2',12),
	('7mhLP4qLivXuEITghdOFsaD01TJ3',13),
	('8YtIMU7iPIQufY7Zvr2K0HyvuaG2',13),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3',13),
	('dGfz6j9lsGNuo50zvSTx0RTiA6a2',13),
	('eOwLxiK3YWdRO2szLelHLbFVsAG3',13),
	('FjD6z5qH5XejIGnKSuwEqWXXISE3',13),
	('Lz06QvpZyhfjqpLgyGDV1E51Ety2',13),
	('7mhLP4qLivXuEITghdOFsaD01TJ3',14),
	('8YtIMU7iPIQufY7Zvr2K0HyvuaG2',14),
	('FjD6z5qH5XejIGnKSuwEqWXXISE3',14),
	('Lz06QvpZyhfjqpLgyGDV1E51Ety2',14),
	('QbYxSXAROsbORnbTbnPzz4r9Du82',14),
	('qp5w2FlPUdMQUiqfewiUx7Tnnpv2',14);

/*!40000 ALTER TABLE `RSO_membership` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table RSOs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `RSOs`;

CREATE TABLE `RSOs` (
  `admin_id` varchar(100) NOT NULL,
  `rso_name` varchar(100) NOT NULL,
  `university` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `rso_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rso_id`),
  UNIQUE KEY `university` (`university`,`rso_name`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `rsos_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `RSOs` WRITE;
/*!40000 ALTER TABLE `RSOs` DISABLE KEYS */;

INSERT INTO `RSOs` (`admin_id`, `rso_name`, `university`, `description`, `rso_id`)
VALUES
	('gi8gfsXzIZUeKnWCYlrWKZLYZTQ2','ACM-W','University of Florida','ACM-W exists to foster a supportive community for women technologists.',1),
	('gi8gfsXzIZUeKnWCYlrWKZLYZTQ2','Society of Women Engineers','University of Florida','Society of Women Engineers support women engineering.',2),
	('7mhLP4qLivXuEITghdOFsaD01TJ3','name','University of Central Florida','description',9),
	('Z2xL96VfByRDlwpHsdUcatlH1Mj2','Tennis Club','University of Central Florida','Uniting people who love tennis at UCF!',10),
	('eOwLxiK3YWdRO2szLelHLbFVsAG3','A new RSO','University of Central Florida','a brand new RSO',11),
	('eOwLxiK3YWdRO2szLelHLbFVsAG3','A great RSO','University of Central Florida','A really really great RSO',12),
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3','An RSO that I love','University of Central Florida','This RSO is so awesome!',13),
	('8YtIMU7iPIQufY7Zvr2K0HyvuaG2','Graphic Design Student Association','University of Central Florida','GDSA is a student run organization at the University of Central Florida. As a group we strive to open up a dialogue about contemporary design practice to students through a series of discussions, speakers, tutorials and other related events. GDSA is a platform for students to further their knowledge of design beyond the classroom, and to share ideas and collaborate with other like minded individuals. ',14);

/*!40000 ALTER TABLE `RSOs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Superadmins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Superadmins`;

CREATE TABLE `Superadmins` (
  `superadmin_id` varchar(100) NOT NULL,
  PRIMARY KEY (`superadmin_id`),
  CONSTRAINT `superadmins_ibfk_1` FOREIGN KEY (`superadmin_id`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Superadmins` WRITE;
/*!40000 ALTER TABLE `Superadmins` DISABLE KEYS */;

INSERT INTO `Superadmins` (`superadmin_id`)
VALUES
	('aZGhRZnWdHY2P9iEY7uM34gXCKA3');

/*!40000 ALTER TABLE `Superadmins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `uid` varchar(100) NOT NULL,
  `university` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`firstName`, `lastName`, `email`, `uid`, `university`)
VALUES
	('student','At UF','student@uf.edu','2qfajbm94JXAY7qzaF9n0BoRXu02','University of Florida'),
	('Jenny','Dang','jennydang@ucf.edu','7mhLP4qLivXuEITghdOFsaD01TJ3','University of Central Florida'),
	('student5','uf','student5@uf.edu','7YD1mnxLbtUR0T9Ojjfh1hRCDLH2','student5@uf.edu'),
	('Sad','Stewart','sadstewart@ucf.edu','8YtIMU7iPIQufY7Zvr2K0HyvuaG2','University of Central Florida'),
	('Huong','Dang','huongd97@gmail.com','aZGhRZnWdHY2P9iEY7uM34gXCKA3','University of Central Florida'),
	('Huong','Dang','huong@fsu.edu','bGJuN5e4ymSbeQFv9wnVmztXOaR2','Florida State University'),
	('student2','uf','student2@uf.edu','CUlONgjDAacdXSi1JpDXQ0NX1aF2','University of Florida'),
	('student3','uf','student3@uf.edu','dg6zBstoP0gRtk2ExPj49NXgZ3X2','University of Florida'),
	('Funny','Sam','funnysam@ucf.edu','dGfz6j9lsGNuo50zvSTx0RTiA6a2','University of Central Florida'),
	('Bored','Smith','boredsmith@ucf.edu','eOwLxiK3YWdRO2szLelHLbFVsAG3','University of Central Florida'),
	('Tiffany','Hwang','tiffanyhwang@ucf.edu','FjD6z5qH5XejIGnKSuwEqWXXISE3','University of Central Florida'),
	('UF','Admin','admin@uf.edu','gi8gfsXzIZUeKnWCYlrWKZLYZTQ2','University of Florida'),
	('Huong','Dang','huong@uf.edu','HmIYKjmPmrY1H9babReo2iKywWT2','University of Florida'),
	('Student','At FSU','student@fsu.edu','KnGpxs68grbK3c2267XffwAQRSH2','Florida State University'),
	('student4','uf','student4@uf.edu','Lf1CFtM4FqZznwA7RuILKGT8W5w2','University of Florida'),
	('Jessica','Jung','jessicajung@ucf.edu','Lz06QvpZyhfjqpLgyGDV1E51Ety2','University of Central Florida'),
	('Spooky','Samantha','spookysamantha@ucf.edu','QbYxSXAROsbORnbTbnPzz4r9Du82','University of Central Florida'),
	('Huss','Tam','husstam@ucf.edu','qp5w2FlPUdMQUiqfewiUx7Tnnpv2','University of Central Florida'),
	('student1','uf','student1@uf.edu','SEmNWK0FxzfVzLESZl572Tnlrkq2','University of Florida'),
	('Angry','Steve','angrysteve@ucf.edu','XYXDUgpbQ1SJiMBayNTdtjyNc0i1','University of Central Florida'),
	('admin2','admin2@uf.edu','admin2@uf.edu','YsoolgzF2rWWeKEJfruUaCb0Czx2','University of Florida'),
	('admin','At UCF','admin@ucf.edu','Z2xL96VfByRDlwpHsdUcatlH1Mj2','University of Central Florida');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
