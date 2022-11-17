import {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';

const PostUploadScreen = () => {
  //   const [type, setType] = useState(CameraType.back);
  //   const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasPermissions, setHasPermissions] = useState<boolean | null>(null);

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

  if (hasPermissions === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermissions === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.page}>
      <Camera style={styles.camera} />
      <View style={styles.buttonsContainer}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <MaterialIcons name="close" size={30} color={colors.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.black
    },
    camera: {
        width: "100%",
        aspectRatio: 3/ 4,
    },
    buttonsContainer: {

    },
})

export default PostUploadScreen;

