import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { TextButton } from "../../Common/TextButton/TextButton";
import { ImageData } from "../../../store/labels/types";
import { connect } from "react-redux";
import { addImageData, updateActiveImageIndex } from "../../../store/labels/actionCreators";
import { AppState } from "../../../store";
import { ProjectType } from "../../../data/enums/ProjectType";
import { FileUtil } from "../../../utils/FileUtil";
import { PopupWindowType } from "../../../data/enums/PopupWindowType";
import { updateActivePopupType, updateProjectData } from "../../../store/general/actionCreators";
import { AcceptedFileType } from "../../../data/enums/AcceptedFileType";
import { ProjectData } from "../../../store/general/types";
import TextInput from "../../Common/TextInput/TextInput"
import { ImageButton } from "../../Common/ImageButton/ImageButton";
import ImagesDropZone from "../ImagesDropZone/ImagesDropZone";
import './CreateDataset.scss';
import { FormLabel } from "react-bootstrap";
import { ObjectDetector } from "../../../ai/ObjectDetector";
import {CSSHelper} from "../../../logic/helpers/CSSHelper";
import { ClipLoader } from "react-spinners";

interface IProps {
    updateActiveImageIndex: (activeImageIndex: number) => any;
    addImageData: (imageData: ImageData[]) => any;
    updateProjectData: (projectData: ProjectData) => any;
    updateActivePopupType: (activePopupType: PopupWindowType) => any;
    projectData: ProjectData;
    AIDisabled: boolean;
}

const CreateDatasetView: React.FC<IProps> = ({ updateActiveImageIndex, addImageData, updateProjectData, updateActivePopupType, projectData, AIDisabled }) => {

    const [modelIsLoadingStatus, setModelIsLoadingStatus] = useState(false);

    const updateFileState = (acceptedFiles) => {
        console.log(acceptedFiles);
        updateActiveImageIndex(0);
        addImageData(acceptedFiles.map((fileData: File) => FileUtil.mapFileDataToImageData(fileData)));
    }

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDropAccepted: updateFileState,
        accept: AcceptedFileType.IMAGE
    });

    const startEditor = (projectType: ProjectType) => {

        if (AIDisabled == false) {
            // load model here
            setModelIsLoadingStatus(true);

            ObjectDetector.loadModel(() => {
                setModelIsLoadingStatus(false);
                console.log("Model loaded!")

            })
        }
        else {
            if (acceptedFiles.length > 0) {
                updateProjectData({
                    ...projectData,
                    type: projectType
                });
            }
        }
        if (acceptedFiles.length > 0) {
            updateProjectData({
                ...projectData,
                type: projectType
            });
        }
    };

    const getDropZoneContent = () => {
        if (acceptedFiles.length === 0)
            return <>
                <input {...getInputProps()} />
                <img
                    draggable={false}
                    alt={"upload"}
                    src={"img/box-opened.png"}
                />
                <p className="extraBold">Upload Images</p>
            </>;
        else if (acceptedFiles.length === 1)
            return <>
                <img
                    draggable={false}
                    alt={"uploaded"}
                    src={"img/box-closed.png"}
                />
                <p className="extraBold">1 image loaded</p>
            </>;
        else
            return <>
                <input {...getInputProps()} />
                <img
                    draggable={false}
                    key={1}
                    alt={"uploaded"}
                    src={"img/box-closed.png"}
                />
                <p key={2} className="extraBold">{acceptedFiles.length} images loaded</p>
            </>;
    };

    return (
        <div className="CreateProject">



            <div className="ProjectForm">

                <TextInput
                    key="project_name"
                    label="Project Name"
                    isPassword={false}
                    value={projectData.name}
                    onChange={(e) => updateProjectData({ ...projectData, name: e.target.value })}
                />

                <div className="ImagesDropZone">
                    <div {...getRootProps({ className: 'DropZone' })}>
                        {getDropZoneContent()}
                    </div>
                </div>

                <div className="DropZoneButtons">
                    <TextButton
                        label={"Manage Classes"}
                        isDisabled={!acceptedFiles.length}
                        onClick={() => updateActivePopupType(PopupWindowType.INSERT_LABEL_NAMES)}
                    />

                    <TextButton
                        label={"Model Settings"}
                        isDisabled={!acceptedFiles.length}
                        onClick={() => updateActivePopupType(PopupWindowType.LOAD_AI_MODEL)}
                    />
                </div>


                <TextInput
                    key="description"
                    label="Project Description"
                    isPassword={false}
                    value={projectData.description}
                    onChange={(e) => updateProjectData({ ...projectData, description: e.target.value })}
                />

                <div className="DropZoneButtons">
                    <TextButton
                        label={"Create Dataset"}
                        isDisabled={!acceptedFiles.length}
                        onClick={() => startEditor(ProjectType.OBJECT_DETECTION)}
                    />

                    {modelIsLoadingStatus &&
                        <ClipLoader
                            sizeUnit={"px"}
                            size={40}
                            color={CSSHelper.getLeadingColor()}
                            loading={true}
                        />}
                </div>
            </div>


        </div>
    )
};

const mapDispatchToProps = {
    updateActiveImageIndex,
    addImageData,
    updateProjectData,
    updateActivePopupType
};

const mapStateToProps = (state: AppState) => ({
    projectData: state.general.projectData,
    AIDisabled: state.ai.isAIDisabled
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateDatasetView);