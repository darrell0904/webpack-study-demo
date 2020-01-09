function Header() {
	var dom = document.getElementById('root');
	var header = document.createElement('div');
	header.innerText = '头部内容';
	dom.append(header);
}

export default Header;