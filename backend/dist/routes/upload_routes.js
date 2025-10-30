"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_controller_1 = require("../controllers/upload_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const upload_middleware_1 = require("../middleware/upload_middleware");
const router = (0, express_1.Router)();
// All upload routes require authentication
router.use(auth_middleware_1.authenticate);
// Upload single image
router.post('/', upload_middleware_1.upload.single('image'), upload_controller_1.uploadImage);
// Delete uploaded image
router.delete('/:filename', upload_controller_1.deleteUploadedImage);
exports.default = router;
//# sourceMappingURL=upload_routes.js.map