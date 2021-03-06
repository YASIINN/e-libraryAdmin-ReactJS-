import React, {Component} from 'react'
import {connect} from "react-redux";
import PageHeader from '../../shared/PageHeader'
import {isLogin, getAllBooks} from "../../actions";
import TableHeader from '../../components/TableHeader/TableHeader'
import TableBody from '../../components/TableBody/TableBody'
import ButtonGroup from '../../components/ButonGroup/ButonGroup'
import Spinner from '../../components/Spinner/Spinner'
import Modal from '../../components/Modal/Modal'
import _ from  'underscore'
import Error from '../../components/Error/Error'
import Container from "../Container/Container";

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataLoad: false,
            tableData: [],
            tableTitle: [],
            selectedBook:[]
        }
        this.setActiveBook=this.setActiveBook.bind(this)
        this.goEdit=this.goEdit.bind(this)
    }
    goEdit(item){
        this.props.history.push("/KitapDuzenle/"+item.bookid)
    }
    setActiveBook(item){
            this.setState({
                selectedBook:item
            })
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.allBooks.err === false) {
            let booksData=[]
            let authorsData=[]
            var groupedData=_.groupBy(nextProps.allBooks.allBookList,"bookid")
            let keys=Object.keys(groupedData)
            for (let i = 0; i <keys.length ; i++) {
                for (let j = 0; j <groupedData[keys[i]].length ; j++) {
                        authorsData.push(
                            {
                                authorscountry:groupedData[keys[i]][j].authorscountry,
                                authorsage:groupedData[keys[i]][j].authorsage,
                                authorsname:groupedData[keys[i]][j].authorsname,
                                authorslastname:groupedData[keys[i]][j].authorslastname
                            }
                        )
                    if(j===groupedData[keys[i]].length-1){
                        groupedData[keys[i]][0].actions = <ButtonGroup deleteVisible=""
                                               deleteBtnIcon={"fas fa-trash-alt"}
                                               deleteBtnToolTip={"Bu Kitabı Sil"}
                                               saveVisible={"none"}
                                               editBtnToolTip={"Düzenle2"}
                                               editBtnClck={()=>this.goEdit( groupedData[keys[i]][0])}
                                               editBtnIcon={"fas fa-edit"}
                                               editVisible=""
                                               infoBtnIcon={"fa fa-eye"}
                                               detailVisible="none"
                                               infoBtnToolTip={"Detayını Göster"}
                                               Visible={"none"}/>
                        groupedData[keys[i]][0].authorsInfo=authorsData
                        groupedData[keys[i]][0].authinfo=<button type={"button"} className={"btn btn-primary btn-sm"} onClick={()=>this.setActiveBook( groupedData[keys[i]][0])} data-toggle="modal" data-target="#exampleModal">Yazar Bilgisini Görüntüle</button>

                        authorsData=[]
                    }
                }
                booksData.push(
                    groupedData[keys[i]][0]
                )
            }
            this.setState({
                dataLoad: true,
                tableData:  booksData,
                tableTitle: [
                    {
                        title: "Kitap Adı",
                        col: "bookname"
                    },
                    {
                        title: "Sayfa Sayısı",
                        col: "pagecount"
                    },
                    {
                        title: "Yayın Tarihi",
                        col: "releasedate"
                    },
                    {
                        title: "Ücret",
                        col: "price"
                    },
                    {
                        title: "Kitap Türü",
                        col: "typename"
                    },
                    {
                        title: "Yazar Bilgisi",
                        col: "authinfo"
                    },

                    {
                        title: "İşlemler",
                        col: "actions"
                    }
                ]
            })
        } else {
            this.setState({
                tableData: [],
                dataLoad: true,
            })
        }
    }

    componentDidMount() {
        if (localStorage.getItem("idtoken") != null && localStorage.getItem("idtoken") != "") {
            const response = this.props.isLogin(localStorage.getItem("idtoken"))
            if (response.payload.token != null && response.payload.token && response.payload.islogin !== false) {
                this.setState({
                    dataLoad: true
                })
                this.props.getAllBooks(response.payload.token);
            } else {
                this.props.history.push("/")
            }
        } else {
            this.props.history.push("/")
        }
    }
    renderBookList(){
        let book;
        if (this.state.dataLoad && this.props.allBooks.err === false) {
            book =
                <div className="page-inner">
                    <PageHeader pageTitle={"Mevcut Kitaplar"}/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">Mevcut Kitaplar</div>
                                </div>
                                <div className="card-body">
                                    <div className="card-sub">
                                        Sistemde Kayıtlı Olan Kitap Listesi Burada Yer Alır
                                    </div>
                                    <div className="table-responsive">
                                        <table
                                            className="table table-bordered table-head-bg-info table-bordered-bd-info mt-4">
                                            <caption>Toplam Kitap Sayısı : {this.state.tableData.length}</caption>
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
        } else if (this.state.dataLoad === false) {
            book = <Spinner/>
        } else if (this.state.dataLoad === true && this.props.allBooks.err == 204) {
            book = <div className="page-inner">
                <PageHeader pageTitle={"Mevcut Kitaplar"}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Mevcut Kitaplar</div>
                            </div>
                            <div className="card-body">
                                <div className="card-sub">
                                    Sistemde Kayıtlı Olan Kitap Listesi Burada Yer Alır
                                </div>
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered table-head-bg-info table-bordered-bd-info mt-4">
                                        <caption>Toplam Kitap Sayısı : {this.state.tableData.length}</caption>
                                        <TableHeader titleData={this.state.tableTitle}/>
                                        <TableBody tableColumn={this.state.tableTitle} tableRow={this.state.tableData}/>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        else if(this.state.dataLoad===true && this.props.allBooks.err==401){
            book=<Error/>
        }
        else if(this.state.dataLoad===true && this.props.allBooks.err==500){
            book=<Error/>
        }
        return book
    }
    render() {


        return (
            <Container>
                <Modal title={this.state.selectedBook.bookname+ " "+  "Yazar Bilgileri"}  content={this.state.selectedBook.authorsInfo} />
                {this.renderBookList()}
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    debugger
    return {
        loginData: state.Login,
        allBooks: state.ABooks
    }
}
export default connect(mapStateToProps, {isLogin, getAllBooks})(BookList)
