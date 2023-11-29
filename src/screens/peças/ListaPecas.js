import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  FAB,
  MD3Colors,
  Portal,
  Text,
} from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ListaPecas({ navigation, route }) {
  const [pecas, setPecas] = useState([]);
  const [showModalExcluirPeca, setShowModalExcluirPeca] = useState(false);
  const [pecaASerExcluida, setPecaASerExcluida] = useState(null);

  useEffect(() => {
    loadPecas();
  }, []);

  async function loadPecas() {
    const response = await AsyncStorage.getItem("pecas");
    console.log(
      "🚀 ~ file: ListaPecasAsyncStorage.js:21 ~ loadPecas ~ response:",
      response
    );
    const pecasStorage = response ? JSON.parse(response) : [];
    setPecas(pecasStorage);
  }

  const showModal = () => setShowModalExcluirPeca(true);

  const hideModal = () => setShowModalExcluirPeca(false);

  async function adicionarPeca(peca) {
    let novaListaPecas = pecas;
    novaListaPecas.push(peca);
    await AsyncStorage.setItem("pecas", JSON.stringify(novaListaPecas));
    setPecas(novaListaPecas);
  }

  async function editarPecas(pecaAntiga, novosDados) {
    console.log("AVALIAÇÃO ANTIGA -> ", pecaAntiga);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaPecas = pecas.map((peca) => {
      if (peca == pecaAntiga) {
        return novosDados;
      } else {
        return peca;
      }
    });

    await AsyncStorage.setItem("pecas", JSON.stringify(novaListaPecas));
    setPecas(novaListaPecas);
  }

  async function excluirPeca(peca) {
    const novaListaPecas = pecas.filter((p) => p !== peca);
    await AsyncStorage.setItem("pecas", JSON.stringify(novaListaPecas));
    setPecas(novaListaPecas);
    Toast.show({
      type: "success",
      text1: "Peça excluída!",
    });
  }

  function handleExluirPeca() {
    excluirPeca(pecaASerExcluida);
    setPecaASerExcluida(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Peças
      </Text>

      <FlatList
        style={styles.list}
        data={pecas}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Nome: {item?.nome}</Text>
                <Text variant="titleMedium">Número: {item?.numero}</Text>
                <Text variant="bodyLarge">Quantidade: {item?.quantidade}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push("FormPecas", {
                    acao: editarPecas,
                    avaliacao: item,
                  })
                }
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Editar
              </Button>
              <Button
                onPress={() => {
                  setPecaASerExcluida(item);
                  showModal();
                }}
                style={{ backgroundColor: 'yellow' }}
                labelStyle={{ color: 'black' }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.push("FormPecas", { acao: adicionarPeca })
        }
      />

      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirPeca} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Tem certeza que deseja excluir esta peça?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluirPeca}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFF9C4'
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: "90%",
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: "row",
    backgroundColor: 'white',
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
  },
});