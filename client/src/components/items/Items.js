import React, { Component } from 'react';
import Item from './Item';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';

class Items extends Component {

    render() {
        const { items } = this.props;
        if (items) {
            return(
                <div className="container mt-3" id="specialDiv">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-0 col-0"></div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <ul className="list-group" id="tvNames">
                                <li className="list-group-item list-group-item-light text-center" id="headerList">TVName</li>
                                {items.map(item => (
                                    <Item key={item.id} uuid={item.id} tvid={item.tvid} tvname={item.tvname} showtype={item.showtype} link={item.link} places={item.places} remarks={item.remarks}/>
                                ))}
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-0 col-0"></div>
                    </div>
                </div>
            )
        } else {
            return <Spinner />;
        }
    }

}

Items.propTypes = {
    firestore: PropTypes.object.isRequired,
    items: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: 'tvdb', orderBy: ['tvid'] }]),
    connect((state, props) => ({
        items: state.firestore.ordered.tvdb
    }))
)(Items);