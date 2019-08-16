import React, {Component, Fragment} from 'react'
import Header from "../../shared/Header";
import Sidebar from "../../shared/Sidebar";
import MainPanel from "../../shared/MainPanel";
import PageHeader from "../../shared/PageHeader";
import Footer from "../../shared/Footer";
import {isLogin, getAuthors, getAuthorsBooks} from '../../actions'
import {connect} from "react-redux";
import Plugin from "../../Plugins/Component";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import TableHeader from "../../components/TableHeader/TableHeader";
import TableBody from "../../components/TableBody/TableBody";
import ButtonGroup from "../../components/ButonGroup/ButonGroup";


class AuthorsDetail extends Component {
    constructor(props) {
        super(props);
        this.getAuthorsDetail = this.getAuthorsDetail.bind(this)
        this.state = {
            authorsInfo: [],
            authorsBooks: [],
            dataLoad: false,
            tableTitle: [],
            tableData: []
        }
    }

    getAuthorsDetail(token) {
        this.setState({
            dataLoad: false
        })
        let data = Plugin.urlParse("authorsid=" + this.props.match.params.authorsid)
        this.props.getAuthors(token, data)
    }

    getAuthBooks(token) {
        debugger
        this.setState({
            dataLoad: false
        })
        let data = Plugin.urlParse("a.authorsid=" + this.props.match.params.authorsid)
        this.props.getAuthorsBooks(token, data)
    }

    componentDidMount() {
        debugger
        if (localStorage.getItem("idtoken") != null && localStorage.getItem("idtoken") != "") {
            const response = this.props.isLogin(localStorage.getItem("idtoken"))
            if (response.payload.token != null && response.payload.token && response.payload.islogin !== false) {
                this.getAuthorsDetail(response.payload.token);
                this.getAuthBooks(response.payload.token)
            } else {
                this.props.history.push("/")
            }
        } else {
            this.props.history.push("/")
        }
    }


    initData(){
        let authorsDetail;
        if (this.state.dataLoad && this.props.authorsData.err === false) {
            authorsDetail =
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card card-profile">
                                <div className="card-header">
                                    <div className="profile-picture">
                                        <h4 className={"page-title"}>Yazar Bilgileri</h4>
                                        <div class="avatar avatar-xl">
                                            <img src="../assets/img/profile.jpg" alt="..."
                                                 class="avatar-img rounded-circle"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="user-profile text-center">
                                        <div class="name">Tam Adı
                                            : {this.state.authorsInfo.authorsname} {this.state.authorsInfo.authorslastname}</div>
                                        <div class="job">Ülkesi : {this.state.authorsInfo.authorscountry} </div>
                                        <div class="desc">Yaşı : {this.state.authorsInfo.authorsage}</div>
                                        <div class="social-media">
                                            <a class="btn btn-info btn-twitter btn-sm btn-link" href="#">
                                                <span class="btn-label just-icon"><i
                                                    class="flaticon-twitter"></i> </span>
                                            </a>
                                            <a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#">
                                                <span class="btn-label just-icon"><i class="flaticon-google-plus"></i> </span>
                                            </a>
                                            <a class="btn btn-primary btn-sm btn-link" rel="publisher" href="#">
                                                <span class="btn-label just-icon"><i
                                                    class="flaticon-facebook"></i> </span>
                                            </a>
                                            <a class="btn btn-danger btn-sm btn-link" rel="publisher" href="#">
                                                <span class="btn-label just-icon"><i
                                                    class="flaticon-dribbble"></i> </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="row user-stats text-center">
                                        <div class="col">
                                            <div class="number"></div>
                                            <div class="title"></div>
                                        </div>
                                        <div class="col">
                                            <div class="number">{this.state.tableData.length}</div>
                                            <div class="title">Kitap Sayısı</div>
                                        </div>
                                        <div class="col">
                                            <div class="number"></div>
                                            <div class="title"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-profile">
                                    <div className="card-header">
                                        <div className="profile-picture">
                                            <h4 className={"page-title"}>Yazara Ait Kitaplar</h4>
                                        </div>
                                    </div>
                                    <div className="card-body">

                                        <div className="table-responsive">
                                            <table
                                                className="table table-bordered table-head-bg-info table-bordered-bd-info mt-4">
                                                <TableHeader titleData={this.state.tableTitle}/>
                                                <TableBody tableColumn={this.state.tableTitle}
                                                           tableRow={this.state.tableData}/>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        } else if (this.state.dataLoad === false) {
            authorsDetail = <Spinner/>
        } else if (this.state.dataLoad === true && this.props.authorsData.err == 401) {
            authorsDetail = <Error/>
        } else if (this.state.dataLoad === true && this.props.authorsData.err == 500) {
            authorsDetail = <Error/>
        }
        return authorsDetail
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.authorsData.err === false && nextProps.authorsData.authorsBook.length > 0 && nextProps.authorsData.authorsList.length > 0) {
            this.setState((state) => {
                return {
                    authorsInfo: nextProps.authorsData.authorsList[0],
                    dataLoad: true,
                    tableData: nextProps.authorsData.authorsBook,
                    tableTitle: [
                        {
                            title: "#",
                            col: "bookid"
                        },
                        {
                            title: "Kitap Adı",
                            col: "bookname"
                        },
                        {
                            title: "Sayfa Sayısı0",
                            col: "pagecount",
                        },
                        {
                            title: "Fiyatı",
                            col: "price"
                        },
                        {
                            title: "Yayın Tarihi",
                            col: "releasedate"
                        },
                        {
                            title: "Kitap Türü",
                            col: "typename"
                        },
                    ]
                }
            })
        } else {
            this.setState({
                dataLoad: true
            })
        }

    }

    render() {


        return (
            <Fragment>
                <Header/>
                <Sidebar/>
                <div className="main-panel">
                    <div className="content">
                        <MainPanel/>
                        <div className="page-inner">
                            <PageHeader pageTitle={"Yazar Bilgileri"}/>
                            {this.initData()}
                        </div>
                    </div>
                    <Footer/>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    debugger
    return {
        loginData: state.Login,
        authorsData: state.Authors
    }
}
export default connect(mapStateToProps, {isLogin, getAuthors, getAuthorsBooks})(AuthorsDetail)
