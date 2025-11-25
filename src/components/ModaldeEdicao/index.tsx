import { useContext, useState } from "react";
import { Alert, Image, Platform} from "react-native";
import * as ImagePicker from 'expo-image-picker'; 
import { View, Text, Modal, TextInput } from 'react-native';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './style';
import fotoDefault from  '../../../assets/images.png';
import { colors } from "../../theme/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../../hooks/AuthContext";
import { User } from "../../types";


export const ModalEdicao = ({ isVisible, onClose, onSave, usuarioAtual}) => {
    const [name, setName] = useState(usuarioAtual?.name || '');
    const [password, setPassword] = useState(usuarioAtual?.password || '');
    const [telefone, setTelefone] = useState(usuarioAtual?.telefone || '');
    const [fotoPerfilURI, setFotoPerfilURI] = useState(usuarioAtual?.fotoPerfil || null);
    const { editar } = useContext(AuthContext); 


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
;
    const handleSave3 = async () => {
        const novosDados: Partial<User> = {};

        if (name.trim() !== "") novosDados.name = name;

        if (password && password.trim() !== "") {
            novosDados.password = password;
        }
        if (telefone.trim() !== "") novosDados.telefone = telefone;
        if (fotoPerfilURI) {
            novosDados.fotoPerfil = fotoPerfilURI;
        }

        try {
            await editar(novosDados);

            Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
            onClose(); 
        } catch (error) {
            Alert.alert("Erro", "Falha ao atualizar o perfil.");
        }
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
            <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraHeight={150}
                    extraScrollHeight={150}
                    contentContainerStyle={{ flexGrow: 1, padding: 16 }}
                  >
                    <Text style={styles.modalTitle}>Editar Perfil</Text>
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

                    <Text style={styles.texto}>Senha:</Text>
                    <TextInput style={styles.input} value={password } onChangeText={setPassword} />

                    <Text style={styles.texto}>Telefone:</Text>
                    <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} />

                    <MeuBotao texto="SALVAR" cor={colors.secondary} onPress={handleSave3} />
                    <View style={{height: 10}} /> 
                    <MeuBotao texto="CANCELAR" cor={colors.danger} onPress={onClose} />
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </Modal>

    );
}
