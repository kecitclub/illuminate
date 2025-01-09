import Complain from "./Complain"
import data from "../data.json" 
import Header from "../LandingComponents/Header"

export const Mainpage = () =>{    
    return(
        <>
        <Header/>
        
            <div className="maincontainer">
                {/* this is the list  of complain */}
                {data.map((element)=>(    
                             <Complain 
                                       key={element.id}
                                       name={element.name}
                                       description={element.description}
                                       address={element.address} 
                                       status={element.status} 
                                       createdAt={element.createdAt}
                                       username={element.username}
                             />
                                                  
                ))}
            </div>
     </>
    )
} 