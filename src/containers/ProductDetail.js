import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Axios from 'axios';
import { productDetailURL } from '../http/urls';

import Loader from '../components/Loader'
import { addToFavorite } from '../http/urls'

class CategoryDetail extends Component {
    state = {
        product: {},
        loading: true,
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        Axios.get(productDetailURL(params.slug)).then(res => {
            this.setState({
                ...this.state,
                product: res.data,
                loading: false
            });
        }).catch(err => console.log(err));
    }

    newElemToFav = slug => {
        this.setState({
            ...this.state,
            loading: true
        });

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
        Axios.post(addToFavorite, { slug: slug }, { headers: headers }).then(res => {
            console.log('[NEW ELEM] ', slug);
            this.setState({
                ...this.state,
                loading: false
            });
            alert('Elemento agregado correctamente!');
        }).catch(err => console.log(err))
    }

    render() {

        const { error, loading, product } = this.state;


        return (
            <div>{
                loading ? <Loader spinnerType='big' /> :
                    <section className="bg-white border-b py-8">
                        <div className="container mx-auto flex justify-center flex-wrap pt-4 pb-12">
                            <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">{product.name}</h1>
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                            </div>
                        </div>

                        <div className="w-full p-6 flex flex-col flex-grow flex-shrink">

                            <div className="flex-1 bg-gray-200 rounded-t rounded-b-none overflow-hidden shadow">
                                <p className="text-gray-800 text-base p-6 mb-5">{product.description}</p>
                            </div>

                            <div className="flex-none bg-gray-200 rounded-b rounded-t-none overflow-hidden shadow">
                                <div className="flex items-center justify-center">
                                    <Link to={`/categorias/${product.category.slug}`} className="lg:mx-0 hover:underline bg-avilaGreen-200 text-white font-bold rounded-full my-4 py-2 px-8 shadow-lg">Más de #{product.category.public_name}</Link>
                                    {this.props.isAuthenticated ? <button onClick={() => this.newElemToFav(product.slug)} className="hover:underline bg-avilaGreen-200 text-white font-bold rounded-full my-4 py-2 px-6 shadow-lg mx-2">Favorito</button> : null}
                                </div>
                            </div>
                        </div>
                    </section>
            }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
