function Header() {
	var dom = document.getElementById('root');
	var header = document.createElement('div');
	header.innerText = 'webpack-dev-server';
	dom.append(header);
}

export default Header;