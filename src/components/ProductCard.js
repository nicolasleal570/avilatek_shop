import React from 'react'

import { Link } from 'react-router-dom';

const Card = (props) => {
    const { id, name, description, price, slug, category } = props.product;

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
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow">
                <div className="flex items-center justify-center">
                    <Link to="/" className="mx-auto lg:mx-0 hover:underline bg-avilaGreen-200 text-white font-bold rounded-full my-4 py-4 px-8 shadow-lg">Visitar</Link>
                </div>
            </div>
        </div>
    )
}

export default Card;