import {useEffect} from 'react'


/** Custon document title */
export const UsedocumentTitle = (value) => {
  useEffect( () => {
    document.title = `TMUC open market | ${value}`
  },[value])
}

