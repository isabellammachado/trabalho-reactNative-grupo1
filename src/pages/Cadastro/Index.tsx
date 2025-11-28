import React, { useContext, useState } from "react";
import {Text, View, Alert} from "react-native";
import { API_KEYUSERS , buscarCep } from "../../services/api";
import MeuInput from "../../components/Input/Index";
import MeuBotao from "../../components/MeuBotao/Index";
import { styles } from "./Styles";
import { Role, Nivel, User } from "../../types/index";
import { colors } from "../../theme/colors";
import { AuthContext } from "../../hooks/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../@types/navigation";

export default function CadastroScreen({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cep: "",
    cidade: "",
    telefone: "",
    role: "surdo" as Role,
    nivel: "basico" as Nivel,
  });

  const { signIn } = useContext(AuthContext);

  const handleCep = async (cep: string) => {
    setForm({ ...form, cep });
    if (cep.length >= 8) {
      const res = await buscarCep(cep);
      if (res) setForm((old) => ({ ...old, cep, cidade: res.localidade }));
    }
  };

  function validarEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const salvar = async () => {
    if (!form.name || !form.cidade) {
      return Alert.alert("Erro", "Preencha tudo");
    }

    if (!validarEmail(form.email)) {
      return Alert.alert("Erro", "Digite um e-mail válido");
    }

    if(!form.password){
      return Alert.alert("Erro", "A senha é obrigatória")
    }

    if(!form.telefone){
      return Alert.alert("Erro", "O telefone é obrigatório")
    }
    const requisicao = await fetch(API_KEYUSERS);
      const users: User[] = await requisicao.json();
      const existe = users.find((user) => user.email === form.email);

    if (existe) {
      Alert.alert("Erro", "Esse e-mail já está cadastrado!");
      return;

    }
    
    const novoUsuario = {
      name: form.name,
      email: form.email,
      telefone: form.telefone,
      role: form.role,
      nivel: form.nivel,
      cidade: form.cidade,
      cep: form.cep,
      fotoPerfil: null,
      password: form.password,
    };

     try {
    const response = await fetch(API_KEYUSERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoUsuario),
    });

    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`Erro ao criar usuário: ${txt}`);
    }

    const userCriado = await response.json(); 
    await signIn(userCriado.email, userCriado.password); 

    Alert.alert("Sucesso", "Cadastrado!");
  } catch (error) {
    console.error(error);
    Alert.alert("Erro ao cadastrar usuário.");
  }
};


  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraHeight={150}
        extraScrollHeight={150}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
      >
        <Text style={styles.tit}>Criar Conta</Text>

        <Text style={styles.lbl}>Eu sou:</Text>
        <View style={styles.row}>
          <MeuBotao
            texto="SURDO"
            cor={form.role === "surdo" ? colors.primary : colors.gray}
            onPress={() => setForm({ ...form, role: "surdo" })}
          />
          <MeuBotao
            texto="VOLUNTÁRIO"
            cor={form.role === "voluntario" ? colors.primary : colors.gray}
            onPress={() => setForm({ ...form, role: "voluntario" })}
          />
        </View>

        <MeuInput
          placeholder="Nome"
          value={form.name}
          setValor={(t) => setForm({ ...form, name: t })}
        />
        <MeuInput
          placeholder="Email"
          value={form.email}
          setValor={(t) => setForm({ ...form, email: t })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <MeuInput
          placeholder="Senha"
          value={form.password}
          setValor={(t) => setForm({ ...form, password: t })}
          secureTextEntry
        />
        <MeuInput
          placeholder="CEP"
          value={form.cep}
          setValor={handleCep}
          keyboardType="numeric"
        />
        <MeuInput
          placeholder="Cidade"
          value={form.cidade}
          setValor={() => {}}
        />
        <MeuInput
          placeholder="Telefone"
          value={form.telefone}
          setValor={(t) => setForm({ ...form, telefone: t })}
          keyboardType="phone-pad"
        />

        {form.role === "voluntario" && (
          <>
            <Text style={styles.lbl}>Nível de Libras:</Text>
            <View style={styles.row}>
              {(["basico", "intermediario", "avancado"] as Nivel[]).map((n) => (
                <MeuBotao
                  key={n}
                  texto={n.toUpperCase()}
                  cor={form.nivel === n ? colors.secondary : colors.gray}
                  onPress={() => setForm({ ...form, nivel: n })}
                />
              ))}
            </View>
          </>
        )}

        <MeuBotao texto="FINALIZAR" cor={colors.success} onPress={salvar} />
      </KeyboardAwareScrollView>
    </View>
  );
}
