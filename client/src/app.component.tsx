import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import "../src/styles/App.css";
import { Pages, Paths } from "./enums";
import { ThemeProvider } from "@mui/material";
import { Email } from "./pages/email";
import { appTheme } from "./utils";
import { MailBox } from "./pages/mail-box";
import Main from "./pages/main.component";
import { ProtectedRoutes } from "./pages/common/common-components";
import { Auth } from "./pages/auth";

function App() {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="App">
          <Routes>
            <Route
              path={Paths.MAIN}
              element={
                <ProtectedRoutes>
                  <Main />
                </ProtectedRoutes>
              }
            >
              <Route
                path={Paths.MAIN}
                element={<Navigate to={Paths.INBOX} />}
              />
              <Route
                path={Paths.INBOX}
                element={<MailBox mailBoxType={Pages.INBOX} />}
              />
              <Route
                path={Paths.OUTBOX}
                element={<MailBox mailBoxType={Pages.OUTBOX} />}
              />
              <Route
                path={Paths.STARRED}
                element={<MailBox mailBoxType={Pages.STARRED} />}
              />
              <Route
                path={Paths.TRASHED}
                element={<MailBox mailBoxType={Pages.TRASHED} />}
              />
              <Route path={Paths.EMAIL} element={<Email />} />
            </Route>
            <Route path={Paths.AUTH} element={<Auth />} />
            <Route
              path={Paths.NOT_FOUND}
              element={<Navigate to={Paths.MAIN} replace />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
