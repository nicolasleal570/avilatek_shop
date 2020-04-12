import React, { useState } from 'react'

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getFavorites } from '../store/actions/favorite'

const Card = (props) => {

    const { id, name, description, price, slug, category } = props.product;

    const isFav = props.favProducts.find(item => slug === item.slug);
    const [isClicked, setIsClicked] = useState(isFav)

    const newElemToFav = slug => {
        if (!isClicked) {
            props.addToFavorite(slug)
            setIsClicked(true)
        }
    }

    return (
        <div className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
                    <div className="w-full font-bold text-xl text-gray-800 p-6 uppercase">
                        {name}.
                    </div>
                    <p className="text-gray-800 text-base px-6 mb-5">{description}</p>
                </Link>
                <div className="px-6 py-2 mb-4">
                    <Link to="/" className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 capitalize"># {category.public_name}</Link>
                </div>
                <div className="px-6 py-2 text-center">
                    <span className="font-bold"> $ {price}</span>
                </div>
            </div>
            <div className="mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow">
                <div className="flex items-center justify-start px-6">
                    <Link to="/" className="hover:underline bg-gray-500 text-white font-bold rounded-full my-4 py-2 px-8 shadow-lg">Visitar</Link>

                    {!isClicked ? <button onClick={() => newElemToFav(slug)} className="hover:underline bg-avilaGreen-200 text-white font-bold rounded-full my-4 py-2 px-6 shadow-lg mx-2">Favorito</button> : null}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.favorite.error,
        loading: state.favorite.loading,
        favProducts: state.favorite.favProducts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFavorites: () => dispatch(getFavorites())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);