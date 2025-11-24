import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { MOCK_REQUESTS, abrirAgenda } from '../../services/api';
import Header from '../../components/Header/Index';
import CardPedido from '../../components/Card/Index';
import MeuBotao from '../../components/MeuBotao/Index';
import { styles } from './Styles';
import { Pedido } from '../../types/index';
import { colors } from '../../theme/colors';
import { ModalComponent } from '../../components/Modal/Index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  CriarPedido: undefined;
};
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const POLLING_INTERVAL = 5000;

export default function HomeScreen({ navigation }: HomeProps) {
  const { user } = useContext(AuthContext);
  const [lista, setLista] = useState<Pedido[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Pedido | null>(null);

  const [abaVoluntario, setAbaVoluntario] = useState<'disponiveis' | 'meus'>('disponiveis');

  const handleCardPress = (item: Pedido) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const carregar = () => {
    if (!user) return;

    fetch(MOCK_REQUESTS).then(r => r.json()).then((data: Pedido[]) => {

      if (user.role === 'surdo') {
        setLista(data.filter(req => req.userId === user.id));
      } else {
        if (abaVoluntario === 'meus') {
          setLista(data.filter(req => (req as any).voluntarioId === user.id));
        } else {
          setLista(data.filter(req => {

            const statusOk = req.status === 'aberto';

            return statusOk;
          }));
        }
      }
    });
  };

  const excluirPedido = (id: string) => {
    Alert.alert("Atenção", "Tem certeza que deseja cancelar este pedido?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim, Cancelar", style: "destructive", onPress: async () => {
          try {
            await fetch(`${MOCK_REQUESTS}/${id}`, { method: 'DELETE' });
            setIsModalOpen(false);
            carregar();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível cancelar.");
          }
        }
      }
    ]);
  };

  const aceitarPedido = async (item: Pedido) => {
    Alert.alert("Aceitar Ajuda", `Deseja aceitar: ${item.title}?`, [
      { text: "Não", style: "cancel" },
      {
        text: "Sim, Aceitar", onPress: async () => {
          try {
            const updatedRequest = {
              status: 'aceito',
              voluntarioId: user?.id,
            };
            await fetch(`${MOCK_REQUESTS}/${item.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedRequest)
            });

            try {
              await abrirAgenda(`Ajuda: ${item.title}`, item.data_agendamento, item.location);
            } catch (e) { console.log("Erro agenda", e) }

            Alert.alert("Sucesso", `Você aceitou o pedido! Veja na aba 'Minhas Ajudas'.`);
            setAbaVoluntario('meus');

          } catch (error) {
            Alert.alert("Erro", "Falha ao aceitar o pedido.");
          }
        }
      }
    ]);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    carregar();

    const startPolling = () => {
      carregar();
      intervalId = setInterval(carregar, POLLING_INTERVAL);
    };

    const stopPolling = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const focusListener = navigation.addListener('focus', startPolling);
    const blurListener = navigation.addListener('blur', stopPolling);

    return () => {
      focusListener();
      blurListener();
      stopPolling();
    };
  }, [navigation, user, abaVoluntario]);


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
        <View>
          <View style={stylesVoluntario.tabsContainer}>
            <TouchableOpacity
              style={[stylesVoluntario.tab, abaVoluntario === 'disponiveis' && stylesVoluntario.tabActive]}
              onPress={() => setAbaVoluntario('disponiveis')}
            >
              <Text style={[stylesVoluntario.tabText, abaVoluntario === 'disponiveis' && stylesVoluntario.tabTextActive]}>
                Disponíveis
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesVoluntario.tab, abaVoluntario === 'meus' && stylesVoluntario.tabActive]}
              onPress={() => setAbaVoluntario('meus')}
            >
              <Text style={[stylesVoluntario.tabText, abaVoluntario === 'meus' && stylesVoluntario.tabTextActive]}>
                Minhas Ajudas
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sub}>
            {abaVoluntario === 'disponiveis' ? 'Todos os pedidos disponíveis' : 'Pedidos aceitos por você'}
          </Text>
        </View>
      )}

      <FlatList
        data={lista}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <CardPedido
            item={item}
            esconderBotao={user?.role === 'surdo' || abaVoluntario === 'meus'}
            onAceitar={() => aceitarPedido(item)}
            openCard={() => handleCardPress(item)}
          />
        )}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum pedido encontrado.</Text>}
        contentContainerStyle={{ padding: 15 }}
      />

      <ModalComponent
        isOpenModal={isModalOpen}
        setIsOpenModal={setIsModalOpen}
        itemSelected={selectedItem}
        onDelete={() => selectedItem && excluirPedido(selectedItem.id)}
      />
    </View>
  );
}

const stylesVoluntario = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 4,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 6 },
  tabActive: { backgroundColor: '#FFF', elevation: 2 },
  tabText: { fontWeight: '600', color: '#777' },
  tabTextActive: { color: colors.primary, fontWeight: 'bold' }
});