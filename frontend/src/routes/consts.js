import Home from "../pages/Home/Home";
import Events from "../pages/Events/Events";
import Event from "../pages/Event/Event";
import AddEvent from "../pages/AddEvent/AddEvent";
import AddUser from "../pages/AddUser/AddUser";
import Login from "../pages/Login/Login";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

export const ROUTES = {
  LOGIN: "/",
  HOME: "/home",
  EVENTS: "/events",
  EVENT: "/events/:id",
  NEW_EVENT: "/events/new-event",
  NEW_USER: "/events/:id/new-user",
};

export const routes = [
  {
    path: ROUTES.LOGIN,
    Component: Login,
    Layout: AuthLayout,
  },
  {
    path: ROUTES.HOME,
    Component: Home,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.EVENTS,
    Component: Events,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.EVENT,
    Component: Event,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.NEW_EVENT,
    Component: AddEvent,
    Layout: BasicLayout,
  },
  {
    path: ROUTES.NEW_USER,
    Component: AddUser,
    Layout: BasicLayout,
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
