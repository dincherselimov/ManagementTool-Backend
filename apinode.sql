-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2024 at 10:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apinode`
--

-- --------------------------------------------------------

--
-- Table structure for table `time_report`
--

CREATE TABLE `time_report` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `total_hours_for_day` varchar(250) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `time_report`
--

INSERT INTO `time_report` (`id`, `user_id`, `name`, `start_time`, `end_time`, `total_hours_for_day`, `date`, `description`) VALUES
(50, 8, 'Dincher Selimov', '08:30:00', '16:30:00', '8', '2024-06-02', 'Working on the API for the Transactions '),
(51, 8, 'Dinito', '02:01:00', '14:01:00', '11', '2024-06-12', 'asdsa'),
(52, 10, 'sinem', '08:00:00', '17:00:00', '8', '2024-06-02', 'hggjhhggh');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'TestUser', 'test@gmail.com', '$2b$10$2.TiaYTfFo00wCvVee2xe.aq7Q9RXpceTXvtT0tSojDu76ByTY4/i'),
(6, 'test113c222om', 'Test@gmailasd.com', '$2b$10$wVUgn6g/SQKOe1CUohTtdexXczYw9gV9fHGNdNFbil74r5Zqb5SRS'),
(7, 'test113c222om', 'Test@gmailasd.com', '$2b$10$zROHmvbS8uunZToNNjRzf.2m6L3PP0m5fffCjE1XAh2RK/rUM3Tv2'),
(8, 'dinko', 'dinko@gmail.com', '$2b$10$zJVwa9IlsWUkMouVkWn1cecPIJxLFxqGdVESbdvx5CKOcRMofNtSK'),
(9, 'Ivan', 'Ivan@gmail.com', '$2b$10$I3uzdrCfk.38hOuSqlQJaucetMxM0RKkABwUmvVgx1smBByab.Dce'),
(10, 'sinem', 'sinemmustafova497@gmail.com', '$2b$10$tZ1B9Sit90o0GWJ78oP6c.FOJxpiIWvxFKpWoEVkiiWYFvpVuV.Hu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `time_report`
--
ALTER TABLE `time_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `time_report`
--
ALTER TABLE `time_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `time_report`
--
ALTER TABLE `time_report`
  ADD CONSTRAINT `time_report_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
