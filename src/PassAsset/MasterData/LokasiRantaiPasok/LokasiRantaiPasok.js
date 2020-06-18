import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Label, Input, CardHeader } from 'reactstrap';
import { makeData } from "./utils";
import axios from 'axios';

export default class lokasiRantaiPasok extends Component {

    lokasiRantaiPasokData = {
        kode: null,
        nama: null,
        searchQuery: ""
    }

    tableModifier = {
        pages: 1,
        totalPage: 20,
        pageSize: 10,
        loading: false
    }

    filterParam = {
        draw: 2,
        start: 0,
        length: 10,
        search_value__: "",
        search_regex__: "false",

        columns_0___data__: "RFTPE",
        columns_0___name__: "",
        columns_0___searchable__: "true",
        columns_0___orderable__: "true",
        columns_0___search___value__: "",
        columns_0___search___regex__: "false",

        columns_1___data__: "RFKD",
        columns_1___name__: "",
        columns_1___searchable__: "true",
        columns_1___orderable__: "true",
        columns_1___search___value__: "",
        columns_1___search___regex__: "false",

        columns_2___data__: "RFNM",
        columns_2___name__: "",
        columns_2___searchable__: "true",
        columns_2___orderable__: "true",
        columns_2___search___value__: "",
        columns_2___search___regex__: "false"
    }

    constructor() {
        super();
        this.state = {
            data: [],
            modal: false,
            modalDelete: false
        };

        this.toggle = this.toggle.bind(this);
    }

    objectToURLParam = (obj) => {
        var str = "";
        for (var key in obj) {
            if (str !== "") {
                str += "&";
            }
            str += key + "=" + encodeURIComponent(obj[key]);
        }

        str = str.replace(/__/gi, "%5D");
        str = str.replace(/_/gi, "%5B");

        this.lokasiRantaiPasokData = {
            ...this.lokasiRantaiPasokData,
            searchQuery: str
        }
    }

    getAll = () => {
        this.objectToURLParam(this.filterParam)
        this.tableModifier = { ...this.tableModifier, loading: false }
        axios.get('http://localhost:9090/manset/datatables/referensi-list?' + this.lokasiRantaiPasokData.searchQuery)
            .then((response) => {
                console.log(response)
                this.setState({ ...this.state, data: response.data.data })
                this.tableModifier = {
                    ...this.tableModifier,
                    totalPage: Math.ceil(response.data.recordsFiltered / this.tableModifier.pageSize),
                    loading: false
                }
            })
            .catch((error) => {
                console.log(error); // handle error
            })
            .finally(() => {
                this.tableModifier = { ...this.tableModifier, loading: false }
            })
    }

    componentDidMount = () => {
        this.getAll()
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
                        accessor: "RFKD"
                    },
                    {
                        Header: "Nama",
                        id: "nama",
                        accessor: d => d.RFNM
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
                                        filterable
                                        data={data}
                                        columns={columns}
                                        className="-striped -highlight"

                                        loading={this.tableModifier.loading}
                                        page={this.tableModifier.pages - 1}
                                        pages={this.tableModifier.totalPage}
                                        defaultPageSize={this.tableModifier.pageSize}
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
                                <Input type="FormText" value={this.lokasiRantaiPasokData.kode} name="kode" id="kode" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nama">Nama</Label>
                                <Input type="FormText" value={this.lokasiRantaiPasokData.nama} name="nama" id="nama" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.toggle("modal")}>Cancel</Button>
                        <Button color="primary" onClick={() => this.toggle("modal")}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={() => this.toggle("modalDelete")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modalDelete")}>Pop-up lokasi Rantai Pasok</ModalHeader>
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

    onBtnEditClick = (data) => {
        this.lokasiRantaiPasokData = {
            kode: data.kode,
            nama: data.nama
        }
        this.toggle('modal')
    }

    onBtnAddClick = () => {
        this.lokasiRantaiPasokData = {
            kode: null,
            nama: null
        }
        this.toggle("modal")
    }

}
// getTrProps={onRowClick}