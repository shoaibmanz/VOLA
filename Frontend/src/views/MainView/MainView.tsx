import React, {useState} from 'react';
import './MainView.scss';
import {TextButton} from "../Common/TextButton/TextButton";
import classNames from 'classnames';
import {ISize} from "../../interfaces/ISize";
import {ImageButton} from "../Common/ImageButton/ImageButton";
import {ISocialMedia, SocialMediaData} from "../../data/info/SocialMediaData";
import {EditorFeatureData, IEditorFeature} from "../../data/info/EditorFeatureData";
import {Tooltip} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import withStyles from "@material-ui/core/styles/withStyles";
import ImagesDropZone from "./ImagesDropZone/ImagesDropZone";
import LoginView from './LoginView/LoginView';

const MainView: React.FC = () => {
    const [projectInProgress, setProjectInProgress] = useState(false);
    const [projectCanceled, setProjectCanceled] = useState(false);

    const startProject = () => {
        setProjectInProgress(true);
    };

    const endProject = () => {
        setProjectInProgress(false);
        setProjectCanceled(true);
    };

    const getClassName = () => {
        return classNames(
            "MainView", {
                "InProgress": projectInProgress,
                "Canceled": !projectInProgress && projectCanceled
            }
        );
    };

    const getEditorFeatureTiles = () => {
        return EditorFeatureData.map((data:IEditorFeature) => {
            return <div
                className="EditorFeaturesTiles"
                key={data.displayText}
            >
                <div
                    className="EditorFeaturesTilesWrapper"
                >
                    <img
                        draggable={false}
                        alt={data.imageAlt}
                        src={data.imageSrc}
                    />
                    <div className="EditorFeatureLabel">
                        {data.displayText}
                    </div>
                </div>
            </div>
        });
    };

    return (
        <div className={getClassName()}>
            <div className="Slider" id="lower">
                <div className="TriangleVertical">
                    <div className="TriangleVerticalContent"/>
                </div>
            </div>

            <div className="Slider" id="upper">
                <div className="TriangleVertical">
                    <div className="TriangleVerticalContent"/>
                </div>
            </div>

            <div className="LeftColumn">
                <div className={"LogoWrapper"}>
                    <img
                        draggable={false}
                        alt={"main-logo"}
                        src={"img/vola_logo.png"}
                    />
                </div>
                <div className="EditorFeaturesWrapper">
                    {getEditorFeatureTiles()}
                </div>
                <div className="TriangleVertical">
                    <div className="TriangleVerticalContent"/>
                </div>
                {projectInProgress && <TextButton
                    label={"Go Back"}
                    onClick={endProject}
                />}
            </div>
            <div className="RightColumn">

                {/* {projectInProgress && <LoginView/>} */}
                <ImagesDropZone/>
                <div className="SocialMediaWrapper">
                    
                </div>
                {!projectInProgress && <TextButton
                    label={"Login"}
                    onClick={startProject}
                />}
            </div>
        </div>
    );
};

export default MainView;