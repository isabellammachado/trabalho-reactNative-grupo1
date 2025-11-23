import React from 'react';
import { Modal, View, ActivityIndicator, Text } from 'react-native';
import { styles } from './Styles';
import { colors } from '../../theme/colors';
import { Pedido } from '../../types';
import { TouchableOpacity } from 'react-native';
import MeuBotao from './../MeuBotao/Index';

// 

interface PropsModal {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  itemSelected: Pedido| null;
}

export const ModalComponent = ({isOpenModal, setIsOpenModal, itemSelected}: PropsModal) => {
  
  

  return(
    <Modal transparent visible={isOpenModal} animationType="fade" onRequestClose={() => setIsOpenModal(false)}>
      <View style={styles.fundo}>
        <View style={styles.card}>
          {itemSelected ? (
            <>
              <Text style={styles.title}>{itemSelected.title}</Text>
               <Text style={styles.text}>Nível Necessário:  {itemSelected.nivel_necessario}</Text>
               <Text style={styles.tagTxt}>Status:  {itemSelected.status}</Text>
                <Text style={styles.info}>📍Local: {itemSelected.location}</Text>
               <MeuBotao 
               texto="SAIR" 
               cor="#FF6B6B"  
               onPress={() => setIsOpenModal(false)}>
                </MeuBotao>
            </>
          ) : (
             <ActivityIndicator size="large" color={colors.secondary} />
          )}
        </View>
      </View>
    </Modal>
)
}
