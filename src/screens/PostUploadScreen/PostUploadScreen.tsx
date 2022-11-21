import {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Camera, CameraPictureOptions, CameraRecordingOptions, CameraType, FlashMode} from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';

const flashModes = [
  FlashMode.off,
  FlashMode.on,
  FlashMode.auto,
  FlashMode.torch,
];

const flashModeToIcon = {
  [FlashMode.off]: 'flash-off',
  [FlashMode.on]: 'flash-on',
  [FlashMode.auto]: 'flash-auto',
  [FlashMode.torch]: 'highlight',
};

const PostUploadScreen = () => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);
  const [flash, setFlash] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const camera = useRef<Camera>(null);

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasPermissions(
        cameraPermission.status === 'granted' &&
          microphonePermission.status === 'granted',
      );
    };
    getPermission();
  }, []);

  const flipCamera = () => {
    setCameraType(currentCameraType =>
      currentCameraType === CameraType.back
        ? CameraType.front
        : CameraType.back,
    );
  };

  const flipFlash = () => {
    const currentIndex = flashModes.indexOf(flash);
    const nextIndex =
      currentIndex === flashModes.length - 1 ? 0 : currentIndex + 1;
    setFlash(flashModes[nextIndex]);
  };

  const takePicture = async () => {
    if (!isCameraReady || !camera.current || isRecording){
        return;
    }

    const options: CameraPictureOptions = {
        quality: 0.75,
        base64: false,
        skipProcessing: true,
    };

    const result = await camera.current.takePictureAsync(options);
    console.log(result);
  };

  const startRecording = async () => {
    if (!isCameraReady || !camera.current || isRecording){
        return;
    }

    const options: CameraRecordingOptions = {
        quality: Camera.Constants.VideoQuality['640:480'],
        maxDuration: 60, // in seconds
        maxFileSize: 10 * 1024 * 1024, // video file size in bytes
        mute: false,
    }
    setIsRecording(true);
    try {
        const result = await camera.current.recordAsync(options);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
    setIsRecording(false);
    
  }

  const stopRecording = () => {
    if (isRecording) {
        camera.current?.stopRecording();
        setIsRecording(false);
    }
  }

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.page}>
      <Camera
        ref={camera}
        type={cameraType}
        style={styles.camera}
        ratio="4:3"
        onCameraReady={() => setIsCameraReady(true)}
      />

      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />

        <Pressable onPress={flipFlash}>
          <MaterialIcons
            name={flashModeToIcon[flash]}
            size={30}
            color={colors.white}
          />
        </Pressable>

        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>

      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />

        {isCameraReady && (
          <Pressable onPress={takePicture} onLongPress={startRecording} onPressOut={stopRecording}>
            <View style={[styles.circle, {backgroundColor: isRecording ? colors.accent : colors.white}]} />
          </Pressable>
        )}

        <Pressable onPress={flipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});

export default PostUploadScreen;
