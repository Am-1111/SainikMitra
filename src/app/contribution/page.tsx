import React from "react";
import Image from "next/image";
import QR from "../../../public/QR.png";
import PaymentPage from "../PaymentPage/page";

function ContributionPage() {
  return (
    <div id="contribution" className="">
      <div
        className="h-auto bg-cover bg-center flex flex-col items-center justify-center gap-6"
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2021/05/28/11/23/flag-6290584_1280.jpg")',
          opacity: 10,
        }}
      >
        <div className=" flex items-center justify-center my-4">
          <h1 className=" text-black text-2xl font-semibold text-center bg-gradient-to-r from-orange-400 via-white to-green-400 ... rounded-md min-w-[130px] p-1 px-2">
            Contribute Here
          </h1>
        </div>

        <div>
          <h3 className="text-xl text-pretty  font-serif font-semibold">
            Contribute by Paying or Scanning Below
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <PaymentPage/>
          <h1 className="text-xl text-white font-sans">OR</h1>
          <Image
            src={QR}
            height={300}
            width={300}
            alt="SainikMitra-QR"
            className="opacity-40"
          ></Image>
          
        </div>
      </div>
    </div>
  );
}

export default ContributionPage;
