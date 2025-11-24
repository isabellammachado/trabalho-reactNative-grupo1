import { useState } from "react";
import { Image, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import { View, Text, Modal, TextInput } from 'react-native';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fotoDefault from  '../../../assets/images.png';
import { colors } from "../../theme/colors";


export const ModalEdicao = ({ isVisible, onClose, onSave, usuarioAtual}) => {
    const [name, setName] = useState(usuarioAtual?.name || '');
    const [cep, setCep] = useState(usuarioAtual?.cep || '');
    const [nivel, setNivel] = useState(usuarioAtual?.nivel || '');
    const [password, setPassword] = useState(usuarioAtual?.password || '');
    const [fotoPerfilURI, setFotoPerfilURI] = useState(usuarioAtual?.fotoPerfil || null);
    
    const escolheFoto = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permissão para galeria necessária!');
                return;
            }
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFotoPerfilURI(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        const novosDados = {
        name: name,
        cep: cep,
        nivel: nivel,
        password: password,
        fotoPerfil: fotoPerfilURI,
        };

        try {
        await AsyncStorage.setItem('@userData', JSON.stringify(novosDados));
            console.log("Dados salvos no AsyncStorage!");
        } catch (error) {
        console.error("Erro ao salvar no AsyncStorage:", error);
        }

        onSave(novosDados);
        onClose();
        };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.fundoModal}>
                <View style={styles.modalConteudo}>
                    <Text style={styles.modalTitle}>Editar Perfil</Text>
                    {/* <Image 
                        source={{ uri: fotoPerfilURI || fotoDefault }} 
                        style={styles.profileImage} 
                    /> */}
                    <Image
                    source={fotoPerfilURI ? { uri: fotoPerfilURI } : fotoDefault}
                    style={styles.profileImage}
                    />


                    <MeuBotao 
                        texto="ALTERAR FOTO" 
                        cor={colors.secondary} 
                        onPress={escolheFoto} 
                    />
                    
                    <Text style={styles.texto}>Nome:</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                    
                    <Text style={styles.texto}>CEP:</Text>
                    <TextInput style={styles.input} value={cep} onChangeText={setCep} />

                    <Text style={styles.texto}>Senha:</Text>
                    <TextInput style={styles.input} value={password } onChangeText={setPassword} />

                    <MeuBotao texto="SALVAR" cor={colors.secondary} onPress={handleSave} />
                    <View style={{height: 10}} /> 
                    <MeuBotao texto="CANCELAR" cor={colors.danger} onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}
