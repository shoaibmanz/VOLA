import React from 'react';
import './PopupView.scss';
import {PopupWindowType} from "../../data/enums/PopupWindowType";
import {AppState} from "../../store";
import {updateDisabledAIFlag} from "../../store/ai/actionCreators";
import {connect} from "react-redux";
import LoadLabelsPopup from "./LoadLabelNamesPopup/LoadLabelNamesPopup";
import ExportLabelPopup from "./ExportLabelsPopup/ExportLabelPopup";
import InsertLabelNamesPopup from "./InsertLabelNamesPopup/InsertLabelNamesPopup";
import ExitProjectPopup from "./ExitProjectPopup/ExitProjectPopup";
import LoadMoreImagesPopup from "./LoadMoreImagesPopup/LoadMoreImagesPopup";
import {LoadModelPopup} from "./LoadModelPopup/LoadModelPopup";
import SuggestLabelNamesPopup from "./SuggestLabelNamesPopup/SuggestLabelNamesPopup";
import {CSSHelper} from "../../logic/helpers/CSSHelper";
import {ClipLoader} from "react-spinners";

interface IProps {
    activePopupType: PopupWindowType;
}

const PopupView: React.FC<IProps> = ({activePopupType}) => {

    const selectPopup = () => {
        switch (activePopupType) {
            case PopupWindowType.LOAD_LABEL_NAMES:
                return <LoadLabelsPopup/>;
            case PopupWindowType.EXPORT_LABELS:
                return <ExportLabelPopup/>;
            case PopupWindowType.INSERT_LABEL_NAMES:
                return <InsertLabelNamesPopup/>;
            case PopupWindowType.UPDATE_LABEL_NAMES:
                return <InsertLabelNamesPopup/>;
            case PopupWindowType.EXIT_PROJECT:
                return <ExitProjectPopup/>;
            case PopupWindowType.LOAD_IMAGES:
                return <LoadMoreImagesPopup/>;
            case PopupWindowType.LOAD_AI_MODEL:
                return <LoadModelPopup updateDisabledAIFlag={updateDisabledAIFlag}/>;
            case PopupWindowType.SUGGEST_LABEL_NAMES:
                return <SuggestLabelNamesPopup/>;
            case PopupWindowType.LOADER:
                return <ClipLoader
                    sizeUnit={"px"}
                    size={50}
                    color={CSSHelper.getLeadingColor()}
                    loading={true}
                />;
            default:
                return null;
        }
    };

    return (
        activePopupType && <div className="PopupView">
            {selectPopup()}
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    activePopupType: state.general.activePopupType
});

export default connect(
    mapStateToProps
)(PopupView);