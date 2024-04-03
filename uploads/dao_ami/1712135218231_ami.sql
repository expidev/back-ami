-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 25, 2024 at 12:09 PM
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
  `id_ami` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `date_validation` date NOT NULL,
  PRIMARY KEY (`id_ami`),
  KEY `FK_1` (`id_admin`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ami`
--

INSERT INTO `ami` (`id_ami`, `id_admin`, `titre`, `description`, `date_validation`) VALUES
(1, 1, 'eurizur zeiur ezirujzerzee', 'erzrezrzerzerze', '2024-03-19'),
(2, 1, 'drzerezarez', 'razrezrazerzae', '2024-03-11');

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
  `type_fichier` varchar(50) DEFAULT NULL,
  `taille_fichier` varchar(20) DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  PRIMARY KEY (`id_fichier`),
  KEY `id_admin` (`id_admin`),
  KEY `id_ami` (`id_ami`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fichier`
--

INSERT INTO `fichier` (`id_fichier`, `id_admin`, `id_ami`, `nom_fichier`, `type_fichier`, `taille_fichier`, `date_upload`) VALUES
(35, 1, 'ere', '1711110558652_html CSS JS.jpg', 'image/jpeg', '6621', '2024-03-22'),
(34, 1, 'ere', '1711110526197_html CSS JS.jpg', 'image/jpeg', '6621', '2024-03-22'),
(33, 1, 'ere', 'NaNhtml CSS JS.jpg', 'image/jpeg', '6621', '2024-03-22'),
(32, 1, 'ere', 'html CSS JS.jpg_', 'image/jpeg', '6621', '2024-03-22'),
(31, 1, 'ere', 'html CSS JS.jpg', 'image/jpeg', '6621', '2024-03-22'),
(30, 1, 'ere', '5b1e02fa-aa3b-4be7-be38-f6264e7028a4_1711109541614_pgi 2.PNG', 'image/png', '7575', '2024-03-22'),
(29, 1, 'ere', '91da34be-58e7-4193-885c-7b50c6bb36dc_1711109538094_Cnd 3.PNG', 'image/png', '25302', '2024-03-22'),
(28, 1, 'ere', 'fdb84985-67c3-42b7-8d24-61a48a0ccee2_1711109538093_pgi 2.PNG', 'image/png', '7575', '2024-03-22'),
(27, 1, 'ere', '72a9ed66-44a5-4ef4-90b3-1b39c962829e_1711109171258_pgi 2.PNG', 'image/png', '7575', '2024-03-22'),
(26, 1, 'ere', 'd4e72fc1-7c24-4cbd-b65b-66872a07a847_1711109171258_pgi 2.PNG', 'image/png', '7575', '2024-03-22'),
(25, 1, 'ere', '89fc0148-b093-47a5-9165-78aefd0bf00c_1711109167217_pgi 2.PNG', 'image/png', '7575', '2024-03-22'),
(24, 1, 'ere', '462d8bfa-3130-4dff-bc62-46b2cc65401a_1711109167216_pgi 2.PNG', 'image/png', '7575', '2024-03-22'),
(23, 1, 'ere', '635999bc-10c3-44a4-afac-639960159b23_1711108975553_pgi 3PNG.PNG', 'image/png', '358926', '2024-03-22'),
(22, 1, 'ere', 'c42e322e-88fd-4c16-ad95-0dd70af9471d_1711108975552_pgi 2.PNG', 'image/png', '7575', '2024-03-22');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id_notification` int(11) NOT NULL,
  `id_ami` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_superfiseur` int(11) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_notification` date NOT NULL,
  PRIMARY KEY (`id_notification`,`id_ami`,`id_admin`,`id_superfiseur`,`id_visiteur`),
  KEY `FK_1` (`id_ami`,`id_admin`),
  KEY `FK_2` (`id_superfiseur`),
  KEY `FK_3` (`id_visiteur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `superviseur`
--

DROP TABLE IF EXISTS `superviseur`;
CREATE TABLE IF NOT EXISTS `superviseur` (
  `id_superfiseur` int(11) NOT NULL,
  `nom_superviseur` linestring NOT NULL,
  `email_superviseur` linestring NOT NULL,
  PRIMARY KEY (`id_superfiseur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `telechargement`
--

DROP TABLE IF EXISTS `telechargement`;
CREATE TABLE IF NOT EXISTS `telechargement` (
  `id_telechargement` int(11) NOT NULL,
  `id_ami` int(11) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_telechargement` date NOT NULL,
  `adresse_ip` linestring NOT NULL,
  PRIMARY KEY (`id_telechargement`,`id_ami`,`id_admin`,`id_visiteur`),
  KEY `FK_1` (`id_ami`,`id_admin`),
  KEY `FK_2` (`id_visiteur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  PRIMARY KEY (`id_visiteur`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `visiteur`
--

INSERT INTO `visiteur` (`id_visiteur`, `nom`, `prenom`, `cin_nif`, `email_entreprise`, `telephone`) VALUES
(5, 'Lorem', '', '54654054045', 'example@example.com', '0320000000'),
(6, 'EduStretch', '', '54654054045', 'nasandratra@ami.com', '0326212342'),
(7, 'dfsfsdf', '', '1213445454', 'a@gmail.com', '0320000000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
