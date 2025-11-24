import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';
import { styles } from './Styles';
import { colors } from '../../theme/colors';
import { Pedido } from '../../types';
import MeuBotao from './../MeuBotao/Index';

const DANGER_COLOR = colors.danger || '#D32F2F';
interface PropsModal {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  itemSelected: Pedido | null;
  onDelete: () => void;
}

export const ModalComponent = ({ isOpenModal, setIsOpenModal, itemSelected, onDelete }: PropsModal) => {

  return (
    <Modal transparent visible={isOpenModal} animationType="fade" onRequestClose={() => setIsOpenModal(false)}>
      <View style={styles.fundo}>
        <View style={styles.card}>
          {itemSelected ? (
            <>

              <Text style={styles.title}>{itemSelected.title}</Text>
              <Text style={styles.text}>Nível Necessário: {itemSelected.nivel_necessario}</Text>
              <Text style={styles.tagTxt}>Status: {itemSelected.status}</Text>
              <Text style={styles.info}>📍Local: {itemSelected.location}</Text>

              {itemSelected.status === 'aberto' && itemSelected.userId && (
                <MeuBotao
                  texto="EXCLUIR PEDIDO"
                  cor={DANGER_COLOR}
                  onPress={onDelete}
                />
              )}

              <MeuBotao
                texto="FECHAR"
                cor="#FF6B6B"
                onPress={() => setIsOpenModal(false)}
              />
            </>
          ) : (
            <ActivityIndicator size="large" color={colors.secondary} />
          )}
        </View>
      </View>
    </Modal>
  )
}
