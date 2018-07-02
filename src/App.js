import React, { Component } from 'react';
import './App.css';

class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(value, priority) {
    const newNode = new Node(value, priority);
    this.heap.push(newNode);
    let currentNodeIndex = this.heap.length - 1;
    let currentNodeParentIndex = Math.floor(currentNodeIndex / 2);

    while (this.heap[currentNodeParentIndex] &&
      newNode.priority > this.heap[currentNodeParentIndex].priority) {
      const parent = this.heap[currentNodeParentIndex];
      this.heap[currentNodeParentIndex] = newNode;
      this.heap[currentNodeIndex] = parent;
      currentNodeIndex = currentNodeParentIndex;
      currentNodeParentIndex = Math.floor(currentNodeIndex / 2);
    }
  }



}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: new PriorityQueue()
    }
  }

  handleSubmit =(e) => {
    e.preventDefault();
    const priority = +this.refs.priority.value;
    const content = {
        message: this.refs.input.value,
        id: new Date().getTime()
    }

    this.state.list.insert(content, priority)

    this.setState({
      list: this.state.list
    });

    this.refs.input.value = this.refs.priority.value = '';
  }

  render() {
    const list = this.state.list.heap.map(a => {
      const priorityClass = () => {
        const level = a.priority;
        switch (level) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
            return 'alert-secondary';

          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            return 'alert-info';

          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
            return 'alert-primary';

          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            return 'alert-warning';

          default: return 'alert-danger'
        }

      }

      const messageClass = `alert ${priorityClass()}`;

      return <li key={a.value.id}>
        <div className={messageClass}>
          <span>{ a.value.message}</span> <span className="priority">Priority: {a.priority}</span>
        </div>

      </li>;
    });

    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.handleSubmit} >
          <div className="form-group mb-2">
              <input className="form-control" ref="input" placeholder="Message"/>
          </div>
          <div className="form-group mx-sm-3 mb-2">
              <input className="form-control" ref="priority" placeholder="Priority" default="1"/>
          </div>
          <button className="btn btn-primary mb-2" type="submit">Add to Queue</button>
        </form>

        <div>
          <ol>{list}</ol>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <List />
    );
  }
}


export default App;
