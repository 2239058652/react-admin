import { RouteObject } from "react-router-dom";

declare module "react-router-dom" {
    interface RouteMeta {
        menu?: {
            name?: string;
            icon?: React.ReactNode;
            hideInMenu?: boolean;
        };
        requiresAuth?: boolean;
        permissions?: string[];
    }

    interface CustomRouteObject extends RouteObject {
        path: string;
        element: React.ReactNode;
        meta?: RouteMeta;
        children?: CustomRouteObject[];
    }
}