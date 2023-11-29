import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Home from "../Home";
import StackUsuarios from "../screens/Usuario/StackUsuarios";
import StackFuncionarios from "../screens/Funcionario/StackFuncionarios";
import StackReservas from "../screens/Reservas/StackReservas";
import StackCardapios from "../screens/Cardapio/StackCardapios";
import StackAvaliacoes from "../screens/Avaliacao/StackAvaliacoes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Início">
      <Drawer.Screen name="Início" component={Home} />
      <Drawer.Screen name="Usuários" component={StackUsuarios} />
      <Drawer.Screen name="Funcionários" component={StackFuncionarios} />
      <Drawer.Screen name="Reservas" component={StackReservas} />
      <Drawer.Screen name="Cardápio" component={StackCardapios} />
      <Drawer.Screen name="Avaliações" component={StackAvaliacoes} />
    </Drawer.Navigator>
  );
}