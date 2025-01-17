import * as cocoSsd from '@tensorflow-models/coco-ssd';
import {DetectedObject, ObjectDetection} from '@tensorflow-models/coco-ssd';
import {store} from "../index";
import {updateObjectDetectorStatus} from "../store/ai/actionCreators";
import {LabelType} from "../data/enums/LabelType";
import {LabelsSelector} from "../store/selectors/LabelsSelector";
import {AIObjectDetectionActions} from "../logic/actions/AIObjectDetectionActions";
import {updateActiveLabelType} from "../store/labels/actionCreators";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class ObjectDetector {
    private static model: ObjectDetection;

    public static loadModel(callback?: () => any) {
        cocoSsd
            .load()
            .then((model: ObjectDetection) => {

                callback && callback();
                
                ObjectDetector.model = model;
                store.dispatch(updateObjectDetectorStatus(true));
                store.dispatch(updateActiveLabelType(LabelType.RECTANGLE));
                
                
                const activeLabelType: LabelType = LabelsSelector.getActiveLabelType();
                activeLabelType === LabelType.RECTANGLE && AIObjectDetectionActions.detectRectsForActiveImage();
                
            })
            .catch((error) => {
                // TODO
                throw new Error(error);
            })
    }

    public static predict(image: HTMLImageElement, callback?: (predictions: DetectedObject[]) => any) {
        if (!ObjectDetector.model) return;
        
        ObjectDetector.model
            .detect(image)
            .then((predictions: DetectedObject[]) => {
                callback && callback(predictions)
            })
            .catch((error) => {
                // TODO
                throw new Error(error);
            })
    }
}