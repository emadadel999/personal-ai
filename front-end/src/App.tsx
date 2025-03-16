import React, { MouseEvent, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Authenticate from "./pages/Authenticate/Authenticate";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import { Room, User } from "./types/types";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [room, setRoom] = useState<Room | null>({
    roomName: 'ai',
    messages: [],
    roomType: ''
  });
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string>();


  const onSignOut = (e?: MouseEvent) => {
    setLoggedIn(false);
    setRoom(null);
    setLoading(false);
  };

  const onLogin = (user: User) => {
    setLoading(true);
  }
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' condition={isLoggedIn} redirectRoute='/auth'>
          { room && (
            <ChatRoom close={onSignOut} />
          )}
        </PrivateRoute>
        <PrivateRoute exact path='/auth' condition={!isLoggedIn} redirectRoute='/'>
            <Authenticate login={onLogin}/>
            {loading && <p>authenticating...</p>}
            {info && <p>{info}</p>}
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

const PrivateRoute = ({ children, condition, redirectRoute, ...props } : any) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectRoute,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
