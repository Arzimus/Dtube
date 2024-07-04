import { Router } from "express";
import { getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwtToken, logoutUser)
router.route("refresh-token").post(refreshAccessToken)
router.route("/update-avatar").patch(verifyJwtToken, upload.single("avatar"), updateUserAvatar)
router.route("/profile/:username").get(verifyJwtToken, getUserChannelProfile)
router.route("/history").get(verifyJwtToken, getWatchHistory)
export default router 