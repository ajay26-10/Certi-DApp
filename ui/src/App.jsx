import Homepage from './pages/Homepage'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route}from 'react-router-dom'
import { BrowserProvider } from 'ethers'
import Mainlayout from './layout/MainLayout';
import IssueCertificate from './pages/Issue';
import ViewCertificate from './pages/ViewCertificate';

function App() {
  const provider = new BrowserProvider(window.ethereum);
  async function connectToMetamask() {
    try {
        const signer = await provider.getSigner();
        const address = await signer.getAddress(); 
        console.log("Address", address);
    } catch (error) {
        console.error("Failed to connect to Metamask:", error);
    }
}

  const router=createBrowserRouter(
    createRoutesFromElements(
     <>     
        
        <Route path='/' element={<Mainlayout/>}>
        <Route path='/' element={<Homepage/>}/> 
        <Route path='/certificate' element={<IssueCertificate/>}/>
        <Route path='/certificate/:id' element={<ViewCertificate/>}/>
        
       </Route>
       </>


    )
  )
  

  return (
    <>
    <button className="ml-6 bg-blue-600 relative top-16   text-white font-bold py-2 px-6 rounded-lg shadow-lg " onClick={connectToMetamask}>
    Connect to Metamask
</button>
    <RouterProvider router={router}/>
    
    </>
  )
}

export default App