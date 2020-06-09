import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Loader } from 'react-loaders';
import LoadingOverlay from 'react-loading-overlay'
import { toast } from 'react-toastify';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import bg3 from '../../../assets/utils/images/originals/citynights.jpg';

export default class Register extends Component {

    register = {
        name: "",
        password: "",
        userId: "",
        passwordrep: " ",
        isFormIncomplete: true
    }

    componentWillUnmount = () => {
        this.setState({ ...this.state, active: false })
    }

    toggleLoadingBlock = () => {
        this.setState({ ...this.state, active: !this.state.active });
    }

    constructor(props) {
        super(props);
        this.state = {
            isInvalid: true,
            isFormIncomplete: true,
            active: false
        };
    }

    handleChange = (e) => {
        this.register = ({
            ...this.register,
            [e.target.name]: e.target.value
        })

        if (!(this.register.password === this.register.passwordrep)) {
            this.setState({ isInvalid: true })
        } else {
            this.setState({ isInvalid: false })
        }
    }

    onBtnSignUpClick = () => {
        // axios.post('http://www.pass-pdam.com:8585/auth/user/register', this.register)
        //     .then((response) => {
        //         //console.log(response);
        //     }, (error) => {
        //         //console.log(error);
        //     });

        this.toggleLoadingBlock()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.register)
        };
        fetch('http://www.pass-pdam.com:8585/auth/user/register', requestOptions)
            .then(response => {
                if (response.ok) {
                    toast['success']('Registrasi berhasil');
                    return response.text();
                }
                throw new Error('Something went wrong.');
            }).then(res => {            // second then()
                console.log(JSON.parse(res).status);
                if (JSON.parse(res).status === 500) {
                    toast['error']('Username atau email sudah terpakai');
                }
            })
            .catch(function (error) {   // catch
                console.log('Request failed', error);
            })
            .finally(() => {
                this.toggleLoadingBlock()
            })
    }

    render() {

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            initialSlide: 0,
            autoplay: true,
            adaptiveHeight: true
        };

        return (

            <Fragment>
                <div className="h-100">
                    <Row className="h-100 no-gutters">
                        <Col lg="7" md="12" className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center">
                            <LoadingOverlay tag="div" active={this.state.active} styles={{ overlay: (base) => ({ ...base, background: '#fff', opacity: 0.5 }) }}
                                spinner={<Loader color="#ffffff" active type={"ball-triangle-path"} />}>
                                <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                                    <div className="app-logo" />
                                    <h4>
                                        <div>Welcome,</div>
                                        <span>It only takes a <span className="text-success">few seconds</span> to create your account</span>
                                    </h4>
                                    <div>
                                        <Form>
                                            <Row form>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="exampleEmail">
                                                            <span className="text-danger">*</span>
                                                            {' '}Email
                                                    </Label>
                                                        <Input type="email" name="userId" onChange={(e) => this.handleChange(e)} id="exampleEmail"
                                                            placeholder="Email here..." />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="exampleName">Name</Label>
                                                        <Input type="text" name="name" id="exampleName" onChange={(e) => this.handleChange(e)}
                                                            placeholder="Name here..." />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword">
                                                            <span className="text-danger">*</span>
                                                            {' '}Password
                                                    </Label>
                                                        <Input type="password" name="password" id="examplePassword" onChange={(e) => this.handleChange(e)}
                                                            placeholder="Password here..." />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePasswordRep">
                                                            <span className="text-danger">*</span>
                                                            {' '}Repeat Password
                                                    </Label>
                                                        <Input invalid={this.state.isInvalid} onChange={(e) => this.handleChange(e)} type="password" name="passwordrep" id="examplePasswordRep" placeholder="Repeat Password here..." />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup className="mt-3" check>
                                                <Input type="checkbox" name="check" id="exampleCheck" />
                                                <Label for="exampleCheck" check>Accept our <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()}>Terms and Conditions</a>.</Label>
                                            </FormGroup>
                                            <div className="mt-4 d-flex align-items-center">
                                                <h5 className="mb-0">
                                                    Already have an account?{' '}
                                                    <Link to='/pages/login' className="text-primary">Sign in</Link>
                                                </h5>
                                                <div className="ml-auto">
                                                    <Button disabled={!(this.register.name.length > 3 && this.register.userId.length > 3 && this.register.password.length > 3 && this.state.isInvalid === false)} color="primary" onClick={() => this.onBtnSignUpClick()} className="btn-wide btn-pill btn-shadow btn-hover-shine" size="lg">Create Account</Button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </Col>
                            </LoadingOverlay>
                        </Col>

                        <Col lg="5" className="d-lg-flex d-xs-none">
                            <div className="slider-light">
                                <Slider  {...settings}>
                                    <div
                                        className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                                        <div className="slide-img-bg"
                                            style={{
                                                backgroundImage: 'url(' + bg3 + ')'
                                            }} />
                                        <div className="slider-content">
                                            <h3>Scalable, Modular, Consistent</h3>
                                            <p>
                                                Easily exclude the components you don't require. Lightweight, consistent
                                                Bootstrap based styles across all elements and components
                                            </p>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        );
    }
}
