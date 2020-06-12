import React, { Suspense } from "react";
import Loader from 'react-loaders';
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";


const RefreshRoute = ({ component: Component, accessToken, ...rest }) => (
    <>
        <Suspense fallback={
            <div className="loader-container">
                <div className="loader-container-inner">
                    <div className="text-center">
                        <Loader type="ball-pulse" />
                    </div>
                    <h6 className="mt-3">
                        Please wait while we load all the Applications examples
                            <small>Because this is a demonstration we load at once all the Applications examples. This wouldn't happen in a real live app!</small>
                    </h6>
                </div>
            </div>
        }>
            <Route
                {...rest}
                render={props =>
                    accessToken ? (<Redirect to={{ pathname: props.location.pathname }} />) : (<Redirect to={{ pathname: "/pages/login" }} />)
                }
            />
        </Suspense>

    </>
);

const mapStateToProps = (state) => {
    if (state != null) {
        return {
            accessToken: state.ThemeOptions.accessToken,
            username: state.ThemeOptions.username,
            email: state.ThemeOptions.email,
            imgProfileUrl: state.ThemeOptions.imgProfileUrl
        }
    }
}
//props.location.pathname != null ? <Redirect to={{ pathname: props.location.pathname }} /> : <Redirect to={{ pathname: "/dashboards/crm" }} />
export default connect(mapStateToProps)(withRouter(RefreshRoute));  