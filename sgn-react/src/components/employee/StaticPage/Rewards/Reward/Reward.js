import React, {useEffect, useState} from "react";
import axios from "axios";
import {interpolateRgb} from "d3-interpolate";
import {color} from "d3-color";
import Trophy from "../../../../../assets/img/trophy.png";
import LiquidFillGauge from "react-liquid-gauge";
import Spinner from "../../../../UI/ProgressBar/ProgressBar";
import IntlMessages from '../../../../../Util/IntlMessages';

const EmployeeReward = ( props ) => {
    const token = localStorage.getItem('token')
    const [value, setValue] = useState(0)
    const [rewardData, setRewardData] = useState({});
    const [totalPoints, setTotalPoints] = useState()
    const [projectCount, setProjectCount] = useState();
    const [loaded, setLoaded] = useState(false)
    const id = props.match.params.id;
    console.log('Reward', id)
    useEffect(() => {
        axios.get('/employee/reward/' + id , {headers: {"Authorization": token}})
            .then((res) => {
                setRewardData(res.data.reward.reward)
                setTimeout(() => {
                    setValue(  (res.data.totalPoints * 100) / (res.data.reward.reward.limit)  );
                }, 100)
                setTotalPoints(res.data.totalPoints)
                setLoaded(true)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get('/employee/completed', {headers: {"Authorization": token}})
            .then((res) => {
                setProjectCount(res.data.length)
            })
    }, [loaded])
    const startColor = '#6495ed'; // cornflowerblue
    const endColor = '#dc143c'; // crimson
    const radius = 150;
    const interpolate = interpolateRgb(startColor, endColor);
    const fillColor = interpolate(value / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];


    return (
        loaded
            ? rewardData
            ? rewardData.winner
                ? <h3 className="font-weight-bold text-center "><IntlMessages id="winner" /></h3>
                :( <div className={'row'}>
                    <div className="col-md-6">
                        <img src={Trophy} alt="reward-image" width={'40%'} height={'40%'} className={'ml-5'} />
                        <h3 className="font-weight-bold">{rewardData.name}</h3>
                        <p>{rewardData.description}</p>
                        <div className="card-body">
                            <div className="row align-items-start">
                                <div className="col-md-12 col-lg-4 my-3 text-center border-right">
                                    <h4><IntlMessages id="points" /></h4>
                                    <p>{totalPoints}</p>
                                </div>
                                <div className="col-md-12 col-lg-4 my-3 text-center border-right">
                                    <h4><IntlMessages id="target" /></h4>
                                    <p>{rewardData.limit}</p>
                                </div>
                                <div className="col-md-12 col-lg-4 my-3 text-center">
                                    <h4><IntlMessages id="projects" /></h4>
                                    <p>{projectCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <LiquidFillGauge
                            style={{ margin: '0 auto' }}
                            width={radius * 2}
                            height={radius * 2}
                            value={value}
                            percent="%"
                            textSize={1}
                            textOffsetX={0}
                            textOffsetY={0}

                            textRenderer={(props) => {
                                const value = Math.round(props.value);
                                const radius = Math.min(props.height / 2, props.width / 2);
                                const textPixels = (props.textSize * radius / 2);
                                const valueStyle = {
                                    fontSize: textPixels
                                };
                                const percentStyle = {
                                    fontSize: textPixels * 0.6
                                };

                                return (
                                    <tspan>
                                        <tspan className="value" style={valueStyle}>{value}</tspan>
                                        <tspan style={percentStyle}>{props.percent}</tspan>
                                    </tspan>
                                );
                            }}
                            riseAnimation
                            waveAnimation
                            waveFrequency={2}
                            waveAmplitude={1}
                            gradient
                            gradientStops={gradientStops}
                            circleStyle={{
                                fill: fillColor
                            }}
                            waveStyle={{
                                fill: fillColor
                            }}
                            textStyle={{
                                fill: color('#444').toString(),
                                fontFamily: 'Arial'
                            }}
                            waveTextStyle={{
                                fill: color('#fff').toString(),
                                fontFamily: 'Arial'
                            }}
                        />
                    </div>
                </div>)
            : <h3 className="font-weight-bold text-center"><IntlMessages id="no_reward" /></h3>
            :<div className="text-center"><Spinner /></div>
    )
}

export default EmployeeReward
