import { Router } from "express";

import authRouter from "./authRouter.js";
import postsRouter from "./postsRouter.js";
import likesRouter from "./likesRouter.js";
import hashtagsRouter from "./hashtagsRouter.js";
import usersRouter from "./usersRouter.js";
import commentsRouter from "./commentsRouter.js";
import followsRouter from "./followsRouter.js";

const router = Router();

router.use(authRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(hashtagsRouter);
router.use(usersRouter);
router.use(commentsRouter);
router.use(followsRouter);

export default router;
