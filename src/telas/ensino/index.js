import  React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import { cameraLenta } from '../aula/script_aula';
import * as Progress from 'react-native-progress';
import { AumentarBarra, PegarFrequencia } from '../../servicos/firestore';
import style from './style_ensino';

import { auth } from '../../config/firebase';

export default function Ensino({navigation, route}) {

    const usuario = auth.currentUser;
    const { id_modulo } = route.params;
    const video = React.useRef(null);
    const [vel, setVel] = useState(1);
    const [cor, setCor] = useState('blue');
    const [score, setScore] = useState(0);

const pontuacao = (score, setScore)=>{    
       setScore(score + 0.2)
        if(score == 1) {
          AumentarBarra(usuario, id_modulo)
          PegarFrequencia(usuario, 2);
          navigation.navigate('Modulos')
        }
    };
    
    return <>
    <SafeAreaView style={style.SafeArea}>
      <View style={style.fundo}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Modulos')}>
            <Text style={{ fontSize: 40, color: 'white' }}>{"X"}</Text>
          </TouchableOpacity>
        </View>
        <Progress.Bar progress={score} width={300} height={20} />
        <Text>ESte é o sinal de "Esse livro é bom"</Text>
        {/* função de video */}
        <Video
          ref={video}
          source={{ url: 'https://asana-user-private-us-east-1.s3.us-east-1.amazonaws.com/assets/1204295688699781/1205281492626818/9ca6c33948790f831b359c76540031a3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAV34L4ZY4NEL2AI7S%2F20231117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231117T193310Z&X-Amz-Expires=120&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGIaCXVzLWVhc3QtMSJIMEYCIQDdsUdhJdyeJ1UYb1ENOZeQi3q8U6AYOXXqB1IFYob5AQIhAJLCpBM48Zzu6IzhQTzxFL5ORODJaxQhxugepweTsKs%2BKroFCKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDAzNDgzNDQ2ODQwIgy0XoMRTQbAusDNYV4qjgWTlsrJ1bqwhKH5h6Lu4gwOD1zgTRnixlwIdGvipC4o8T657b6DCRH26BtydZ%2BvCpqJHHWwBuekEyq9edTt0FOd9TzKI5mCS4THQSBhu6B046EDQPIngsVkJBj3nmp05jWSkVtiBI40NAfHiWlBj9KgXgWkHMSCDVrpzW3nw84w5i0jh%2F2Vr9G5LtNXR264Mln5P5e2P2oCDJd4oHF6m%2B3cti8xMZJYspGOw9h05lUzlpBpjAq2Sm3T%2BCRZTSkJShoPRsFVTx7o17EmZjbQtsLs503RZ2A2m4wW94IUYix4qdnKUwSzdffl6ZlQaqt3vTDhN1tkc%2BJZUPUUYBxsSveibVIvx1lUJC2s73du4zImByUlhHBOOY7abusOfbhgHnz1q7mRB77xAi4d%2B9TNrk57hvxhKZ7wUxCnAtIww1pYqBuoYbosMH25lXXzIULZcaLPp7bUksJO5%2BPDpIJ2EQrdt%2F5HYEMTxkfQOJkQ%2FMTrd8ys7IDpqXOdAEmgKbH4JAFHs95EoO97I77qVp%2F2C0hPjzjPCZo%2FD6nzu9ejag%2Bx3Yq2OEQtnGVo7gHxiVrWRJgbVJEgv1%2Fe%2Fpb7IYnLiTgPTnn%2FiBxeA0CuU2GOkjrlgsI55yIwquiN2me9lSjPkhf6xkfa5AhmwcM8N%2Bv7vjP%2FnI2YIOWo8Z0GSN643B7ZTxdktn%2BGx0qjxGizj1%2FPOoJnSN6Ej7GzO0yZkTT0hHGi6SdzakX4Swb1Kv0atQY3SAEAVzjzodZEMwKjex0ILcFAphJTG8wAYBvXIT%2BJ66PNOrrBP%2FBh%2FK9mTgDCgX%2BUvUBlVTjOqb1KBCiXgKExlVQaHC6lRiX9bUXJgpqXFySG9zG8fH%2FDUJKPr6sRjp8wyb3eqgY6sAFPHRrdymsMvTDWpUvt46jPs0TC13CI83Pz7Icrev1je6xOqxFDD87uOpmWh7qGVar6IsphLfNHBzCjgsG4GB%2BgecGRwM6qDnScOMWQwmXVOBpJQGB40RRMRn6MWc11UI7WJD4%2FxmNk1j6WkjeiNP08uKHtu2obaPM9I7Kx%2FVr8x9lYKyJXCqA8FA%2BsxlPb1XiqvczLnG4dCXW4aR8hpqhAKhdqi9RsIUSLE5c6tEr4qg%3D%3D&X-Amz-Signature=613bc104e298b7124eefde6404438fed56c9d66227f6961398fd57e74d5210d1&X-Amz-SignedHeaders=host&x-id=GetObject#_=_' }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={true}
          style={style.video}
          isLooping={true}
          isMuted={true}
        />
  
        <View style={style.footer}>
          <TouchableOpacity
            style={[style.botaoVel, { backgroundColor: cor }]}
            onPress={() => cameraLenta(vel, setCor, setVel)} //função para diminuir a velocidade do video e mudar a cor do botao
          >
            <Text style={style.botaoTexto}>Velocidade</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            onPress={() => pontuacao(score, setScore)}>
            <Text style={style.btnConfirmar}>{"->"}</Text>
            <Text>Proximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </>
  
}