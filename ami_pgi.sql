
CREATE TABLE IF NOT EXISTS `dao_ami` (
  `id_ami` int(11) NOT NULL AUTO_INCREMENT,
  `ref_ami` varchar(100) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `date_creation` date NOT NULL,
  PRIMARY KEY (`id_ami`),
  UNIQUE KEY `ref_ami` (`ref_ami`),
  KEY `FK_1` (`id_admin`)
)

INSERT INTO `dao_ami` (`id_ami`, `ref_ami`, `id_admin`, `description`, `date_creation`) VALUES
(47, 'test/2025', 5, 'ererere', '2024-06-07'),
(46, 'test/ref', 5, 'description', '2024-06-07');


CREATE TABLE IF NOT EXISTS `dao_fichier` (
  `id_fichier` int(11) NOT NULL AUTO_INCREMENT,
  `id_admin` int(11) DEFAULT NULL,
  `ref_ami` varchar(100) DEFAULT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `type_fichier` varchar(100) DEFAULT NULL,
  `taille_fichier` varchar(20) DEFAULT NULL,
  `date_upload` date DEFAULT NULL,
  PRIMARY KEY (`id_fichier`),
  KEY `id_admin` (`id_admin`),
  KEY `ref_ami` (`ref_ami`) USING BTREE
)

-- --------------------------------------------------------

--
-- Table structure for table `dao_superviseur`
--

CREATE TABLE IF NOT EXISTS `dao_superviseur` (
  `id_superviseur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `ref_ami` varchar(100) NOT NULL,
  PRIMARY KEY (`id_superviseur`),
  KEY `id_ami` (`ref_ami`)
)

--
-- Table structure for table `dao_telechargement`
--

DROP TABLE IF EXISTS `dao_telechargement`;
CREATE TABLE IF NOT EXISTS `dao_telechargement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ref_ami` varchar(50) NOT NULL,
  `id_visiteur` int(11) NOT NULL,
  `date_telechargement` date NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`ref_ami`,`id_visiteur`),
  KEY `FK_1` (`ref_ami`),
  KEY `FK_2` (`id_visiteur`)
)

-- --------------------------------------------------------

--
-- Table structure for table `dao_token`
--

DROP TABLE IF EXISTS `dao_token`;
CREATE TABLE IF NOT EXISTS `dao_token` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
)

-- --------------------------------------------------------

--
-- Table structure for table `dao_user`
--

DROP TABLE IF EXISTS `dao_user`;
CREATE TABLE IF NOT EXISTS `dao_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(70) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `type` enum('admin','visitor') NOT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`)
)

--
-- Dumping data for table `dao_user`
--

INSERT INTO `dao_user` (`id_user`, `email`, `password_hash`, `type`, `date_creation`) VALUES
(5, 'adminweb@fid.mg', '$2a$10$rgssuLxNsvezFVBnvsSkFe6PQPOX3wgAdqM5BCN.WjLQ1KdvDGvjq', 'admin', '2024-06-07 06:24:23');

-- --------------------------------------------------------

--
-- Table structure for table `dao_visiteur`
--

DROP TABLE IF EXISTS `dao_visiteur`;
CREATE TABLE IF NOT EXISTS `dao_visiteur` (
  `id_visiteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(70) NOT NULL,
  `adresse` varchar(70) DEFAULT NULL,
  `id_region` int(11) NOT NULL,
  `type` enum('entreprise','individu') NOT NULL,
  `cin_nif` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telephone1` varchar(20) NOT NULL,
  `telephone2` varchar(20) DEFAULT NULL,
  `telephone3` varchar(20) DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_visiteur`),
  KEY `fk_region` (`id_region`)
)