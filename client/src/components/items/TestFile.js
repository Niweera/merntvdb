// import React, { Component } from 'react'
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import Spinner from '../layout/Spinner';
// import PropTypes from 'prop-types';

// class TestFile extends Component {

//     onDeleteClick = () => {
//       const { items, firestore } = this.props;
      
//       items.forEach(function(item,index){
//         let remark ='';
//         let links ='';
//         if (item.remarks){
//           remark = item.remarks;
//         }else{
//           remark = '';
//         }
//         if (item.link){
//           links = item.link;
//         }else{
//           links = 'https://www.google.com/search?q='+item.tvname+' TV Series';
//         }
//         const newItem = {
//           tvid: parseInt(item.tvid),
//           tvname: item.tvname,
//           showtype: item.showtype,
//           places: [item.pid+" "+item.tvfrom+" "+item.tvto],
//           link: links,
//           remarks: remark,
//         }
//         firestore.add({collection: 'tvdb'}, newItem);
//       })

//       // const tvid = 1;
//       // const tvname = 'if it quacks like a duck and walks like a duck then it is a duck';
//       // const showtype = 'Airing';
//       // const places = ['l S01 S01'];
//       // const link = "https://niweera.gq";
//       // const remarks = 'Undefined?';
//     };

//     render() {
//         const { items } = this.props;

//         if (items){
//         return (
//           <div className="container">
//             {/* {items.map(item => (
//               <h3>{item.tvname}</h3>
//             ))} */}
//             {/* <i className="fas fa-times-circle" onClick={() => this.onDeleteClick()} style={{fontSize: '35px', color: 'red', cursor: 'pointer'}}></i> */}
//           </div>
//         );
//         }else{
//           return <Spinner/>;
//         }
//     }
// }

// TestFile.propTypes = {
//   firestore: PropTypes.object.isRequired,
//   items: PropTypes.array
// };

// export default compose(
//   firestoreConnect([{ collection: 'tvdbold' }]),
//   connect((state, props) => ({
//       items: state.firestore.ordered.tvdbold
//   }))
// )(TestFile);