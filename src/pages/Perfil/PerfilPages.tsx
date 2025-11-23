
import React, { useContext, useState } from 'react';
import { View, Text, Image, } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import Header from '../../components/Header/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles'; 
import { ModalEdicao } from '../../components/ModaldeEdição';



export default function PerfilScreen() {
    const { user, signOut, editar } = useContext(AuthContext);
    const [modalVisivel, setModalVisivel] = useState(false); 

    const handleSalvarEdicao = (novosDados) => {
        editar(novosDados);
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

                <MeuBotao texto="SAIR" cor="#FF6B6B" onPress={signOut} />
                
                <MeuBotao 
                    texto="EDITAR PERFIL" 
                    cor="#15a5be" 
                    onPress={() => setModalVisivel(true)} 
                />
            </View>
            
            <ModalEdicao 
                isVisible={modalVisivel}
                onClose={() => setModalVisivel(false)}
                onSave={handleSalvarEdicao}
                usuarioAtual={user} 
            />
        </View>
    );
}