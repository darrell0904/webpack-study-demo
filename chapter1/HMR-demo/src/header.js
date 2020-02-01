function Header() {
	var dom = document.getElementById('root');
	var header = document.createElement('div');
	header.innerText = 'webpack-dev-server111';
	dom.append(header);
}

export default Header;