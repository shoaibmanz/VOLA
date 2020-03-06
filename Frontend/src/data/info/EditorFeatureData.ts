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
        imageSrc: "img/Redux.png",
        imageAlt: "online",
    },
    {
        displayText: "MongoDB for storage",
        imageSrc: "img/mongo-db-logo.png",
        imageAlt: "private",
    },
    {
        displayText: "Supports polygon, bounding box and point",
        imageSrc: "ico/polygon.png",
        imageAlt: "labels",
    }
];