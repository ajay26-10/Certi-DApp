import React, { useState } from 'react'
import {abi} from '../scdata/Cert.json';
import deployedAddresses from '../scdata/deployed_addresses.json';

import { BrowserProvider, Contract } from 'ethers';
const IssueCertificate = () => {


  const provider = new BrowserProvider(window.ethereum);

  const [certid,setId]=useState('')
  const [cname,setCname]=useState('')
  const [course,setCourse]=useState('Certified Blockchain Associate')
  const [grade,setGrade]=useState('S')
  const [date,setDate]=useState('')



 const  submitForm=async(e)=>{
  e.preventDefault()

        const signer = await provider.getSigner();
        const contractAddress = deployedAddresses.CertModuleCert;
        const instance = new Contract(contractAddress, abi, signer); 
        // const instance=new Contract(CertModuleCert,abi,signer);
        
        const txl=await instance.issue(certid,cname,course,grade,date);

        console.log('Transaction return :',txl);
  
}


  return (
  <>
 <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
  <h3 className="text-center text-3xl font-bold mb-8 text-gray-800">Issue New Certificate</h3>
  <div className="flex flex-col justify-center items-center">
    <form onSubmit={submitForm} className="w-full">
      <div className="space-y-6">
        <div className="p-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="courseName">Select Course *</label>
          <select className="w-full mt-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="course" id="courseName"
            value={course}
            onChange={(e) => setCourse(e.target.value)}>
            <option>Certified Blockchain Associate</option>
            <option>Certified Ethereum Developer</option>
            <option>Blockchain Foundation</option>
            <option>Ethereum Fundamentals</option>
          </select>
        </div>

        <div className="p-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="certificateID">Certificate ID *</label>
          <input type="text" className="w-full mt-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="certid" id="certificateID" placeholder="Certificate ID" required
            value={certid}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="p-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="candidateName">Candidate Name *</label>
          <input type="text" className="w-full mt-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" name="cname" id="candidateName" placeholder="Name" required value={cname}
            onChange={(e) => setCname(e.target.value)} />
        </div>

        <div className="p-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="grade">Select Grade *</label>
          <select className="w-full mt-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" id="grade" name="grade" value={grade}
            onChange={(e) => setGrade(e.target.value)}>
            <option>S</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>

        <div className="p-2">
          <label className="block text-lg font-semibold text-gray-700" htmlFor="date">Issue Date *</label>
          <input className="w-full mt-1 p-2 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" id="date" name="date" required value={date}
            onChange={(e) => setDate(e.target.value)} />
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition duration-200">Issue Certificate</button>
      </div>
    </form>
  </div>
</div>

  
  </>
  )
}

export default IssueCertificate