import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, Col, Row, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Form, Label, Input, CardHeader } from 'reactstrap';
import { makeData } from "./utils";

export default class TipeAset extends Component {

    tipeAsetData = {
        kode: null,
        nama: null
    }

    constructor() {
        super();
        this.state = {
            data: makeData(),
            modal: false,
            modalDelete: false,
            movieData: [],
            pages: 0,
            loading: false
        };

        this.toggle = this.toggle.bind(this);
    }

    onBtnEditClick = (data) => {
        this.tipeAsetData = {
            kode: data.kode,
            nama: data.nama
        }
        this.toggle('modal')
    }

    onBtnAddClick = () => {
        this.tipeAsetData = {
            kode: null,
            nama: null
        }
        this.toggle("modal")
    }

    toggle = (modalName) => {
        this.setState({
            ...this.state,
            [modalName]: !this.state[modalName]
        });
    }

    requestData = (currentPage) => {
        this.setState({ ...this.state, loading: true })
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=339c918b67ad1e08a7fadf25620b906b&page=' + currentPage)
            .then(response => response.json())
            .then((jsonData) => { // jsonData is parsed json object received from url
                if (jsonData.error) {

                } else {
                    this.setState({ ...this.state, movieData: jsonData.results, pages: jsonData.total_pages })
                }
                this.setState({ ...this.state, loading: false })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    componentDidMount = () => {
        this.requestData(1)
    }

    fetchData = (state, instance) => {
        this.requestData(state.page + 1)
    }

    onFilteredChangeCustom = (value, accessor) => {
        console.log(accessor + ": " + value)
    }

    render() {
        const { data } = this.state;
        const columns = [
            {
                columns: [
                    {
                        Header: "Kode",
                        accessor: "id"
                    },
                    {
                        Header: "Nama",
                        id: "nama",
                        accessor: d => d.original_title
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
                                        data={this.state.movieData}
                                        columns={columns}
                                        className="-striped -highlight"
                                        filterable
                                        manual
                                        loading={this.state.loading}
                                        onFetchData={this.fetchData}
                                        pages={this.state.pages}
                                        pageSize={20}
                                        showPageSizeOptions={false}
                                        onFilteredChange={(filtered, column, value) => {
                                            this.onFilteredChangeCustom(value, column.id || column.accessor);
                                        }}
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
                                <Input type="FormText" value={this.tipeAsetData.kode} name="kode" id="kode" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nama">Nama</Label>
                                <Input type="FormText" value={this.tipeAsetData.nama} name="nama" id="nama" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.toggle("modal")}>Cancel</Button>
                        <Button color="primary" onClick={() => this.toggle("modal")}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={() => this.toggle("modalDelete")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modalDelete")}>Pop-up Tipe Aset</ModalHeader>
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