import React from 'react'

import Card from './CategoryCard';

import Loader from './Loader';

const CategoriesSection = (props) => {
    const { limit, loading, categories } = props;

    let cards = null

    if (limit && !loading) {
        cards = categories.map((item, index) => {
            if (index < limit) {
                return (<Card key={item.id} category={item} />);

            }
        });
    } else {
        cards = categories.map((item) => (<Card key={item.id} category={item} />));
    }

    return (
        <section className="bg-white border-b py-8">
            <div className="container mx-auto flex justify-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Categorías Interesantes</h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>

                {loading ? <Loader spinnerType='big' /> : cards}

            </div>

        </section>
    )
}

export default CategoriesSection
