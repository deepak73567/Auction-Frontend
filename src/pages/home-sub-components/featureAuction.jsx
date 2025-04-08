import Card from "@/custom component/card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const [errorToastId, setErrorToastId] = useState(null);
  const [successToastShown, setSuccessToastShown] = useState(
    localStorage.getItem("successToastShown") === "true"
  );

  useEffect(() => {
    if (!allAuctions || allAuctions.length === 0) {
      if (!errorToastId) {
        const id = toast.error("Please wait for 50 sec while connecting to the server", { autoClose: 50000 });
        setErrorToastId(id);
      }
    } else {
      if (errorToastId) {
        toast.dismiss(errorToastId);
        setErrorToastId(null);
      }
      if (!successToastShown) {
        toast.success("Connected to server successfully!", { autoClose: 3000 });
        setSuccessToastShown(true);
        localStorage.setItem("successToastShown", "true"); // Save state
      }
    }
  }, [allAuctions]);

  return (
    <section className="my-8">
      <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
        Featured Auctions
      </h3>
      <div className="flex flex-wrap gap-6">
        {allAuctions?.slice(0, 8).map((element) => (
          <Card
            title={element.title}
            imgSrc={element.image?.url}
            startTime={element.startTime}
            endTime={element.endTime}
            startingBid={element.startingBid}
            id={element._id}
            key={element._id}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuctions;
