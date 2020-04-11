import React from 'react';

import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
                    <div className="w-full font-bold text-xl text-gray-800 p-6 uppercase">
                        {props.category.public_name}.
                    </div>
                    <p className="text-gray-800 text-base px-6 mb-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
					</p>
                </Link>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow">
                <div className="flex items-center justify-center">
                    <button className="mx-auto lg:mx-0 hover:underline bg-avilaGreen-200 text-white font-bold rounded-full my-4 py-4 px-8 shadow-lg">Visitar</button>
                </div>
            </div>
        </div>
    )
}

export default Card;