export interface IEditorFeature {
    displayText:string;
    imageSrc:string;
    imageAlt:string;
}

export const EditorFeatureData: IEditorFeature[] = [
    {
        displayText: "Typescript on React",
        imageSrc: "img/react-logo.png",
        imageAlt: "open-source",
    },
    {
        displayText: "Redux for state management",
        imageSrc: "img/redux-logo.png",
        imageAlt: "online",
    },
    {
        displayText: "MongoDB for storage",
        imageSrc: "img/private.png",
        imageAlt: "private",
    },
    {
        displayText: "Support multiple label types - bounding box, polygon, point",
        imageSrc: "img/labels.png",
        imageAlt: "labels",
    },
    {
        displayText: "Support output file formats like YOLO, VOC XML, VGG JSON, CSV",
        imageSrc: "img/file.png",
        imageAlt: "file",
    },
    {
        displayText: "Use AI to make your work more productive",
        imageSrc: "img/robot.png",
        imageAlt: "robot",
    },
];