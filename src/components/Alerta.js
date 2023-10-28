import React from "react";
import { Snackbar, Text } from "react-native-paper";

export function Alerta({titulo, mensagem, error=false, setError}) {
    return (
        <Snackbar
            visible={error}
            onDismiss={() => setError(false)}
            duration={1500}
            action={{
                label: 'OK',
                onPress: () => setError(false)
            }}>
            <React.Fragment>
            {titulo && <strong>{titulo}</strong>}
            <Text>{mensagem}</Text>
            </React.Fragment>
        </Snackbar>
    )
}