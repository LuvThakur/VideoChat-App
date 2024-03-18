import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import MainLayout from "../layouts/main";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/auth',
      element: <MainLayout />, // now we don't have an layout thats why i use an empty 
      children: [
        {
          path: "login", element: <Login />,

        },

        {
          path: "register", element: <Register />,
        },

        {
          path: "forgot-password", element: <ForgotPassword />
        },
        {
          path: "new-password", element: <Newpassword />
        }
      ]
    }
    ,
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: 'Setting', element: <Setting /> },

        {
          path: "group", element: <Group />
        },

        {
          path: "call", element: <CallLog />
        },
        {
          path: "profile", element: <Profile />
        },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },

      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const Group = Loadable(
  lazy(() => import("../pages/dashboard/Group"))
)

const CallLog = Loadable(
  lazy(() => import("../pages/dashboard/CallLog"))
)
const Login = Loadable(
  lazy(() => import("../pages/auth/Login"))
)

const Register = Loadable(
  lazy(() => import("../pages/auth/Register"))
)

const ForgotPassword = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
)

const Newpassword = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
)

const Setting = Loadable(
  lazy(() => import("../pages/dashboard/Setting")),
);



const Page404 = Loadable(lazy(() => import("../pages/Page404")));
