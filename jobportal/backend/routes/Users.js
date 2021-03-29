var express = require("express");
var router = express.Router();

// Load User model
const Recruiter = require("../models/Users");
const Applicant = require("../models/Users2");
const Jobinfo = require("../models/job,details");
const Accepted = require("../models/accepted");
const accepted = require("../models/accepted");
const { query } = require("express");




// GET request 
// Getting all the users
router.get("/applicant", function (req, res) {
    Applicant.find(function (err, applicants) {
        if (err) {
            console.log(err);
        } else {
            res.json(applicants);
        }
    })
});

router.get("/recruiter", function (req, res) {
    Recruiter.find(function (err, recruiters) {
        if (err) {
            console.log(err);
        } else {
            res.json(recruiters);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/Recruiter/register", (req, res) => {
    const email = req.body.email;
    // Find user by email

    Recruiter.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            const newUser = new Recruiter({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                date: req.body.date
            });


            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        }
        else {
            res.send({ error: "aa" });
            //return user;
        }
    });

});

router.post("/Applicant/register", (req, res) => {
    const email = req.body.email;
    // Find user by email

    Applicant.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            const newUser = new Applicant({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                date: req.body.date
            });

            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });

        }
        else {
            res.send({ error: "aa" });
            //return user;
        }
    });

});
router.post("/job/register", (req, res) => {

    const newUser = new Jobinfo({

        title: req.body.title,
        maxapplications: req.body.maxapplications,
        maxpositions: req.body.maxpositions,
        postdate: req.body.postdate,
        deadline: req.body.deadline,
        skillset: req.body.skillset,
        jobtype: req.body.jobtype,
        duration: req.body.duration,
        salary: req.body.salary,

        recname: req.body.recname,

        recemail: req.body.recemail
    })

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send(err);
        });



});
router.post("/jobs", (req, res) => {
    const recemail = req.body.email;
    // Find user by email

    Jobinfo.find({ recemail: recemail }).then(user => {
        // Check if user email exists
        //console.log(user)
        res.json(user)
    });

});
router.post("/accepted", (req, res) => {
    const recemail = req.body.email;
    // Find user by email

    Accepted.find({ person_email: recemail }).then(user => {
        // Check if user email exists
        //console.log(user)
        if (user) {
            res.json(user)
        }
        else {
            console.log(err)
        }
    });

});
router.post("/recruiter/accepted", (req, res) => {
    const recemail = req.body.email;
    // Find user by email

    Accepted.find({ rec_email: recemail }).then(user => {
        // Check if user email exists
        //console.log(user)
        if (user) {
            console.log(user)
            res.json(user)
        }
        else {

        }
    })
        .catch(
            function (err) {
                console.log(err)
            }
        )

});

router.get("/jobs", function (req, res) {
    Jobinfo.find(function (err, applicants) {
        if (err) {
            console.log(err);
        } else {
            res.json(applicants);
        }
    })
});


// POST request 
// Login
router.post("/login/recruiter", (req, res) => {
    const email = req.body.email;
    // Find user by email

    Recruiter.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
                name: "dsdsd"
            });
        }
        else {
            res.send({ user });
            //return user;
        }
    });
});

router.post("/login/applicant", (req, res) => {
    const email = req.body.email;
    // Find user by email

    Applicant.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
            return res.status(404).json({
                error: "Email not found",
                name: "dsdsd"
            });
        }
        else {
            res.send({ user });
            //return user;
        }
    });
});

router.post("/profile/applicant", (req, res) => {
    const email = req.body.email;
    // Find user by email

    Applicant.findOne({ email }).then(user => {
        // Check if user email exists
        if (user) {
            console.log("a")
            console.log(user)
            res.send({ user })
        }
        else {
            console.log("fasfasfasf")
        }
    });



})
router.post("/profile/recruiter", (req, res) => {
    const email = req.body.email;
    // Find user by email

    Recruiter.findOne({ email }).then(user => {
        // Check if user email exists
        res.send({ user })
    });



})
router.post("/jobe", (req, res) => {
    const email = req.body.job_id;
    // Find user by email

    Jobinfo.findOne({ "_id": email }).then(user => {
        // Check if user email exists
        res.send({ user })
    });



})

router.post("/profile/applicant/edit", function (req, res) {

    let send = {
        status: "-1",
        msg: "temp"
    };
    const query = { "email": req.body.email };
    // Set some fields in that document
    const update = {
        "$set": {
            "education": req.body.education,
            "skils": req.body.skills
        }
    };

    // const { name, price, quantity, quantity_left, seller_id, status } = req.body;
    console.log(req.body._id)


    Applicant.findOneAndUpdate(query, update, function (err, product) {
        if (err) {
            console.log(err);
            send.status = 1;
            send.msg = "Error in dipatching";
            res.json(send)
        }
        else {
            console.log("fsafasf")
            send.status = 0;
            send.msg = "Dispatched";
            res.json(send)
        }
    });
});
router.post("/profile/recruiter/edit", function (req, res) {

    let send = {
        status: "-1",
        msg: "temp"
    };
    const query = { "email": req.body.email };
    // Set some fields in that document
    const update = {
        "$set": {
            "bio": req.body.bio,
            "contactnumber": req.body.phonenumber
        }
    };

    // const { name, price, quantity, quantity_left, seller_id, status } = req.body;
    //console.log(req.body._id)


    Recruiter.findOneAndUpdate(query, update, function (err, product) {
        if (err) {
            console.log(err);
            send.status = 1;
            send.msg = "Error in dipatching";
            res.json(send)
        }
        else {
            send.status = 0;
            send.msg = "Dispatched";
            res.json(send)
        }
    });
});
router.post("/jobs/edit", function (req, res) {
    let send = {
        status: "-1",
        msg: "temp"
    };
    const query = { "_id": req.body.id };
    //console.log(req.body.id + req.body.deadline + req.body.maxapplications + req.body.maxpositions)
    // Set some fields in that document
    Jobinfo.findOne(query, function (re, rey) {


        var mem = [...rey.members]
        var count = 0
        var temp = []
        var update = {}
        for (var i = 0; i < mem.length; i++) {
            if (mem[i].state == "accepted") {
                count++;

            }
        }
        if (req.body.maxpositions < count) {
             res.send({ error: "dddd" })
            return
        }
        else if (req.body.maxpositions == count) {
            for (var i = 0; i < mem.length; i++) {
                if (mem[i].state != "accepted") {

                    var sop = mem[i].sop
                    var date = mem[i].date
                    var email = mem[i].email
                    var state = "rejected"
                    const newitem = {
                        sop: sop,
                        date: date,
                        email: email,
                        state: state
                    }
                    temp.push(newitem)



                }
                else {
                    temp.push(mem[i])
                }

            }


            update = {
                "$set": {
                    "maxapplications": req.body.maxapplications,
                    "maxpositions": req.body.maxpositions,
                    "deadline": req.body.deadline,
                    "members": temp

                }
            };
        }
        else {
            update = {
                "$set": {
                    "maxapplications": req.body.maxapplications,
                    "maxpositions": req.body.maxpositions,
                    "deadline": req.body.deadline,
                    "members": mem

                }
            };


        }

        // const { name, price, quantity, quantity_left, seller_id, status } = req.body;
        //   console.log(req.body._id)


        Jobinfo.findOneAndUpdate(query, update, function (err, product) {
            if (err) {
                console.log(err);
                send.status = 1;
                send.msg = "Error in dipatching";
                res.json(send)
            }
            else {
                console.log("fsafasf")
                send.status = 0;
                send.msg = "Dispatched";
                res.json(send)
            }
        });
    })


})
router.post("/jobs/delete", function (req, res) {
    const id = req.body.id
    var query = { _id: id };
    Jobinfo.deleteOne(query, function (err, req) {
        if (err) {
            console.log(reerer)
        }

    })
    var quer = { job_id: id }
    Accepted.deleteMany(quer, function (err, res) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("success")
        }
    })
})
router.post("/job/review", function (req, res) {

    let send = {
        status: "-1",
        msg: "temp"
    };
    id = req.body.id

    console.log(id)
    Jobinfo.findOne({ "_id": id }).then(re => {
        const email = req.body.email
        var a = 1
        // var f  = [...re.rating]

        //console.log(f + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if (re.rating != undefined) {
            var temp = [...re.rating]
            //var a = 1
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].email == email) {
                    a = 0
                    res.send("already given")

                    break;
                }
            }
        }
        if (a) {
            const query = { "_id": req.body.id };
            const ob = {
                email: email,
                value: req.body.rating
            }
            var mem = []
            var update = {}
            var avg = 0
            if (re.rating != undefined) {
                temp.push(ob)
                avg = 0
                for (var i = 0; i < temp.length; i++) {
                    avg = avg + parseInt(temp[i].value, 10)
                }
                avg = avg / temp.length
                // Set some fields in that document
                update = {
                    "$set": {
                        "rating": temp,
                        "avg_rating": avg

                    }
                };
            }
            else {
                mem.push(ob)
                avg = 0

                for (var i = 0; i < mem.length; i++) {
                    avg = avg + parseInt(mem[i].value, 10)
                }
                avg = avg / mem.length
                // Set some fields in that document
                update = {
                    "$set": {
                        "rating": mem,
                        "avg_rating": avg

                    }
                };
            }



            // const { name, price, quantity, quantity_left, seller_id, status } = req.body;



            Jobinfo.findOneAndUpdate(query, update, function (err, product) {
                if (err) {
                    console.log("aaa");
                    send.status = 1;
                    send.msg = "Error in dipatching";
                    res.json(send)
                }
                else {
                    send.status = 0;
                    send.msg = "Dispatched";
                    res.json(send)
                }
            });
        }

    })

});
router.post("/person/review", function (req, res) {

    let send = {
        status: "-1",
        msg: "temp"
    };
    id = req.body.id
    //  console.log(person_email)

    console.log(id)
    Applicant.findOne({ "email": req.body.email }).then(re => {
        const email = req.body.id
        var a = 1
        // var f  = [...re.rating]

        //console.log(f + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if (re.rating != undefined) {
            var temp = [...re.rating]
            //var a = 1
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].id == req.body.id) {
                    a = 0
                    res.send("already given")

                    break;
                }
            }
        }
        if (a) {
            const query = { "email": req.body.email };
            const ob = {
                id: req.body.id,
                value: req.body.rating
            }
            var mem = []
            var update = {}
            var avg = 0
            if (re.rating != undefined) {
                temp.push(ob)
                avg = 0
                for (var i = 0; i < temp.length; i++) {
                    avg = avg + parseInt(temp[i].value, 10)
                }
                avg = avg / temp.length
                // Set some fields in that document
                update = {
                    "$set": {
                        "rating": temp,
                        "avg_rating": avg

                    }
                };
            }
            else {
                mem.push(ob)
                avg = 0

                for (var i = 0; i < mem.length; i++) {
                    avg = avg + parseInt(mem[i].value, 10)
                }
                avg = avg / mem.length
                // Set some fields in that document
                update = {
                    "$set": {
                        "rating": mem,
                        "avg_rating": avg

                    }
                };
            }



            // const { name, price, quantity, quantity_left, seller_id, status } = req.body;



            Applicant.findOneAndUpdate(query, update, function (err, product) {
                if (err) {
                    console.log("aaa");
                    send.status = 1;
                    send.msg = "Error in dipatching";
                    res.json(send)
                }
                else {
                    send.status = 0;
                    send.msg = "Dispatched";
                    res.json(send)
                }
            });
        }

    })

});
router.post("/applicant/button", function (req, res) {

    let send = {
        status: "-1",
        msg: "temp"
    };
    email = req.body.email
    id = req.body.id_job

    sop = req.body.sop

    console.log(id)
    console.log("fasfasfasfasfasfasfasf")

    Applicant.findOne({ email }).then(user => {
        var mem = [...user.jobs_applied]
        mem.push({ id: id, state: "applied" })

        const query = { "email": email };
        const update = {
            "$set": {
                "jobs_applied": mem,

            }
        }
        Applicant.findOneAndUpdate(query, update, function (err, product) {
            if (err) {
                console.log("minge")
                //console.log(err);

            }
            else {

            }
        });



    })
    Jobinfo.findOne({ _id: id }).then(job => {
        var mem = [...job.members]
        mem.push({ email: email, state: "applied", sop: sop, date: Date.now() })
        const applicant = job.maxapplications
        const query = { _id: id };
        const update = {
            "$set": {
                "members": mem,
                "maxapplicantions": applicant
            }
        }
        Jobinfo.findOneAndUpdate(query, update, function (err, product) {
            if (err) {
                console.log("minge2")
            }
            else {

            }
        });



    })
});

router.post("/recruiter/button", function (req, res) {

    let send = {
        status: "-1",
        msg: "temp"
    };
    email = req.body.email
    id = req.body.id_job
    date = req.body.date


    sop = req.body.sop
    console.log(id)
    console.log("fasfasfasfasfasfasfasf")

    Applicant.findOne({ email }).then(user => {
        var query = { _id: req.body.email }
        var update = {}
        var mem = []
        var item = {}
        var kem = []
        if (req.body.state != "accepted") {
            mem = [...user.jobs_applied]
            item = {
                id: req.body.id_job,
                state: req.body.state

            }
            kem = mem.filter(a => (a.id !== id))
            kem.push(item)

            query = { "email": email };
            update = {
                "$set": {
                    "jobs_applied": kem,

                }
            }
        }
        else {
            mem = [...user.jobs_applied]
            item = {
                id: req.body.id_job,
                state: req.body.state

            }
            kem = []
            for (var i = 0; i < mem.length; i++) {
                if (mem[i].id !== req.body.id_job) {
                    var id1 = mem[i].id
                    var state1 = "rejected"
                    const obj = {
                        id: id1,
                        state: state1
                    }
                    kem.push(obj)

                }
                else {
                    kem.push(item)
                }
            }
            query = { "email": email };
            update = {
                "$set": {
                    "jobs_applied": kem,

                }
            }



        }
        Applicant.findOneAndUpdate(query, update, function (err, product) {
            if (err) {
                console.log("minge")
                //console.log(err);

            }
            else {

            }
        });




    })
    Jobinfo.findOne({ _id: id }).then(job => {
        var mem = [...job.members]
        var item = {
            email: email,
            state: req.body.state,
            sop: sop,
            date: date
        }
        var kem = mem.filter(a => a.email !== email)
        kem.push(item)
        const applicant = job.maxapplications
        const query = { _id: id };
        const update = {
            "$set": {
                "members": kem,

            }
        }
        Jobinfo.findOneAndUpdate(query, update, function (err, product) {
            if (err) {
                console.log("minge2")
            }
            else {

            }
        });



    })
    if (req.body.state == "accepted") {
        console.log("fuck")
        const newUser = new Accepted({
            name: req.body.name,
            jobtype: req.body.job_type,
            title: req.body.title,
            join_date: req.body.date,

            rec_email: req.body.eemail,
            person_email: req.body.email,
            job_id: req.body.id_job


        });

        newUser.save()
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }
    if (req.body.state == "accepted") {

        Jobinfo.findOne({ _id: id }).then(job => {
            var mem = [...job.members]
            var count = 0;
            for (var i = 0; i < mem.length; i++) {
                if (mem[i].state == "accepted") {
                    count++;
                }
            }
            console.log(count + "count ra bujji")
            console.log(job.maxpostions + "data ra bujji")
            if ((count + 1) == parseInt(job.maxpositions, 10)) {
                var kem = []
                for (var i = 0; i < mem.length; i++) {
                    if (mem[i].state != "accepted") {

                        var sop = mem[i].sop
                        var date = mem[i].date
                        var email = mem[i].email
                        var state = ""
                        if (email == req.body.email) {
                            state = "accepted"

                        }
                        else {
                            state = "rejected"
                        }
                        const newitem = {
                            sop: sop,
                            date: date,
                            email: email,
                            state: state
                        }
                        kem.push(newitem)



                    }
                    else {
                        kem.push(mem[i])
                    }


                }





                const applicant = job.maxapplications
                const query = { _id: req.body.id_job };
                const update = {
                    "$set": {
                        "members": kem,

                    }
                }
                Jobinfo.findOneAndUpdate(query, update, function (err, product) {
                    if (err) {
                        console.log("minge2")
                    }
                    else {

                    }
                });
            }


        }
        )



    }




});


module.exports = router;

