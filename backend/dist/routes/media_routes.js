"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const media_controller_1 = require("../controllers/media_controller");
const auth_middleware_1 = require("../middleware/auth_middleware");
const router = (0, express_1.Router)();
// All media routes are protected - require authentication
router.use(auth_middleware_1.authenticate);
router.get('/', media_controller_1.getAllMedia);
router.get('/:id', media_controller_1.getMediaById);
router.post('/', media_controller_1.createMedia);
router.put('/:id', media_controller_1.updateMedia);
router.delete('/:id', media_controller_1.deleteMedia);
exports.default = router;
//# sourceMappingURL=media_routes.js.map