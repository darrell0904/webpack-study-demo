// import _ from 'lodash';
// import $ from 'jquery';

// const getComponent = async () => {
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
// 	const { default: $ } = await import(/* webpackChunkName:"jquery" */ 'jquery');
  
// 	const dom = $('<div>');
//   dom.html(_.join(['Hello', 'darrell123'], ' '));

//   return dom;
// }

// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element[0]);
//   });
// })

import React, { Component } from 'react';

class App extends Component {
	render() {
		return (
			<div>
				hello，React！！！
			</div>
		)
	}
}

export default App;





