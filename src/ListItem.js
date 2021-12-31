import React, {useState, useEffect} from "react";
import { ReactComponent as Check } from "./svg/icon-check.svg";


  let darkActiveTextColor = 'rgb(202, 205, 232)'; 
   let darkInactiveTextColor = 'rgb(77, 80, 102)';
   const crossIconD = "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z";

export function ListItem(props) {

  // define styles in objects, then place in larger object to switch between light and dark mode

  const handleCheck = (e) => {
      props.completeItem(props.index);
  };

  const handleCrossClick = () => {
    props.deleteItem(props.index);
  }
 
  const [mode, setMode] = useState('dark');

  const [currentStyle, setStyle] = useState({
    text: {
      textDecoration: 'initial',
    color: darkActiveTextColor
    },
    check: {
      visibility: 'hidden',  
    },
    circle: {
      visibility: 'visible',
    }
  });

  useEffect(() => {
    


  const darkHiddenStyle = {
     text: {
      textDecoration: 'initial',
    color: darkActiveTextColor
    },
    check: {
      visibility: 'hidden',  
    },
    circle: {
      visibility: 'visible',
    }
  };
  

  const darkVisibleStyle = {
     text: {
      textDecoration: 'line-through',
    color: darkInactiveTextColor
    },
    check: {
      visibility: 'visible',  
    },
    circle: {
      visibility: 'hidden',
    }
  };

   const lightHiddenStyle = {};
  const lightVisibleStyle = {};

  let darkStyle = darkVisibleStyle;
  let lightStyle = lightHiddenStyle;

    if (props.completed && mode === 'dark') {
      setStyle(() => darkVisibleStyle);
    } else if (!props.completed && mode === 'dark') {
      setStyle(() => darkHiddenStyle);
    }
  }, [mode, props.completed]);

  return (
    <div id="list-item">
      <div id="outer-circle" onClick={handleCheck} >
        <div
          id="circle"
          style={{visibility: currentStyle.circle.visibility}}>
          <Check id="check" style={{visibility: currentStyle.check.visibility}} />
        </div>
      </div>
      <p id="list-item-text" style={{color: currentStyle.text.color, textDecoration: currentStyle.text.textDecoration}}>{props.text}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" id="crossIcon" onClick={handleCrossClick}>
        <path fill="#494C6B" fillRule="evenodd" d={crossIconD} />
      </svg>
    </div>
  )
}