import React, { Component } from 'react';
import './App.css';


class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
    this.next = null;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  insert(value, priority) {
    const newNode = new Node(value, priority);
    console.log('newNode: ');
    console.log(newNode);
    this.heap.push(newNode);

    console.log('this.heap: ');
    console.log(this.heap);

    let currentNodeIndex = this.heap.length - 1;
    let currentNodeParentIndex = Math.floor(currentNodeIndex / 2);
    console.log(`currentNodeIndex: ${currentNodeIndex}`);
    console.log(`currentNodeParentIndex: ${currentNodeParentIndex}`);

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
  }

  render() {

    const list = this.state.list.heap.map(a => {
      return <li key={a.value.id}>Priority: {a.priority} | message: { a.value.message}</li>;
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input placeholder="message" ref="input"/>
          </div>
          <div>
            <label>Priority:
              <input ref="priority" default="1"/>
              <input type="submit" value="Add to Queue" />
            </label>
          </div>
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
