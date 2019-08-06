import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  render() {
      const title = this.props.title;
      return(
          <div class = "cls_skClockHeaderWrapper">
              <div class = "cls_skClockHeader">
                <div class="cls_skheadImg">
                  <img src="https://img.icons8.com/color/64/000000/last-12-hours.png" />
                </div>
                <div class="cls_skHeaderText">
                  {title}
                </div>
              </div>
          </div>
      );
  }
}

class DateCheckBox extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.props.onInpChange(event);
  }
  render(){
    let status = this.props.status == "true" ? "id_skChecked" : "id_skUncheck";
    return (
      <div class = "cls_skShowDateInputWrap" >
        <div class = "cls_skSwitch" onClick = {this.handleInputChange}>
          <span class="slider round" id = {status}></span>
        </div>
        <div class="cls_skCalImg">
          <img src="https://img.icons8.com/ios/100/000000/maintenance-date.png" />
        </div>
      </div>
      
    );
  }
}

class Display extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class = {this.props.name}>
        {this.props.val}      
      </div>
    );

  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date : "",
      time : "",
      show_date:  "true",
    };
    this.clock = this.clock.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentDidMount() {
    this.intervalID = setInterval(this.clock, 1000);
  }
  clock() {
    const monthNames = ["Jan" , "Feb", "Mar", "Apr", "May" , "Jun", "Jul", "Aug", "Sept", "Oct" , "Nov", "Dec"];
    const dayNames = ["Sun" , "Mon" , "Tue" , "Wed" , "Thurs" , "Fri" , "Sat"];
    let date = new Date().getDate();
    let month = monthNames[new Date().getMonth()];
    let year = new Date().getFullYear();
    let day = dayNames[new Date().getDay()];
    let hours = new Date().getHours();
    let mins = new Date().getMinutes();
    let sec = new Date().getSeconds();
    this.setState({
      date : day + " " + date + " " + month + " " + year,
      time : hours + ":" + mins + ":" + sec
    });
  }
  handleInputChange(event) {
    console.log(event.target);
    var status = this.state.show_date == "true" ? "false" : "true";
    this.setState({
      show_date : status
    });
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    let display_date ;
    if(this.state.show_date == "true")
      display_date = <Display name = "cls_skDate" val = {this.state.date} />
    else
      display_date = <Display name = "cls_skDate cls_skDateHide" val = {this.state.date} />
    return (
      <div class = "cls_skClockWrapper">
          <Header title = "React Clock"/>
          <DateCheckBox status = {this.state.show_date} onInpChange = {this.handleInputChange}/>
          <div class = "cls_skContentWrap">
            <div class="cls_skTime">
              {this.state.time}
            </div>
            {display_date}
          </div>
      </div>
    );
  }
}

export default App;
