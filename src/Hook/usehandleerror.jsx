import  { useState } from 'react'

export default function usehandleerror() {

     const[errorMssge,setErrorMssge]=useState("");

     const showError= () =>setErrorMssge("Could not load recipe details.please try again.")
  return (
      errorMssge,
      showError
  )
}

