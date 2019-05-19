import React, { Component } from 'react'
import classnames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { actionTypes } from 'redux-firestore';

class EditForm extends Component {
    state = {
        errors: {},
        showMessage: false
    };

    onDeleteClick = place => {
      const { item, firestore} = this.props;
      const { places } = item;
      var array = places;
      var filtered = array.filter(function(value, index, arr){
          return value !== place;
      });
      const updateItem = {
        places: filtered,
      };
      firestore.update({ collection: 'tvdb', doc: item.id}, updateItem).then(this.setState({showMessage: true}));
    };

    onInsert = (e) => {
      e.preventDefault();
      const { item, firestore} = this.props;
      const { places } = item;
      var self = this;
      const pid = self.insertPid.value;
      const tvfrom = self.insertTvfrom.value;
      const tvto = self.insertTvto.value;
      if (pid === ''){
        self.setState({errors: {insertPid: 'Pid is required'}});
        return;
      }
      if (tvfrom === ''){
        self.setState({errors: {insertTvfrom: 'TVFrom is required'}});
        return;
      }
      if (tvto === ''){
        self.setState({errors: {insertTvto: 'TVTo is required'}});
        return;
      }
      if (places && pid !== '' && tvfrom !== '' && tvto !== ''){
        let newPlace = pid+" "+tvfrom+" "+tvto;
        var newPlaces = [...places, newPlace]
        let updateItem = {
          places: newPlaces,
        };
        firestore.update({ collection: 'tvdb', doc: item.id}, updateItem).then(self.setState({showMessage: true}));
        self.insertPid.value = '';
        self.insertTvfrom.value = '';
        self.insertTvto.value = '';
      }

    };

    onSubmit = (e) => {
        e.preventDefault();
        const { item, firestore } = this.props;
        const { places } = item;
        var self = this;
        let placesArray = [];
        const tvname = self.tvname.value;
        const showtype = self.showtype.value;
        const link = self.link.value;
        const remarks = self.remarks.value;

        if (tvname === ''){
          this.setState({errors: {tvname: 'TVName is required'}});
          return;
        }
        if (showtype === ''){
          this.setState({errors: {showtype: 'ShowType is required'}});
          return;
        }
        if (link === ''){
          this.setState({errors: {link: 'Link is required'}});
          return;
        }
        
        places.forEach(function(place,index){
          const pid = self[`pid${index}`].value;
          const tvfrom = self[`tvfrom${index}`].value;
          const tvto = self[`tvto${index}`].value;
          if (pid === ''){
            self.setState({errors: {[`pid${index}`]: 'Pid is required'}});
            return;
          }
          if (tvfrom === ''){
            self.setState({errors: {[`tvfrom${index}`]: 'TVFrom is required'}});
            return;
          }
          if (tvto === ''){
            self.setState({errors: {[`tvto${index}`]: 'TVTo is required'}});
            return;
          }
          if (pid !== '' && tvfrom !== '' && tvto !== ''){
            placesArray.push(`${pid} ${tvfrom} ${tvto}`)
          }
        })
        
        let updateItem = {};
        if (placesArray.length === places.length){
          updateItem = {
            tvname: tvname,
            showtype: showtype,
            remarks: remarks,
            places: placesArray,
            link: link,
          };
          firestore.update({ collection: 'tvdb', doc: item.id}, updateItem).then(this.setState({showMessage: true}));
        }
    };

    componentWillUnmount() {
      this.props.dispatch({ type: actionTypes.CLEAR_DATA, preserve: { data: ['tvdb'], ordered: ['tvdb'] } });
    }

    render() {
        const { errors, showMessage } = this.state;
        const { item } = this.props;
        
        if (item){
        const { tvid, tvname, showtype, link, places, remarks } = item;
        return (
          <div className="container">
            <div className="container mt-2">
                <h1 className="text-center" style={{textShadow: '0 1px 3px rgba(0,0,0,.5)',color: 'white'}}>Update Records</h1>
            </div>
            <div className="jumbotron bg-dark mt-4 pt-3 pb-1">
              <form onSubmit={this.onSubmit}>
                <div className="row form-group">
                  <div className="col-md-2">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.tvid})} placeholder="TVID" name="tvid" defaultValue={tvid} disabled/>
                    {errors.tvid && <div className="invalid-feedback">{errors.tvid}</div>}
                  </div>
                  <div className="col-md-7">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.tvname})} placeholder="TVName" name="tvname" ref={input => {this.tvname = input}} defaultValue={tvname}/>
                    {errors.tvname && <div className="invalid-feedback">{errors.tvname}</div>}
                  </div>
                  <div className="col-md-3">
                    <select className={classnames('form-control', {'is-invalid': errors.showtype})} name="showtype" ref={select => {this.showtype = select}} defaultValue={showtype}>
                      <option value='' disabled>Select ShowType</option>
                      <option value='Completed'>Completed</option>
                      <option value='Airing'>Airing</option>
                      <option value='Break'>Break</option>
                    </select>
                    {errors.showtype && <div className="invalid-feedback">{errors.showtype}</div>}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-6">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.link})} placeholder="Wikipedia Link" name="link" ref={input => {this.link = input}} defaultValue={link}/>
                    {errors.link && <div className="invalid-feedback">{errors.link}</div>}
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Remarks" name="remarks" ref={input => {this.remarks = input}} defaultValue={remarks} onChange={this.onChange}/>
                  </div>
                </div>

                {places.map((place, index) => {return (
                  <div className="row form-group" key={place.toString()}>
                    <div className="col-md-4">
                      <select className={classnames('form-control', {'is-invalid': errors[`pid${index}`]})} name={`pid${index}`} ref={select => {this[`pid${index}`] = select}} defaultValue={place.split(" ")[0]}>
                          <option value='' disabled>Select Pid</option>
                          <option value='b1'>b1</option>
                          <option value='b2'>b2</option>
                          <option value='b3'>b3</option>
                          <option value='b4'>b4</option>
                          <option value='b5'>b5</option>
                          <option value='l'>l</option>
                          <option value='p'>p</option>
                        </select>
                        {errors[`pid${index}`] && <div className="invalid-feedback">{errors[`pid${index}`]}</div>}
                    </div>
                    <div className="col-md-4">
                      <input type="text" className={classnames('form-control', {'is-invalid': errors[`tvfrom${index}`]})} placeholder="TVFrom" name={`tvfrom${index}`} defaultValue={place.split(" ")[1]} ref={input => {this[`tvfrom${index}`] = input}}/>
                      {errors[`tvfrom${index}`] && <div className="invalid-feedback">{errors[`tvfrom${index}`]}</div>}
                    </div>
                    {places.length > 1 ? (<div className="col-md-3">
                      <input type="text" className={classnames('form-control', {'is-invalid': errors[`tvto${index}`]})} placeholder="TVTo" name={`tvto${index}`} defaultValue={place.split(" ")[2]} ref={input => {this[`tvto${index}`] = input}}/>
                      {errors[`tvto${index}`] && <div className="invalid-feedback">{errors[`tvto${index}`]}</div>}
                    </div>) : <div className="col-md-4">
                      <input type="text" className={classnames('form-control', {'is-invalid': errors[`tvto${index}`]})} placeholder="TVTo" name={`tvto${index}`} defaultValue={place.split(" ")[2]} ref={input => {this[`tvto${index}`] = input}}/>
                      {errors[`tvto${index}`] && <div className="invalid-feedback">{errors[`tvto${index}`]}</div>}
                    </div>}
                    {places.length > 1 ? (<div className="col-md-1">
                      <i className="fas fa-times-circle" onClick={() => this.onDeleteClick(place)} style={{fontSize: '35px', color: 'red', cursor: 'pointer'}}></i>
                    </div>) : null}
                  </div>
                );})}
                <div className="row form-group">
                  <div className="col-md-2">
                    <input type="submit" value="Update Records" className="btn btn-success"/>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-2"></div>
                  <div className="col-md-2"></div>
                </div>
              </form>
              
              <div className="container mt-5 mb-2">
                <h3 className="text-light">Insert New Place</h3>
              </div>
              <hr style={{height: '1px', color:'white', backgroundColor: 'white', border: 'none'}}/>
              <form onSubmit={this.onInsert}>
                <div className="row form-group">
                  <div className="col-md-3">
                    <select className={classnames('form-control', {'is-invalid': errors.insertPid})} name="insertPid" ref={select => {this.insertPid = select}} defaultValue={''}>
                        <option value='' disabled>Select Pid</option>
                        <option value='b1'>b1</option>
                        <option value='b2'>b2</option>
                        <option value='b3'>b3</option>
                        <option value='b4'>b4</option>
                        <option value='b5'>b5</option>
                        <option value='l'>l</option>
                        <option value='p'>p</option>
                      </select>
                      {errors.insertPid && <div className="invalid-feedback">{errors.insertPid}</div>}
                  </div>
                  <div className="col-md-3">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.insertTvfrom})} placeholder="TVFrom" name="insertTvfrom" ref={input => {this.insertTvfrom = input}} defaultValue={''}/>
                    {errors.insertTvfrom && <div className="invalid-feedback">{errors.insertTvfrom}</div>}
                  </div>
                  <div className="col-md-3">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.insertTvto})} placeholder="TVTo" name="insertTvto" ref={input => {this.insertTvto = input}} defaultValue={''}/>
                    {errors.insertTvto && <div className="invalid-feedback">{errors.insertTvto}</div>}
                  </div>
                  <div className="col-md-3">
                    <input type="submit" value="Insert New Place" className="btn btn-success btn-block"/>
                  </div>
                </div>
              </form>
            </div>
            {showMessage && <div className="alert alert-success">
              <strong>Successfully Updated!</strong>
            </div>}
          </div>
        );
      }else{
          return <Spinner/>;
        }
    }
}

// EditForm.propTypes = {
//   firestore: PropTypes.object.isRequired,
//   item: PropTypes.object
// };

// export default compose(
//   firestoreConnect(props => [
//     { collection: 'tvdb', storeAs: 'item', doc: props.match.params.id }
//   ]),
//   connect(({ firestore: { ordered } }, props) => ({
//       item: ordered.item && ordered.item[0]
//   }))
// )(EditForm);

EditForm.propTypes = {
  firestore: PropTypes.object.isRequired,
  item: PropTypes.object,
  items: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    { collection: 'tvdb', orderBy: ['tvid'] },
    { collection: 'tvdb', storeAs: 'item', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
      items: ordered.tvdb,
      item: ordered.item && ordered.item[0]
  }))
)(EditForm);