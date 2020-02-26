import React, { Component } from 'react';
import './index.less';
import bg from './assets/lufei.jpg';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 1,
      demoList: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                  { id: 1 }, { id: 2 }]
            });
        }, 5000);
    });

    this.setState({
        demoList: data
    });
  };

  UNSAFE_componentWillMount() {
    console.log('哈哈哈~ ！准备渲染了');
    setTimeout(() => {
      this.setState({
        name: 10,
      })
    }, 3000);
  }

  addNum = () => {
    this.setState({
      name: this.state.name + 1,
    })
  }

  render() {
    const { name, demoList } = this.state;
    const {data} = demoList;
    return (
      <div className="Home">
        HomePage
        <img src={bg} alt="bg" onClick={this.addNum} />
        {name}
        {
          data && data.map((item) => {
            return <li key={item.id}>{item.id}</li>;
          })
        }
      </div>
    );
  }
}

// module.exports = Home;
export default Home;
