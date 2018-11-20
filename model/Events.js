const db = require('../db');
const async = require('async');
const Users = require('./Users');
const RSOs = require('./RSOs');
const moment = require('moment');

exports.getAllPublicEvents = callback => {
    const query = `select * 
    from Events e, Public_events p, Locations l, Admins a, Users u
    where e.event_id=p.public_event_id and l.location_id=e.event_location and p.admin_id = a.admin_id and a.admin_id = u.uid;`;

    db.get().query(query, (err, results) => {
        if (err) callback(err);
        else {
            callback(null, results);
        }
    });
};

exports.getAllPrivateEvents = (university, callback) => {
    if (!university) callback(`No university provided!`);
    else {
        const query = `select * from Private_events p, Events e, Locations l, Admins a, Users u
    where l.university = '${university}' and
      e.event_id=p.private_event_id and
      l.location_id = e.event_location and
      p.admin_id = a.admin_id and
      a.admin_id = u.uid;`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getAllStudentRSOEvents = (uid, callback) => {
    if (!uid) callback(`No uid provided!`);
    else {
        const query = `select * from RSO_events r_event, Users u, RSO_membership mem, Events e, Admins a, Locations l, RSOs r
            where u.uid='${uid}' and
            mem.student_id=u.uid and
            r_event.rso_id = mem.rso_id and
            l.location_id=e.event_location and
            r_event.rso_event_id=e.event_id and
            r_event.admin_id=a.admin_id and
            r.rso_id = r_event.rso_id`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getUserComments = (uid, callback) => {
    if (!uid) callback(`No uid provided!`);
    else {
        const query = `select * from Comments c, Users u where u.uid = '${uid}'`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

const getUserComment = (uid, event_id, callback) => {
    if (!uid || !event_id) callback(`No uid or event_id provided!`);
    else {
        const query = `select * from Comments c where c.userID = '${uid}' and c.eventID=${event_id}`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getUserComment = getUserComment;

exports.updateComment = (uid, event_id, content, rating, callback) => {
    if (!uid || !event_id || !content || !rating)
        callback(`No uid, event_id, content, or rating provided!`);
    else {
        // Check if comment already exists
        getUserComment(uid, event_id, (err, data) => {
            if (err) callback(err);
            else {
                // If comment exists, then update it
                if (data.length === 1) {
                    const updateQuery = `update Comments set content='${content}', rating=${rating}, dateUpdated='${moment().format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}' where userID='${uid}' and eventID=${event_id}`;

                    db.get().query(updateQuery, (err, results) => {
                        if (err) callback(err);
                        else {
                            callback(null, results);
                        }
                    });
                } else {
                    // If comment does not exist, then add it
                    const addQuery = `insert into Comments (userID, eventID, content, rating, dateUpdated) values ('${uid}', ${event_id}, '${content}', ${rating}, '${moment().format(
                        'YYYY-MM-DD HH:mm:ss',
                    )}');`;
                    db.get().query(addQuery, (err, results) => {
                        if (err) callback(err);
                        else {
                            callback(null, results);
                        }
                    });
                }
            }
        });
    }
};

exports.deleteComment = (uid, event_id, callback) => {
    if (!uid || !event_id) callback(`No uid or event_id provided!`);
    else {
        const query = `delete from Comments where userID='${uid}' and eventID=${event_id}`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getAllUniversities = callback => {
    const query = `select distinct university from Users`;
    db.get().query(query, (err, results) => {
        if (err) callback(err);
        else {
            callback(null, results);
        }
    });
};

exports.addLocation = (
    location_name,
    university,
    longitude,
    latitude,
    callback,
) => {
    if (!location_name || !university || !longitude || !latitude) {
        callback(
            `No location_name, university, longitude, or latitude provided!`,
        );
    } else {
        const query = `insert into Locations (location_name, university, longitude, latitude)
values ('${location_name}', '${university}', ${longitude}, ${latitude})`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getLocationID = (university, location_name, callback) => {
    if (!university || !location_name) {
        callback(`No university or location_name provided!`);
    } else {
        const query = `select location_id from Locations where university='${university}' and location_name='${location_name}'`;
        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getAllLocations = callback => {
    const query = `select * from Locations`;
    db.get().query(query, (err, results) => {
        if (err) callback(err);
        else {
            callback(null, results);
        }
    });
};

exports.getAllLocationsForUniversity = (university, callback) => {
    if (!university) {
        callback(`No university provided!`);
    } else {
        const query = `select location_name from Locations where university='${university}'`;
        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

const getEventID = (
    event_name,
    event_description,
    event_location_id,
    callback,
) => {
    if (!event_name || !event_description || !event_location_id) {
        callback(`Need more information`);
    } else {
        const query = `select event_id from Events where event_name='${event_name}' and event_description='${event_description}' and event_location=${event_location_id}`;
        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.createEvent = (eventForm, callback) => {
    if (!eventForm) {
        callback(`Please provide information to create event!`);
    } else {
        const {
            event_type,
            event_name,
            event_description,
            event_location_id,
            admin_id,
            rso_id,
            approved,
            event_time,
        } = eventForm;

        const createEventQuery = `insert into Events (event_name, event_location, event_time, event_description)
values ('${event_name}', ${event_location_id}, '${moment(event_time).format(
            'YYYY-MM-DD HH:mm:ss',
        )}', '${event_description}')
`;
        db.get().query(createEventQuery, (err, results) => {
            if (err) callback(err);
            else {
                getEventID(
                    event_name,
                    event_description,
                    event_location_id,
                    (err, results) => {
                        if (err) callback(err);
                        else {
                            const { event_id } = results[0];
                            let addToEventTypeQuery;
                            if (event_type === 'rso') {
                                addToEventTypeQuery = `insert into RSO_events (rso_event_id, admin_id, rso_id) values (${event_id}, '${admin_id}', ${rso_id})`;
                            } else if (event_type === 'private') {
                                addToEventTypeQuery = `insert into Private_events (private_event_id, admin_id) values (${event_id}, '${admin_id}')`;
                            } else if (event_type === 'public') {
                                addToEventTypeQuery = `insert into Public_events (public_event_id, approved, admin_id) values(${event_id}, 1, '${admin_id}')`;
                            } else {
                                callback(
                                    `Event type must be public, private, or rso`,
                                );
                            }
                            db.get().query(
                                addToEventTypeQuery,
                                (err, results) => {
                                    if (err) callback(err);
                                    else {
                                        callback(null, results);
                                    }
                                },
                            );
                        }
                    },
                );
            }
        });
    }
};
