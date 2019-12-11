import React, { Component } from "react";
import "./App.css";
import { getMonth } from "./modules";
import { templates, commTemplates } from "./templates";
import dimaAva from './img/dima.jpg'
import alexAva from './img/alex.jpg'

const Type = props => {
  let id = "option" + props.type;
  return (
    <label className="btn btn-secondary active radio" onClick={props.onClick}>
      {props.checked ? (
        <input
          type="radio"
          name="options"
          id={id}
          autoComplete="off"
          onChange={props.onClick}
          checked
        ></input>
      ) : (
        <input type="radio" name="options" id={id} autoComplete="off"></input>
      )}{" "}
      {props.type}
    </label>
  );
};
const Evaluator = props => {
  let id = "option" + props.name;
  let ava = `url("${props.ava}")`
  return (
  
    <label className="btn btn-secondary active radio evaluator" onClick={props.onClick}>
      <div className="evaluator-info">
      <div className="evaluator-ava" style={{backgroundImage:ava}}></div>
      <div className="evaluator-name">{props.name}</div>

      </div>
      

      {props.checked ? (
        <input
          type="radio"
          name="options"
          id={id}
          autoComplete="off"
          onChange={props.onClick}
          checked
        ></input>
      ) : (
        <input type="radio" name="options" id={id} autoComplete="off"></input>
      )}{" "}
      
    </label>
  )
};
const GoalsList = props => {
  return (
    <div className="eGoals">
    <span>Goals: </span>
    {props.listStyle === "numbers" 
    ? <ol>
        {props.goals
          ? props.goals.map(function(name, index) {
              return <li key={index}>{name}</li>;
            })
          : ""}{" "}
      </ol>
    : <ul>
        {props.goals
          ? props.goals.map(function(name, index) {
              return <li key={index} className='hyphened'>{name}</li>;
            })
          : ""}{" "}
      </ul>
    }
  </div>
  );
};
const Input = props => {
  let name = props.type
  let className = (props.issues) ? `input-group-text label` :  `input-group-text`
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className={className} id={name} onClick={props.onClick}>
          {props.label}
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Default"
        autoComplete='on'
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        aria-describedby="inputGroup-sizing-default"
      ></input>
    </div>
  );
};
class App extends Component {
  constructor() {
    super();
    // Type
    this.setLowRating = this.setLowRating.bind(this);
    this.setRegular = this.setRegular.bind(this);

    // Evaluators 
    this.setDima = this.setDima.bind(this);
    this.setAlex = this.setAlex.bind(this);
    
    // Inputs
    this.setOrders = this.setOrders.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.setIssues = this.setIssues.bind(this);
    this.setCommIssues = this.setCommIssues.bind(this);

    // Fair/Unfair
    this.setFair = this.setFair.bind(this);
    this.setUnfair = this.setUnfair.bind(this);

    // List Style
    this.setNumbers = this.setNumbers.bind(this);
    this.setHyphens = this.setHyphens.bind(this);
    
    // Submit
    this.handleSubmit = this.handleSubmit.bind(this);

    // Hints
    this.showIssues = this.showIssues.bind(this)
    this.appendIssues = this.appendIssues.bind(this)

    this.showCommIssues = this.showCommIssues.bind(this)
    this.appendCommIssues = this.appendCommIssues.bind(this)

    this.state = {
      evaluator: 'Dima',
      evaluatorColor: 'rgb(40,167,69)',
      displayFairUnfair: "none",
      showIssues: "-2000px",
      showCommIssues: "-2000px",
      type: "regular",
      orders: "",
      level: "",
      issues: "",
      commIssues: '',
      commIssuesOutput: '',
      rating: "fair",

      comment: "",
      level: "",
      goals: "",
      listStyle: "numbers"
    };
  }
  
  showIssues() {
    this.setState({showIssues: '0',showCommIssues: '-2000px'})
  }
  showCommIssues() {
    this.setState({showIssues: '-2000px',showCommIssues: '0'})
  }
  appendIssues(e) {
    let issues = this.state.issues
    if (issues) {
      issues = issues+', '+e.target.innerText
    } else {
      issues = e.target.innerText
    }
    e.target.style.backgroundColor = this.state.evaluatorColor
   
    console.log(issues)
    this.setState({issues:issues})
   
  }
  appendCommIssues(e) {
    let commIssues = this.state.commIssues
    if (commIssues) {
      commIssues = commIssues+', '+e.target.innerText
    } else {
      commIssues = e.target.innerText
    }
    e.target.style.backgroundColor = this.state.evaluatorColor
    this.setState({commIssues})
  }

  setDima() {
    this.setState({
      evaluator: 'Dima',
      evaluatorColor: 'rgb(40,167,69)'

    });
  }
  setAlex() {
    console.log('to Alex')
    this.setState({
      evaluator: 'Alex',
      evaluatorColor: 'rgb(181,148,164)'
    });
  }
  setLowRating() {
    this.setState({
      displayFairUnfair: "block",
      type: "lowRating"
    });
  }
  setRegular() {
    this.setState({
      displayFairUnfair: "none",
      type: "regular"
    });
  }
  setNumbers() {
    this.setState({
      listStyle: "numbers"
    });
  }
  setHyphens() {
    this.setState({
      listStyle: "hyphens"
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    let evaluator = this.state.evaluator,
        ordersN = this.state.orders.split(" ").length,
        isFair = this.state.rating === "fair",
        level = this.state.level,
        isGood = /(?:Master|PhD)/gi.test(level),
        tempKeys = templates.map(p => Object.keys(p)[0]),
        commKeys = commTemplates.map(p => Object.keys(p)[0]),
        stateIssues = this.state.issues,
        stateCommIssues = this.state.commIssues,
        type = this.state.type,
        goals = [],
        communication = []

    stateIssues = stateIssues.includes(',') ? stateIssues.split(',').map(m => m.trim()) : [stateIssues.trim()]

    if (!(stateIssues.length === 1 && !stateIssues[0].length)) {
      stateIssues.map(k => {
        if (tempKeys.includes(k) || tempKeys.find(w => {return w.includes(k)}) !== undefined) {
         if (tempKeys.includes(k)) {
          goals.push(Object.values(templates.find(o => o[k]))[0]);
         } else if (tempKeys.find(w => {return w.includes(k)}) !== undefined) {
           let key = tempKeys.find(w => {return w.includes(k)})
          goals.push(Object.values(templates.find(o => o[key]))[0]);
         }
        
        } else {
          goals.push('Fix '+k+'.')
        }
      })
    }
    stateCommIssues = stateCommIssues.includes(',') ? stateCommIssues.split(',').map(m => m.trim()) : [stateCommIssues.trim()]
    console.log(stateCommIssues)
    
    if (!(stateCommIssues.length === 1 && !stateCommIssues[0].length)) {
      stateCommIssues.map(k => {
        if (commKeys.includes(k) || commKeys.find(w => {return w.includes(k)}) !== undefined) {
         if (commKeys.includes(k)) {
          communication.push(Object.values(commTemplates.find(o => o[k]))[0]);
         } else if (commKeys.find(w => {return w.includes(k)}) !== undefined) {
           let key = commKeys.find(w => {return w.includes(k)})
          communication.push(Object.values(commTemplates.find(o => o[key]))[0]);
         }
        
        } else {
          communication.push('Fix '+k+'.')
        }
      })
    }
    console.log(communication)
    // commKeys.map(k => {
    //   if (this.state.commIssues.includes(k))
    //     communication.push(Object.values(commTemplates.find(o => o[k]))[0]);
    // });
    let base,lowRating,regular,mistakes,ending;
    if (stateIssues.length > 1) {
      stateIssues[stateIssues.length-1] =  `and ${stateIssues[stateIssues.length-1]}`
    }
    if (evaluator === 'Dima') {
        base = `Dear writer, I am ready to present your ${getMonth()} Quality Report! `;
        let theLevel = `Your ${ordersN > 1 ? `average ` : ''}quality mark ${ordersN > 1 ? `for these orders is ${level}`: `for the order is ${level}` }. `
    
        lowRating = `For the purposes of quality improvement, I have checked ${ordersN} ${
          ordersN > 1 ? "orders" : "order"
        } that received poor rating last month. ${level ? theLevel : ''}Having reviewed ${
          ordersN > 1 ? "these orders" : "this order"
        }, I came to the conclusion that customer's assessment of your work is ${
          this.state.rating
        }. 
        ${isFair ? "Indeed" : "However"}, you have made ${
          isFair ? "many significant" : "a few "
        } mistakes to consider. `;
    
        regular = `This is your regular quality report for which I have checked ${ordersN} ${
          ordersN > 1 ? "orders" : "order"
        } finished last month. ${level ? theLevel : ''}Having reviewed ${
          ordersN > 1 ? "these orders" : "this order"
        }, I came to the conclusion that customer's assessment of your work is ${
          this.state.rating
        }. ${isFair ? "Indeed" : "However"}, you have made ${
          isFair ? "many significant" : "a few "
        } issues to consider. `;
    
        mistakes = `The most notable areas of concern in your ${
          ordersN > 1 ? "essays" : "essay"
        } include ${stateIssues.length > 1 ? stateIssues.join(', ') : stateIssues}. `;
        ending = `${
          isGood
            ? `Therefore, your work does not cause significant concern, but I still recommend you to get acquainted with the apparent issues. `
            : `I recommend you to pay close attention to the report and work on the highlighted areas. Otherwise, you may face fines and suspensions. `
        }See the attached document for details and supporting materials.`;

        if (type === "regular") {
          this.setState({ comment: base + regular + mistakes + ending });
        } else {
          this.setState({ comment: base + lowRating + mistakes + ending });
        }
    } else if (evaluator === 'Alex') {
      let low = `Dear writer! I am glad to inform you that I have finished checking your papers for this ${getMonth()} Quality Report. I have reviewed and evaluated the orders with the low rating that were finished in November. Pay attention that these reports are of critical importance to your performance as they may help you to learn new rules and find out about your mistakes. In summary, your most significant problems are ${stateIssues.length > 1 ? stateIssues.join(', ') : stateIssues}. The results, as well as my comments and suggestions, you can check in the attached file. Go through the report and analyze your mistakes. Do not hesitate to contact me in case of any questions or comments!`
      let regular = `Hello, dear writer! I would like to inform you that I have completed and uploaded the ${getMonth()} Quality Report for you! In summary, I have mentioned several weak points, which are ${stateIssues.length > 1 ? stateIssues.join(', ') : stateIssues}.  Pay attention that these reports are of critical importance for your performance, as they may help you to learn new rules and find out about your mistakes. Work on these issues to ensure that you provide qualified and professional help to our customers. Check the attached file, review all my comments, suggestions, and helpful links. Do not hesitate to ask me in case of any further questions or comments!`

      if (type === "regular") {
        this.setState({ comment: regular});
      } else {
        this.setState({ comment: low });
      }
    }
    

   
    if (goals.length) {
      this.setState({ goals });
    }
    if (communication.length) {
      this.setState({ commIssuesOutput: communication });
    }
  }
  setOrders(e) {
    this.setState({ orders: e.target.value });
  }
  setLevel(e) {
    this.setState({ level: e.target.value });
  }
  setCommIssues(e) {
    this.setState({ commIssues: e.target.value});

  }
  setIssues(e) {
    this.setState({ issues: e.target.value });
  }

  setFair() {
    console.log('setFair')
    this.setState({ rating: "fair" });
  }
  setUnfair() {
    console.log('setUnfair')
    this.setState({ rating: "unfair" });
  }
  render() {
    let display = this.state.displayFairUnfair;
    let showIssues = this.state.showIssues;
    let showCommIssues = this.state.showCommIssues;
    let appendIssues = this.appendIssues;
    let appendCommIssues = this.appendCommIssues;
    let goals = this.state.goals;
    let listStyle = this.state.listStyle;
    // let evaluatorColor = this.state.evaluatorColor+' !important'
    let submitButtonClass = 'btn btn-success '+this.state.evaluator.toLowerCase()



    let tempKeys = templates.map(p => Object.keys(p)[0]),
        commKeys = commTemplates.map(p => Object.keys(p)[0])

    return (
      <div className="App">
        <header>
        <div
            className="btn-group btn-group-toggle type evaluators"
            data-toggle="buttons"
          >
            <Evaluator name="Dima" ava={dimaAva} onClick={this.setDima} checked={true} />
            <Evaluator name="Alex" ava={alexAva} onClick={this.setAlex} checked={false} />
  
           
          </div>
         

        </header>

        <div className='content'>
        <form className="container" ref="form" onSubmit={this.handleSubmit}>
          <h4 className="heading">Check Type</h4>
          <div
            className="btn-group btn-group-toggle type"
            data-toggle="buttons"
          >
            <Type type="Regular" onClick={this.setRegular} checked={true} />
            <Type
              type="LowRating"
              onClick={this.setLowRating}
              checked={false}
            />
          </div>
          <div
            className="btn-group btn-group-toggle type"
            style={{ display }}
            data-toggle="buttons"
          >
            <Type type="Fair" onClick={this.setFair} checked={true} />
            <Type type="Unfair" onClick={this.setUnfair} checked={false} />
          </div>
          <div className="main">
            <Input
              label="Order(s)"
              type='orders'
              placeholder="130744187 131585215..."
              onChange={this.setOrders}
              issues={false}
              
            />
            <Input
              label="Level"
              type='level'
              placeholder="University (D)"
              value={this.state.level}
              onChange={this.setLevel}
              issues={false}
            />
            <Input
              label="Comm"
              type='communication'
              placeholder="ok, kindly... "
              onChange={this.setCommIssues}
              onClick={this.showCommIssues}
              value={this.state.commIssues}
              issues={true}
            />
            <Input
              label="Issues"
              type='issues'
              placeholder="structure, grammar..."
              onChange={this.setIssues}
              onClick={this.showIssues}
              value={this.state.issues}
              issues={true}
            />
          </div>

          <h4 className="heading">List Style</h4>
          <div
            className="btn-group btn-group-toggle type"
            data-toggle="buttons"
          >
            <Type
              type="1. Numbers"
              onClick={this.setNumbers}
              checked={true}
            />
            <Type
              type="- Hyphens"
              onClick={this.setHyphens}
              checked={false}
            />
          </div>

          <input
            type="submit"
            className={submitButtonClass}
            value="Submit"
          ></input>
        </form>
        <div className="evaluation">
          <h3>Evaluation</h3>
          <div className="eOrders">
            <span>
              Orders:{" "}
              {this.state.orders ? this.state.orders.replace(/\s/g, ", ") : ""}
            </span>
          </div>
          <div className="eComment">
            <span>Comment:</span>
            <p>{this.state.comment}</p>
          </div>
          <div className="eCommunication">
            <span>Communication:</span>
            <p>{this.state.commIssuesOutput}</p>
          </div>
          <div className="eLevel">
            <span>Level: {this.state.level}</span>
          </div>
          <GoalsList goals={goals} listStyle={listStyle}/>

        </div>
        </div>
        <div className="showIssues" style={{left:showIssues}}>
          {tempKeys 
          ? tempKeys.map(function(name, index) {
            return <span onClick={appendIssues} className='issue' key={index} issue={name}>{name}</span>;
          })
          : ''
        }
        </div>
        <div className="showCommIssues" style={{left:showCommIssues}}>
          {commKeys 
          ? commKeys.map(function(name, index) {
            return <span onClick={appendCommIssues} className='issue' issue={name} key={index}>{name}</span>;
          })
          : ''
        }
        </div>
      
      </div>
    );
  }
}

export default App;
