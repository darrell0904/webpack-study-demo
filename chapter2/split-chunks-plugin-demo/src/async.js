const getComponent = async () => {
	const { default: _ } = await import(/* webpackChunkName:"lodash1" */ 'lodash');
	const element = document.createElement('div');
	element.innerHTML = _.join(['Hello', 'Darrell'], '-');
	return element;
}

// getComponent().then(element => {
// 	document.body.appendChild(element);
// });

export default getComponent;
