import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import deployedAddresses from '../scdata/deployed_addresses.json';

const ViewCertificate = () => {
  const { id } = useParams();
  const [certi, setCertificate] = useState(null);

  useEffect(() => {
    const getCertificate = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const instance = new Contract(deployedAddresses.CertModuleCert, abi, provider);
        const result = await instance.Certificates(id);

        setCertificate({
          certid: id,
          cname: result.name,
          course: result.course,
          grade: result.grade,
          date: result.date,

          
        });
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    };

    getCertificate();
  }, [id]);

  if (!certi) {
    return <h3>Loading...</h3>;
  }
console.log(certi);
  return (
    <>
      <div className="container mx-auto p-6 bg-gray-100 shadow-xl rounded-xl">
        <div className="border-4 border-blue-700 p-8 bg-white">
          <div className="border-2 border-blue-400 p-4 bg-gray-50">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-blue-900">Kerala Blockchain Academy</h2>
            </div>
            <div className="mt-8">
              <div className="flex justify-center">
                <div className="w-3/4 text-center">
                  <span className="text-2xl font-semibold  text-blue-700">
                    This is to certify that <span className="text-3xl font-semibold  text-blue-900" id="name">{certi.cname} </span>has completed the
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">  
              <div className="flex justify-center">
                <div className="w-3/4 text-center">
                  <span className="text-2xl font-semibold  block text-blue-700">
                    <span className="text-3xl font-semibold  text-blue-900" id="course">{certi.course}&nbsp;</span>offered by <br></br> Kerala Blockchain Academy(KBA) in online mode.
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-center">
                <div className="w-3/4 text-center">
                  {/* <span className="text-xl italic text-gray-600">has earned</span> */}
                  <span className="text-2xl font-bold text-blue-800 block">with&nbsp;
                     <span className="text-3xl font-semibold  text-blue-900" id="grade">{certi.grade}</span>&nbsp; grade
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-center">
                <div className="w-3/4 text-center">
                  <span className="text-xl italic block text-gray-600">while completing the training course entitled</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between">
                <div className="text-left">
                  <span className="text-xl font-bold text-blue-800">
                    Certificate ID: <span className="text-3xl font-semibold  text-blue-900" id="certid">{certi.certid}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl text-gray-700">
                    Date of Completion: <span className="text-3xl font-semibold  text-blue-900" id="date">{certi.date}</span>
                  </span><br />
                  <span className="text-xl text-gray-700">Place: Trivandrum</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="text-right">
                <span className="block font-bold text-blue-900">(sd/-)</span>
                <span className="block font-bold text-blue-900">Director</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCertificate;