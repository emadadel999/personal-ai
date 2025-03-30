import React, { useState } from "react";
import Authenticate from "./pages/Authenticate/Authenticate";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import { abortAll, deleteModel, MODELS, pullModel } from "./shared/api-calls/aiApi";
import prettyBytes from "pretty-bytes";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState("");
  const [size, setSize] = useState("");
  const [model, setModel] = useState(MODELS[0].value);

  function onSignOut(model: string) {
    setLoggedIn(false);
    setLoading(false);
    // deleteModel(model);
  }

  async function onLogin(selectedModel: string) {
    setLoading(true);
    try {
      for await (const part of pullModel(selectedModel || model)) {
        if (part.completed && part.total) {
          setSize(prettyBytes(part.total));
          setCompleted(prettyBytes(part.completed));
        }
        if (part.status === "success") {
          setModel(selectedModel);
          setLoggedIn(true);
          setLoading(false);
        }
        if (part.status === "failed") {
          console.log("an error occured");
          setError("an error occured, please try again");
        }
      }
    } catch (error) {
      console.log("an error occured: ", error);
      setError("an error occured, please try again");
    }
  }

  function abort() {
    abortAll();
    setLoading(false);
  }
  return (
    <>
      {isLoggedIn ? (
        <ChatRoom close={onSignOut} model={model} />
      ) : (
        <Authenticate
          login={onLogin}
          abort={abort}
          model={model}
          loading={loading}
          error={error}
          size={size}
          completed={completed}
        />
      )}
    </>
  );
}

// <Router>
//   <Switch>
//     <PrivateRoute path='/'>
//     </PrivateRoute>
//     <PrivateRoute exact path='/auth' condition={!isLoggedIn} redirectRoute='/'>
//     </PrivateRoute>
//   </Switch>
// </Router>
// const PrivateRoute = ({ children, condition, redirectRoute, ...props } : any) => {
//   return (
//     <Route
//       {...props}
//       render={({ location }) =>
//         condition ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: redirectRoute,
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

export default App;
