import Home from "../pages/Home/Home";
import Events from "../pages/Events/Events";

export const ROUTES = {
  HOME: "/",
  EVENTS: "/events",
  EVENT: "/events/:id",
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
  {
    path: ROUTES.EVENT,
    Component: Event,
  },
];

export const navigationBarLinks = [
  {
    title: "Home",
    path: ROUTES.HOME,
  },
  {
    title: "Events",
    path: ROUTES.EVENTS,
  },
];
