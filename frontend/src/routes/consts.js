import Home from "../pages/Home/Home";
import Events from "../pages/Events/Events";
import Event from "../pages/Event/Event";
import AddEvent from "../pages/AddEvent/AddEvent";

export const ROUTES = {
  HOME: "/",
  EVENTS: "/events",
  EVENT: "/events/:id",
  NEW_EVENT: "/events/new-user",
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
  {
    path: ROUTES.NEW_EVENT,
    Component: AddEvent,
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
