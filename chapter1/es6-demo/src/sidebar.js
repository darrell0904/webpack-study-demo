function Sidebar() {
	var dom = document.getElementById('root');
	var sidebar = document.createElement('div');
	sidebar.innerText = '侧边栏内容';
	dom.append(sidebar);
}

export default Sidebar;
