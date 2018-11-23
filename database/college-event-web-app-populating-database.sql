insert into `Users` (`firstName`, `lastName`, `email`, `uid`, `university`)
values ('Huong', 'Dang', 'huongd97@gmail.com', 'aZGhRZnWdHY2P9iEY7uM34gXCKA3', 'University of Central Florida'),
       ('Huong', 'Dang', 'huong@fsu.edu', 'bGJuN5e4ymSbeQFv9wnVmztXOaR2', 'Florida State University'),
       ('Huong', 'Dang', 'huong@uf.edu', 'HmIYKjmPmrY1H9babReo2iKywWT2', 'University of Florida');

insert into `Admins` (`admin_id`)
values ((select `uid` from `Users` where `email` = 'huongd97@gmail.com')),
       ((select `uid` from `Users` where `email` = 'huong@fsu.edu'));

insert into `Superadmins` (`superadmin_id`)
values ((select `uid` from `Users` where `email` = 'huongd97@gmail.com'));

insert into `RSOs` (admin_id, rso_name, university, description)
values ((select `admin_id` from `Admins` a, `Users` u where u.email = 'admin@uf.edu' and u.uid = a.admin_id), 'ACM-W', (select distinct `university` from `Admins` a, `Users` u where u.email = 'huong@uf.edu'), 'ACM-W exists to foster a supportive community for women technologists.'),
       ((select `admin_id` from `Admins` a, `Users` u where u.email = 'admin@uf.edu' and u.uid = a.admin_id), 'Society of Women Engineers', (select distinct `university` from `Admins` a, `Users` u where u.email = 'admin@uf.edu'), 'Society of Women Engineers support women engineering.');

insert into `RSO_membership` (student_id, rso_id)
values ((select uid from Users u where u.email = 'student1@uf.edu'), 1),
       ((select uid from Users u where u.email = 'student2@uf.edu'), 1);

insert into `RSO_membership` (student_id, rso_id)
values ((select uid from Users u where u.email = 'student3@uf.edu'), 1),
       ((select uid from Users u where u.email = 'student4@uf.edu'), 1),
       ((select uid from Users u where u.email = 'student5@uf.edu'), 1);

# Get all the students that are member of acm-w at university of florida
select u.firstName from Users u, RSO_membership mem, RSOs r where u.uid = mem.student_id and r.university = u.university and r.rso_name = 'ACM-W';

# Get all the RSOs that the student is a member of
select r.rso_name from RSOs r, RSO_membership mem, Users u where u.email = 'student1@uf.edu' and mem.student_id = u.uid and mem.rso_id = r.rso_id and r.university = u.university;

# Get all the rsos that the student belongs to
select distinct r.`rso_name` from RSO_membership membership, RSOs r, Users u where membership.student_id = 'dg6zBstoP0gRtk2ExPj49NXgZ3X2' and membership.rso_id = r.rso_id;

# Get all the rsos from the unique university
select `rso_name` from `RSOs` r, `Users` u where u.university = 'Florida State University' and r.university = u.university;

# Get all the rsos from the University of central Florida
select * from `RSOs` r where r.university = 'University of Florida';

# Get all the rsos that I'm a member of
select * from `RSOs` r, `RSO_membership` mem, `Users` u where r.rso_id = mem.rso_id and mem.student_id = u.uid and u.uid = 'SEmNWK0FxzfVzLESZl572Tnlrkq2';

# Get all the rsos that I'm an admin of
select * from `RSOs` r, `Users` u where r.admin_id = u.uid and u.uid = 'gi8gfsXzIZUeKnWCYlrWKZLYZTQ2';


# Get all students from the same university
select * from Users u where u.university = 'University of Florida';

# Insert an admin into the database
insert into Admins (admin_id) values ((select uid from Users where email = 'admin@uf.edu'));

insert into Locations (location_name, university, longitude, latitude)
values ('Library', 'University of Central Florida', -14.45, 13.56);

insert into Locations (location_name, university, longitude, latitude)
values ('Library', 'University of Florida', -14.45, 13.57);

insert into Locations (location_name, university, longitude, latitude)
values ('Student Union', 'University of Central Florida', -15.50, 10);

insert into Locations (location_name, university, longitude, latitude)
values ('Student Union', 'University of Florida', -15.50, 11);

insert into Events (event_name, event_location, event_time, event_description)
values ('Take Back the Knight', (select location_id from Locations where university='University of Central Florida' and location_name='Library'), '2018-11-19 20:00:00', 'This event is to fundraise for the fight against human trafficking.');

insert into Public_events (public_event_id, approved, admin_id)
values ((select event_id from Events where event_name='Take Back the Knight'), true, (select a.admin_id from Admins a, Users u where u.email = 'admin@ucf.edu' and u.uid = a.admin_id));

insert into Events (event_name, event_location, event_time, event_description)
values ('Dance off', (select location_id from Locations where university='University of Central Florida' and location_name='Library'), '2018-11-19 21:00:00', 'Dancing off to fundraise for the kids!');

insert into Public_events (public_event_id, approved, admin_id)
values ((select event_id from Events where event_name='Dance off'), false, (select a.admin_id from Admins a, Users u where u.email = 'admin@ucf.edu' and u.uid = a.admin_id));

insert into Events (event_name, event_location, event_time, event_description)
values ('Movie Night', (select location_id from Locations where university='University of Florida' and location_name='Student Union'), '2018-11-19 21:00:00', 'Let\'s watch Frozen tonight!');

insert into Events (event_name, event_location, event_time, event_description)
values ('Fireworks show', (select location_id from Locations where university='University of Florida' and location_name='Student Union'), '2018-11-19 22:00:00', 'Because you\'re a firework!!! Come enjoy an end of semester firework show');

insert into Private_events (private_event_id, admin_id)
values ((select event_id from Events where event_name='Movie Night'), (select a.admin_id from Admins a, Users u where u.email='admin@uf.edu' and a.admin_id = u.uid));

insert into Private_events (private_event_id, admin_id)
values ((select event_id from Events where event_name='Fireworks show'), (select a.admin_id from Admins a, Users u where u.email='admin@uf.edu' and a.admin_id = u.uid));

insert into Events (event_name, event_location, event_time, event_description)
values ('Tailgating at UCF', (select location_id from Locations where university='University of Central Florida' and location_name='Student Union'), '2018-11-19 22:00:00', 'Let\'s tailgait for fall 2018 football season!');

insert into Private_events (private_event_id, admin_id)
values ((select event_id from Events where event_name='Tailgating at UCF'), (select a.admin_id from Admins a, Users u where u.email='admin@ucf.edu' and a.admin_id = u.uid));

# Get all public events happening at the University of Florida
select * from Events e, Public_events p, Locations l, Admins a, Users u
where e.event_id=p.public_event_id and
      l.location_id=e.event_location and
      p.admin_id = a.admin_id and
      a.admin_id = u.uid;

# Get all private events happening at the University of Florida
select * from Private_events p, Events e, Locations l, Admins a, Users u
where l.university = 'University of Central Florida' and
      e.event_id=p.private_event_id and
      l.location_id = e.event_location and
      p.admin_id = a.admin_id and
      a.admin_id = u.uid;

# Get all private events happening at the University of Central Florida
select * from Private_events p, Events e, Locations l
where l.university = 'University of Central Florida' and
      e.event_id=p.private_event_id and
      l.location_id = e.event_location;

# Get all RSO events of a student
select * from RSO_events r_event, Users u, RSO_membership mem, Events e, Admins a, Locations l, RSOs r, Comments c
where u.uid='Lz06QvpZyhfjqpLgyGDV1E51Ety2' and
      mem.student_id=u.uid and
      r_event.rso_id = mem.rso_id and
      l.location_id=e.event_location and
      r_event.rso_event_id=e.event_id and
      r_event.admin_id=a.admin_id and
      r.rso_id = r_event.rso_id;

insert into Events (event_name, event_location, event_time, event_description)
values ('Build a Website', (select location_id from Locations where university='University of Central Florida' and location_name='Library'), '2018-11-19 18:00:00', 'Come learn how to build a webiste with HTML, CSS, and JavaScript with ACM-W!');

insert into RSO_events (rso_event_id, admin_id, rso_id)
values ((select event_id from Events where event_name='Build a Website'),
        (select a.admin_id from Admins a, Users u where u.email='admin@ucf.edu' and a.admin_id = u.uid),
        (select rso_id from RSOs where university='University of Central Florida' and rso_name='ACM-W'));

insert into Events (event_name, event_location, event_time, event_description)
values ('Imposter Syndrome', (select location_id from Locations where university='University of Central Florida' and location_name='Library'), '2018-11-26 18:00:00', 'Come learn about the imposter syndrome and take away tips and techniques for overcoming it.');

insert into RSO_events (rso_event_id, admin_id, rso_id)
values ((select event_id from Events where event_name='Imposter Syndrome'),
        (select a.admin_id from Admins a, Users u where u.email='admin@ucf.edu' and a.admin_id = u.uid),
        (select rso_id from RSOs where university='University of Central Florida' and rso_name='ACM-W'));

insert into Events (event_name, event_location, event_time, event_description)
values ('Cook a healthy meal', (select location_id from Locations where university='University of Central Florida' and location_name='Student Union'), '2018-11-19 18:00:00', 'Come learn how to make a delicious roasted vegetable sandwich!');

insert into RSO_events (rso_event_id, admin_id, rso_id)
values ((select event_id from Events where event_name='Cook a healthy meal'),
        (select a.admin_id from Admins a, Users u where u.email='admin@ucf.edu' and a.admin_id = u.uid),
        (select rso_id from RSOs where university='University of Central Florida' and rso_name='Healthy Cooking Club'));

insert into Comments (userID, eventID, content, rating, dateUpdated)
values ('Lz06QvpZyhfjqpLgyGDV1E51Ety2', 7, 'This is an awesome event! I\'m looking forward to it!', 5, '2018-11-19 18:00:00');

insert into Comments (userID, eventID, content, rating, dateUpdated)
values ('Lz06QvpZyhfjqpLgyGDV1E51Ety2', 8, 'Whoot whoot!', 5, '2018-11-19 18:00:00');

update Comments set content='I love this!!' where userID='Lz06QvpZyhfjqpLgyGDV1E51Ety2' and eventID=7;

delete from Comments where userID='Lz06QvpZyhfjqpLgyGDV1E51Ety2' and eventID=7;

select * from Comments c where c.userID = 'Lz06QvpZyhfjqpLgyGDV1E51Ety2' and c.eventID=8;

select distinct university from Users;

select location_name from Locations where university="University of Central Florida";

select * from RSOs where admin_id='Z2xL96VfByRDlwpHsdUcatlH1Mj2';
