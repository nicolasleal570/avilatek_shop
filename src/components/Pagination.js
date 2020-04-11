import React from 'react'
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page, canMove = true) {
        if (canMove) {
            let items = this.props.items;
            let pager = this.state.pager;

            if (page < 1 || page > pager.totalPages) {
                return;
            }

            // get new pager object for specified page
            pager = this.getPager(items.length, page);

            // get new page of items from items array
            let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

            // update state
            this.setState({ pager: pager });

            // call change page function in parent component
            this.props.onChangePage(pageOfItems);
        }
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 5;

        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        let btnClass = 'inline-block border border-avilaGreen-200 rounded py-1 px-3 bg-avilaGreen-200 flex-auto mx-1 text-white text-center';
        let numClass = 'inline-block border rounded py-1 px-3 flex-auto mx-1 text-white text-center';

        let firstBtnCanActivate = pager.currentPage === 1;
        let lastBtnCanActivate = pager.currentPage === pager.totalPages;

        return (
            <ul className="w-full flex">
                <li className={firstBtnCanActivate ? `${btnClass} text-gray-400 cursor-not-allowed` : `${btnClass} text-white`}>
                    <button onClick={(firstBtnCanActivate) => this.setPage(1, firstBtnCanActivate)}>First</button>
                </li>
                <li className={firstBtnCanActivate ? `${btnClass} text-gray-400 cursor-not-allowed` : `${btnClass} text-white`}>
                    <button onClick={(firstBtnCanActivate) => this.setPage(pager.currentPage - 1, firstBtnCanActivate)}>Previous</button>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? `${numClass} font-bold border-avilaGreen-300 bg-avilaGreen-300` : `${numClass} bg-avilaGreen-200 font-normal`}>
                        <button onClick={() => this.setPage(page)}>{page}</button>
                    </li>
                )}
                <li className={lastBtnCanActivate ? `${btnClass} text-gray-400 cursor-not-allowed` : `${btnClass} text-white`}>
                    <button onClick={(lastBtnCanActivate) => this.setPage(pager.currentPage + 1, lastBtnCanActivate)}>Next</button>
                </li>
                <li className={lastBtnCanActivate ? `${btnClass} text-gray-400 cursor-not-allowed` : `${btnClass} text-white`}>
                    <button onClick={(lastBtnCanActivate) => this.setPage(pager.totalPages, lastBtnCanActivate)}>Last</button>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

class PagesSelector extends React.Component {
    constructor() {
        super();

        // an example array of items to be paged
        let exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div>
                <div className="bg-gray-100 py-8">
                    <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Pagination;