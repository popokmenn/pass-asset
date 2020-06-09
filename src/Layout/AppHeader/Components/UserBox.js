import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import SweetAlert from 'sweetalert-react';
import { IoIosSend } from "react-icons/io";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Bounce, toast } from 'react-toastify';
import { Button, Col, ModalHeader, DropdownMenu, DropdownToggle, ModalBody, Nav, NavItem, NavLink, Row, UncontrolledButtonDropdown, UncontrolledTooltip, Modal } from 'reactstrap';
import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';





class UserBox extends React.Component {

    loginState = {
        "isLoggedIn": true,
        "imgProfileUrl": null
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            isLoggedIn: false,
            warnModal: false
        };
    }

    componentDidMount = () => {
        if (this.props.username != null && this.props.email != null) {
            this.setState({
                ...this.state,
                isLoggedIn: true
            })
        }
    }

    componentWillUnmount = () => {
        this.setState({
            ...this.state,
            warnModal: false
        });
    }

    notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    });

    signOut() {
        this.props.history.push("/pages/login");
        this.props.handleUsername()
        this.props.handleEmail()
        this.props.handleImgUrl()
        this.props.handleAccessToken()
        this.setState({
            ...this.state,
            isLoggedIn: false
        })
        toast['info']('Logout berhasil');
        this.props.history.push("/pages/login");
    }

    toggle = () => {
        this.setState({
            ...this.state,
            "isLoggedIn": !this.state["isLoggedIn"]
        })
    }

    toggleModal = modalState => {
        this.setState({
            ...this.state,
            [modalState]: !this.state[modalState]
        });
    };

    conditionalRenderIfLoggedIn = () => {
        if (this.state["isLoggedIn"]) {
            return (
                <>
                    <div className="widget-content-left">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className="p-0">
                                <img width={42} className="rounded-circle" src={this.props.imgProfileUrl != null ? this.props.imgProfileUrl : "https://via.placeholder.com/150"} alt="" />
                                <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                            </DropdownToggle>
                            <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                <div className="dropdown-menu-header">
                                    <div className="dropdown-menu-header-inner bg-info">
                                        <div className="menu-header-image opacity-2"
                                            style={{
                                                backgroundImage: 'url(' + city3 + ')'
                                            }}
                                        />
                                        <div className="menu-header-content text-left">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-wrapper">
                                                    <div className="widget-content-left mr-3">
                                                        <img width={42} className="rounded-circle" src={this.props.imgProfileUrl != null ? this.props.imgProfileUrl : "https://via.placeholder.com/150"}
                                                            alt="" />
                                                    </div>
                                                    <div className="widget-content-left">
                                                        <div className="widget-heading">
                                                            {this.props.username != null ? this.props.username : ""}
                                                        </div>
                                                        <div className="widget-subheading opacity-8">
                                                            {this.props.email != null ? this.props.email : ""}
                                                        </div>
                                                    </div>
                                                    <div className="widget-content-right mr-2">
                                                        <Button className="btn-pill btn-shadow btn-shine"
                                                            color="danger" onClick={() => this.toggleModal("warnModal")}>
                                                            Logout
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="scroll-area-xs" style={{
                                    height: '150px'
                                }}>
                                    <PerfectScrollbar>
                                        <Nav vertical>
                                            <NavItem className="nav-item-header">
                                                Activity
                                                    </NavItem>
                                            <NavItem>
                                                <NavLink href="#">
                                                    Chat
                                                            <div className="ml-auto badge badge-pill badge-info">8</div>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">Recover Password</NavLink>
                                            </NavItem>
                                            <NavItem className="nav-item-header">
                                                My Account
                                                    </NavItem>
                                            <NavItem>
                                                <NavLink href="#">
                                                    Settings
                                                            <div className="ml-auto badge badge-success">New</div>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">
                                                    Messages
                                                            <div className="ml-auto badge badge-warning">512</div>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="#">
                                                    Logs
                                                        </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </PerfectScrollbar>
                                </div>
                                <Nav vertical>
                                    <NavItem className="nav-item-divider mb-0" />
                                </Nav>
                                <div className="grid-menu grid-menu-2col">
                                    <Row className="no-gutters">
                                        <Col sm="6">
                                            <Button
                                                className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                outline color="warning">
                                                <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"> </i>
                                                        Message Inbox
                                                    </Button>
                                        </Col>
                                        <Col sm="6">
                                            <Button
                                                className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2"
                                                outline color="danger">
                                                <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"> </i>
                                                <b>Support Tickets</b>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <Nav vertical>
                                    <NavItem className="nav-item-divider" />
                                    <NavItem className="nav-item-btn text-center">
                                        <Button size="sm" className="btn-wide" color="primary">
                                            Open Messages
                                                </Button>
                                    </NavItem>
                                </Nav>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                    <div className="widget-content-left  ml-3 header-user-info">
                        <div className="widget-heading">
                            {this.props.username != null ? this.props.username : ""}
                        </div>
                        <div className="widget-subheading">
                            {this.props.email != null ? this.props.email : ""}
                        </div>
                    </div>

                </>)
        } else {
            return (
                <div className="widget-content-right header-user-info ml-3">
                    <Button className="btn-shadow p-1" size="sm" color="primary" href="#/pages/login"
                        id="Tooltip-2">
                        <IoIosSend color="#ffffff" fontSize="20px" />
                    Login
                </Button>

                    <UncontrolledTooltip placement="bottom" target={'Tooltip-2'}>
                        Click for Login!
                    </UncontrolledTooltip>
                </div>
            )
        }
    }

    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            {this.conditionalRenderIfLoggedIn()}
                            {/* <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={() => this.toggle()} color="info"
                                    id="Tooltip-1">
                                    <IoIosCalendar color="#ffffff" fontSize="20px" />
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click for Toastify Notifications!
                                </UncontrolledTooltip>
                            </div> */}
                        </div>
                    </div>
                </div>

                <Modal modalClassName="modal-large modal-danger modal-large" isOpen={this.state.warnModal} toggle={() => this.toggleModal("warnModal")} >
                    <ModalHeader>
                        <h5><b>User</b> Logout.</h5>
                    </ModalHeader>

                    <ModalBody>
                        You will be returned to login screen. <br /><br />
                    </ModalBody>

                    <div className="modal-footer">
                        <Button className="btn-primary" onClick={() => this.toggleModal("warnModal")} >Close</Button>
                        <Button className="btn-danger" type="button" onClick={() => this.signOut()} >Logout</Button>
                    </div>
                </Modal>
                {/* <SweetAlert
                    title="Good job!"
                    confirmButtonColor=""
                    show={this.state.warnModal}
                    text="You clicked the button!"
                    type="warning"
                    onConfirm={() => this.toggleModal('warnModal')} /> */}
            </Fragment>
        )
    }
}

const mapStateToProps = (profileState) => {
    if (profileState != null) {
        return {
            username: profileState.ThemeOptions.username,
            email: profileState.ThemeOptions.email,
            imgProfileUrl: profileState.ThemeOptions.imgProfileUrl,
            accessToken: profileState.ThemeOptions.accessToken
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUsername: () => dispatch({ type: 'SET_USERNAME', newUsername: null }),
        handleEmail: () => dispatch({ type: 'SET_EMAIL', newEmail: null }),
        handleImgUrl: () => dispatch({ type: 'SET_IMGURL', newImgUrl: null }),
        handleAccessToken: () => dispatch({ type: 'SET_ACCESS_TOKEN', newAccessToken: null })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserBox));