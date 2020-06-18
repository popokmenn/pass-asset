import axios from 'axios';
import React, { Component, Fragment } from 'react';
import ReactTable from "react-table";
import { toast } from 'react-toastify';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay'
import { Loader } from 'react-loaders';

export default class GedungAset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalDelete: false
        };
        this.toggle = this.toggle.bind(this);
    }

    gedungAsetData = {
        kode: null,
        nama: null,
        otherAttributes: null,
        type: "ASSET_TYPE",
        deleteId: undefined,
        isSubmit: false,
        searchQuery: ""
    }

    tableModifier = {
        pages: 1,
        totalPage: 20,
        pageSize: 10,
        tableLoading: false
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

    getAll = () => {
        this.objectToURLParam(this.filterParam)
        this.setState({ loading: true })
        axios.get('http://localhost:9090/manset/datatables/referensi-list?' + this.gedungAsetData.searchQuery)
            .then((response) => {
                this.setState({ ...this.state, data: response.data.data })
                this.tableModifier = {
                    ...this.tableModifier,
                    totalPage: Math.ceil(response.data.recordsFiltered / this.tableModifier.pageSize)
                }
            })
            .catch((error) => {
                console.log(error); // handle error
            })
            .finally(() => {
                this.setState({ loading: false })
            })
    }

    componentDidMount = () => {
        this.getAll()
    }

    handleChange = (e) => {
        this.gedungAsetData = ({
            ...this.gedungAsetData,
            [e.target.name]: e.target.value
        })
    }

    toggle = (modalName) => {
        this.setState({
            ...this.state,
            [modalName]: !this.state[modalName]
        });
    }

    onFilteredChangeCustom = (value, accessor) => {
        switch (accessor) {
            case "kode":
                this.filterParam = {
                    ...this.filterParam,
                    columns_0___search___value__: value
                }

                break;

            case "nama":
                this.filterParam = {
                    ...this.filterParam,
                    columns_2___search___value__: value
                }

                break;

            case "otherAttributes":
                this.filterParam = {
                    ...this.filterParam,
                    columns_1___search___value__: value
                }

                break;

            default:
                break;
        }

        this.getAll()
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

        this.gedungAsetData = {
            ...this.gedungAsetData,
            searchQuery: str
        }
    }

    fetchData = (state, instance) => {
        this.tableModifier = {
            ...this.tableModifier,
            pageSize: state.pageSize,
            pages: state.page + 1
        }

        this.filterParam = {
            ...this.filterParam,
            length: this.tableModifier.pageSize,
            start: state.page * this.tableModifier.pageSize
        }

        this.getAll()
    }

    onPageSizeChangeCustom = () => {
        this.tableModifier = { ...this.tableModifier, pages: 1 }
        this.getAll()
    }

    onRowClickCustom = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo.original)
                console.log('It was in this table instance:', instance)
            }
        }
    }

    onSortChangeCustom = (state) => {
        switch (state[0].id) {
            case "kode":
                this.filterParam = {
                    ...this.filterParam,
                    order_0___column__: "0",
                    order_1___column__: "",
                    order_2___column__: "",
                    order_0___dir__: state[0].desc ? "desc" : "asc",
                    order_2___dir__: "",
                    order_1___dir__: ""
                }

                break;

            case "nama":
                this.filterParam = {
                    ...this.filterParam,
                    order_2___column__: "2",
                    order_1___column__: "",
                    order_0___column__: "",
                    order_0___dir__: "",
                    order_2___dir__: state[0].desc ? "desc" : "asc",
                    order_1___dir__: ""
                }

                break;

            case "otherAttributes":
                this.filterParam = {
                    ...this.filterParam,
                    order_1___column__: "1",
                    order_0___column__: "",
                    order_2___column__: "",
                    order_0___dir__: "",
                    order_2___dir__: "",
                    order_1___dir__: state[0].desc ? "desc" : "asc"
                }

                break;

            default:
                break;
        }
        this.getAll()
    }

    render() {
        const { data } = this.state;
        const columns = [
            {
                columns: [
                    {
                        Header: "Kode",
                        id: "kode",
                        accessor: d => d.RFKD
                    },
                    {
                        Header: "Nama",
                        id: "nama",
                        accessor: d => d.RFNM
                    },
                    {
                        Header: "Bagian",
                        id: "otherAttributes",
                        accessor: d => d.RFOTHERATTR

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
                                            manual
                                            filterable
                                            data={data}
                                            columns={columns}
                                            className="-striped -highlight"
                                            loading={this.state.loading}
                                            onFetchData={this.fetchData}
                                            page={this.tableModifier.pages - 1}
                                            pages={this.tableModifier.totalPage}
                                            onPageSizeChange={this.onPageSizeChangeCustom}
                                            getTrProps={this.onRowClickCustom}
                                            defaultPageSize={this.tableModifier.pageSize}
                                            onSortedChange={this.onSortChangeCustom}
                                            onFilteredChange={(filtered, column, value) => {
                                                this.onFilteredChangeCustom(value, column.id || column.accessor);
                                            }}
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

}
// getTrProps={onRowClick}