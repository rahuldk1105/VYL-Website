import * as faceapi from 'face-api.js'

export const loadModels = async () => {
    const MODEL_URL = '/models'
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ])
}

export const getFaceDescriptor = async (imageSrc: string): Promise<Float32Array | undefined> => {
    const img = await faceapi.fetchImage(imageSrc)
    const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    return detection?.descriptor
}

export const getAllFaceDescriptors = async (imageSrc: string): Promise<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>>[]> => {
    const img = await faceapi.fetchImage(imageSrc)
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()
    return detections
}
