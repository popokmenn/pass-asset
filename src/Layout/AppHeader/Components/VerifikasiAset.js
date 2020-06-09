import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from 'reactstrap';


class VerifikasiAset extends React.Component {
    constructor(props) {
        super(props);

        this.togglee = this.togglee.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            dropdownVerifikasiAsetOpen: false,
            popoverVerifikasiOpen: false,
            dropdownOpen: false
        };
    }

    togglee() {
        this.setState({
            ...this.state,
            dropdownVerifikasiAsetOpen: !this.state.dropdownVerifikasiAsetOpen,
            popoverVerifikasiOpen: !this.state.popoverVerifikasiOpen

        });
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({ dropdownOpen: true });
    }

    onMouseLeave() {
        this.setState({ dropdownOpen: false });
    }

    state = {};

    render() {
        return (
            <Fragment>
                <Nav className="header-megamenu">
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <i className="nav-link-icon pe-7s-pen"> </i>
                            Verifikasi Aset
                            <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-rounded dropdown-menu-lg rm-pointers">
                            <DropdownItem>
                                <i className="dropdown-icon lnr-paperclip"> </i>
                                Rangkuman Aset
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-chart-bars"> </i>
                                Dashboard Jadwal
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/verifikasi/kalender-verifikasi')}>
                                <i className="dropdown-icon lnr-hourglass"> </i>
                                Kalender Verifikasi
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-calendar-full"> </i>
                                Jadwal Verifikasi Aset
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-smartphone"> </i>
                                Realisasi Verifikasi Aset
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-thumbs-up"> </i>
                                Persetujuan Verifikasi Aset
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-tag"> </i>
                                List PTS
                            </DropdownItem>
                            <DropdownItem divider />

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Fragment>

        )
    }
}

export default withRouter(VerifikasiAset);
