import { Router } from "express";

export default interface Routes {
    path: string;
    router: Router;
}