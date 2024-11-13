import { Typography, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import NotFoundImg from "../assets/not-found.svg";
import { FC } from "react";

const { Title, Text } = Typography;

type IProps = { onEdit: () => void }

const NotFound: FC<IProps> = ({ onEdit }) => {
  return (
    <div
      style={{
        padding: 40,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "space-between",
        flexDirection: "column",
      }}
    >
      <Title level={2}>Procedimientos</Title>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexDirection: "column",
        }}
      >
        <img src={NotFoundImg} alt="Icono SVG" width={200} height={200} />
        <Text style={{ fontSize: "16px" }}>No hay datos que mostrar</Text>
        <Button type="primary" onClick={onEdit} icon={<EditOutlined />}>
          Editar Procedimientos
        </Button>
      </div>

      <div />
    </div>
  );
};

export default NotFound;
