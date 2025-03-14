import { useEffect } from "react";
import { useSelector } from "react-redux";

const useSendMeasurementUpdates = (kSendMessage) => {
    const organData = useSelector((state) => state.OrganDT);

    useEffect(() => {
        if (!organData) return;

        Object.keys(organData).forEach((organName) => {
            const measurements = organData[organName];

            Object.keys(measurements).forEach((measurementName) => {
                const value = measurements[measurementName]?.value ?? null;

                if (value !== null) {
                    const data = {
                        organ: organName,
                        measurement: measurementName,
                        value,
                        timeStamp: new Date().getTime(),
                        config: measurements[measurementName].config,
                    };

                    kSendMessage(JSON.stringify(data));
                    console.log(JSON.stringify(data));
                }
            });
        });
    }, [organData, kSendMessage]); 
};

export default useSendMeasurementUpdates;
