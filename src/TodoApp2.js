// TodoApp - because todo is our app. app.js is just additional here. we could even rename it as TodoApp.js
import React from 'react'
import './Todo2.css'
import {useState} from 'react'

function TodoApp() {
  let flag=0
  //states
  let [word,setWord]=useState('') // one word , letter by letter updating to become a full word 

  let [wordList,setWordlist]=useState([]) //words list, change the list of the words
  
  //handlefunctions- call setter function to update the state variable
  let addToWord= (event)=>{ //event is an object that stores the updated inputed word, we use this to update the current word one letter at a time. and finally push it to our list once its submitted or added
    setWord(event.target.value)
  }


  let addToWordlist= (event)=>{ // here when one full word is submited we have to store it in the wordlist variable which will be an array, because we initialised with it
    event.preventDefault() //prevents refreshing or reseting-when form submits it automatically refreshes page, which resets everything.
    if(!word) return  //if word submitted is empty, dont add it to wordList.this will just break out
    wordList.forEach((item)=>{
      if(item.task===word)
      flag=1
    })
    if(flag===1) return
    setWordlist([...wordList,{id:Date.now(),task:word,done:false}])  // before just the word was added into the spreaded copy.now an obj is being passed as a single item
    setWord('')  // resets the word back to empty string
  }

  

  let deleteFromWordlist=(event,id)=>{

    console.log(id,'eeeee');

    //copied to copy of actual wordList because we cant mutate the actual array wordList. react wouldnt detect changes. so we use a copy or dummy for that
      // copied wordlist or duplicated or cloned , now pass this splice and pass this clone, not the original one

    setWordlist(wordList.filter((item)=>{ 
      return item.id!==id
    }))
  
  }

  //replicate or copy the component. replicate will be an array of item component which is tagged with names or words as map returns an array
   

  //rendering- this is returning for render
  return (
    <div className='container'>
      <form className='input-section' type='submit' onSubmit={addToWordlist}> {/* form type="sumbit" -instead of using a seperate button just to use type submit, we incoporated in the form itself */}
        <h1>Todo List</h1>
        <input type="text" placeholder='Enter items' value={word}  onChange={addToWord}/>  {/* this value is what event obj gets to store */}
      </form>

     {/* if wordlength is empty then dont render ul or render the whole ul */}
    {wordList.length>0?(
      
      <ul>
      {/* since this is jsx syntax here we need to put curly to write js. this has nothing to do with the extension being .jsx or .js */}
      {/* replicate */}
      {wordList.map((item)=>{
        return (
          <li key={item.id}   style={{textDecoration: item.done ? 'line-through' : 'none', textDecorationThickness: item.done ? '3px' : 'initial',textDecorationColor: item.done ? 'rgba(0, 0, 0, 0.6)' : 'initial' }}>
           {item.task}
            <div>
              <input type="checkbox" value={item.done} style={{padding:5}} onChange={(event)=>{
                                                                                   //before updating 
                                                                                    console.log(event.target.checked,"787766")
                                                                                    console.log(item,"8888")
                                                                                    console.log(item.id,"8888")

                                                                                    setWordlist(wordList.filter((itemlo)=>{  /* filter and maps are used  */
                                                                                      if(itemlo.id===item.id){
                                                                                        item.done=event.target.checked /* aint i supposed to use setWordlist to update the value instead of updating actual item doing it , maybe it works because its using filter , so like map it doesnt mutate but create cloned array with filtered items*/
                                                                                      }
                                                                                      return item
                                                                                    }))
                                                                                    
              }}/>  
              {/* setting value or what to show in input each time it renders is value attribute, not a prop but html attribute */}
              {/* <i className="fa-solid fa-pen-to-square" style={{padding:5}}></i> */}
              <i className="fa-solid fa-trash-can" style={{padding:5}}  onClick={(event)=>deleteFromWordlist(event,item.id)}></i>  {/* passed the function with argument as reference because if just function with argument that will call the function.we should not call function directly in EventHandlers like onclick, we just pass the reference. setter function inside needs to be called at the right time . or it will rerender on loop*/}
            </div>
          </li>

          


        )
      })}
    </ul>
    ):(<p style={{color:'gray',paddingTop:20,fontWeight:800,fontSize:30}}>list is empty</p>)}
      
    
      

{/* -------------------------------------------------------------------------------testing---------------------------------------------------- */}
   {/*  <h2>{word}</h2> */} {/*seperate test of changes here  */}
    {/* <h2>{wordList}</h2> {/*seperate test of changes here */} {/*  this right here gave such headache i dint realise it couldnt render object . but if each item can be accessed , we coulda used item.task */}
    {/* <h2>{JSON.stringify(wordList)}</h2> */} {/*  now objects can be displayed */}
    </div>

    
    
  )
}

export default TodoApp