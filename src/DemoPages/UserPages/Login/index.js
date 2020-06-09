import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import axios from 'axios'

import { Loader } from 'react-loaders';
import LoadingOverlay from 'react-loading-overlay'

import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class Login extends Component {

    loginData = {
        username: null,
        password: null
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    // componentWillMount = () => {
    //     if (this.props.accessToken) {
    //         this.props.history.push("/dashboards/analytics");
    //     } else {
    //         this.props.history.push("/pages/login");
    //     }
    // }

    componentWillUnmount = () => {
        this.setState({ active: false })
    }

    toggleLoadingBlock = () => {
        this.setState({ active: !this.state.active });
    }

    handleChange = (e) => {
        this.loginData = ({
            ...this.loginData,
            [e.target.name]: e.target.value
        })
    }

    capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    onBtnLoginClick = () => {
        this.toggleLoadingBlock()
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ' Basic bWFuc2V0Om1hbnNldDEyMyFAIw=='
            }
        };

        fetch('http://www.pass-pdam.com:8585/auth/oauth/token?username=' + "naufal@binus.or.id" + "&password=" + "naufal" + "&grant_type=password", requestOptions)
            .then(response => response.json())
            .then((jsonData) => { // jsonData is parsed json object received from url
                if (jsonData.error) {
                    toast['error']('Incorrect username or password');
                } else {
                    localStorage.setItem('passAccessToken', jsonData.access_token)
                    localStorage.setItem('passUserId', jsonData.profile.userId)
                    localStorage.setItem('passPassword', 'naufal')

                    this.props.handleUsername(this.capitalizeFirstLetter(jsonData.profile.name))
                    this.props.handleEmail(jsonData.profile.userId)
                    this.props.handleAccessToken(jsonData.access_token)
                    this.props.history.push("/dashboards/analytics");
                }
            })
            .catch((error) => {
                localStorage.removeItem('passAccessToken') // handle your errors here
                console.error(error)
            })
    }

    onBtnRecoverClick = () => {
        this.toggleLoadingBlock()
        axios.get('http://www.pass-pdam.com:8585/auth/user/me')
            .then(function (response) {
                console.log(response) // handle success
            })
            .catch(function (error) {
                console.log(error); // handle error
            })
            .finally(() => {
                this.toggleLoadingBlock()
            })
    }

    render() {

        const responseGoogleSuccess = (response) => {
            console.log(response)
            this.props.handleUsername(response.profileObj.name)
            this.props.handleEmail(response.profileObj.email)
            this.props.handleImgUrl(response.profileObj.imageUrl)
            this.props.handleAccessToken(response.accessToken)
            this.props.history.push("/dashboards/analytics");
        }

        const responseGoogleError = (response) => {
            console.log(response)
        }

        const responseFacebook = (response) => {
            console.log(response)
            this.toggleLoadingBlock()
            fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends,picture&access_token=' + response.accessToken)
                .then((response) => response.json())
                .then((json) => {
                    this.props.handleUsername(json.name)
                    this.props.handleEmail(json.email)
                    this.props.handleImgUrl(json.picture.data.url)
                    this.props.handleAccessToken(response.accessToken)
                    this.props.history.push("/dashboards/analytics");
                })
                .catch(() => {
                    console.log('ERROR GETTING DATA FROM FACEBOOK')
                })
        }

        return (
            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">
                        <Col lg="8" className="d-none d-lg-block">
                            {/* <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg1 + ')'
                                             }}/>
                                        <div className="slider-content">
                                            <h3>Perfect Balance</h3>
                                            <p>
                                                ArchitectUI is like a dream. Some think it's too good to be true! Extensive collection of unified React Boostrap Components and Elements.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                        <div className="slide-img-bg"
                                             style={{
                                                 backgroundImage: 'url(' + bg3 + ')'
                                             }}/>
                                        <div className="slider-content">
                                            <h3>Scalable, Modular, Consistent</h3>
                                            <p>
                                                Easily exclude the components you don't require. Lightweight, consistent
                                                Bootstrap based styles across all elements and components
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                                        <div className="slide-img-bg opacity-6"
                                             style={{
                                                 backgroundImage: 'url(' + bg2 + ')'
                                             }}/>
                                        <div className="slider-content">
                                            <h3>Complex, but lightweight</h3>
                                            <p>
                                                We've included a lot of components that cover almost all use cases for
                                                any type of application.
                                            </p>
                                        </div>
                                    </div>
                                </Slider>
                            </div> */}
                        </Col>
                        <Col lg="4" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
                            <LoadingOverlay tag="div" active={this.state.active} styles={{ overlay: (base) => ({ ...base, background: '#fff', opacity: 0.5 }) }}
                                spinner={<Loader color="#ffffff" active type={"ball-triangle-path"} />}>
                                <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                    <div className="app-logo" />
                                    <h4 className="mb-0">
                                        <div>Welcome back,</div>
                                        <span>Please sign in to your account.</span>
                                    </h4>
                                    <h6 className="mt-3">
                                        No account?{' '}
                                        <a href="#/pages/register" className="text-primary">Sign up now</a>
                                    </h6>
                                    <Row className="divider" />
                                    <div>
                                        <Form>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">Email</Label>
                                                        <Input type="email" name="username" onChange={(e) => this.handleChange(e)} id="exampleEmail"
                                                            placeholder="Email here..." />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">Password</Label>
                                                        <Input type="password" name="password" onChange={(e) => this.handleChange(e)} id="examplePassword"
                                                            placeholder="Password here..." />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row className="divider" />
                                            <div className="d-flex align-items-center">
                                                <div className="ml-auto">
                                                    {/* <a href="#" onClick={(e) => e.onBtnRecoverClick()} className="btn-lg btn btn-link">Recover
                                                    Password</a>{' '}{' '} */}
                                                    <Button color="warning" type="button" size="lg" onClick={(e) => this.onBtnRecoverClick()}>Check Token</Button>
                                                    <Button style={{ marginLeft: '20px' }} color="primary" type="button" size="lg" onClick={() => this.onBtnLoginClick()}>Login to Dashboard</Button>
                                                </div>
                                            </div>
                                            <h6 style={{ color: "grey", marginTop: "100px" }}>
                                                <div>
                                                    Or connect using,
                                                </div>
                                            </h6>
                                            <Row className="divider" />
                                            <div className="align-items-center">
                                                <Row>
                                                    <Col md="6">
                                                        <FacebookLogin
                                                            appId="557151434948376"
                                                            autoLoad={false}
                                                            callback={responseFacebook}
                                                            render={renderProps => (
                                                                <Button onClick={renderProps.onClick} size="block" color="primary" style={{ backgroundColor: "#4267B2" }}>
                                                                    <IoLogoFacebook style={{ fontSize: "30px" }}></IoLogoFacebook>
                                                                </Button>
                                                            )}
                                                        />
                                                    </Col>
                                                    <Col md="6">
                                                        <GoogleLogin
                                                            clientId="994337061857-9b0kg1jroco6n7ksqlsu4n16jr61rvqj.apps.googleusercontent.com"
                                                            render={renderProps => (
                                                                <Button onClick={renderProps.onClick} disabled={renderProps.disabled} size="block" color="primary" style={{ backgroundColor: "#DB4437" }}>
                                                                    <IoLogoGoogle style={{ fontSize: "30px" }}></IoLogoGoogle>
                                                                </Button>
                                                            )}
                                                            onSuccess={responseGoogleSuccess}
                                                            onFailure={responseGoogleError}
                                                            cookiePolicy={'single_host_origin'} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form>
                                    </div>
                                </Col>
                            </LoadingOverlay>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}

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

const mapDispatchToProps = (dispatch) => {
    return {
        handleUsername: (username) => dispatch({ type: 'SET_USERNAME', newUsername: username }),
        handleEmail: (email) => dispatch({ type: 'SET_EMAIL', newEmail: email }),
        handleImgUrl: (imgUrl) => dispatch({ type: 'SET_IMGURL', newImgUrl: imgUrl }),
        handleAccessToken: (accessToken) => dispatch({ type: 'SET_ACCESS_TOKEN', newAccessToken: accessToken })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
