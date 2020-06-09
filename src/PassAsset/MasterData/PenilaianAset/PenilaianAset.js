import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Label, Input, CardHeader } from 'reactstrap';
import { makeData } from "./utils";

export default class PenilaianAset extends Component {

    penilaianAsetData = {
        nama: null,
        nilaiMin: null,
        nilaiMax: null,
        satuan: null,
        bobot: null,
        tipe: null
    }

    constructor() {
        super();
        this.state = {
            data: makeData(),
            modal: false,
            modalDelete: false
        };

        this.toggle = this.toggle.bind(this);
        this.renderEditable = this.renderEditable.bind(this);
    }

    onBtnEditClick = (data) => {
        this.penilaianAsetData = {
            nama: data.nama,
            nilaiMin: data.nilaiMin,
            nilaiMax: data.nilaiMax,
            satuan: data.satuan,
            bobot: data.bobot,
            tipe: data.tipe
        }
        this.toggle('modal')
    }

    onBtnAddClick = () => {
        this.penilaianAsetData = {
            nama: null,
            nilaiMin: null,
            nilaiMax: null,
            satuan: null,
            bobot: null,
            tipe: null
        }
        this.toggle("modal")
    }

    toggle = (modalName) => {
        this.setState({
            ...this.state,
            [modalName]: !this.state[modalName]
        });
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        const { data } = this.state;
        const columns = [
            {
                columns: [
                    {
                        Header: "Nama",
                        id: "nama",
                        accessor: d => d.nama,
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Nilai Min",
                        id: "nilaiMin",
                        accessor: d => d.masaManfaat,
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Nilai Max",
                        id: "nilaiMax",
                        accessor: d => d.nilaiMax,
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Satuan",
                        id: "satuan",
                        accessor: d => d.satuan,
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Bobot",
                        id: "bobot",
                        accessor: d => d.bobot,
                        Cell: this.renderEditable
                    },
                    {
                        Header: "Tipe",
                        id: "tipe",
                        accessor: d => d.tipe,
                        Cell: ({ row }) => (
                            <Input type="select" name="select" id="exampleSelect">
                                <option>Satuan</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        )
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
                                <Label for="nama">Nama</Label>
                                <Input type="FormText" value={this.penilaianAsetData.nama} name="nama" id="nama" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nilaiMin">Nilai Min</Label>
                                <Input type="FormText" value={this.penilaianAsetData.nilaiMin} name="nilaiMin" id="nilaiMin" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nilaiMax">nilai Max</Label>
                                <Input type="FormText" value={this.penilaianAsetData.nilaiMax} name="nilaiMax" id="nilaiMax" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="satuan">Satuan</Label>
                                <Input type="FormText" value={this.penilaianAsetData.satuan} name="satuan" id="satuan" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bobot">Bobot</Label>
                                <Input type="FormText" value={this.penilaianAsetData.bobot} name="bobot" id="bobot" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="tipe">Tipe</Label>
                                <Input type="select" name="select" id="tipe">
                                    <option>Satuan</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.toggle("modal")}>Cancel</Button>
                        <Button color="primary" onClick={() => this.toggle("modal")}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={() => this.toggle("modalDelete")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modalDelete")}>Pop-up penilaianAset Aset</ModalHeader>
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