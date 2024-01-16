import React, { useEffect, useState, useRef } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './SearchContainer.css';
import close from '../../assets/icon_close.svg';
import avatar from '../../assets/avatar.svg';
import data from '../../data/data.json';

function SearchContainer() {
   const selectableListRef = useRef(null);
   const [curChips,setCurChips] = useState([]);
   const [searchText,setSearchText] = useState('');
   const [matchedChips,setMatchedChips] = useState([]);
   const [_remainingChips,setRemainingChips] = useState([]);

   useEffect(()=>{
    setRemainingChips(data);
   },[]);

   const addChipHandler = (chip) => {
        setCurChips([...curChips,chip]);
        setRemainingChips(_remainingChips?.filter(ch => ch.id !== chip.id));
        setMatchedChips([]);
        onChangeFocus(0);
        setSearchText('');
    };

    const onChangeInputHandler =(e)=>{
        setSearchText(e.target.value); 
        
        let _matchedChips = _remainingChips?.filter(chip =>
          { 
            return chip.tag.toLowerCase()
            .includes( e.target.value.toLowerCase());});

        if(_matchedChips.length ==0){
            setMatchedChips([]);
        }else{
            setMatchedChips(_matchedChips);
        }

        if(e.target.value.length > 0){
            selectableListRef.current.style.display = 'block';
        }else{
            selectableListRef.current.style.display = 'none';
        }
    }

   const onChangeFocus = (flag)=>{
        if(flag ==1 && searchText.length>0){
            selectableListRef.current.style.display='block'; 
        }else{
            selectableListRef.current.style.display='none';   
        }
   }

   const removeChipHandler=(chip)=>{
       setCurChips(curChips.filter(currChip => currChip.id !== chip.id));
       setRemainingChips([..._remainingChips,chip]);
       setMatchedChips([]);
       setSearchText('');
       onChangeFocus(0);
   }

  return (
    <div className="container">
       
        <div className="chips" ref={chipsContainerRef} >
            { curChips?.length>0 &&
                curChips?.map(chip =>
                    <div key={chip.id} className='chip'>
                        <img src={avatar} alt="../../assets/avatar.svg"/>
                        {chip.tag}
                        
                        <img src={close} 
                        className="close close_icons"
                        onClick={()=>removeChipHandler(chip)}/>
                </div>)
            }
        
        <div tabIndex="1" 
            className='input_container'  
            onFocus={()=>onChangeFocus(1)}  
            onBlur={()=>onChangeFocus(0)}>
            
            <input type="text" id="autocomplete-input" 
                autocomplete="off"
                value={searchText} 
                onChange={onChangeInputHandler} />
            
            <ul className='select_option_list' 
                ref={selectableListRef}>
                
                {matchedChips?.length>0 ?
                matchedChips?.map(chip=>
                    <li  key={chip.id} 
                    className="select_option" onClick={()=>addChipHandler(chip)}>
                    <span className="select__option-label">
                        {chip.tag}
                    </span>
                    </li>
                ): 
                <li className="select_option">
                    <span className="select__option-label">
                        No Matching Chips
                    </span>
                </li>
                }
            </ul>
           </div>
        </div>
    </div>


     
  );
}

export default SearchContainer;
