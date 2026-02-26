import React from 'react'
import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
function useSocialAuth() {
    const [isLoading, setIsLoading] = useState< string | null>(null)

    const {startSSOFlow} = useSSO();

    const handleUseAuth = async(strategy : "oauth_google" | "oauth_apple")=>{
        setIsLoading(strategy)
        try{
            const {createdSessionId, setActive} = await startSSOFlow({strategy})
            if( createdSessionId && setActive){
                await setActive({session : createdSessionId})
            }
        }catch(error){
            console.log("error in use Auth", error);
            const provider = strategy === "oauth_google"? "Google" : "Apple"
            Alert.alert("Error", `Failed to sign in with ${provider} .please try again`)
        }finally{
            setIsLoading(null)
        }
    }

  return {isLoading, handleUseAuth}
    
  
}

export default useSocialAuth
