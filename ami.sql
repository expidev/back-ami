-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 17, 2024 at 09:01 AM
-- Server version: 5.7.31
-- PHP Version: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ami`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`) VALUES
(1, 'Nas', 'Harivonjy', 'nasandratra.access4@gmail.com', 'ami');

-- --------------------------------------------------------

--
-- Table structure for table `ami`
--

DROP TABLE IF EXISTS `ami`;
CREATE TABLE IF NOT EXISTS `ami` (
  `id_ami` varchar(20) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `date_validation` date NOT NULL,
  PRIMARY KEY (`id_ami`),
  KEY `FK_1` (`id_admin`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ami`
--

INSERT INTO `ami` (`id_ami`, `id_admin`, `description`, `date_validation`) VALUES
('EFE/2025', 1, '', '2024-04-17');

-- --------------------------------------------------------

--
-- Table structure for table `fichier`
--

DROP TABLE IF EXISTS `fichier`;
CREATE TABLE IF NOT EXISTS `fichier` (
  `id_fichier` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) DEFAULT NULL,
  `id_ami` varchar(70) DEFAULT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `type_fichier` varchar(100) DEFAULT NULL,
  `taille_fichier` varchar(20) DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  PRIMARY KEY (`id_fichier`),
  KEY `id_admin` (`id_admin`),
  KEY `id_ami` (`id_ami`)
) ENGINE=MyISAM AUTO_INCREMENT=184 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superviseur`
--

DROP TABLE IF EXISTS `superviseur`;
CREATE TABLE IF NOT EXISTS `superviseur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `id_ami` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ami` (`id_ami`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `superviseur`
--

INSERT INTO `superviseur` (`id`, `nom`, `email`, `id_ami`) VALUES
(36, 'English', 'englishp.mada@gmail.com', 'EFE/2025'),
(35, 'Edustretch', 'har21055@byui.edu', 'EFE/2025');

-- --------------------------------------------------------

--
-- Table structure for table `telechargement`
--

DROP TABLE IF EXISTS `telechargement`;
CREATE TABLE IF NOT EXISTS `telechargement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_ami` varchar(50) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_telechargement` date NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`id_ami`,`id_visiteur`),
  KEY `FK_1` (`id_ami`),
  KEY `FK_2` (`id_visiteur`)
) ENGINE=MyISAM AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `visiteur`
--

DROP TABLE IF EXISTS `visiteur`;
CREATE TABLE IF NOT EXISTS `visiteur` (
  `id_visiteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(70) NOT NULL,
  `prenom` varchar(70) DEFAULT NULL,
  `cin_nif` varchar(70) NOT NULL,
  `email_entreprise` varchar(50) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_visiteur`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `visiteur`
--

INSERT INTO `visiteur` (`id_visiteur`, `nom`, `prenom`, `cin_nif`, `email_entreprise`, `telephone`, `count`) VALUES
(18, 'Edustretch', 'Diris', '1213445454', 'nasandratra.access4@gmail.com', '0320000000', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
