import ChatRoomLayout from "./layouts/chat/ChatRoomLayout";
import ServerLayout from "./layouts/server/ServerLayout";
import Messenger from "./pages/chat/Messenger/Messenger";
// import PrivateRoute from "./configs/routes/PrivateRoute";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={() => {
        return navigate("/server");
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Navigate to="/server" />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/server/*"
            element={
              <>
                <SignedIn>
                  <ServerLayout />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          >
            <Route path=":serverId/*" element={<ChatRoomLayout />}>
              <Route path="channel/:channelId" element={<Messenger />} />
            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
