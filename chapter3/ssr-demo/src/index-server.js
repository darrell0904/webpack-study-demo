const React = require('react');
const bg = require('./assets/lufei.jpg');
const s = require('./index.less');

class App extends React.Component {
  render() {
    return (
      <div className="Home">
        HomePage
        <img src={bg} alt="bg" />
      </div>
    );
  }
}

module.exports = <App />;
