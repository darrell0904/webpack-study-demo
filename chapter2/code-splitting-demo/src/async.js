// export default function getComponent() {
// 	return import('lodash').then(({ default: _ }) => {
// 		var element = document.createElement('div');
// 		element.innerHTML = _.join(['Hello', 'Darrell'], '-');
// 		return element;
// 	})
// }

const getComponent = async () => {
	const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
	const element = document.createElement('div');
	element.innerHTML = _.join(['Dell', 'Lee'], '-');
	return element;
}

export default getComponent;

// getComponent().then(element => {
// 	document.body.appendChild(element);
// });