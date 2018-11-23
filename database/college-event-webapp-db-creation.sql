create database `college-event`;

use `college-event`;

create table `Users` (
  `firstName` VARCHAR(100),
  `lastName` VARCHAR(100),
  `email` VARCHAR(300) UNIQUE,
  `uid` VARCHAR(100) UNIQUE,
  `university` VARCHAR(100),
  primary key (`uid`)
);

create table `Admins` (
  `admin_id` VARCHAR(100),
  primary key (`admin_id`),
  foreign key (`admin_id`) references `Users` (`uid`)
);

create table `Superadmins` (
  `superadmin_id` VARCHAR(100),
  primary key (`superadmin_id`),
  foreign key (`superadmin_id`) references `Users` (`uid`)
);

create table `RSOs` (
  `admin_id` VARCHAR(100) not null,
  `rso_name` VARCHAR(100) not null,
  `university` VARCHAR(100) not null,
  `description` LONGTEXT not null,
  `rso_id` INTEGER AUTO_INCREMENT,
  primary key (`rso_id`),
  foreign key (`admin_id`) references `Admins` (`admin_id`),
  unique (`university`, `rso_name`)
);

create table `RSO_membership` (
  `student_id` VARCHAR(100),
  `rso_id` INTEGER,
  primary key (`student_id`, `rso_id`),
  foreign key (`student_id`) references `Users` (`uid`),
  foreign key (`rso_id`) references `RSOs` (`rso_id`)
);

create table Events (
	event_id int auto_increment,
	event_location int not null,
	event_name varchar(100),
	event_time timestamp not null,
	event_description text,
	primary key (event_id),
	unique (event_location, event_time),
	foreign key (event_location) references Locations(location_id)
);

create table Public_events (
	public_event_id int,
	approved boolean not null,
	admin_id varchar(100) not null,
	primary key (public_event_id),
	foreign key (public_event_id) references Events(event_id)
);

create table Private_events (
  private_event_id int,
	admin_id varchar(100) not null,
	primary key (private_event_id),
	foreign key (private_event_id) references Events(event_id)
);

create table RSO_events (
  rso_event_id int,
	admin_id varchar(100) not null,
  rso_id int not null,
	primary key (rso_event_id),
	foreign key (rso_event_id) references Events(event_id),
  foreign key (rso_id) references RSOs(rso_id)
);

create table Comments (
  userID varchar(100),
  eventID int,
  content text,
  rating int,
  dateUpdated timestamp,
  primary key (userID, eventID),
  foreign key (userID) references Users(uid),
  foreign key (eventID) references Events(event_id)
);

create table Locations (
	location_id int auto_increment,
	location_name varchar(100) not null,
	university varchar(100) not null,
	longitude float not null,
	latitude float not null,
	primary key (location_id),
	unique(longitude, latitude)
);