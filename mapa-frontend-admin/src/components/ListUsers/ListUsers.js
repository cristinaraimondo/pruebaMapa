import React from "react";
import { Button, List } from "antd";
import getUsers from "../Services";
import { useState, useEffect } from "react";
import "./ListUsers.scss";
import "antd/dist/antd.css";

export default function EditUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  return (
    <div className="ListUsers">
      <Button type="primary" style={{ background: "blue" }}>
        Crear Usuario
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={() => (
          <List.Item>
            <List.Item.Meta title={<h5>Nombre</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Apellido</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>DNI</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Tipo De Dni</h5>}></List.Item.Meta>
            <List.Item.Meta title={<h5>Nick</h5>}></List.Item.Meta>
            <List.Item.Meta title={""}></List.Item.Meta>
          </List.Item>
        )}
      />
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta title={user.first_name}></List.Item.Meta>
            <List.Item.Meta title={user.last_name}></List.Item.Meta>
            <List.Item.Meta title={user.DNI}></List.Item.Meta>
            <List.Item.Meta title={user.DNI_Type}></List.Item.Meta>
            <List.Item.Meta title={user.nick}></List.Item.Meta>
            <List.Item.Meta
              title={
                <Button type="primary" style={{ background: "goldenrod" }}>
                  Editar Usuario
                </Button>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      />
    </div>
  );
}
