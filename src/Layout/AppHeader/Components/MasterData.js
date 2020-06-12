import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from 'reactstrap';

class MasterData extends React.Component {

    render() {
        return (
            <Fragment>
                <Nav className="header-megamenu">
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                            <i className="nav-link-icon pe-7s-server"> </i>
                            Master Data
                            <FontAwesomeIcon className="ml-2 opacity-5" icon={faAngleDown} />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-rounded dropdown-menu-lg rm-pointers">
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/tipe-aset')}>
                                <i className="dropdown-icon lnr-magic-wand"> </i>
                                Tipe Aset
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/golongan')}>
                                <i className="dropdown-icon lnr-flag"> </i>
                                Golongan
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/bagian')}>
                                <i className="dropdown-icon lnr-star-half"> </i>
                                Bagian
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/penilaian-aset')}>
                                <i className="dropdown-icon lnr-pencil"> </i>
                                Penilaian Aset
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/lokasi-rantai-pasok')}>
                                <i className="dropdown-icon lnr-map-marker"> </i>
                                Lokasi Rantai Aset
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/gedung-aset')}>
                                <i className="dropdown-icon lnr-apartment"> </i>
                                Gedung Aset
                            </DropdownItem>
                            <DropdownItem onClick={() => this.props.history.push('/pass/master/ruang-aset')}>
                                <i className="dropdown-icon lnr-store"> </i>
                                Ruang Aset
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-layers"> </i>
                               Aset
                            </DropdownItem>
                            <DropdownItem />

                            <DropdownItem className="nav-item-header text-primary">
                                Hirarki Aset
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-laptop"> </i>
                                Sistem
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-pie-chart"> </i>
                                Sub-Sistem
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-rocket"> </i>
                                Komponen
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-train"> </i>
                                Sub-Komponen
                            </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-earth"> </i>
                                Kategori
                            </DropdownItem>
                            <DropdownItem divider />

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Fragment>

        )
    }
}

export default withRouter(MasterData);
