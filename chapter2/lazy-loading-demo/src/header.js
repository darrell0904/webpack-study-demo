function Header() {
	var dom = document.getElementById('root');
	var header = document.createElement('div');
  header.innerText = '头部内容';
  // header.style.color = 'red';
  header.classList.add('wrapper')
	dom.append(header);
}

export default Header;