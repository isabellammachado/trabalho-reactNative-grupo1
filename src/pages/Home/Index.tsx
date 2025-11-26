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
import { RootStackParamList } from '../../@types/navigation';

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
          setLista(data.filter(req => req.status === 'aberto'));
        }
      }
    }).catch(() => {});
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
          } catch {
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

            setLista(prev =>
              prev.map(p =>
                p.id === item.id ? { ...p, status: 'aceito', voluntarioId: user?.id } as any : p
              )
            );

            try {
              await abrirAgenda(`Ajuda: ${item.title}`, item.data_agendamento, item.location);
            } catch {}

            Alert.alert("Sucesso", `Você aceitou o pedido! Veja na aba 'Minhas Ajudas'.`);
            setAbaVoluntario('meus');
          } catch {
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
      <Header
        titulo={`Olá, ${user?.name || ''}`}
        alertCount={lista.filter(req => req.status === 'aberto').length}
      />

      {user?.role === 'surdo' ? (
        <View style={styles.areaSurdo}>
          <Text style={styles.sub}>Precisa de ajuda?</Text>
          <MeuBotao texto="+ NOVO PEDIDO" cor={colors.secondary} onPress={() => navigation.navigate('CriarPedido')} />
          <Text style={styles.divisor}>Meus Pedidos:</Text>
        </View>
      ) : (
        <View>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, abaVoluntario === 'disponiveis' && styles.tabActive]}
              onPress={() => setAbaVoluntario('disponiveis')}
            >
              <Text style={[styles.tabText, abaVoluntario === 'disponiveis' && styles.tabTextActive]}>
                Disponíveis
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, abaVoluntario === 'meus' && styles.tabActive]}
              onPress={() => setAbaVoluntario('meus')}
            >
              <Text style={[styles.tabText, abaVoluntario === 'meus' && styles.tabTextActive]}>
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
