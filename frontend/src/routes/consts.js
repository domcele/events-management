import Home from "../pages/Home/Home";
import Events from "../pages/Events/Events";

export const ROUTES = {
  HOME: "/",
  EVENTS: "/events",
};

export const routes = [
  {
    path: ROUTES.HOME,
    Component: Home,
  },
  {
    path: ROUTES.EVENTS,
    Component: Events,
  },
];

export const navigationBarLinks = [
  {
    title: "Home",
    path: ROUTES.Home,
  },
  {
    title: "Events",
    path: ROUTES.Events,
  },
];
