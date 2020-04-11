import React from 'react'

import Card from './ProductCard';

const FavoriteCards = (props) => {
    const { limit, loading, products } = props;
    const productsCount = products.length

    let cards = null

    if (limit && !loading) {
        cards = products.map((item, index) => {
            if (index < limit) {
                return (<Card key={item.id} product={item} />);
            }
        });
    } else {
        cards = products.map((item) => (<Card key={item.id} product={item} />));
    }

    return (
        <section className="bg-gray-100 py-8">
            <div className="container mx-auto flex flex-wrap pt-4 pb-12">

                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Tus Productos Favoritos</h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="w-full mb-4">
                    <h3 className="bg-avilaGreen-200 text-white font-bold rounded-full py-2 px-8 shadow-lg">{productsCount} Productos</h3>
                </div>

                {cards}

            </div>

        </section>
    )
}

export default FavoriteCards;
