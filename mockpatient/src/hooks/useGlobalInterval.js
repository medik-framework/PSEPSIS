import { useSelector, useDispatch } from "react-redux";
import { increment, resetGradualUpdate } from "../redux/organDataSlice";
import { useInterval } from "usehooks-ts";

const useGlobalInterval = () => {
    const dispatch = useDispatch();
    
    const organState = useSelector((state) => state.OrganDT);

    useInterval(() => {
        Object.keys(organState).forEach((organName) => {
            Object.keys(organState[organName]).forEach((measurementName) => {
                const measurement = organState[organName][measurementName];

                if (measurement.delay && measurement.elapse < measurement.period) {
                    const latestElapse = measurement.elapse;

                    dispatch(increment({
                        organName,
                        measurementName,
                        value: measurement.step,
                    }));

                    console.log(`Updated Elapse: ${latestElapse + 1}`);
                }

                if (measurement.delay && measurement.elapse >= measurement.period) {
                    dispatch(resetGradualUpdate({ organName, measurementName }));
                }
            });
        });
    }, 1000); 

    return null;
};

export default useGlobalInterval;