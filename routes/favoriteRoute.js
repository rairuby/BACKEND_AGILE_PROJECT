// const { req, res } = require("express");
// const express = require("express");
// const router = new express.Router();
// const favModel = require("../models/favoriteModel");

// router.post(
//     "/artist/favorites/:id",
//     async (req, res) => {
//       const userid = req.params.id;
//       const courseid = req.body.songid;
//       try {
//         const user = await favModel.findOne({ user_ID: userid });
//         const song = await songModel.findOne({ _id: courseid });
  
//         if (!course) {
//           res.json({ success: "false", message: "Product does not exist" });
//         }
  
//         const coursename = course.coursename;
//         const coursedesc = course.coursedesc;
//         const coursepic = course.coursepic;
  
//         if (user) {
//           let itemIndex = user.course.findIndex((p) => p.courseid == courseid);
  
//           if (itemIndex > -1) {
//             let courseItem = user.course[itemIndex];
//             user.course[itemIndex] = courseItem;
//             res.send({ success: "false", check: "No" });
//           } else {
          
//             user.course.push({
//               courseid,
//               coursename,
//               coursepic,
//               coursedesc,
//             });
//           }
//           // save the favorites
//           user.save();
//           return res.status(201).json({
//             success: "true",
//           });
//         } else {
//           const newsublist = await subscriptionModel.create({
//             user_ID: userId,
//             course: [{ courseid, coursename, coursepic, coursedesc }],
//           });
         
//           console.log("push");
//           return res.status(201).json({ success: "true" });
//         }
//       } catch {
//         (error) => {
//           res.json({ success: "false", error: error });
//         };
//       }
//     }
//   );
