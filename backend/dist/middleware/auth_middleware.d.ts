import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    userId?: number;
}
export declare const authenticate: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const generateToken: (userId: number) => string;
//# sourceMappingURL=auth_middleware.d.ts.map