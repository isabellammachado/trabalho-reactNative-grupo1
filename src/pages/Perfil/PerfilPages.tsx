
import React, { useContext, useState } from 'react';
import { View, Text, Image, } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import Header from '../../components/Header/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles'; 
import { ModalEdicao } from '../../components/ModaldeEdicao';
import { colors } from '../../theme/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function PerfilScreen() {
    const { user, signOut, editar, deletar } = useContext(AuthContext);
    const [modalVisivel, setModalVisivel] = useState(false); 

    const handleSalvarEdicao = (novosDados) => {
        editar(novosDados);
    };

    const handleDelete = async () => {
        deletar();
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Carregando dados do usuário...</Text>
            </View>
        );
    }

    const fotoSource = user.fotoPerfil 
        ? { uri: user.fotoPerfil } 
        : require('../../../assets/images.png'); 

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" > 
            <Header titulo="Perfil" />
            <View style={styles.box}>
                
                <Image 
                    source={fotoSource} 
                    style={styles.profileImage} 
                />

                <Text style={styles.lbl}>Nome:</Text>
                <Text style={styles.val}>{user.name}</Text>
                
                <Text style={styles.lbl}>Localidade:</Text>
                <Text style={styles.val}>{user.cidade} - CEP {user.cep}</Text>
                
                <Text style={styles.lbl}>Nível de Libras:</Text>
                <Text style={styles.val}>{user.nivel.toUpperCase()}</Text>

                <MeuBotao texto="SAIR" cor={colors.primary} onPress={signOut} />
                
                <MeuBotao 
                    texto="EDITAR PERFIL" 
                    cor={colors.secondary} 
                    onPress={() => setModalVisivel(true)} 
                />

                <MeuBotao 
                    texto="DELETAR PERFIL" 
                    cor={colors.danger} 
                    onPress={handleDelete} 
                />
            </View>
            
            <ModalEdicao 
                isVisible={modalVisivel}
                onClose={() => setModalVisivel(false)}
                onSave={handleSalvarEdicao}
                usuarioAtual={user} 
            />
            </KeyboardAwareScrollView>
        </View>
    );
}
