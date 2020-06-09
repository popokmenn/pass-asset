import cx from 'classnames';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ResizeDetector from 'react-resize-detector';
import { withRouter } from 'react-router-dom';
import AppMain from '../../Layout/AppMain';

//import { interceptor } from '../../service/fetchInterceptor'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            closedSmallerSidebar: false
        };
    }

    render() {

        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;

        return (
            <ResizeDetector
                handleWidth
                render={({ width }) => (
                    <Fragment>
                        <div className={cx(
                            "app-container app-theme-" + colorScheme,
                            { 'fixed-header': enableFixedHeader },
                            { 'fixed-sidebar': enableFixedSidebar || width < 1250 },
                            { 'fixed-footer': enableFixedFooter },
                            { 'closed-sidebar': enableClosedSidebar || width < 1250 },
                            { 'closed-sidebar-mobile': closedSmallerSidebar || width < 1250 },
                            { 'sidebar-mobile-open': enableMobileMenu },
                            { 'body-tabs-shadow-btn': enablePageTabsAlt },
                        )}>
                            <AppMain props={this.props} />
                        </div>
                    </Fragment>
                )}
            />
        )
    }
}

const mapStateToProp = state => ({
    colorScheme: state.ThemeOptions.colorScheme,
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedFooter: state.ThemeOptions.enableFixedFooter,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,
    username: state.ThemeOptions.username,
    email: state.ThemeOptions.email,
    imgProfileUrl: state.ThemeOptions.imgProfileUrl,
    accessToken: state.ThemeOptions.accessToken
});

export default withRouter(connect(mapStateToProp)(Main));