import React, { Component } from 'react';
import './App.css';


// class Node {
//   constructor(val, priority) {
//     this.value = val;
//     this.priority = priority;
//     this.next = null;
//   }
// }


// class PriorityQueue {
//   constructor() {
//     this.first = null;
//   }

//   insert(value, priority) {
//     const newNode = new Node(value, priority);
//     if (!this.first || priority > this.first.priority) {
//       newNode.next = this.first;
//       this.first = newNode;
//     } else {
//       let pointer = this.first;
//       while (pointer.next && priority < pointer.next.priority) {
//         pointer = pointer.next;
//       }
//       newNode.next = pointer.next;
//       pointer.next = newNode;
//     }
//   }
// }

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  handleSubmit =(e) => {
    e.preventDefault();
    const thing = {
      content: {
        message: this.refs.input.value,
        id: new Date().getTime()
      },
      priority: +this.refs.priority.value
    }

    this.setState(prevState => ({
      list: prevState.list.concat(thing)
    }));

  }

  render() {
    const list = this.state.list.map(a => {
      return <p key={a.content.id}>Priority: {a.priority} | message: { a.content.message}</p>;
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
          { list }
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
