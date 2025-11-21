import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { MOCK_REQUESTS, abrirAgenda } from '../../services/api';
import Header from '../../components/Header/Index';
import CardPedido from '../../components/Card/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { Pedido } from '../../types/index';
import { colors } from '../../theme/colors';

export default function HomeScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [lista, setLista] = useState<Pedido[]>([]);

  const carregar = () => {
    if (!user) return;
    fetch(MOCK_REQUESTS).then(r => r.json()).then((data: Pedido[]) => {
      if (user.role === 'surdo') {
        setLista(data.filter(req => req.userId === user.id));
      } else {
        setLista(data.filter(req => {
          const cidadeOk = req.cidade === user.cidade;
          let nivelOk = false;
          if (user.nivel === 'avancado') nivelOk = true;
          else if (user.nivel === 'intermediario' && req.nivel_necessario !== 'avancado') nivelOk = true;
          else if (user.nivel === 'basico' && req.nivel_necessario === 'basico') nivelOk = true;
          return cidadeOk && nivelOk;
        }));
      }
    });
  };

  useEffect(() => {
    return navigation.addListener('focus', carregar);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header titulo={`Olá, ${user?.name || ''}`} />

      {user?.role === 'surdo' ? (
        <View style={styles.areaSurdo}>
          <Text style={styles.sub}>Precisa de ajuda?</Text>
          <MeuBotao texto="+ NOVO PEDIDO" cor={colors.secondary} onPress={() => navigation.navigate('CriarPedido')} />
          <Text style={styles.divisor}>Meus Pedidos:</Text>
        </View>
      ) : (
        <Text style={styles.sub}>Pedidos na sua região ({user?.cidade})</Text>
      )}

      <FlatList
        data={lista}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <CardPedido
            item={item}
            esconderBotao={user?.role === 'surdo'}
            onAceitar={() => abrirAgenda(`Ajuda: ${item.title}`, item.data_agendamento, item.location)}
          />
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nada encontrado.</Text>}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}