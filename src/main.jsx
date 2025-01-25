import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/Main Page/Main/App.jsx";
import Signin from "./components/Authentication/Signin.jsx";
import NotFound from "./components/Not found Page/NotFound.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profiles from "./components/Main Page/Profiles/Profiles.jsx";
import Media from "./components/Main Page/Media/Media.jsx";
import AlbumBody from "./components/Main Page/Albums/AlbumBody.jsx";
import Messages from "./components/Main Page/Messages/Messages.jsx";
import Friends from "./components/Main Page/Friends/Friends.jsx";
import Home from "./components/Main Page/Home/Home.jsx";
import ProfileAbout from "./components/Main Page/Profiles/Profile Nav/ProfileAbout.jsx";
import ProfileActivity from "./components/Main Page/Profiles/Profile Nav/ProfileActivity.jsx";
import ProfileAlbums from "./components/Main Page/Profiles/Profile Nav/ProfileAlbums.jsx";
import ProfileFriends from "./components/Main Page/Profiles/Profile Nav/ProfileFriends.jsx";
import ProfilePhotos from "./components/Main Page/Profiles/Profile Nav/ProfilePhotos.jsx";
import "./styles/general.css";
import "./styles/sign-in.css";
import FriendsContent from "./components/Main Page/Friends/FriendsContent.jsx";
import Settings from "./components/Settings Page/Settings.jsx";
import SettingsAlbum from "./components/Settings Page/SettingsAlbums.jsx";
import SettingsHelp from "./components/Settings Page/SettingsHelp.jsx";
import SettingsNotifications from "./components/Settings Page/SettingsNotifications.jsx";
import SettingsProfile from "./components/Settings Page/SettingsProfile.jsx";
import SettingsSecurity from "./components/Settings Page/SettingsSecurity.jsx";
import Register from "./components/Authentication/Register.jsx";
import PhotosContent from "./components/Main Page/Media/PhotosContent.jsx";
import AlbumContent from "./components/Main Page/Media/AlbumContent.jsx";
import RequestContent from "./components/Main Page/Media/RequestContent.jsx";
import Posts from "./components/Main Page/Home/Posts.jsx";
import { UserProvider } from './components/Main Page/Contexts/UserContext.jsx';
import { AuthProvider } from "./components/Main Page/Contexts/AuthContext.jsx";
import { SocketProvider } from "./components/Main Page/Contexts/SocketContext.jsx";
import { NotificationProvider } from "./components/Main Page/Contexts/NotificationContext.jsx";
import FriendRequests from "./components/Main Page/Friends/FriendRequests.jsx";
import Conversation from "./components/Main Page/Messages/Conversation.jsx";
import FriendsSuggested from "./components/Main Page/Friends/FriendsSuggested.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "",
            element: <Posts />,
          },
        ],
      },
      {
        path: "/:username",
        element: <Profiles />,
        children: [
          {
            path: "",
            element: <ProfileAlbums />,
          },
          {
            path: "photos",
            element: <ProfilePhotos />,
          },
          {
            path: "friends",
            element: <ProfileFriends />,
          },
          {
            path: "activity",
            element: <ProfileActivity />,
          },
          {
            path: "about",
            element: <ProfileAbout />,
          },
        ],
      },
      {
        path: "media",
        element: <Media />,
        children: [
          {
            path: "",
            element: <AlbumContent />,
          },
          {
            path: "photos",
            element: <PhotosContent />,
          },
          {
            path: "requests",
            element: <RequestContent />,
          },
        ],
      },
      {
        path: "album/:albumId",
        element: <AlbumBody />,
      },
      {
        path: "messages",
        element: <Messages />,
        children: [
          {
            path: ":conversationId",
            element: <Conversation />,
          },
        ],
      },
      {
        path: "friends",
        element: <Friends />,
        children: [
          {
            path: "",
            element: <FriendsContent />,
          },
          {
            path: "requests",
            element: <FriendRequests />,
          },
          {
            path: "suggested",
            element: <FriendsSuggested />,
          },
        ],
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "settings",
    element: <Settings />,
    children: [
      {
        path: "",
        element: <SettingsProfile />,
      },
      {
        path: "albums",
        element: <SettingsAlbum />,
      },
      {
        path: "notifications",
        element: <SettingsNotifications />,
      },
      {
        path: "security",
        element: <SettingsSecurity />,
      },
      {
        path: "help",
        element: <SettingsHelp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <SocketProvider>
      <AuthProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </AuthProvider>
    </SocketProvider>
  </UserProvider>
);
