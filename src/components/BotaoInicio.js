import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BotaoInicial({ onPress, children }) {
  return (
    <TouchableOpacity style={style.botao} onPress={onPress}>
      <Text style={style.textoBotao}>{children}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  botao: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#1E8187",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    fontSize: 15,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#fff",
  }
});