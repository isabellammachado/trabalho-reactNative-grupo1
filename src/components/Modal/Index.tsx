import React, { useRef, useState } from 'react';
import { Modal, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { styles } from './Styles';
import { colors } from '../../theme/colors';
import { Pedido } from '../../types';
import MeuBotao from './../MeuBotao/Index';
import { Video, ResizeMode } from 'expo-av';

const DANGER_COLOR = colors.danger || '#D32F2F';

interface PropsModal {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  itemSelected: Pedido | null;
  onDelete: () => void;
}

export const ModalComponent = ({ isOpenModal, setIsOpenModal, itemSelected, onDelete }: PropsModal) => {

  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <Modal transparent visible={isOpenModal} animationType="fade" onRequestClose={() => setIsOpenModal(false)}>
      <View style={styles.fundo}>
        <View style={styles.card}>
          {itemSelected ? (
            <>
              <Text style={styles.title}>{itemSelected.title}</Text>

              {itemSelected.video_url ? (
                <View style={styles.videoContainer}>
                  <Text style={styles.labelVideo}>Vídeo em Libras:</Text>
                  <Video
                    ref={video}
                    style={styles.video}
                    source={{
                      uri: itemSelected.video_url,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
                </View>
              ) : null}

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