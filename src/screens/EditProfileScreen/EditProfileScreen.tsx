import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {useForm, Controller, Control} from 'react-hook-form';
import user from '../../assets/data/user.json';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {IUser} from '../../types/models';

const URL_REGEX =
/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

type IEditableUserField = 'name' | 'username' | 'website' | 'bio';
type IEditableUser = Pick<IUser, IEditableUserField>;

interface ICustomInput {
  control: Control<IEditableUser, object>;
  label: string;
  name: IEditableUserField;
  multiline?: boolean;
  rules?: object;
}

const CustomInput = ({
  control,
  name,
  label,
  multiline = false,
  rules = {},
}: ICustomInput) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}:</Text>
        <View style={{flex: 1}}>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={label}
            multiline={multiline}
            style={[
              styles.input,
              {borderColor: error ? colors.error : colors.border},
            ]}
          />
          {error && (
            <Text style={{color: colors.error}}>
              {error.message || 'Invalid'}
            </Text>
          )}
        </View>
      </View>
    )}
  />
);

const EditProfileScreen = () => {
  const {control, handleSubmit} = useForm<IEditableUser>({
    defaultValues: {
        name: user.name,
        username: user.username,
        website: user.website,
        bio: user.bio
    }
  });

  const onSubmit = (data: IEditableUser) => {
    console.log('clicked submit', data);
  };
  return (
    <View style={styles.page}>
      <Image source={{uri: user.image}} style={styles.avatar} />
      <Text style={styles.textButton}>Change profile photo</Text>

      <CustomInput
        name="name"
        control={control}
        rules={{
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Need to provide 2 or more characters',
          },
        }}
        label="Name"
      />
      <CustomInput
        name="username"
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Need to provide 3 or more characters',
          },
        }}
        label="Username"
      />
      <CustomInput
        name="website"
        control={control}
        rules={{pattern: {value: URL_REGEX, message: 'Invalid url'}}}
        label="Website"
      />
      <CustomInput
        name="bio"
        control={control}
        rules={{
          maxLength: {
            value: 200,
            message: 'Bio should not exceed 250 characters',
          },
        }}
        label="Bio"
        multiline
      />

      <Text onPress={handleSubmit(onSubmit)} style={styles.textButton}>
        Submit
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 100,
  },
  textButton: {
    color: colors.primary,
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.semi,

    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 10,
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomWidth: 1,
    padding: 5,
  },
});

export default EditProfileScreen;
