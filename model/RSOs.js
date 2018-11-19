const db = require('../db');
const async = require('async');

exports.getAllStudentsFromUniversity = (university, callback) => {
    if (!university)
        callback({ errorMessage: `Must provide a university name!` });
    else {
        const query = `select * from Users u where u.university = '${university}'`;
        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getAllRSOsFromUni = (university, callback) => {
    if (!university)
        callback({ errorMessage: `Must provide a university name!` });
    else {
        const query = `select * from RSOs r where r.university = '${university}'`;

        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

exports.getAllRSOsThatStudentBelongTo = (uid, callback) => {
    console.log('uid', uid);

    if (!uid) callback({ errorMessage: `No student id provided!` });
    else {
        const query = `select mem.rso_id from RSO_membership mem where mem.student_id='${uid}'`;
        db.get().query(query, (err, results) => {
            if (err) callback(err);
            else {
                callback(null, results);
            }
        });
    }
};

const addAdmin = (uid, callback) => {
    const query = `insert into Admins (admin_id) values ('${uid}')`;
    db.get().query(query, (err, results) => {
        if (err) callback(err);
        else callback(null, results);
    });
};

const addMembersOfRSO = (rso_id, members, callback) => {
    async.each(
        members,
        (member, nextCall) => {
            let query = `insert into RSO_membership (student_id, rso_id) values ('${
                member.uid
            }', '${rso_id}')`;

            db.get().query(query, err => {
                if (err) nextCall(err);
                else nextCall();
            });
        },
        err => {
            if (err) callback(err);
            else {
                callback();
            }
        },
    );
};

exports.createRSO = (rsoInfo, callback) => {
    const {
        rso_admin_id,
        rso_name,
        rso_members,
        rso_description,
        rso_university,
    } = rsoInfo;
    if (!rsoInfo) {
        callback({ errorMessage: `Need to provide all the rso information!` });
    } else {
        addAdmin(rso_admin_id, (err1, res1) => {
            // Only throw an error if the error is not of duplicate entry (this just
            // means that this person had been added to the Admins table
            if (err1 && err1.code !== 'ER_DUP_ENTRY') callback(err1);
            else {
                const query = `insert into RSOs (admin_id, rso_name, university, description)
                values ('${rso_admin_id}', '${rso_name}', '${rso_university}', '${rso_description}')`;

                db.get().query(query, (err2, res2) => {
                    if (err2) callback(err2);
                    else {
                        // Get the RSO id
                        const rsoIDQuery = `select rso_id from RSOs where admin_id = '${rso_admin_id}' and rso_name = '${rso_name}' and university = '${rso_university}' and description = '${rso_description}'`;
                        db.get().query(rsoIDQuery, (err3, res3) => {
                            if (err3) callback(err3);
                            else {
                                // Now need to add every member to the RSO membership table
                                const rsoID = res3[0].rso_id;
                                console.log('rsoID', rsoID);
                                addMembersOfRSO(rsoID, rso_members, err4 => {
                                    if (err4) callback(err4);
                                    else {
                                        callback(null, {
                                            success: true,
                                            rso_name: rso_name,
                                            rso_id: res3[0],
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
};
