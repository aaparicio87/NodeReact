/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {/* Link, */ Switch, Redirect} from "react-router-dom";
/* import {toAbsoluteUrl} from "../../../../_metronic/_helpers"; */
import {ContentRoute} from "../../../../_metronic/layout"
import Login from "./Login";
import RegistrationProvider from "./RegistrationProvider";
import ForgotPassword from "./ForgotPassword";
import RegistrationCustomer from "./RegistrationCustomer";
import RegistrationAdmin from "./RegistrationAdmin";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function AuthPage() {
  return (
      <>
        <div className="d-flex flex-column flex-root">
          {/*begin::Login*/}
          <div
              className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
              id="kt_login"
          >
            {/*begin::Content*/}
            <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
              {/*begin::Content header*/}
              {/*end::Content header*/}

              {/* begin::Content body */}
              <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                <Switch>
                <ContentRoute path="/auth/login" component={Login}/>
                <ContentRoute path="/auth/registration_provider" component={RegistrationProvider}/>
                <ContentRoute path="/auth/registration_customer" component={RegistrationCustomer}/>
                <ContentRoute path="/auth/registration_admin" component={RegistrationAdmin}/>
                <ContentRoute
                    path="/auth/forgot-password"
                    component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login"/>
                <Redirect to="/auth/login"/>
              </Switch>
              </div>
              {/*end::Content body*/}
            </div>
            {/*end::Content*/}
          </div>
          {/*end::Login*/}
        </div>
      </>
  );
}
