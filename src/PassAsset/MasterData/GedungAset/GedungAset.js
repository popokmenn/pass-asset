import axios from 'axios';
import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import { toast } from 'react-toastify';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay'
import { Loader } from 'react-loaders';

export default class GedungAset extends Component {

    gedungAsetData = {
        kode: null,
        nama: null,
        otherAttributes: null,
        type: "ASSET_TYPE",
        deleteId: undefined,
        isSubmit: false
    }

    getAll = () => {
        this.setState({ loading: true })
        axios.get('http://localhost:9090/manset/ref/')
            .then((response) => {
                this.setState({ ...this.state, data: response.data.data })
            })
            .catch(function (error) {
                console.log(error); // handle error
            })
            .finally(() => {
                this.setState({ loading: false })
            })
    }

    componentDidMount = () => {
        this.getAll()
    }

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalDelete: false,
            tableLoading: false
        };

        this.toggle = this.toggle.bind(this);
    }

    handleChange = (e) => {
        this.gedungAsetData = ({
            ...this.gedungAsetData,
            [e.target.name]: e.target.value
        })
    }

    onBtnDeleteClick = () => {
        axios.delete('http://localhost:9090/manset/ref/' + this.gedungAsetData.deleteId)
            .then((response) => {
                if (response.data.data === 200) {
                    toast['success']('Delete Berhasil');
                } else {
                    toast['error']('Delete Gagal!');
                }

            }).catch(function (error) {
                toast['error']('Delete Gagal!');
                console.log(error)
            }).finally(() => {
                this.getAll()
                this.gedungAsetData = { ...this.gedungAsetData, deleteId: 0 }
            });

        this.toggle("modalDelete")
    }

    onBtnDeleteColumnClick = (data) => {
        this.gedungAsetData = { ...this.gedungAsetData, deleteId: data.kode }
        this.toggle("modalDelete")
    }

    onBtnSubmitClick = () => {
        axios.post('http://localhost:9090/manset/ref/', this.gedungAsetData)
            .then((response) => {
                if (response.data.status === 200) {
                    toast['success']('Submit Berhasil');
                } else {
                    toast['error']('Submit Gagal!');
                }

            }).catch(function (error) {
                toast['error']('Submit Gagal!');
                console.log(error)
            }).finally(() => {
                this.getAll()
            });
        //this.setState({ ...this.state, loading: false, active: false })
        this.toggle("modal")
    }

    onBtnEditClick = (data) => {
        this.gedungAsetData = {
            ...this.gedungAsetData,
            kode: data.kode,
            nama: data.nama,
            otherAttributes: data.otherAttributes,
            isSubmit: false
        }
        this.toggle('modal')
    }

    onBtnAddClick = () => {
        this.gedungAsetData = {
            kode: null,
            nama: null,
            otherAttributes: null,
            isSubmit: true
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
                        id: "kode",
                        accessor: d => d.kode
                    },
                    {
                        Header: "Nama",
                        id: "nama",
                        accessor: d => d.nama
                    },
                    {
                        Header: "Bagian",
                        id: "otherAttributes",
                        accessor: d => d.otherAttributes

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

                                <Button color="danger" style={{ marginLeft: "10px" }} onClick={() => this.onBtnDeleteColumnClick(row._original)}>
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

                            <LoadingOverlay tag="div" active={this.state.loading} styles={{ overlay: (base) => ({ ...base, background: '#fff', opacity: 0.5 }) }}
                                spinner={<Loader active type={"ball-grid-pulse"} />}>
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
                                            loading={this.state.loading}
                                        />
                                    </CardBody>
                                </Card>
                            </LoadingOverlay>

                        </Col>
                    </Row>
                </CSSTransitionGroup>

                <Modal isOpen={this.state.modal} toggle={() => this.toggle("modal")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modal")}>Pop-up Gedung Aset</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                {this.gedungAsetData.isSubmit ? <Label for="kode">Kode</Label> : null}
                                <Input type={this.gedungAsetData.isSubmit ? "formText" : "hidden"} value={this.gedungAsetData.kode} onChange={(e) => this.setState({ ...this.state, deleteId: this.gedungAsetData.kode })} name="kode" id="kode" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nama">Nama</Label>
                                <Input type="FormText" defaultValue={this.gedungAsetData.nama} onChange={(e) => this.handleChange(e)} name="nama" id="nama" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="otherAttributes">Bagian</Label>
                                <Input type="FormText" defaultValue={this.gedungAsetData.otherAttributes} onChange={(e) => this.handleChange(e)} name="otherAttributes" id="otherAttributes" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.toggle("modal")}>Cancel</Button>
                        <Button color="primary" onClick={() => this.onBtnSubmitClick()}>Submit</Button>{' '}
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={() => this.toggle("modalDelete")} className={this.props.className}>
                    <ModalHeader toggle={() => this.toggle("modalDelete")}>Pop-up Gedung Aset</ModalHeader>
                    <ModalBody>
                        Hapus Data?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.toggle("modalDelete")}>Cancel</Button>{' '}
                        <Button color="link" onClick={() => this.onBtnDeleteClick()}>Delete</Button>
                    </ModalFooter>
                </Modal>

            </Fragment>
        )
    }
}
// getTrProps={onRowClick}