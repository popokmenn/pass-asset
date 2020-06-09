import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Label, Input, CardHeader } from 'reactstrap';
import { makeData } from "./utils";

export default class Golongan extends Component {

    golonganData = {
        kode: null,
        nama: null,
        masaManfaat: null,
        penyusutan: null
    }

    constructor() {
        super();
        this.state = {
            data: makeData(),
            modal: false,
            modalDelete: false
        };

        this.toggle = this.toggle.bind(this);
    }

    onBtnEditClick = (data) => {
        this.golonganData = {
            kode: data.kode,
            nama: data.nama,
            masaManfaat: data.masaManfaat,
            penyusutan: data.penyusutan
        }
        this.toggle('modal')
    }

    onBtnAddClick = () => {
        this.golonganData = {
            kode: null,
            nama: null,
            masaManfaat: null,
            penyusutan: null
        }
        this.toggle("modal")
    }

    toggle = (modalName) => {
        this.setState({
            ...this.state,
            [modalName]: !this.state[modalName]
        });
    }

    render() {
        const { data } = this.state;
        const columns = [
            {
                columns: [
                    {
                        Header: "Kode",
                        accessor: "kode"
                    },
                    {
                        Header: "Nama",
                        id: "nama",
                        accessor: d => d.nama
                    },
                    {
                        Header: "Masa manfaat (tahun)",
                        id: "masaManfaat",
                        accessor: d => d.masaManfaat
                    },
                    {
                        Header: "Penyusutan (%)",
                        id: "penyusutan",
                        accessor: d => d.penyusutan
                    },
                    {
                        Header: "Action",
                        width: 200,
                        filterable: false,
                        Cell: ({ row }) => (
                            <>
                                <Button color="success" onClick={() => this.onBtnEditClick(row._original)}>
                                    <i className="pe-7s-magic-wand"></i> Ubah
                                </Button>

                                <Button color="danger" style={{ marginLeft: "10px" }} onClick={() => this.toggle("modalDelete")}>
                                    <i className="pe-7s-trash"></i> Hapus
                                </Button>
                            </>
                        )
                    }
                ]
            }
        ];

        return (
            <Fragment>
                <CSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                    </div>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardHeader>
                                    <Button color="info" style={{ marginLeft: "10px" }} onClick={() => this.onBtnAddClick()}>
                                        <i className="pe-7s-plus"></i> Tambah Data
                                    </Button>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={data}
                                        columns={columns}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                        filterable
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CSSTransitionGroup>

                <Modal isOpen={this.state.modal} toggle={() => this.toggle("modal")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modal")}>Pop-up Tipe Aset</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="kode">Kode</Label>
                                <Input type="FormText" value={this.golonganData.kode} name="kode" id="kode" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nama">Nama</Label>
                                <Input type="FormText" value={this.golonganData.nama} name="nama" id="nama" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="masaManfaat">Masa Manfaat (tahun)</Label>
                                <Input type="FormText" value={this.golonganData.masaManfaat} name="masaManfaat" id="masaManfaat" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="penyusutan">Penyusutan (%)</Label>
                                <Input type="FormText" value={this.golonganData.penyusutan} name="penyusutan" id="penyusutan" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.toggle("modal")}>Cancel</Button>
                        <Button color="primary" onClick={() => this.toggle("modal")}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={() => this.toggle("modalDelete")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modalDelete")}>Pop-up Golongan Aset</ModalHeader>
                    <ModalBody>
                        Hapus Data?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.toggle("modalDelete")}>Cancel</Button>
                        <Button color="primary" onClick={() => this.toggle("modalDelete")}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>

            </Fragment>
        )
    }
}
// getTrProps={onRowClick}