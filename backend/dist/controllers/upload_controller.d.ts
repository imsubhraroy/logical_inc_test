import { Response } from "express";
import { AuthRequest } from "../middleware/auth_middleware";
export declare const uploadImage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteUploadedImage: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=upload_controller.d.ts.map