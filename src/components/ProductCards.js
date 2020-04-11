import React from 'react'

import { Link } from 'react-router-dom';

import Card from './ProductCard';

const ProductsSection = (props) => {
    const { limit, loading, products } = props;

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

                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Algunos Productos</h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>

                {cards}

            </div>

        </section>
    )
}

export default ProductsSection
