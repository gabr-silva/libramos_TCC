import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';

export function EntradaTexto({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry, 
  error, 
  messageError,
  pattern 
}) {
  const [secureMode, setSecureMode] = useState(secureTextEntry);

  function regexValidation() {
    if(!value) return false;
    if (pattern) {
      const condition = new RegExp(pattern);
      return !condition.test(value);
    }

    return false;
  }

  const showError = value == null || error || regexValidation();

  return (
    <>
      <TextInput
        label={label}
        value={value}
        error={showError}
        secureTextEntry={secureMode}
        onChangeText={onChangeText}
        style={style.input}
        mode="outlined"
        activeOutlineColor='#1E8187'
        right={
          secureTextEntry ?
          <TextInput.Icon
            icon={secureMode ? 'eye-off' : 'eye'}
            onPress={() => setSecureMode(!secureMode)}
          /> : null
        }
      />
      {showError && <HelperText type="error" visible={showError}>
        {messageError}
      </HelperText>}
    </>
  );
}
 const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 25,
        paddingHorizontal: 20,
        }, 
    input: {
        width: "100%",
        borderColor: "#e6e6e6",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        backgroundColor: "#fff",
    }
});