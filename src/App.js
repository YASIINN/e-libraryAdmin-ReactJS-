import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {
    Dashboard,
    SoldBooks,
    SoldBooksDetail,
    Login,
    NotFound,
    BookList,
    EditBook,
    AuthorsList,
    AuthorsDetail,
    AddAuthors,
    UserList,
    UserDetail
} from './router/router'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [
                {
                    path: "/",
                    component: Login,
                    exact: true
                },
                {
                    path: "/Anasayfa",
                    component: Dashboard,
                    exact: true
                },
                {
                    path: "/SatilanKitaplar",
                    component: SoldBooks,
                    exact: true
                },
                {
                    path: "/SatisDetay/:Id",
                    component: SoldBooksDetail,
                    exact: true
                },
                {
                    path: "/KitapListesi",
                    component: BookList,
                    exact: true
                },
                {
                    path: "/KitapDuzenle/:bookid",
                    component: EditBook,
                    exact: true
                },
                {
                    path: "/Yazarlar",
                    component: AuthorsList,
                    exact: true
                },
                {
                    path: "/YazarBilgisi/:authorsid",
                    component: AuthorsDetail,
                    exact: true
                },
                {
                    path: "/YazarEkle",
                    component: AddAuthors,
                    exact: true
                },
                {
                    path: "/Kullanıcılar",
                    component: UserList,
                    exact: true
                },
                {
                    path:"/KullanıcıDetay/:userid",
                    component: UserDetail,
                    exact: true
                }

            ]
        }
    }

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <div className="wrapper">
                        <Switch>
                            {
                                this.state.routes.map((x) =>
                                    <Route path={x.path ? x.path : null} exact={x.exact ? x.exact : null}
                                           component={x.component}
                                    ></Route>
                                )
                            }
                        </Switch>
                    </div>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default App
