import React, { Fragment } from 'react'

const Loader = (props) => {

    let smallSpinner = <div className="Loader">
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
        <div className="bg-avilaGreen-200"></div>
    </div>

    let bigSpinner = <div className="bg-gray-100 py-8 w-full">
        <div className="container mx-auto flex justify-center flex-wrap pt-4 ">
            {smallSpinner}
        </div>
    </div>

    let largeSpinner = <div className="flex justify-center items-center flex-wrap absolute w-screen h-screen overflow-x-hidden overflow-y-hidden top-0 left-0 bg-gray-100 py-8">
        {smallSpinner}
    </div>

    let finalSpinner = null;
    if (props.spinnerType === 'small') {
        finalSpinner = smallSpinner
    }
    if (props.spinnerType === 'big') {
        finalSpinner = bigSpinner
    }
    if (props.spinnerType === 'large') {
        finalSpinner = largeSpinner
    }

    return (
        <Fragment>
            {
                finalSpinner
            }
        </Fragment>
    )
}

export default Loader;