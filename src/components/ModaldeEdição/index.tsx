import { useState } from "react";
import { Image, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import { View, Text, Modal, TextInput } from 'react-native';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './style';
import fotoDeafault from  '../../../assets/images.png';


export const ModalEdicao = ({ isVisible, onClose, onSave, usuarioAtual}) => {
    const [name, setName] = useState(usuarioAtual?.name || '');
    const [cep, setCep] = useState(usuarioAtual?.cep || '');
    const [nivel, setNivel] = useState(usuarioAtual?.nivel || '');
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
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFotoPerfilURI(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        const novosDados = {
            name: name,
            cep: cep,
            nivel: nivel,
            fotoPerfil: fotoPerfilURI, 
        };
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
                    <Image 
                        source={{ uri: fotoPerfilURI || fotoDeafault }} 
                        style={styles.profileImage} 
                    />
                    <MeuBotao 
                        texto="ALTERAR FOTO" 
                        cor="#4ECDC4" 
                        onPress={escolheFoto} 
                    />
                    
                    <Text style={styles.texto}>Nome:</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                    
                    <Text style={styles.texto}>CEP:</Text>
                    <TextInput style={styles.input} value={cep} onChangeText={setCep} />

                    <Text style={styles.texto}>Nível:</Text>
                    <TextInput style={styles.input} value={nivel} onChangeText={setNivel} />

                    <MeuBotao texto="SALVAR" cor="#15a5be" onPress={handleSave} />
                    <View style={{height: 10}} /> 
                    <MeuBotao texto="CANCELAR" cor="#FF6B6B" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}
