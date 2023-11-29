import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormPecas({ navigation, route }) {
    const { acao, peca: pecaAntiga } = route.params;

    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [quantidade, setQuantidade] = useState('');


    const validationSchema = Yup.object().shape({
        nome: Yup.string().required("Preencha o Campo!!"),
        numero: Yup.string().required("Preencha o Campo!!"),
        quantidade: Yup.string().required("Preencha o Campo!!")
    });

    useEffect(() => {
        console.log("peca -> ", pecaAntiga);

        if (pecaAntiga) {
            setNome(pecaAntiga.nome);
            setNumero(pecaAntiga.numero);
            setQuantidade(pecaAntiga.quantidade);
        }
    }, []);

    function salvar(novaPeca) {
        console.log("Salvar Dados -> ", novaPeca);

        if (pecaAntiga) {
            acao(pecaAntiga, novaPeca);
        } else {
            acao(novaPeca);
        }

        Toast.show({
            type: "success",
            text1: "Cadastro Salvo!",
        });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                {pecaAntiga ? "Editar Cadastro" : "Adicionar Cadastro"}
            </Text>

            <Formik
                initialValues={{
                    nome: "",
                    numero: "",
                    quantidade: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => salvar(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched,
                    errors,
                    values,
                }) => (
                    <>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Nome"
                                keyboardType="numeric"
                                value={values.nome}
                                onChangeText={handleChange("nome")}
                                onBlur={handleBlur("nome")}
                            />
                            {touched.nome && errors.nome && (
                                <Text style={{
                                    color: "red",
                                    textAlign: "center"
                                }}>
                                    {errors.nome}
                                </Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Número"
                                keyboardType="numeric"
                                value={values.numero}
                                onChangeText={handleChange("numero")}
                                onBlur={handleBlur("numero")}
                            />
                            {touched.numero && errors.numero && (
                                <Text style={{ 
                                    color: "red", 
                                    textAlign: "center" 
                                    }}>
                                    {errors.numero}
                                </Text>
                            )}

                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Quantidade"
                                keyboardType="numeric"
                                value={values.quantidade}
                                onChangeText={handleChange("quantidade")}
                                onBlur={handleBlur("quantidade")}
                                error={touched.quantidade && errors.quantidade ? true : false}
                            />
                            {touched.quantidade && errors.quantidade && (
                                <Text style={{ 
                                    color: "red", 
                                    textAlign: "center" 
                                    }}>
                                    {errors.quantidade}
                                </Text>
                            )}

                        </View>

                        <View style={styles.buttonContainer}>
                            <Button
                                style={[styles.button, { backgroundColor: "#808080" }]}
                                mode="contained"
                                onPress={() => navigation.goBack()}
                            >
                                Voltar
                            </Button>

                            <Button
                                style={[styles.button, { backgroundColor: "#008000" }]}
                                mode="contained"
                                onPress={handleSubmit}
                            >
                                Salvar
                            </Button>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F5E6CA",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    button: {
        width: "40%",
        alignSelf: "center",
    },
});