import React, {useState, useEffect} from "react";
import { ReactComponent as Check } from "./svg/icon-check.svg";


const crossIconD = "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z";

export function ListItem(props) {

  // define styles in objects, then place in larger object to switch between light and dark mode

  const handleCheck = (e) => {
      props.completeItem(props.index);

      let listItem = e.target.parentNode;
      let circle = e.target.querySelector("#circle");
      let check = e.target.querySelector("#check");

      let classArray = String(circle.className).split(" ");
      let mode = classArray[0];
      let status = classArray[1];
      status = status === 'circle-hidden'? 'circle-visible' : 'circle-hidden';

      circle.className = mode + " " + status;
      let checkStatus = check.getAttribute('class') === 'check-hidden'? 'check-visible' : 'check-hidden';

      check.setAttribute('class', checkStatus);
      console.log(checkStatus);
    

      if (listItem.className === 'list-item-dark-active') {
        listItem.className = 'list-item-dark-complete';
      } else if (listItem.className === 'list-item-dark-complete') {
        listItem.className = 'list-item-dark-active';
      } else if (listItem.className === 'list-item-light-active') {
        listItem.className = 'list-item-light-complete';
      } else if (listItem.className === 'list-item-light-complete') {
        listItem.className = 'list-item-light-active';
      }
  
  
    };

  const handleCrossClick = () => {
    props.deleteItem(props.index);
  }
 

    // not the cleanest code :(
    // Basically, trying to keep track of the mode (light/dark) and whether the current list item is marked as completed
    // this determines whether the innercircle should render and what color it is. It also takes care of the checkmark 
    // it achieves this functionality by manipulating the classes of the elements. 
        const [innerCircle, setInnerCircle] = useState(
          props.mode === 'dark' ?
        <div id="circle" class="circle-dark circle-visible">
          {props.completed 
            ? <Check id="check" class='check-visible' /> 
            : <Check id="check" class='check-hidden' /> 
          }
        </div>
        : props.completed 
          ? <div id="circle" class="circle-light circle-hidden"><Check id="check" class='check-visible'/></div> 
            : <div id="circle" class="circle-light circle-visible"><Check id="check" class='check-hidden'/></div> 
          );      
         
          // the classes are recalculated after every change in props.mode or props.completed
          // then injected into the jsx inside the outer circle element

        useEffect(() => {

          if (props.mode === 'dark') {
            
            setInnerCircle(() => {
              return (     
          props.completed 
          ? <div id="circle" class="circle-dark circle-hidden"><Check id="check" class='check-visible'/></div> 
            : <div id="circle" class="circle-dark circle-visible"><Check id="check" class='check-hidden'/></div> 
          )        
        });
          } else {
            setInnerCircle(() => {
              return (     
          props.completed 
          ? <div id="circle" class="circle-light circle-hidden"><Check id="check" class='check-visible'/></div> 
            : <div id="circle" class="circle-light circle-visible"><Check id="check" class='check-hidden'/></div> 
          )      
          })
        
        }},[props.completed, props.mode]);

  const classMode = () => {
    
    let s = `list-item-${props.mode}-`;
    let end = props.completed ? 'complete' : 'active';
    return s + end;
  }

  return (
    <div id="list-item" class={classMode()}>
      <div id="outer-circle" onClick={handleCheck} >
      {innerCircle}
        
      </div>
      <p id="list-item-text" class="dark">{props.text}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" id="crossIcon" onClick={handleCrossClick}>
        <path fill="#494C6B" fillRule="evenodd" d={crossIconD} />
      </svg>
    </div>
  )
}