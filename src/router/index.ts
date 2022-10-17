import React from "react";
import Alias from "../pages/Alias/Alias";
import Guess from "../pages/Guess/Guess";
import Pick from "../pages/Pick/Pick";
import Welcome from "../pages/Welcome/Welcome";
import Form from "../components/Form/Form";
import Phrase from "../pages/Phrase/Phrase";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    PICK = '/pick',
    LOGIN = '/login',
    MAIN = '/',
    GUESS = '/guess',
    ALIAS = '/alias',
    FORM = '/form',
    PHRASE = '/phrase',
    TELEGRAM = 'https://t.me/ChamalaBot'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.PICK, exact: true, component: Pick},
    {path: RouteNames.MAIN, exact: true, component: Welcome},
    {path: RouteNames.ALIAS, exact: true, component: Alias},
    {path: RouteNames.GUESS, exact: true, component: Guess},
    {path: RouteNames.FORM, exact: true, component: Form},
    {path: RouteNames.PHRASE, exact: true, component: Phrase},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.MAIN, exact: true, component: Welcome},
    {path: RouteNames.FORM, exact: true, component: Form}
]
